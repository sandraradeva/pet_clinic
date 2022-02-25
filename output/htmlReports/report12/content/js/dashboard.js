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

    var data = {"OkPercent": 98.80952380952381, "KoPercent": 1.1904761904761905};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9880952380952381, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "GET /api/pettypes/{petTypeId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pettypes/{petTypeId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pets"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/{petTypeId}"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/specialties"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/visits"], "isController": false}, {"data": [0.5714285714285714, 500, 1500, "GET /api/visits"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/*/lastname/{lastName}"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 252, 3, 1.1904761904761905, 16.984126984126963, 4, 87, 13.0, 33.400000000000034, 43.04999999999998, 82.75999999999999, 126.8882175226586, 679.613249779708, 37.521439136455186], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET /api/pettypes/{petTypeId}", 15, 0, 0.0, 9.066666666666666, 6, 11, 10.0, 11.0, 11.0, 11.0, 22.52252252252252, 7.764111768018018, 4.0470157657657655], "isController": false}, {"data": ["GET /api/specialties", 11, 0, 0.0, 20.363636363636363, 10, 28, 21.0, 27.6, 28.0, 28.0, 24.943310657596374, 942.0617205215419, 4.43328373015873], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 46.09375, 52.734375], "isController": false}, {"data": ["PUT /api/visits/{visitId}", 3, 0, 0.0, 12.0, 4, 21, 11.0, 21.0, 21.0, 21.0, 9.404388714733543, 2.589880485893417, 6.6308287617554855], "isController": false}, {"data": ["GET /api/pets", 14, 0, 0.0, 32.35714285714286, 12, 78, 29.5, 61.5, 78.0, 78.0, 26.515151515151516, 334.51519590435606, 4.531397964015151], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 46.09375, 53.3203125], "isController": false}, {"data": ["PUT /api/owners/{ownerId}", 14, 0, 0.0, 14.0, 6, 39, 12.0, 30.5, 39.0, 39.0, 25.134649910233396, 6.921846947935367, 10.554589317773788], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 46.09375, 51.953125], "isController": false}, {"data": ["POST /api/owners", 14, 0, 0.0, 15.642857142857144, 6, 21, 17.0, 20.5, 21.0, 21.0, 22.292993630573246, 11.364201831210192, 8.860594148089172], "isController": false}, {"data": ["GET /api/owners", 14, 0, 0.0, 43.142857142857146, 18, 73, 42.0, 71.0, 73.0, 73.0, 22.292993630573246, 440.24308320063693, 3.853378781847134], "isController": false}, {"data": ["POST /api/pets", 14, 0, 0.0, 12.928571428571429, 5, 23, 12.5, 21.0, 23.0, 23.0, 26.31578947368421, 16.190378289473685, 15.13671875], "isController": false}, {"data": ["DELETE /api/owners/{ownerId}", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 46.09375, 52.34375], "isController": false}, {"data": ["PUT /api/pettypes/{petTypeId}", 15, 0, 0.0, 15.666666666666664, 6, 22, 18.0, 20.8, 22.0, 22.0, 22.22222222222222, 6.119791666666666, 6.011284722222221], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 2, 0, 0.0, 41.0, 14, 68, 41.0, 68.0, 68.0, 68.0, 5.952380952380952, 1.3718377976190474, 1.5578497023809523], "isController": false}, {"data": ["GET /api/pets/{petId}", 13, 0, 0.0, 13.076923076923077, 5, 19, 14.0, 18.6, 19.0, 19.0, 27.54237288135593, 15.89603747351695, 4.841432733050848], "isController": false}, {"data": ["GET /api/visits/{visitId}", 2, 0, 0.0, 7.5, 4, 11, 7.5, 11.0, 11.0, 11.0, 6.430868167202572, 4.220257234726688, 1.1429863344051447], "isController": false}, {"data": ["POST /api/specialties", 11, 0, 0.0, 16.90909090909091, 6, 42, 15.0, 38.20000000000002, 42.0, 42.0, 24.444444444444446, 9.78732638888889, 6.588541666666666], "isController": false}, {"data": ["GET /api/owners/{ownerId}", 14, 0, 0.0, 10.285714285714285, 5, 15, 10.0, 15.0, 15.0, 15.0, 25.64102564102564, 11.994190705128204, 4.557291666666666], "isController": false}, {"data": ["POST /api/visits", 7, 0, 0.0, 12.285714285714286, 6, 20, 10.0, 20.0, 20.0, 20.0, 18.276762402088774, 12.743758159268928, 12.67236455613577], "isController": false}, {"data": ["GET /api/visits", 7, 3, 42.857142857142854, 18.428571428571427, 8, 30, 17.0, 30.0, 30.0, 30.0, 18.71657754010695, 123.91638118315508, 3.235189672459893], "isController": false}, {"data": ["PUT /api/pets/{petId}", 13, 0, 0.0, 12.615384615384615, 6, 19, 13.0, 17.799999999999997, 19.0, 19.0, 26.859504132231407, 7.396855630165289, 19.64625839359504], "isController": false}, {"data": ["GET /api/pettypes", 15, 0, 0.0, 10.733333333333333, 7, 20, 10.0, 18.200000000000003, 20.0, 20.0, 9.422110552763819, 224.06036530307787, 1.6470290907663316], "isController": false}, {"data": ["POST /api/pettypes", 15, 0, 0.0, 26.799999999999997, 8, 87, 9.0, 87.0, 87.0, 87.0, 8.960573476702509, 3.5002240143369177, 2.318898409498208], "isController": false}, {"data": ["PUT /api/specialties/{specialtyId}", 11, 0, 0.0, 12.999999999999998, 4, 31, 12.0, 27.80000000000001, 31.0, 31.0, 26.96078431372549, 7.424747242647059, 7.582720588235294], "isController": false}, {"data": ["GET /api/specialties/{specialtyId}", 10, 0, 0.0, 14.3, 4, 42, 11.5, 39.60000000000001, 42.0, 42.0, 25.252525252525253, 8.902501578282829, 4.611545138888888], "isController": false}, {"data": ["GET /api/owners/*/lastname/{lastName}", 14, 0, 0.0, 10.785714285714285, 5, 15, 11.0, 14.5, 15.0, 15.0, 24.390243902439025, 11.075647865853659, 4.739900914634147], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Value expected to be 'Profilactic winter checks 5789', but found 'Profilactic winter checks 3524'", 1, 33.333333333333336, 0.3968253968253968], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7866', but found 'Profilactic winter checks 4743'", 1, 33.333333333333336, 0.3968253968253968], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5213', but found 'Profilactic winter checks 9147'", 1, 33.333333333333336, 0.3968253968253968], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 252, 3, "Value expected to be 'Profilactic winter checks 5789', but found 'Profilactic winter checks 3524'", 1, "Value expected to be 'Profilactic winter checks 7866', but found 'Profilactic winter checks 4743'", 1, "Value expected to be 'Profilactic winter checks 5213', but found 'Profilactic winter checks 9147'", 1, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/visits", 7, 3, "Value expected to be 'Profilactic winter checks 5789', but found 'Profilactic winter checks 3524'", 1, "Value expected to be 'Profilactic winter checks 7866', but found 'Profilactic winter checks 4743'", 1, "Value expected to be 'Profilactic winter checks 5213', but found 'Profilactic winter checks 9147'", 1, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
