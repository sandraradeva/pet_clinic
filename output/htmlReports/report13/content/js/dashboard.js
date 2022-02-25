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

    var data = {"OkPercent": 88.0, "KoPercent": 12.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.88, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "GET /api/pettypes/{petTypeId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pettypes/{petTypeId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets"], "isController": false}, {"data": [0.0, 500, 1500, "DELETE /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/vets"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/vets"], "isController": false}, {"data": [0.0, 500, 1500, "PUT /api/vets/{vetId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pets"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/{petTypeId}"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/specialties"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/visits"], "isController": false}, {"data": [0.4, 500, 1500, "GET /api/visits"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pets/{petId}"], "isController": false}, {"data": [0.0, 500, 1500, "GET /api/vets/{vetId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/*/lastname/{lastName}"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 150, 18, 12.0, 8.66666666666666, 0, 69, 8.0, 14.0, 15.0, 44.52000000000044, 107.91366906474819, 457.57573628597123, 30.199668390287773], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET /api/pettypes/{petTypeId}", 5, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 833.3333333333334, 287.2721354166667, 149.73958333333334], "isController": false}, {"data": ["GET /api/specialties", 5, 0, 0.0, 12.8, 9, 14, 14.0, 14.0, 14.0, 14.0, 40.32258064516129, 1542.4253402217741, 7.166708669354839], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 5, 0, 0.0, 9.0, 8, 10, 9.0, 10.0, 10.0, 10.0, 185.18518518518516, 42.679398148148145, 48.828125], "isController": false}, {"data": ["PUT /api/visits/{visitId}", 5, 0, 0.0, 8.2, 8, 9, 8.0, 9.0, 9.0, 9.0, 161.29032258064515, 44.41784274193549, 113.72227822580645], "isController": false}, {"data": ["GET /api/pets", 5, 0, 0.0, 13.2, 12, 14, 13.0, 14.0, 14.0, 14.0, 357.14285714285717, 5566.057477678572, 61.03515625], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 5, 5, 100.0, 10.8, 6, 13, 11.0, 13.0, 13.0, 13.0, 200.0, 116.015625, 53.3203125], "isController": false}, {"data": ["PUT /api/owners/{ownerId}", 5, 0, 0.0, 7.8, 7, 8, 8.0, 8.0, 8.0, 8.0, 555.5555555555555, 152.99479166666669, 233.28993055555557], "isController": false}, {"data": ["GET /api/vets", 5, 0, 0.0, 11.2, 9, 13, 11.0, 13.0, 13.0, 13.0, 43.10344827586207, 321.08701508620686, 7.366311961206896], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 5, 0, 0.0, 9.6, 8, 11, 9.0, 11.0, 11.0, 11.0, 161.29032258064515, 37.172379032258064, 41.897681451612904], "isController": false}, {"data": ["POST /api/vets", 5, 0, 0.0, 8.2, 7, 10, 8.0, 10.0, 10.0, 10.0, 43.10344827586207, 19.825902478448274, 15.153556034482758], "isController": false}, {"data": ["PUT /api/vets/{vetId}", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 90.9090909090909, 106.5340909090909, 0.0], "isController": false}, {"data": ["POST /api/owners", 5, 0, 0.0, 8.4, 7, 10, 8.0, 10.0, 10.0, 10.0, 416.6666666666667, 212.40234375, 165.60872395833334], "isController": false}, {"data": ["GET /api/owners", 5, 0, 0.0, 19.4, 16, 21, 20.0, 21.0, 21.0, 21.0, 227.27272727272725, 5121.626420454546, 39.28444602272727], "isController": false}, {"data": ["POST /api/pets", 5, 0, 0.0, 8.6, 8, 9, 9.0, 9.0, 9.0, 9.0, 416.6666666666667, 256.34765625, 239.66471354166666], "isController": false}, {"data": ["DELETE /api/owners/{ownerId}", 5, 0, 0.0, 8.0, 7, 9, 8.0, 9.0, 9.0, 9.0, 185.18518518518516, 42.679398148148145, 48.46643518518518], "isController": false}, {"data": ["PUT /api/pettypes/{petTypeId}", 5, 0, 0.0, 6.2, 6, 7, 6.0, 7.0, 7.0, 7.0, 714.2857142857143, 196.70758928571428, 193.21986607142856], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 5, 0, 0.0, 9.0, 8, 10, 9.0, 10.0, 10.0, 10.0, 161.29032258064515, 37.172379032258064, 42.212701612903224], "isController": false}, {"data": ["GET /api/pets/{petId}", 5, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 833.3333333333334, 480.95703125, 146.484375], "isController": false}, {"data": ["GET /api/visits/{visitId}", 5, 0, 0.0, 6.8, 6, 7, 7.0, 7.0, 7.0, 7.0, 172.41379310344828, 113.14655172413792, 30.643857758620687], "isController": false}, {"data": ["POST /api/specialties", 5, 0, 0.0, 6.8, 6, 7, 7.0, 7.0, 7.0, 7.0, 41.32231404958678, 16.54506714876033, 11.137654958677686], "isController": false}, {"data": ["GET /api/owners/{ownerId}", 5, 0, 0.0, 6.4, 6, 7, 6.0, 7.0, 7.0, 7.0, 714.2857142857143, 334.12388392857144, 126.953125], "isController": false}, {"data": ["POST /api/visits", 5, 0, 0.0, 7.6, 7, 8, 8.0, 8.0, 8.0, 8.0, 161.29032258064515, 112.46219758064517, 111.83215725806451], "isController": false}, {"data": ["GET /api/visits", 5, 3, 60.0, 14.6, 14, 15, 15.0, 15.0, 15.0, 15.0, 135.13513513513513, 1104.8089104729731, 23.358319256756758], "isController": false}, {"data": ["PUT /api/pets/{petId}", 5, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 625.0, 172.119140625, 457.1533203125], "isController": false}, {"data": ["GET /api/vets/{vetId}", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 94.33962264150944, 110.55424528301887, 0.0], "isController": false}, {"data": ["GET /api/pettypes", 5, 0, 0.0, 7.4, 6, 9, 7.0, 9.0, 9.0, 9.0, 7.633587786259541, 183.66829675572518, 1.334386927480916], "isController": false}, {"data": ["POST /api/pettypes", 5, 0, 0.0, 20.6, 8, 69, 8.0, 69.0, 69.0, 69.0, 6.925207756232687, 2.7051592797783934, 1.7921680228531855], "isController": false}, {"data": ["PUT /api/specialties/{specialtyId}", 5, 0, 0.0, 6.4, 5, 7, 7.0, 7.0, 7.0, 7.0, 42.73504273504273, 11.768830128205128, 12.019230769230768], "isController": false}, {"data": ["GET /api/specialties/{specialtyId}", 5, 0, 0.0, 6.0, 4, 7, 6.0, 7.0, 7.0, 7.0, 42.3728813559322, 14.93809586864407, 7.738016419491526], "isController": false}, {"data": ["GET /api/owners/*/lastname/{lastName}", 5, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 714.2857142857143, 324.35825892857144, 138.81138392857142], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400", 5, 27.77777777777778, 3.3333333333333335], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4834', but found 'Profilactic winter checks 5833'", 1, 5.555555555555555, 0.6666666666666666], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5283', but found 'Profilactic winter checks 5833'", 1, 5.555555555555555, 0.6666666666666666], "isController": false}, {"data": ["Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in path at index 42: http://localhost:9966/petclinic/api/vets/${vetId}", 10, 55.55555555555556, 6.666666666666667], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7446', but found 'Profilactic winter checks 5833'", 1, 5.555555555555555, 0.6666666666666666], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 150, 18, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in path at index 42: http://localhost:9966/petclinic/api/vets/${vetId}", 10, "400", 5, "Value expected to be 'Profilactic winter checks 4834', but found 'Profilactic winter checks 5833'", 1, "Value expected to be 'Profilactic winter checks 5283', but found 'Profilactic winter checks 5833'", 1, "Value expected to be 'Profilactic winter checks 7446', but found 'Profilactic winter checks 5833'", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 5, 5, "400", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["PUT /api/vets/{vetId}", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in path at index 42: http://localhost:9966/petclinic/api/vets/${vetId}", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/visits", 5, 3, "Value expected to be 'Profilactic winter checks 4834', but found 'Profilactic winter checks 5833'", 1, "Value expected to be 'Profilactic winter checks 5283', but found 'Profilactic winter checks 5833'", 1, "Value expected to be 'Profilactic winter checks 7446', but found 'Profilactic winter checks 5833'", 1, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/vets/{vetId}", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in path at index 42: http://localhost:9966/petclinic/api/vets/${vetId}", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
