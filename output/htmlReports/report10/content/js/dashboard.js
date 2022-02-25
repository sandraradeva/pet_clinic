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

    var data = {"OkPercent": 89.5293609671848, "KoPercent": 10.470639032815198};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8950777202072538, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "GET /api/pettypes/{petTypeId}"], "isController": false}, {"data": [0.989247311827957, 500, 1500, "GET /api/specialties"], "isController": false}, {"data": [0.5891472868217055, 500, 1500, "DELETE /api/pettypes/{petTypeId}"], "isController": false}, {"data": [0.75, 500, 1500, "PUT /api/visits/{visitId}"], "isController": false}, {"data": [0.9494949494949495, 500, 1500, "GET /api/pets"], "isController": false}, {"data": [0.5819672131147541, 500, 1500, "DELETE /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/owners/{ownerId}"], "isController": false}, {"data": [0.6408450704225352, 500, 1500, "DELETE /api/pets/{petId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/owners"], "isController": false}, {"data": [0.9975, 500, 1500, "GET /api/owners"], "isController": false}, {"data": [0.955, 500, 1500, "POST /api/pets"], "isController": false}, {"data": [0.9962962962962963, 500, 1500, "DELETE /api/owners/{ownerId}"], "isController": false}, {"data": [1.0, 500, 1500, "PUT /api/pettypes/{petTypeId}"], "isController": false}, {"data": [0.6712328767123288, 500, 1500, "DELETE /api/visits/{visitId}"], "isController": false}, {"data": [0.9226804123711341, 500, 1500, "GET /api/pets/{petId}"], "isController": false}, {"data": [0.7105263157894737, 500, 1500, "GET /api/visits/{visitId}"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/specialties"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/{ownerId}"], "isController": false}, {"data": [0.7976190476190477, 500, 1500, "POST /api/visits"], "isController": false}, {"data": [0.3067484662576687, 500, 1500, "GET /api/visits"], "isController": false}, {"data": [0.9336734693877551, 500, 1500, "PUT /api/pets/{petId}"], "isController": false}, {"data": [0.995, 500, 1500, "GET /api/pettypes"], "isController": false}, {"data": [1.0, 500, 1500, "POST /api/pettypes"], "isController": false}, {"data": [0.994413407821229, 500, 1500, "PUT /api/specialties/{specialtyId}"], "isController": false}, {"data": [0.9943502824858758, 500, 1500, "GET /api/specialties/{specialtyId}"], "isController": false}, {"data": [1.0, 500, 1500, "GET /api/owners/*/lastname/{lastName}"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 4632, 485, 10.470639032815198, 62.50237478411061, 4, 665, 39.0, 149.0, 193.0, 325.6800000000003, 640.1326699834162, 2637.0863780058044, 193.5396800718629], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET /api/pettypes/{petTypeId}", 200, 0, 0.0, 45.86000000000001, 6, 330, 25.0, 109.0, 135.95, 220.85000000000014, 37.54458419373005, 12.942615449596396, 6.746292472310869], "isController": false}, {"data": ["GET /api/specialties", 186, 2, 1.075268817204301, 67.99999999999997, 11, 424, 51.0, 137.80000000000007, 184.20000000000005, 311.7699999999994, 30.352480417754567, 932.8379020989719, 5.394679136749347], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 129, 53, 41.08527131782946, 62.116279069767465, 4, 296, 38.0, 150.0, 208.0, 296.0, 21.59357214596585, 5.141256643371276, 5.69361765567459], "isController": false}, {"data": ["PUT /api/visits/{visitId}", 156, 39, 25.0, 48.19871794871795, 6, 327, 35.0, 101.60000000000014, 148.15, 292.8000000000004, 25.66211547951966, 7.7705715886658995, 18.07323367330153], "isController": false}, {"data": ["GET /api/pets", 198, 10, 5.05050505050505, 94.020202020202, 9, 337, 76.0, 200.49999999999997, 227.19999999999993, 332.04999999999995, 32.158518759135944, 452.69056688525257, 5.495840608250772], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 122, 51, 41.80327868852459, 51.45081967213113, 5, 215, 30.5, 161.7, 173.0, 212.92999999999995, 20.528352683829716, 4.956428518845701, 5.472890901060071], "isController": false}, {"data": ["PUT /api/owners/{ownerId}", 200, 0, 0.0, 61.12500000000001, 6, 334, 38.0, 154.9, 207.79999999999973, 306.2400000000007, 32.46226261970459, 8.939802791754586, 13.631614186008767], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 142, 51, 35.91549295774648, 53.09154929577465, 4, 434, 35.0, 103.70000000000002, 155.09999999999997, 389.7099999999993, 23.599800565065646, 5.724178629300315, 6.12782013461858], "isController": false}, {"data": ["POST /api/owners", 200, 0, 0.0, 52.410000000000004, 5, 428, 27.0, 120.70000000000002, 167.84999999999997, 396.4400000000014, 32.95435821387378, 16.798999011369254, 13.0980701103971], "isController": false}, {"data": ["GET /api/owners", 200, 0, 0.0, 101.33500000000001, 10, 665, 73.5, 229.9, 289.94999999999976, 473.1300000000008, 32.663726931242856, 597.7812908296586, 5.645976237138657], "isController": false}, {"data": ["POST /api/pets", 200, 9, 4.5, 85.63500000000003, 7, 475, 51.0, 194.8, 222.84999999999997, 361.94000000000005, 32.53619651862697, 19.9416064238653, 18.714667724093054], "isController": false}, {"data": ["DELETE /api/owners/{ownerId}", 135, 0, 0.0, 61.740740740740705, 5, 501, 33.0, 149.4, 235.39999999999992, 488.3999999999995, 22.537562604340568, 5.194203881469115, 5.898502712854758], "isController": false}, {"data": ["PUT /api/pettypes/{petTypeId}", 200, 0, 0.0, 57.475, 5, 390, 28.0, 127.9, 189.84999999999997, 358.50000000000045, 37.87878787878788, 10.431463068181818, 10.246508049242424], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 146, 48, 32.87671232876713, 50.650684931506845, 4, 347, 28.0, 118.60000000000002, 173.95000000000002, 346.06, 24.244437064098307, 6.534146930006642, 6.329007181999335], "isController": false}, {"data": ["GET /api/pets/{petId}", 194, 15, 7.731958762886598, 68.26804123711338, 5, 436, 47.0, 152.0, 187.0, 306.80000000000155, 31.596091205211728, 27.11360571050489, 5.550183224755701], "isController": false}, {"data": ["GET /api/visits/{visitId}", 152, 44, 28.94736842105263, 59.506578947368375, 6, 334, 35.5, 138.80000000000024, 214.49999999999994, 327.64, 25.032938076416336, 31.70531100749341, 4.431200592885375], "isController": false}, {"data": ["POST /api/specialties", 189, 0, 0.0, 66.87830687830686, 7, 412, 43.0, 139.0, 195.5, 410.2, 30.847070344377347, 12.35087777460421, 8.314249428757957], "isController": false}, {"data": ["GET /api/owners/{ownerId}", 200, 0, 0.0, 49.97, 5, 298, 34.0, 113.9, 153.5999999999999, 212.95000000000005, 32.4833522819555, 15.194849358453792, 5.773408315738184], "isController": false}, {"data": ["POST /api/visits", 168, 34, 20.238095238095237, 52.02976190476191, 6, 439, 35.5, 99.99999999999994, 144.39999999999952, 425.89000000000004, 27.577150361129352, 18.547634192383455, 19.118310899540383], "isController": false}, {"data": ["GET /api/visits", 163, 113, 69.32515337423312, 60.797546012269926, 7, 257, 46.0, 131.2, 179.3999999999997, 255.71999999999997, 26.76518883415435, 140.6158597598522, 4.6264047105911335], "isController": false}, {"data": ["PUT /api/pets/{petId}", 196, 13, 6.63265306122449, 85.72959183673473, 5, 434, 60.0, 183.0, 229.79999999999973, 367.07000000000005, 31.93222548061258, 9.000507850684262, 23.352858219289672], "isController": false}, {"data": ["GET /api/pettypes", 200, 1, 0.5, 51.38999999999999, 4, 267, 26.0, 128.9, 165.84999999999997, 258.73000000000025, 35.24229074889868, 787.4590446035243, 6.160517621145375], "isController": false}, {"data": ["POST /api/pettypes", 200, 0, 0.0, 70.91000000000001, 5, 448, 48.5, 153.0, 222.0, 392.3500000000006, 35.82945180938732, 13.995879613041922, 9.272270243640273], "isController": false}, {"data": ["PUT /api/specialties/{specialtyId}", 179, 1, 0.5586592178770949, 48.34078212290501, 6, 352, 34.0, 105.0, 140.0, 323.9999999999996, 29.267495094833226, 8.055682584614127, 8.231482995421844], "isController": false}, {"data": ["GET /api/specialties/{specialtyId}", 177, 1, 0.5649717514124294, 45.42372881355933, 6, 419, 33.0, 92.80000000000007, 125.39999999999998, 245.83999999999975, 28.983134108400197, 10.200736603487801, 5.2928184358113635], "isController": false}, {"data": ["GET /api/owners/*/lastname/{lastName}", 200, 0, 0.0, 54.355000000000004, 7, 299, 37.5, 130.9, 163.0, 284.3400000000006, 32.74394237066143, 14.869075392927309, 6.363324738048461], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Value expected to be 'Profilactic winter checks 7993', but found 'Profilactic winter checks 7888'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2168', but found 'Profilactic winter checks 7028'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9059', but found 'Profilactic winter checks 3559'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6624', but found 'Profilactic winter checks 7888'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1712', but found 'Profilactic winter checks 3663'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'dermatology', but found 'dermatology+UPDATED'", 2, 0.41237113402061853, 0.04317789291882556], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5530', but found 'Profilactic winter checks 6508'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3913', but found 'Profilactic winter checks 4245'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5396', but found 'Profilactic winter checks 8993'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8925', but found 'Profilactic winter checks 4432'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7435', but found 'Profilactic winter checks 4623'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4928', but found 'Profilactic winter checks 7888'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4219', but found 'Profilactic winter checks 9159'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2844', but found 'Profilactic winter checks 8829'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1384', but found 'Profilactic winter checks 9487+UPDATED'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2798', but found 'Profilactic winter checks 8870'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8611', but found 'Profilactic winter checks 2412'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4855', but found 'Profilactic winter checks 6508'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4539', but found 'Profilactic winter checks 4057'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8552', but found 'Profilactic winter checks 6114'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4636', but found 'Profilactic winter checks 8925'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1815', but found 'Profilactic winter checks 3559'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5436', but found 'Profilactic winter checks 8685'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4634', but found 'Profilactic winter checks 2412'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2065', but found 'Profilactic winter checks 3022'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["400", 128, 26.391752577319586, 2.763385146804836], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1553', but found 'Profilactic winter checks 8829'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6442', but found 'Profilactic winter checks 3628'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["404", 217, 44.74226804123711, 4.684801381692574], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1692', but found 'Profilactic winter checks 4665'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7531', but found 'Profilactic winter checks 6942'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9765', but found 'Profilactic winter checks 3306'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8575', but found 'Profilactic winter checks 5932'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9271', but found 'Profilactic winter checks 1790'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5001', but found 'Profilactic winter checks 4044'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7961', but found 'Profilactic winter checks 5010'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9987', but found 'Profilactic winter checks 6508'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6825', but found 'Profilactic winter checks 6196'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1918', but found 'Profilactic winter checks 4882'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9216', but found 'Profilactic winter checks 8829'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2656', but found 'Profilactic winter checks 6548'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3581', but found 'Profilactic winter checks 4665'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1388', but found 'Profilactic winter checks 3628'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3197', but found 'Profilactic winter checks 9159'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2751', but found 'Profilactic winter checks 9159'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9624', but found 'Profilactic winter checks 2509'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3022', but found 'Profilactic winter checks 2220'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'pig', but found 'pig+UPDATED'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4227', but found 'Profilactic winter checks 2742'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6601', but found 'Profilactic winter checks 8390'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9684', but found 'Profilactic winter checks 4245'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3628', but found 'Profilactic winter checks 2368'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1575', but found 'Profilactic winter checks 3557'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6653', but found 'Profilactic winter checks 5010'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2296', but found 'Profilactic winter checks 1028'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2368', but found 'Profilactic winter checks 3559'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4511', but found 'Profilactic winter checks 9216'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2668', but found 'Profilactic winter checks 3559'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3122', but found 'Profilactic winter checks 2368'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4432', but found 'Profilactic winter checks 3628'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5347', but found 'Profilactic winter checks 8390'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2749', but found 'Profilactic winter checks 3559'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4155', but found 'Profilactic winter checks 8398'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2706', but found 'Profilactic winter checks 7028'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8808', but found 'Profilactic winter checks 2412'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7011', but found 'Profilactic winter checks 4623'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4477', but found 'Profilactic winter checks 6942'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5631', but found 'Profilactic winter checks 8870'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6114', but found 'Profilactic winter checks 7712'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3663', but found 'Profilactic winter checks 8993'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6254', but found 'Profilactic winter checks 8390'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6856', but found 'Profilactic winter checks 2742'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9529', but found 'Profilactic winter checks 3663'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8036', but found 'Profilactic winter checks 3022'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5010', but found 'Profilactic winter checks 3628'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3869', but found 'Profilactic winter checks 3557'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9680', but found 'Profilactic winter checks 4044'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2675', but found 'Profilactic winter checks 6508'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9406', but found 'Profilactic winter checks 9967'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6508', but found 'Profilactic winter checks 5078'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8301', but found 'Profilactic winter checks 3022'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2610', but found 'Profilactic winter checks 1028'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8829', but found 'Profilactic winter checks 1790'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7388', but found 'Profilactic winter checks 5034'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1121', but found 'Profilactic winter checks 6508'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1477', but found 'Profilactic winter checks 8398'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2481', but found 'Profilactic winter checks 2220'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4137', but found 'Profilactic winter checks 5010'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["com.github.fge.jsonschema.core.report.ListProcessingReport: failure\\n--- BEGIN MESSAGES ---\\nerror: instance type (array) does not match any allowed primitive type (allowed: [&quot;object&quot;])\\n    level: &quot;error&quot;\\n    schema: {&quot;loadingURI&quot;:&quot;#&quot;,&quot;pointer&quot;:&quot;&quot;}\\n    instance: {&quot;pointer&quot;:&quot;&quot;}\\n    domain: &quot;validation&quot;\\n    keyword: &quot;type&quot;\\n    found: &quot;array&quot;\\n    expected: [&quot;object&quot;]\\n---  END MESSAGES  ---\\n", 30, 6.185567010309279, 0.6476683937823834], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5925', but found 'Profilactic winter checks 8390'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2849', but found 'Profilactic winter checks 3557'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8398', but found 'Profilactic winter checks 7028'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9506', but found 'Profilactic winter checks 3847'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4596', but found 'Profilactic winter checks 3559'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3540', but found 'Profilactic winter checks 8390'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 3944', but found 'Profilactic winter checks 8390'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2376', but found 'Profilactic winter checks 9159'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7242', but found 'Profilactic winter checks 6873+UPDATED'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5083', but found 'Profilactic winter checks 9487'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5459', but found 'Profilactic winter checks 8390'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4665', but found 'Profilactic winter checks 8829'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 4150', but found 'Profilactic winter checks 5932'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8135', but found 'Profilactic winter checks 5983'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 9769', but found 'Profilactic winter checks 3559'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 8292', but found 'Profilactic winter checks 6601'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1115', but found 'Profilactic winter checks 9967'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 5927', but found 'Profilactic winter checks 3559'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 7513', but found 'Profilactic winter checks 1028'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2231', but found 'Profilactic winter checks 3628'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 1791', but found 'Profilactic winter checks 9159'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 2509', but found 'Profilactic winter checks 8925'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}, {"data": ["Value expected to be 'Profilactic winter checks 6251', but found 'Profilactic winter checks 3663'", 1, 0.20618556701030927, 0.02158894645941278], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 4632, 485, "404", 217, "400", 128, "com.github.fge.jsonschema.core.report.ListProcessingReport: failure\\n--- BEGIN MESSAGES ---\\nerror: instance type (array) does not match any allowed primitive type (allowed: [&quot;object&quot;])\\n    level: &quot;error&quot;\\n    schema: {&quot;loadingURI&quot;:&quot;#&quot;,&quot;pointer&quot;:&quot;&quot;}\\n    instance: {&quot;pointer&quot;:&quot;&quot;}\\n    domain: &quot;validation&quot;\\n    keyword: &quot;type&quot;\\n    found: &quot;array&quot;\\n    expected: [&quot;object&quot;]\\n---  END MESSAGES  ---\\n", 30, "Value expected to be 'dermatology', but found 'dermatology+UPDATED'", 2, "Value expected to be 'Profilactic winter checks 7993', but found 'Profilactic winter checks 7888'", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["GET /api/specialties", 186, 2, "Value expected to be 'dermatology', but found 'dermatology+UPDATED'", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["DELETE /api/pettypes/{petTypeId}", 129, 53, "404", 53, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["PUT /api/visits/{visitId}", 156, 39, "400", 28, "404", 11, null, null, null, null, null, null], "isController": false}, {"data": ["GET /api/pets", 198, 10, "400", 10, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["DELETE /api/specialties/{specialtyId}", 122, 51, "404", 50, "400", 1, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/pets/{petId}", 142, 51, "404", 47, "400", 4, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["POST /api/pets", 200, 9, "400", 9, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["DELETE /api/visits/{visitId}", 146, 48, "400", 25, "404", 23, null, null, null, null, null, null], "isController": false}, {"data": ["GET /api/pets/{petId}", 194, 15, "404", 9, "com.github.fge.jsonschema.core.report.ListProcessingReport: failure\\n--- BEGIN MESSAGES ---\\nerror: instance type (array) does not match any allowed primitive type (allowed: [&quot;object&quot;])\\n    level: &quot;error&quot;\\n    schema: {&quot;loadingURI&quot;:&quot;#&quot;,&quot;pointer&quot;:&quot;&quot;}\\n    instance: {&quot;pointer&quot;:&quot;&quot;}\\n    domain: &quot;validation&quot;\\n    keyword: &quot;type&quot;\\n    found: &quot;array&quot;\\n    expected: [&quot;object&quot;]\\n---  END MESSAGES  ---\\n", 5, "400", 1, null, null, null, null], "isController": false}, {"data": ["GET /api/visits/{visitId}", 152, 44, "com.github.fge.jsonschema.core.report.ListProcessingReport: failure\\n--- BEGIN MESSAGES ---\\nerror: instance type (array) does not match any allowed primitive type (allowed: [&quot;object&quot;])\\n    level: &quot;error&quot;\\n    schema: {&quot;loadingURI&quot;:&quot;#&quot;,&quot;pointer&quot;:&quot;&quot;}\\n    instance: {&quot;pointer&quot;:&quot;&quot;}\\n    domain: &quot;validation&quot;\\n    keyword: &quot;type&quot;\\n    found: &quot;array&quot;\\n    expected: [&quot;object&quot;]\\n---  END MESSAGES  ---\\n", 25, "404", 16, "400", 3, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["POST /api/visits", 168, 34, "400", 34, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["GET /api/visits", 163, 113, "400", 6, "Value expected to be 'Profilactic winter checks 7993', but found 'Profilactic winter checks 7888'", 1, "Value expected to be 'Profilactic winter checks 2168', but found 'Profilactic winter checks 7028'", 1, "Value expected to be 'Profilactic winter checks 9059', but found 'Profilactic winter checks 3559'", 1, "Value expected to be 'Profilactic winter checks 6624', but found 'Profilactic winter checks 7888'", 1], "isController": false}, {"data": ["PUT /api/pets/{petId}", 196, 13, "400", 7, "404", 6, null, null, null, null, null, null], "isController": false}, {"data": ["GET /api/pettypes", 200, 1, "Value expected to be 'pig', but found 'pig+UPDATED'", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["PUT /api/specialties/{specialtyId}", 179, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["GET /api/specialties/{specialtyId}", 177, 1, "404", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
