/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [1.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "GET /api/specialties"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/vets"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/specialties/4452"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/specialties/4455"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/specialties/4456"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/specialties/4453"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/specialties/4454"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/visits"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/visits"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pets/5189"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/5189"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pets/5190"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/5190"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pets/5193"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pets/5192"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pets/5191"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/specialties/4454"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/specialties/4453"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/specialties/4456"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/specialties/4455"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/visits/5133"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/visits/5132"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/visits/5134"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/5193"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/5192"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/5191"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/5191"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/5190"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/visits/5131"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/5193"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/visits/5130"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/5192"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/5189"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/specialties"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/owners/5189"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/*/lastname/Testev6118"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/*/lastname/Testev4059"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/owners/5190"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/visits/5133"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/visits/5134"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/visits/5131"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/owners/5193"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/visits/5132"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/owners/5191"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/visits/5130"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/owners/5192"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pets"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/*/lastname/Testev3871"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pettypes/4787"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pettypes/4788"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/specialties/4452"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pettypes/4789"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets/5192"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets/5193"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pettypes/4785"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets/5190"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pettypes/4786"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets/5191"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/visits/5132"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/visits/5131"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/visits/5130"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes/4785"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/vets/1275"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pets/5189"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/vets/1277"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/vets/1276"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/*/lastname/Testev2970"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes/4789"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes/4788"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes/4787"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes/4786"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets/5189"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pets/5191"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/4789"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pets/5192"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/4787"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pets/5193"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/4788"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/4785"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/vets"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/vets/1279"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/4786"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/vets/1278"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pets/5190"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties/4456"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties/4454"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties/4455"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties/4452"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties/4453"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/visits/5134"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/visits/5133"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/vets/1275"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/vets/1276"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/vets/1279"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/vets/1277"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/vets/1278"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/vets/1275"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/vets/1276"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/vets/1277"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/*/lastname/Testev7291"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/vets/1278"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/vets/1279"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 155, 0, 0.0, 5.0580645161290345, 2, 33, 4.0, 9.400000000000006, 12.0, 27.95999999999998, 37.197024238060955, 171.71282547396208, 0.0], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET /api/specialties", 5, 0, 0.0, 6.8, 4, 10, 7.0, 10.0, 10.0, 10.0, 1.2503125781445361, 58.75492310577644, 0.0], "isController": false}, {"data": ["GET /api/vets", 5, 0, 0.0, 7.6, 6, 9, 8.0, 9.0, 9.0, 9.0, 1.252191334835963, 19.802721168294514, 0.0], "isController": false}, {"data": ["PUT /api/specialties/4452", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 91.796875, 0.0], "isController": false}, {"data": ["PUT /api/specialties/4455", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 91.796875, 0.0], "isController": false}, {"data": ["PUT /api/specialties/4456", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 91.796875, 0.0], "isController": false}, {"data": ["PUT /api/specialties/4453", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 55.078125, 0.0], "isController": false}, {"data": ["PUT /api/specialties/4454", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 68.84765625, 0.0], "isController": false}, {"data": ["POST /api/visits", 5, 0, 0.0, 3.2, 3, 4, 3.0, 4.0, 4.0, 4.0, 1.2543903662819869, 0.8746432827395885, 0.0], "isController": false}, {"data": ["GET /api/visits", 5, 0, 0.0, 5.4, 4, 7, 6.0, 7.0, 7.0, 7.0, 1.2543903662819869, 8.909356576141494, 0.0], "isController": false}, {"data": ["DELETE /api/pets/5189", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["PUT /api/owners/5189", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 68.84765625, 0.0], "isController": false}, {"data": ["DELETE /api/pets/5190", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 57.6171875, 0.0], "isController": false}, {"data": ["POST /api/pettypes", 5, 0, 0.0, 12.0, 8, 14, 13.0, 14.0, 14.0, 14.0, 1.2478163214374844, 0.4874282505615174, 0.0], "isController": false}, {"data": ["PUT /api/owners/5190", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 55.078125, 0.0], "isController": false}, {"data": ["DELETE /api/pets/5193", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["DELETE /api/pets/5192", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["DELETE /api/pets/5191", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 57.6171875, 0.0], "isController": false}, {"data": ["DELETE /api/specialties/4454", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 57.6171875, 0.0], "isController": false}, {"data": ["DELETE /api/specialties/4453", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["DELETE /api/specialties/4456", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["DELETE /api/specialties/4455", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["GET /api/visits/5133", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 328.125, 0.0], "isController": false}, {"data": ["GET /api/visits/5132", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 164.0625, 0.0], "isController": false}, {"data": ["GET /api/visits/5134", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 328.125, 0.0], "isController": false}, {"data": ["POST /api/owners", 5, 0, 0.0, 4.8, 4, 6, 5.0, 6.0, 6.0, 6.0, 1.2447099825740602, 0.6345103622106049, 0.0], "isController": false}, {"data": ["PUT /api/owners/5193", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 91.796875, 0.0], "isController": false}, {"data": ["GET /api/owners", 5, 0, 0.0, 15.0, 10, 24, 10.0, 24.0, 24.0, 24.0, 1.2431626056688214, 29.017649024117354, 0.0], "isController": false}, {"data": ["PUT /api/owners/5192", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 68.84765625, 0.0], "isController": false}, {"data": ["PUT /api/owners/5191", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 68.84765625, 0.0], "isController": false}, {"data": ["GET /api/owners/5191", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 155.92447916666666, 0.0], "isController": false}, {"data": ["GET /api/owners/5190", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 93.5546875, 0.0], "isController": false}, {"data": ["GET /api/visits/5131", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 164.0625, 0.0], "isController": false}, {"data": ["GET /api/owners/5193", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 233.88671875, 0.0], "isController": false}, {"data": ["GET /api/visits/5130", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 218.75, 0.0], "isController": false}, {"data": ["GET /api/owners/5192", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 116.943359375, 0.0], "isController": false}, {"data": ["GET /api/owners/5189", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 155.92447916666666, 0.0], "isController": false}, {"data": ["POST /api/specialties", 5, 0, 0.0, 3.4, 3, 4, 3.0, 4.0, 4.0, 4.0, 1.250625312656328, 0.5007386505752877, 0.0], "isController": false}, {"data": ["GET /api/pettypes", 5, 0, 0.0, 13.8, 6, 33, 11.0, 33.0, 33.0, 33.0, 1.2416190712689348, 30.864661581201887, 0.0], "isController": false}, {"data": ["DELETE /api/owners/5189", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["GET /api/owners/*/lastname/Testev6118", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 113.525390625, 0.0], "isController": false}, {"data": ["GET /api/owners/*/lastname/Testev4059", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 113.525390625, 0.0], "isController": false}, {"data": ["DELETE /api/owners/5190", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 57.6171875, 0.0], "isController": false}, {"data": ["DELETE /api/visits/5133", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 115.234375, 0.0], "isController": false}, {"data": ["DELETE /api/visits/5134", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["DELETE /api/visits/5131", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 46.09375, 0.0], "isController": false}, {"data": ["DELETE /api/owners/5193", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 115.234375, 0.0], "isController": false}, {"data": ["DELETE /api/visits/5132", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 57.6171875, 0.0], "isController": false}, {"data": ["DELETE /api/owners/5191", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 57.6171875, 0.0], "isController": false}, {"data": ["DELETE /api/visits/5130", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["DELETE /api/owners/5192", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["POST /api/pets", 5, 0, 0.0, 4.2, 2, 6, 4.0, 6.0, 6.0, 6.0, 1.2471938139186831, 0.7673165066101272, 0.0], "isController": false}, {"data": ["GET /api/owners/*/lastname/Testev3871", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 90.8203125, 0.0], "isController": false}, {"data": ["DELETE /api/pettypes/4787", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 46.09375, 0.0], "isController": false}, {"data": ["DELETE /api/pettypes/4788", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["DELETE /api/specialties/4452", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 57.6171875, 0.0], "isController": false}, {"data": ["DELETE /api/pettypes/4789", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["GET /api/pets/5192", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 192.3828125, 0.0], "isController": false}, {"data": ["GET /api/pets/5193", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 288.57421875, 0.0], "isController": false}, {"data": ["DELETE /api/pettypes/4785", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 57.6171875, 0.0], "isController": false}, {"data": ["GET /api/pets/5190", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 115.4296875, 0.0], "isController": false}, {"data": ["DELETE /api/pettypes/4786", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 57.6171875, 0.0], "isController": false}, {"data": ["GET /api/pets/5191", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 192.3828125, 0.0], "isController": false}, {"data": ["PUT /api/visits/5132", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 68.84765625, 0.0], "isController": false}, {"data": ["PUT /api/visits/5131", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 68.84765625, 0.0], "isController": false}, {"data": ["PUT /api/visits/5130", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 68.84765625, 0.0], "isController": false}, {"data": ["GET /api/pettypes/4785", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 114.90885416666666, 0.0], "isController": false}, {"data": ["PUT /api/vets/1275", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 91.796875, 0.0], "isController": false}, {"data": ["PUT /api/pets/5189", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 68.84765625, 0.0], "isController": false}, {"data": ["PUT /api/vets/1277", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 91.796875, 0.0], "isController": false}, {"data": ["GET /api/pets", 5, 0, 0.0, 9.0, 6, 12, 9.0, 12.0, 12.0, 12.0, 1.2468827930174564, 19.442360894638405, 0.0], "isController": false}, {"data": ["PUT /api/vets/1276", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 91.796875, 0.0], "isController": false}, {"data": ["GET /api/owners/*/lastname/Testev2970", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 151.3671875, 0.0], "isController": false}, {"data": ["GET /api/pettypes/4789", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 114.90885416666666, 0.0], "isController": false}, {"data": ["GET /api/pettypes/4788", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 57.45442708333333, 0.0], "isController": false}, {"data": ["GET /api/pettypes/4787", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 68.9453125, 0.0], "isController": false}, {"data": ["GET /api/pettypes/4786", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 57.45442708333333, 0.0], "isController": false}, {"data": ["GET /api/pets/5189", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 192.3828125, 0.0], "isController": false}, {"data": ["PUT /api/pets/5191", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 68.84765625, 0.0], "isController": false}, {"data": ["PUT /api/pettypes/4789", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 91.796875, 0.0], "isController": false}, {"data": ["PUT /api/pets/5192", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 68.84765625, 0.0], "isController": false}, {"data": ["PUT /api/pettypes/4787", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 55.078125, 0.0], "isController": false}, {"data": ["PUT /api/pets/5193", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 91.796875, 0.0], "isController": false}, {"data": ["PUT /api/pettypes/4788", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 45.8984375, 0.0], "isController": false}, {"data": ["PUT /api/pettypes/4785", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 55.078125, 0.0], "isController": false}, {"data": ["POST /api/vets", 5, 0, 0.0, 3.6, 2, 5, 3.0, 5.0, 5.0, 5.0, 1.2531328320802004, 0.5763921522556391, 0.0], "isController": false}, {"data": ["PUT /api/vets/1279", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 68.84765625, 0.0], "isController": false}, {"data": ["PUT /api/pettypes/4786", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 45.8984375, 0.0], "isController": false}, {"data": ["PUT /api/vets/1278", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 137.6953125, 0.0], "isController": false}, {"data": ["PUT /api/pets/5190", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 45.8984375, 0.0], "isController": false}, {"data": ["GET /api/specialties/4456", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 176.26953125, 0.0], "isController": false}, {"data": ["GET /api/specialties/4454", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 117.51302083333333, 0.0], "isController": false}, {"data": ["GET /api/specialties/4455", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 176.26953125, 0.0], "isController": false}, {"data": ["GET /api/specialties/4452", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 88.134765625, 0.0], "isController": false}, {"data": ["GET /api/specialties/4453", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 88.134765625, 0.0], "isController": false}, {"data": ["PUT /api/visits/5134", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 91.796875, 0.0], "isController": false}, {"data": ["PUT /api/visits/5133", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 91.796875, 0.0], "isController": false}, {"data": ["GET /api/vets/1275", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 147.4609375, 0.0], "isController": false}, {"data": ["GET /api/vets/1276", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 147.4609375, 0.0], "isController": false}, {"data": ["GET /api/vets/1279", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 221.19140625, 0.0], "isController": false}, {"data": ["GET /api/vets/1277", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 147.4609375, 0.0], "isController": false}, {"data": ["GET /api/vets/1278", 1, 0, 0.0, 2.0, 2, 2, 2.0, 2.0, 2.0, 2.0, 500.0, 221.19140625, 0.0], "isController": false}, {"data": ["DELETE /api/vets/1275", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["DELETE /api/vets/1276", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 46.09375, 0.0], "isController": false}, {"data": ["DELETE /api/vets/1277", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 57.6171875, 0.0], "isController": false}, {"data": ["GET /api/owners/*/lastname/Testev7291", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 113.525390625, 0.0], "isController": false}, {"data": ["DELETE /api/vets/1278", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}, {"data": ["DELETE /api/vets/1279", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 76.82291666666667, 0.0], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 155, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
