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

    var data = {"OkPercent": 97.46153846153847, "KoPercent": 2.5384615384615383};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9746153846153847, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "GET /api/pettypes/{petTypeId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties"], "isController": false}, {"data": [0.92, 500, 1500, "DELETE /api/pettypes/{petTypeId}"], "isController": false}, {"data": [0.94, 500, 1500, "PUT /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets"], "isController": false}, {"data": [0.86, 500, 1500, "DELETE /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/{ownerId}"], "isController": false}, {"data": [0.92, 500, 1500, "DELETE /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pets"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/{petTypeId}"], "isController": false}, {"data": [0.92, 500, 1500, "DELETE /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets/{petId}"], "isController": false}, {"data": [0.94, 500, 1500, "GET /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/specialties"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/{ownerId}"], "isController": false}, {"data": [0.96, 500, 1500, "POST /api/visits"], "isController": false}, {"data": [0.88, 500, 1500, "GET /api/visits"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/*/lastname/{lastName}"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1300, 33, 2.5384615384615383, 20.671538461538475, 5, 134, 17.0, 32.0, 40.0, 83.0, 209.23869306293255, 187.72288196121036, 63.152299110735555], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET /api/pettypes/{petTypeId}", 50, 0, 0.0, 15.659999999999998, 8, 34, 15.0, 22.0, 28.24999999999998, 34.0, 10.49317943336831, 3.607030430220357, 1.8752459338929697], "isController": false}, {"data": ["GET /api/specialties", 50, 0, 0.0, 18.54, 7, 75, 15.5, 30.599999999999994, 50.749999999999936, 75.0, 10.864841373315949, 32.490544192742284, 1.9310557909604518], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 50, 4, 8.0, 24.500000000000004, 9, 80, 23.0, 37.49999999999999, 48.19999999999993, 80.0, 11.345586566825505, 2.631644259133197, 2.9804324086680283], "isController": false}, {"data": ["PUT /api/visits/{visitId}", 50, 3, 6.0, 23.180000000000007, 11, 77, 20.0, 32.9, 57.899999999999906, 77.0, 11.081560283687944, 3.1182038868572697, 7.768779781693263], "isController": false}, {"data": ["GET /api/pets", 50, 0, 0.0, 27.9, 8, 124, 20.5, 55.39999999999999, 82.35, 124.0, 10.748065348237317, 50.875085648645744, 1.8368275741616509], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 50, 7, 14.0, 20.359999999999996, 6, 40, 19.0, 30.9, 33.89999999999999, 40.0, 11.470520761642579, 2.6733930517320488, 3.04685707731131], "isController": false}, {"data": ["PUT /api/owners/{ownerId}", 50, 0, 0.0, 19.12, 10, 50, 18.0, 29.799999999999997, 35.49999999999996, 50.0, 10.815487778498811, 2.978483939000649, 4.520535907419425], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 50, 4, 8.0, 27.299999999999994, 13, 124, 21.5, 40.29999999999999, 83.04999999999987, 124.0, 11.228385358185491, 2.604459072535369, 2.9057833202335503], "isController": false}, {"data": ["POST /api/owners", 50, 0, 0.0, 19.700000000000003, 11, 67, 16.0, 33.699999999999996, 38.449999999999996, 67.0, 10.604453870625663, 5.385074231177095, 4.21485617709438], "isController": false}, {"data": ["GET /api/owners", 50, 0, 0.0, 23.1, 9, 134, 18.5, 34.699999999999996, 62.14999999999997, 134.0, 10.588733587462938, 49.41650287219398, 1.8302791454891993], "isController": false}, {"data": ["POST /api/pets", 50, 0, 0.0, 23.220000000000006, 10, 64, 20.5, 34.9, 51.749999999999936, 64.0, 10.743446497636441, 6.567771003437903, 6.158596771594327], "isController": false}, {"data": ["DELETE /api/owners/{ownerId}", 50, 0, 0.0, 20.68, 8, 92, 18.0, 32.8, 49.299999999999855, 92.0, 11.284134506883321, 2.6006403746332656, 2.942249915368991], "isController": false}, {"data": ["PUT /api/pettypes/{petTypeId}", 50, 0, 0.0, 18.099999999999998, 9, 73, 14.0, 26.799999999999997, 52.94999999999987, 73.0, 10.495382031905962, 2.8903298173803527, 2.8288334382871536], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 50, 4, 8.0, 20.459999999999997, 9, 95, 16.5, 28.9, 60.699999999999804, 95.0, 11.165698972755694, 2.6758423124162576, 2.910060294774453], "isController": false}, {"data": ["GET /api/pets/{petId}", 50, 0, 0.0, 16.500000000000007, 9, 40, 15.0, 27.699999999999996, 33.49999999999996, 40.0, 10.817827780181739, 6.211799545651234, 1.8910070045434877], "isController": false}, {"data": ["GET /api/visits/{visitId}", 50, 3, 6.0, 17.740000000000002, 9, 43, 16.0, 27.0, 32.34999999999999, 43.0, 11.093854004881296, 7.678593715331707, 1.9596253050809853], "isController": false}, {"data": ["POST /api/specialties", 50, 0, 0.0, 21.64, 10, 103, 16.0, 34.39999999999999, 89.99999999999991, 103.0, 10.822510822510822, 4.333231872294372, 2.91700487012987], "isController": false}, {"data": ["GET /api/owners/{ownerId}", 50, 0, 0.0, 17.6, 8, 40, 14.5, 28.9, 34.79999999999998, 40.0, 10.78050884001725, 5.032307837429927, 1.9055391601983613], "isController": false}, {"data": ["POST /api/visits", 50, 2, 4.0, 21.340000000000007, 8, 84, 17.5, 35.699999999999996, 44.19999999999993, 84.0, 10.92896174863388, 7.511099726775956, 7.545679644808743], "isController": false}, {"data": ["GET /api/visits", 50, 6, 12.0, 19.02, 8, 41, 17.5, 33.0, 36.79999999999998, 41.0, 10.998680158380994, 22.06438352397712, 1.9011390508139023], "isController": false}, {"data": ["PUT /api/pets/{petId}", 50, 0, 0.0, 25.160000000000004, 11, 68, 24.0, 38.8, 50.699999999999974, 68.0, 10.76194575979337, 2.9637389690055964, 7.8402456414119674], "isController": false}, {"data": ["GET /api/pettypes", 50, 0, 0.0, 12.819999999999999, 5, 29, 13.0, 20.9, 24.449999999999996, 29.0, 8.9349535382416, 8.046344487133666, 1.5618717610793424], "isController": false}, {"data": ["POST /api/pettypes", 50, 0, 0.0, 27.359999999999996, 9, 83, 23.0, 61.89999999999997, 83.0, 83.0, 8.81057268722467, 3.441629955947137, 2.2800798458149782], "isController": false}, {"data": ["PUT /api/specialties/{specialtyId}", 50, 0, 0.0, 21.500000000000004, 7, 77, 16.0, 41.29999999999999, 65.35, 77.0, 10.796804145972791, 2.973338641762038, 3.026057412006046], "isController": false}, {"data": ["GET /api/specialties/{specialtyId}", 50, 0, 0.0, 16.119999999999997, 6, 40, 14.0, 27.9, 36.24999999999998, 40.0, 10.843634786380395, 3.812215354586858, 1.9696445998698764], "isController": false}, {"data": ["GET /api/owners/*/lastname/{lastName}", 50, 0, 0.0, 18.84, 8, 88, 14.0, 29.0, 57.049999999999876, 88.0, 10.757314974182444, 4.87440834767642, 2.090532890490534], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Value expected to be 'Profilactic winter checks 3645', but found 'Profilactic winter checks 3561'", 1, 3.0303030303030303, 0.07692307692307693], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2364', but found 'Profilactic winter checks 1868'", 1, 3.0303030303030303, 0.07692307692307693], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6464', but found 'Profilactic winter checks 9378'", 1, 3.0303030303030303, 0.07692307692307693], "isController": false}, {"data": ["400", 6, 18.181818181818183, 0.46153846153846156], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1768', but found 'Profilactic winter checks 2908'", 1, 3.0303030303030303, 0.07692307692307693], "isController": false}, {"data": ["com.github.fge.jsonschema.core.report.ListProcessingReport: failure\\n--- BEGIN MESSAGES ---\\nerror: instance type (array) does not match any allowed primitive type (allowed: [&quot;object&quot;])\\n    level: &quot;error&quot;\\n    schema: {&quot;loadingURI&quot;:&quot;#&quot;,&quot;pointer&quot;:&quot;&quot;}\\n    instance: {&quot;pointer&quot;:&quot;&quot;}\\n    domain: &quot;validation&quot;\\n    keyword: &quot;type&quot;\\n    found: &quot;array&quot;\\n    expected: [&quot;object&quot;]\\n---  END MESSAGES  ---\\n", 2, 6.0606060606060606, 0.15384615384615385], "isController": false}, {"data": ["404", 19, 57.57575757575758, 1.4615384615384615], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9699', but found 'Profilactic winter checks 4128'", 1, 3.0303030303030303, 0.07692307692307693], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9605', but found 'Profilactic winter checks 2462'", 1, 3.0303030303030303, 0.07692307692307693], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1300, 33, "404", 19, "400", 6, "com.github.fge.jsonschema.core.report.ListProcessingReport: failure\\n--- BEGIN MESSAGES ---\\nerror: instance type (array) does not match any allowed primitive type (allowed: [&quot;object&quot;])\\n    level: &quot;error&quot;\\n    schema: {&quot;loadingURI&quot;:&quot;#&quot;,&quot;pointer&quot;:&quot;&quot;}\\n    instance: {&quot;pointer&quot;:&quot;&quot;}\\n    domain: &quot;validation&quot;\\n    keyword: &quot;type&quot;\\n    found: &quot;array&quot;\\n    expected: [&quot;object&quot;]\\n---  END MESSAGES  ---\\n", 2, "Value expected to be 'Profilactic winter checks 3645', but found 'Profilactic winter checks 3561'", 1, "Value expected to be 'Profilactic winter checks 2364', but found 'Profilactic winter checks 1868'", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 50, 4, "404", 4, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["PUT /api/visits/{visitId}", 50, 3, "400", 2, "404", 1, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 50, 7, "404", 7, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 50, 4, "404", 4, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 50, 4, "400", 2, "404", 2, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/visits/{visitId}", 50, 3, "com.github.fge.jsonschema.core.report.ListProcessingReport: failure\\n--- BEGIN MESSAGES ---\\nerror: instance type (array) does not match any allowed primitive type (allowed: [&quot;object&quot;])\\n    level: &quot;error&quot;\\n    schema: {&quot;loadingURI&quot;:&quot;#&quot;,&quot;pointer&quot;:&quot;&quot;}\\n    instance: {&quot;pointer&quot;:&quot;&quot;}\\n    domain: &quot;validation&quot;\\n    keyword: &quot;type&quot;\\n    found: &quot;array&quot;\\n    expected: [&quot;object&quot;]\\n---  END MESSAGES  ---\\n", 2, "404", 1, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["POST /api/visits", 50, 2, "400", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["GET /api/visits", 50, 6, "Value expected to be 'Profilactic winter checks 3645', but found 'Profilactic winter checks 3561'", 1, "Value expected to be 'Profilactic winter checks 2364', but found 'Profilactic winter checks 1868'", 1, "Value expected to be 'Profilactic winter checks 6464', but found 'Profilactic winter checks 9378'", 1, "Value expected to be 'Profilactic winter checks 1768', but found 'Profilactic winter checks 2908'", 1, "Value expected to be 'Profilactic winter checks 9699', but found 'Profilactic winter checks 4128'", 1], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
