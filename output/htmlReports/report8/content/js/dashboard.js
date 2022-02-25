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

    var data = {"OkPercent": 97.38461538461539, "KoPercent": 2.6153846153846154};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9738461538461538, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "GET /api/pettypes/{petTypeId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties"], "isController": false}, {"data": [0.9, 500, 1500, "DELETE /api/pettypes/{petTypeId}"], "isController": false}, {"data": [0.98, 500, 1500, "PUT /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets"], "isController": false}, {"data": [0.79, 500, 1500, "DELETE /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/{ownerId}"], "isController": false}, {"data": [0.94, 500, 1500, "DELETE /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pets"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/{petTypeId}"], "isController": false}, {"data": [0.96, 500, 1500, "DELETE /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets/{petId}"], "isController": false}, {"data": [0.97, 500, 1500, "GET /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/specialties"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/{ownerId}"], "isController": false}, {"data": [0.99, 500, 1500, "POST /api/visits"], "isController": false}, {"data": [0.79, 500, 1500, "GET /api/visits"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/*/lastname/{lastName}"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2600, 68, 2.6153846153846154, 21.74192307692306, 4, 222, 17.0, 40.0, 51.0, 92.95999999999913, 300.57803468208095, 291.4956647398844, 90.72333363439306], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET /api/pettypes/{petTypeId}", 100, 0, 0.0, 16.33, 4, 54, 14.5, 30.900000000000006, 41.59999999999991, 53.969999999999985, 13.379716350013378, 4.599277495317099, 2.391101652394969], "isController": false}, {"data": ["GET /api/specialties", 100, 0, 0.0, 16.16999999999999, 4, 54, 14.0, 29.900000000000006, 35.89999999999998, 53.889999999999944, 13.97233477714126, 53.214401110800615, 2.4833641889059663], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 100, 10, 10.0, 24.510000000000005, 7, 113, 19.5, 44.70000000000002, 58.89999999999998, 112.66999999999983, 14.566642388929353, 3.384183812818645, 3.8265886744355426], "isController": false}, {"data": ["PUT /api/visits/{visitId}", 100, 2, 2.0, 24.21, 6, 208, 20.0, 43.0, 50.0, 206.47999999999922, 14.29388221841052, 3.9559435748999427, 10.022049430031446], "isController": false}, {"data": ["GET /api/pets", 100, 0, 0.0, 25.630000000000013, 7, 106, 20.0, 45.900000000000006, 53.94999999999999, 105.67999999999984, 13.704262025489928, 69.18122922947786, 2.342036967246814], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 100, 21, 21.0, 22.710000000000004, 6, 81, 19.0, 42.80000000000001, 51.849999999999966, 80.85999999999993, 14.58363715910748, 3.589654048782266, 3.8737786203879248], "isController": false}, {"data": ["PUT /api/owners/{ownerId}", 100, 0, 0.0, 22.090000000000003, 5, 202, 16.0, 38.0, 47.94999999999999, 200.53999999999925, 13.65747063643813, 3.7611393744878447, 5.70839593007375], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 100, 6, 6.0, 24.19, 7, 94, 20.0, 43.80000000000001, 55.94999999999999, 93.72999999999986, 14.490653528474134, 3.3961054104477615, 3.7500226416461384], "isController": false}, {"data": ["POST /api/owners", 100, 0, 0.0, 18.97, 5, 72, 15.5, 36.0, 40.94999999999999, 71.93999999999997, 13.449899125756557, 6.830026899798252, 5.345809515803632], "isController": false}, {"data": ["GET /api/owners", 100, 0, 0.0, 27.229999999999993, 6, 205, 21.5, 42.80000000000001, 69.29999999999984, 204.69999999999985, 13.464386697185942, 67.01096400801131, 2.327340278712805], "isController": false}, {"data": ["POST /api/pets", 100, 0, 0.0, 25.160000000000007, 6, 199, 20.0, 44.900000000000006, 53.849999999999966, 198.30999999999966, 13.66867140513942, 8.356043261344997, 7.83545909650082], "isController": false}, {"data": ["DELETE /api/owners/{ownerId}", 100, 0, 0.0, 19.92000000000001, 4, 100, 15.0, 38.80000000000001, 53.0, 99.69999999999985, 14.532771399505886, 3.349349658479872, 3.789306605144601], "isController": false}, {"data": ["PUT /api/pettypes/{petTypeId}", 100, 0, 0.0, 17.620000000000008, 4, 79, 15.0, 29.900000000000006, 39.799999999999955, 78.78999999999989, 13.370771493515177, 3.682185118331328, 3.6038407541115123], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 100, 4, 4.0, 21.459999999999994, 5, 99, 17.0, 37.900000000000006, 56.5499999999999, 98.76999999999988, 14.44669170759896, 3.3680260853077146, 3.7664387550563423], "isController": false}, {"data": ["GET /api/pets/{petId}", 100, 0, 0.0, 19.110000000000003, 4, 89, 14.5, 37.0, 53.449999999999875, 88.81999999999991, 13.850415512465373, 7.953168282548477, 2.421117555401662], "isController": false}, {"data": ["GET /api/visits/{visitId}", 100, 3, 3.0, 22.109999999999992, 5, 138, 15.5, 43.60000000000002, 65.79999999999995, 137.91999999999996, 14.326647564469916, 9.425507029011461, 2.5319271579512894], "isController": false}, {"data": ["POST /api/specialties", 100, 0, 0.0, 19.640000000000008, 4, 118, 16.0, 36.80000000000001, 45.849999999999966, 117.36999999999968, 13.945056477478735, 5.583469878678009, 3.75862850369544], "isController": false}, {"data": ["GET /api/owners/{ownerId}", 100, 0, 0.0, 18.959999999999994, 4, 71, 16.0, 36.900000000000006, 45.849999999999966, 70.83999999999992, 13.713658804168952, 6.401493074602304, 2.42399633159627], "isController": false}, {"data": ["POST /api/visits", 100, 1, 1.0, 21.960000000000008, 5, 123, 17.0, 41.0, 44.94999999999999, 122.4199999999997, 14.124293785310734, 9.761349090748588, 9.751831744350282], "isController": false}, {"data": ["GET /api/visits", 100, 21, 21.0, 21.060000000000002, 5, 106, 16.0, 40.80000000000001, 51.799999999999955, 105.58999999999979, 14.168319637291017, 32.33905120962029, 2.4490161873051854], "isController": false}, {"data": ["PUT /api/pets/{petId}", 100, 0, 0.0, 22.229999999999993, 6, 66, 19.0, 36.0, 46.89999999999998, 65.96999999999998, 13.793103448275861, 3.7984913793103448, 10.048491379310345], "isController": false}, {"data": ["GET /api/pettypes", 100, 0, 0.0, 17.91, 4, 127, 11.0, 38.900000000000006, 55.94999999999999, 126.4199999999997, 12.10214207914801, 13.216862822219532, 2.115511164226068], "isController": false}, {"data": ["POST /api/pettypes", 100, 0, 0.0, 39.05, 7, 222, 26.5, 78.80000000000001, 110.59999999999991, 221.8099999999999, 11.993283761093787, 4.6848764691772615, 3.1037306608299353], "isController": false}, {"data": ["PUT /api/specialties/{specialtyId}", 100, 0, 0.0, 18.749999999999996, 5, 157, 14.0, 33.0, 39.0, 155.91999999999945, 14.040999719180006, 3.866759688289806, 3.935319257231115], "isController": false}, {"data": ["GET /api/specialties/{specialtyId}", 100, 0, 0.0, 18.190000000000005, 4, 58, 16.0, 34.0, 37.94999999999999, 57.87999999999994, 14.08252358822701, 4.950887198986059, 2.5579583861427966], "isController": false}, {"data": ["GET /api/owners/*/lastname/{lastName}", 100, 0, 0.0, 20.120000000000005, 4, 171, 15.5, 31.900000000000006, 55.0, 169.88999999999942, 13.537295248409368, 6.171896152023826, 2.63078296331393], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Value expected to be 'Profilactic winter checks 5474', but found 'Profilactic winter checks 3014'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4034', but found 'Profilactic winter checks 5622'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2038', but found 'Profilactic winter checks 6459'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2853', but found 'Profilactic winter checks 6061'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8378', but found 'Profilactic winter checks 3526'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3410', but found 'Profilactic winter checks 3264'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["com.github.fge.jsonschema.core.report.ListProcessingReport: failure\\n--- BEGIN MESSAGES ---\\nerror: instance type (array) does not match any allowed primitive type (allowed: [&quot;object&quot;])\\n    level: &quot;error&quot;\\n    schema: {&quot;loadingURI&quot;:&quot;#&quot;,&quot;pointer&quot;:&quot;&quot;}\\n    instance: {&quot;pointer&quot;:&quot;&quot;}\\n    domain: &quot;validation&quot;\\n    keyword: &quot;type&quot;\\n    found: &quot;array&quot;\\n    expected: [&quot;object&quot;]\\n---  END MESSAGES  ---\\n", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6874', but found 'Profilactic winter checks 4676'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4424', but found 'Profilactic winter checks 6651'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5508', but found 'Profilactic winter checks 5759'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7215', but found 'Profilactic winter checks 5985'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3575', but found 'Profilactic winter checks 3526'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6932', but found 'Profilactic winter checks 6459'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1796', but found 'Profilactic winter checks 9733'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1674', but found 'Profilactic winter checks 7080'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8540', but found 'Profilactic winter checks 6874'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9229', but found 'Profilactic winter checks 7080'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7407', but found 'Profilactic winter checks 3801'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["400", 7, 10.294117647058824, 0.2692307692307692], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6938', but found 'Profilactic winter checks 9733'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["404", 39, 57.35294117647059, 1.5], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3526', but found 'Profilactic winter checks 3014'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6590', but found 'Profilactic winter checks 4797'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5777', but found 'Profilactic winter checks 3526'", 1, 1.4705882352941178, 0.038461538461538464], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2600, 68, "404", 39, "400", 7, "Value expected to be 'Profilactic winter checks 4424', but found 'Profilactic winter checks 6651'", 1, "Value expected to be 'Profilactic winter checks 5508', but found 'Profilactic winter checks 5759'", 1, "Value expected to be 'Profilactic winter checks 5474', but found 'Profilactic winter checks 3014'", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 100, 10, "404", 10, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["PUT /api/visits/{visitId}", 100, 2, "400", 1, "404", 1, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 100, 21, "404", 18, "400", 3, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 100, 6, "404", 5, "400", 1, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 100, 4, "404", 3, "400", 1, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/visits/{visitId}", 100, 3, "404", 2, "com.github.fge.jsonschema.core.report.ListProcessingReport: failure\\n--- BEGIN MESSAGES ---\\nerror: instance type (array) does not match any allowed primitive type (allowed: [&quot;object&quot;])\\n    level: &quot;error&quot;\\n    schema: {&quot;loadingURI&quot;:&quot;#&quot;,&quot;pointer&quot;:&quot;&quot;}\\n    instance: {&quot;pointer&quot;:&quot;&quot;}\\n    domain: &quot;validation&quot;\\n    keyword: &quot;type&quot;\\n    found: &quot;array&quot;\\n    expected: [&quot;object&quot;]\\n---  END MESSAGES  ---\\n", 1, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["POST /api/visits", 100, 1, "400", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["GET /api/visits", 100, 21, "Value expected to be 'Profilactic winter checks 4424', but found 'Profilactic winter checks 6651'", 1, "Value expected to be 'Profilactic winter checks 5508', but found 'Profilactic winter checks 5759'", 1, "Value expected to be 'Profilactic winter checks 5474', but found 'Profilactic winter checks 3014'", 1, "Value expected to be 'Profilactic winter checks 4034', but found 'Profilactic winter checks 5622'", 1, "Value expected to be 'Profilactic winter checks 2038', but found 'Profilactic winter checks 6459'", 1], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
