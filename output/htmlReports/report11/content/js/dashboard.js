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

    var data = {"OkPercent": 99.17692307692307, "KoPercent": 0.823076923076923};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9917692307692307, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "GET /api/pettypes/{petTypeId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties"], "isController": false}, {"data": [0.997, 500, 1500, "DELETE /api/pettypes/{petTypeId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/visits/{visitId}"], "isController": false}, {"data": [0.984, 500, 1500, "GET /api/pets"], "isController": false}, {"data": [0.922, 500, 1500, "DELETE /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/{ownerId}"], "isController": false}, {"data": [0.997, 500, 1500, "DELETE /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pets"], "isController": false}, {"data": [1.0, 500, 1500, "DELETE /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/{petTypeId}"], "isController": false}, {"data": [0.997, 500, 1500, "DELETE /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/specialties"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/visits"], "isController": false}, {"data": [0.894, 500, 1500, "GET /api/visits"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/specialties/{specialtyId}"], "isController": false}, {"data": [0.995, 500, 1500, "GET /api/owners/*/lastname/{lastName}"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 26000, 214, 0.823076923076923, 6.49500000000001, 2, 115, 5.0, 9.0, 11.0, 16.0, 609.2988376452944, 2369.2139953453084, 184.50147344863143], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET /api/pettypes/{petTypeId}", 1000, 0, 0.0, 4.412999999999992, 2, 68, 4.0, 6.0, 7.0, 13.980000000000018, 24.137098720733768, 8.3206990707217, 4.337134926381849], "isController": false}, {"data": ["GET /api/specialties", 1000, 0, 0.0, 9.835999999999991, 5, 81, 9.0, 13.0, 15.0, 54.0, 24.33445271815837, 883.457576874057, 4.325068744828929], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 1000, 3, 0.3, 6.7360000000000015, 2, 32, 6.0, 9.0, 11.0, 18.0, 24.53867294856694, 5.656763203339713, 6.4701579063604235], "isController": false}, {"data": ["PUT /api/visits/{visitId}", 1000, 0, 0.0, 6.139999999999992, 3, 39, 6.0, 9.0, 10.0, 16.99000000000001, 24.48759703210324, 6.743654651419056, 17.265669001150915], "isController": false}, {"data": ["GET /api/pets", 1000, 16, 1.6, 11.216000000000006, 4, 93, 10.0, 15.0, 18.0, 37.99000000000001, 24.265954865323952, 249.46150433753942, 4.147013770929386], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 1000, 78, 7.8, 6.153999999999996, 2, 34, 6.0, 8.0, 10.0, 16.99000000000001, 24.544093463907913, 5.952326166458041, 6.543493667623886], "isController": false}, {"data": ["PUT /api/owners/{ownerId}", 1000, 0, 0.0, 5.520999999999995, 2, 56, 5.0, 8.0, 9.0, 24.0, 24.2107301956227, 6.667408120278908, 10.166615218865001], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 1000, 3, 0.3, 6.438999999999998, 3, 62, 6.0, 9.0, 11.0, 19.0, 24.527237497240687, 5.654127052623188, 6.371333177994162], "isController": false}, {"data": ["POST /api/owners", 1000, 0, 0.0, 5.020999999999997, 2, 53, 4.0, 7.0, 8.0, 17.0, 24.162176528861718, 12.317047019595526, 9.603521335201874], "isController": false}, {"data": ["GET /api/owners", 1000, 0, 0.0, 15.064999999999982, 7, 115, 13.0, 20.0, 24.0, 56.0, 24.165679901404026, 430.4059097925376, 4.177075529832532], "isController": false}, {"data": ["POST /api/pets", 1000, 0, 0.0, 5.613, 2, 61, 5.0, 8.0, 9.0, 26.99000000000001, 24.259479391572256, 14.925265641299339, 13.953938829722714], "isController": false}, {"data": ["DELETE /api/owners/{ownerId}", 1000, 0, 0.0, 5.0100000000000025, 2, 66, 4.0, 7.0, 8.0, 16.99000000000001, 24.53506060159969, 5.654564748024927, 6.4212853918249175], "isController": false}, {"data": ["PUT /api/pettypes/{petTypeId}", 1000, 0, 0.0, 4.855999999999998, 2, 67, 4.0, 7.0, 8.0, 14.990000000000009, 24.133603629693983, 6.6461681870836955, 6.52832832561058], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 1000, 3, 0.3, 5.446000000000001, 2, 26, 5.0, 8.0, 9.0, 13.0, 24.522425758356018, 5.653017829336178, 6.4179786164447385], "isController": false}, {"data": ["GET /api/pets/{petId}", 1000, 0, 0.0, 4.913000000000002, 2, 65, 4.0, 7.0, 8.0, 18.980000000000018, 24.31019812811474, 14.03059286495685, 4.27327701470767], "isController": false}, {"data": ["GET /api/visits/{visitId}", 1000, 0, 0.0, 4.8900000000000015, 2, 24, 4.0, 7.0, 8.0, 12.0, 24.50439853953785, 16.081011541571712, 4.355273959175673], "isController": false}, {"data": ["POST /api/specialties", 1000, 0, 0.0, 5.304999999999995, 2, 68, 4.0, 7.0, 8.0, 28.99000000000001, 24.328532502919426, 9.740916334176722, 6.557299776177501], "isController": false}, {"data": ["GET /api/owners/{ownerId}", 1000, 0, 0.0, 4.808, 2, 70, 4.0, 6.0, 8.0, 23.0, 24.2306760358614, 11.33446662224376, 4.306624061061303], "isController": false}, {"data": ["POST /api/visits", 1000, 0, 0.0, 5.6329999999999965, 2, 60, 5.0, 7.0, 10.0, 28.940000000000055, 24.44270629644114, 17.043058882479468, 16.947579561008997], "isController": false}, {"data": ["GET /api/visits", 1000, 106, 10.6, 8.426000000000013, 3, 72, 7.0, 11.0, 14.0, 39.99000000000001, 24.46124116337663, 124.68659034759423, 4.228163755778969], "isController": false}, {"data": ["PUT /api/pets/{petId}", 1000, 0, 0.0, 6.194, 2, 58, 5.0, 9.0, 10.0, 21.99000000000001, 24.288941245051127, 6.6889467100629085, 17.76603221928056], "isController": false}, {"data": ["GET /api/pettypes", 1000, 0, 0.0, 7.807999999999994, 4, 60, 7.0, 11.0, 12.0, 19.0, 23.574897449196094, 556.315986690497, 4.121002581451271], "isController": false}, {"data": ["POST /api/pettypes", 1000, 0, 0.0, 8.105999999999998, 4, 91, 7.0, 11.0, 13.0, 28.980000000000018, 23.533287835643517, 9.19269056079825, 6.09015749652884], "isController": false}, {"data": ["PUT /api/specialties/{specialtyId}", 1000, 0, 0.0, 5.3119999999999985, 2, 61, 4.0, 7.0, 9.0, 24.99000000000001, 24.372410431391668, 6.71193334145747, 6.854740433828906], "isController": false}, {"data": ["GET /api/specialties/{specialtyId}", 1000, 0, 0.0, 4.696999999999996, 2, 58, 4.0, 6.0, 8.0, 20.99000000000001, 24.404529480671613, 8.603549943869583, 4.456686536021086], "isController": false}, {"data": ["GET /api/owners/*/lastname/{lastName}", 1000, 5, 0.5, 5.311999999999997, 2, 56, 4.0, 7.0, 8.0, 34.0, 24.176780619892657, 11.000553232737778, 4.69841732749867], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Value expected to be 'Profilactic winter checks 9852', but found 'Profilactic winter checks 7475'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6679', but found 'Profilactic winter checks 8863'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9414', but found 'Profilactic winter checks 8809'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4465', but found 'Profilactic winter checks 2064'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2554', but found 'Profilactic winter checks 4592'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4550', but found 'Profilactic winter checks 5772'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6661', but found 'Profilactic winter checks 9941'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9367', but found 'Profilactic winter checks 8863'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9079', but found 'Profilactic winter checks 3256'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9758', but found 'Profilactic winter checks 4960'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3347', but found 'Profilactic winter checks 4928'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8985', but found 'Profilactic winter checks 5887'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7316', but found 'Profilactic winter checks 8863'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9138', but found 'Profilactic winter checks 1083'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4500', but found 'Profilactic winter checks 9297'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6156', but found 'Profilactic winter checks 3194'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1133', but found 'Profilactic winter checks 9910'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4826', but found 'Profilactic winter checks 8863'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2472', but found 'Profilactic winter checks 9964'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6800', but found 'Profilactic winter checks 6820'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7621', but found 'Profilactic winter checks 4894'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["400", 43, 20.093457943925234, 0.16538461538461538], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1814', but found 'Profilactic winter checks 7359'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5916', but found 'Profilactic winter checks 4959'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["404", 60, 28.037383177570092, 0.23076923076923078], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3287', but found 'Profilactic winter checks 6801'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3932', but found 'Profilactic winter checks 4380'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2133', but found 'Profilactic winter checks 7971'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5029', but found 'Profilactic winter checks 2223'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2080', but found 'Profilactic winter checks 5172'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9627', but found 'Profilactic winter checks 7318'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5783', but found 'Profilactic winter checks 8033'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4829', but found 'Profilactic winter checks 3363'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2493', but found 'Profilactic winter checks 6471'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7594', but found 'Profilactic winter checks 7972'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2925', but found 'Profilactic winter checks 6118'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9900', but found 'Profilactic winter checks 3472'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7333', but found 'Profilactic winter checks 9020'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2005', but found 'Profilactic winter checks 2340'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5622', but found 'Profilactic winter checks 4661'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8145', but found 'Profilactic winter checks 4099'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5084', but found 'Profilactic winter checks 8203'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2797', but found 'Profilactic winter checks 1652'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1869', but found 'Profilactic winter checks 4612'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3238', but found 'Profilactic winter checks 6423'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7906', but found 'Profilactic winter checks 9830'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1325', but found 'Profilactic winter checks 4479'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8645', but found 'Profilactic winter checks 5578'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2881', but found 'Profilactic winter checks 8863'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2274', but found 'Profilactic winter checks 2170'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8296', but found 'Profilactic winter checks 7686'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1202', but found 'Profilactic winter checks 5329'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8758', but found 'Profilactic winter checks 8415'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2442', but found 'Profilactic winter checks 6285'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8703', but found 'Profilactic winter checks 3115'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5868', but found 'Profilactic winter checks 2722'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4415', but found 'Profilactic winter checks 8364'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1207', but found 'Profilactic winter checks 7418'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9418', but found 'Profilactic winter checks 7898'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2187', but found 'Profilactic winter checks 3604'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1934', but found 'Profilactic winter checks 6975'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4437', but found 'Profilactic winter checks 8863'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6399', but found 'Profilactic winter checks 4415'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3262', but found 'Profilactic winter checks 8160'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9355', but found 'Profilactic winter checks 8407'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8630', but found 'Profilactic winter checks 9521'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1920', but found 'Profilactic winter checks 8765'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2032', but found 'Profilactic winter checks 8863'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Testi7040', but found 'Testi7040+UPDATED'", 2, 0.9345794392523364, 0.007692307692307693], "isController": false}, {"data": ["Value expected to be 'Testi9480', but found 'Testi9480+UPDATED'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5761', but found 'Profilactic winter checks 5271'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3947', but found 'Profilactic winter checks 4946'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9377', but found 'Profilactic winter checks 3861'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7080', but found 'Profilactic winter checks 4390'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3059', but found 'Profilactic winter checks 8782'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6772', but found 'Profilactic winter checks 9308'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5886', but found 'Profilactic winter checks 7316'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6223', but found 'Profilactic winter checks 5397'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2134', but found 'Profilactic winter checks 1448'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2871', but found 'Profilactic winter checks 8692'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3699', but found 'Profilactic winter checks 8192'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8452', but found 'Profilactic winter checks 9020'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4721', but found 'Profilactic winter checks 8906'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8938', but found 'Profilactic winter checks 9466'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8483', but found 'Profilactic winter checks 9000'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8412', but found 'Profilactic winter checks 4661'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5985', but found 'Profilactic winter checks 7570'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5280', but found 'Profilactic winter checks 7787'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3527', but found 'Profilactic winter checks 5813'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7897', but found 'Profilactic winter checks 4751'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Testi4928', but found 'Testi4928+UPDATED'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6326', but found 'Profilactic winter checks 8870'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7425', but found 'Profilactic winter checks 3468'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6134', but found 'Profilactic winter checks 1933'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2001', but found 'Profilactic winter checks 4479'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1225', but found 'Profilactic winter checks 7692'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2605', but found 'Profilactic winter checks 6285'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2918', but found 'Profilactic winter checks 9101'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9315', but found 'Profilactic winter checks 6511'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4181', but found 'Profilactic winter checks 8280'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8317', but found 'Profilactic winter checks 3604'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8726', but found 'Profilactic winter checks 8631'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9690', but found 'Profilactic winter checks 7209'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Testi6800', but found 'Testi6800+UPDATED'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4278', but found 'Profilactic winter checks 9397'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2413', but found 'Profilactic winter checks 8253'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3423', but found 'Profilactic winter checks 1096'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7967', but found 'Profilactic winter checks 3194'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7375', but found 'Profilactic winter checks 5387'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1416', but found 'Profilactic winter checks 9178'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3126', but found 'Profilactic winter checks 6844'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1152', but found 'Profilactic winter checks 6725'", 1, 0.4672897196261682, 0.0038461538461538464], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 26000, 214, "404", 60, "400", 43, "Value expected to be 'Testi7040', but found 'Testi7040+UPDATED'", 2, "Value expected to be 'Profilactic winter checks 9852', but found 'Profilactic winter checks 7475'", 1, "Value expected to be 'Profilactic winter checks 6679', but found 'Profilactic winter checks 8863'", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 1000, 3, "404", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/pets", 1000, 16, "400", 16, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 1000, 78, "404", 51, "400", 27, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 1000, 3, "404", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 1000, 3, "404", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/visits", 1000, 106, "Value expected to be 'Profilactic winter checks 9852', but found 'Profilactic winter checks 7475'", 1, "Value expected to be 'Profilactic winter checks 6679', but found 'Profilactic winter checks 8863'", 1, "Value expected to be 'Profilactic winter checks 9414', but found 'Profilactic winter checks 8809'", 1, "Value expected to be 'Profilactic winter checks 4465', but found 'Profilactic winter checks 2064'", 1, "Value expected to be 'Profilactic winter checks 2554', but found 'Profilactic winter checks 4592'", 1], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["GET /api/owners/*/lastname/{lastName}", 1000, 5, "Value expected to be 'Testi7040', but found 'Testi7040+UPDATED'", 2, "Value expected to be 'Testi6800', but found 'Testi6800+UPDATED'", 1, "Value expected to be 'Testi9480', but found 'Testi9480+UPDATED'", 1, "Value expected to be 'Testi4928', but found 'Testi4928+UPDATED'", 1, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
