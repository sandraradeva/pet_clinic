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

    var data = {"OkPercent": 94.23076923076923, "KoPercent": 5.769230769230769};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9423076923076923, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "GET /api/pettypes/{petTypeId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties"], "isController": false}, {"data": [0.8, 500, 1500, "DELETE /api/pettypes/{petTypeId}"], "isController": false}, {"data": [0.9, 500, 1500, "PUT /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets"], "isController": false}, {"data": [0.6, 500, 1500, "DELETE /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/{ownerId}"], "isController": false}, {"data": [0.8, 500, 1500, "DELETE /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pets"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/{petTypeId}"], "isController": false}, {"data": [0.9, 500, 1500, "DELETE /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets/{petId}"], "isController": false}, {"data": [0.9, 500, 1500, "GET /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/specialties"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/visits"], "isController": false}, {"data": [0.6, 500, 1500, "GET /api/visits"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/*/lastname/{lastName}"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 260, 15, 5.769230769230769, 23.369230769230768, 6, 185, 19.0, 38.900000000000006, 47.94999999999999, 93.0, 115.04424778761062, 104.93336905420355, 34.61179480088496], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET /api/pettypes/{petTypeId}", 10, 0, 0.0, 10.599999999999998, 8, 16, 10.0, 15.500000000000002, 16.0, 16.0, 555.5555555555555, 190.42968750000003, 98.74131944444446], "isController": false}, {"data": ["GET /api/specialties", 10, 0, 0.0, 22.799999999999997, 12, 34, 22.5, 33.8, 34.0, 34.0, 38.61003861003861, 101.50594232625483, 6.862331081081081], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 10, 2, 20.0, 28.999999999999996, 11, 64, 23.0, 62.60000000000001, 64.0, 64.0, 35.3356890459364, 8.27490061837456, 9.248012367491167], "isController": false}, {"data": ["PUT /api/visits/{visitId}", 10, 1, 10.0, 28.5, 16, 38, 28.0, 37.7, 38.0, 38.0, 32.89473684210526, 8.97216796875, 22.936369243421055], "isController": false}, {"data": ["GET /api/pets", 10, 0, 0.0, 25.0, 12, 52, 21.0, 51.0, 52.0, 52.0, 56.17977528089887, 279.1432584269663, 9.601035814606742], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 10, 4, 40.0, 18.7, 9, 35, 17.5, 34.7, 35.0, 35.0, 44.24778761061947, 10.526133849557521, 11.7101078539823], "isController": false}, {"data": ["PUT /api/owners/{ownerId}", 10, 0, 0.0, 21.0, 13, 33, 22.0, 32.6, 33.0, 33.0, 91.74311926605505, 25.26519495412844, 38.16657110091743], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 10, 2, 20.0, 29.9, 9, 43, 34.0, 42.6, 43.0, 43.0, 32.786885245901644, 7.678022540983607, 8.452868852459016], "isController": false}, {"data": ["POST /api/owners", 10, 0, 0.0, 16.2, 13, 18, 17.0, 18.0, 18.0, 18.0, 555.5555555555555, 281.03298611111114, 220.81163194444446], "isController": false}, {"data": ["GET /api/owners", 10, 0, 0.0, 20.8, 18, 27, 21.0, 26.5, 27.0, 27.0, 285.7142857142857, 1288.5044642857142, 49.38616071428571], "isController": false}, {"data": ["POST /api/pets", 10, 0, 0.0, 22.5, 14, 38, 19.0, 37.5, 38.0, 38.0, 57.47126436781609, 34.90930316091954, 32.83270474137931], "isController": false}, {"data": ["DELETE /api/owners/{ownerId}", 10, 0, 0.0, 18.8, 12, 31, 15.5, 30.8, 31.0, 31.0, 35.08771929824561, 8.086622807017545, 9.114583333333334], "isController": false}, {"data": ["PUT /api/pettypes/{petTypeId}", 10, 0, 0.0, 16.8, 15, 19, 17.0, 18.9, 19.0, 19.0, 526.3157894736842, 144.94243421052633, 141.34457236842107], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 10, 1, 10.0, 24.8, 15, 39, 22.5, 38.5, 39.0, 39.0, 32.25806451612903, 7.494329637096774, 8.37953629032258], "isController": false}, {"data": ["GET /api/pets/{petId}", 10, 0, 0.0, 23.6, 12, 47, 20.0, 46.9, 47.0, 47.0, 43.859649122807014, 25.056537828947366, 7.624040570175438], "isController": false}, {"data": ["GET /api/visits/{visitId}", 10, 1, 10.0, 22.299999999999997, 14, 49, 17.5, 46.80000000000001, 49.0, 49.0, 32.57328990228013, 19.82071966612378, 5.7257736156351795], "isController": false}, {"data": ["POST /api/specialties", 10, 0, 0.0, 24.8, 17, 40, 21.0, 39.6, 40.0, 40.0, 40.65040650406504, 16.276041666666668, 10.956554878048781], "isController": false}, {"data": ["GET /api/owners/{ownerId}", 10, 0, 0.0, 19.0, 9, 61, 14.0, 57.70000000000001, 61.0, 61.0, 85.47008547008546, 39.81370192307692, 15.02403846153846], "isController": false}, {"data": ["POST /api/visits", 10, 0, 0.0, 30.599999999999998, 17, 52, 24.0, 51.8, 52.0, 52.0, 34.129692832764505, 23.4641638225256, 23.4641638225256], "isController": false}, {"data": ["GET /api/visits", 10, 4, 40.0, 42.599999999999994, 17, 185, 27.0, 170.80000000000007, 185.0, 185.0, 34.84320557491289, 103.30806293554008, 6.022702526132405], "isController": false}, {"data": ["PUT /api/pets/{petId}", 10, 0, 0.0, 36.0, 23, 53, 31.5, 52.9, 53.0, 53.0, 47.84688995215311, 13.176584928229666, 34.71703050239235], "isController": false}, {"data": ["GET /api/pettypes", 10, 0, 0.0, 7.9, 6, 9, 8.5, 9.0, 9.0, 9.0, 12.804097311139564, 9.170434539052497, 2.2382162291933416], "isController": false}, {"data": ["POST /api/pettypes", 10, 0, 0.0, 32.199999999999996, 10, 93, 12.5, 93.0, 93.0, 93.0, 11.494252873563218, 4.489942528735632, 2.9745869252873565], "isController": false}, {"data": ["PUT /api/specialties/{specialtyId}", 10, 0, 0.0, 26.599999999999998, 12, 39, 28.5, 38.400000000000006, 39.0, 39.0, 38.46153846153847, 10.591947115384615, 10.7421875], "isController": false}, {"data": ["GET /api/specialties/{specialtyId}", 10, 0, 0.0, 22.5, 12, 40, 17.0, 39.7, 40.0, 40.0, 39.21568627450981, 13.748468137254902, 7.0848651960784315], "isController": false}, {"data": ["GET /api/owners/*/lastname/{lastName}", 10, 0, 0.0, 14.1, 10, 23, 13.0, 22.6, 23.0, 23.0, 133.33333333333334, 60.286458333333336, 25.911458333333336], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Value expected to be 'Profilactic winter checks 5190', but found 'Profilactic winter checks 5031'", 1, 6.666666666666667, 0.38461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6918', but found 'Profilactic winter checks 3893'", 1, 6.666666666666667, 0.38461538461538464], "isController": false}, {"data": ["404", 11, 73.33333333333333, 4.230769230769231], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2564', but found 'Profilactic winter checks 3499'", 1, 6.666666666666667, 0.38461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6104', but found 'Profilactic winter checks 1091'", 1, 6.666666666666667, 0.38461538461538464], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 260, 15, "404", 11, "Value expected to be 'Profilactic winter checks 5190', but found 'Profilactic winter checks 5031'", 1, "Value expected to be 'Profilactic winter checks 6918', but found 'Profilactic winter checks 3893'", 1, "Value expected to be 'Profilactic winter checks 2564', but found 'Profilactic winter checks 3499'", 1, "Value expected to be 'Profilactic winter checks 6104', but found 'Profilactic winter checks 1091'", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 10, 2, "404", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["PUT /api/visits/{visitId}", 10, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 10, 4, "404", 4, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 10, 2, "404", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 10, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/visits/{visitId}", 10, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/visits", 10, 4, "Value expected to be 'Profilactic winter checks 5190', but found 'Profilactic winter checks 5031'", 1, "Value expected to be 'Profilactic winter checks 6918', but found 'Profilactic winter checks 3893'", 1, "Value expected to be 'Profilactic winter checks 2564', but found 'Profilactic winter checks 3499'", 1, "Value expected to be 'Profilactic winter checks 6104', but found 'Profilactic winter checks 1091'", 1, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
