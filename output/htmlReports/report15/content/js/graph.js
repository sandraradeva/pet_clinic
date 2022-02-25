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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 10.0, "series": [{"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5158", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "GET /api/vets", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5159", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4758", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4758", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4757", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4754", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5150", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4755", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4756", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4757", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "DELETE /api/pettypes/4750", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5153", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4751", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5154", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5151", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4752", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5152", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4753", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5157", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5158", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5155", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5156", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5159", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/37", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5156", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5157", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5154", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5155", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5152", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5153", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5150", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5151", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "POST /api/pettypes", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5887", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5767", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev8359", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6730", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1240", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1239", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1241", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1238", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1242", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5099", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1243", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1244", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1245", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/37", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "POST /api/owners", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1237", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5092", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5091", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "GET /api/owners", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5094", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5093", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5096", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5095", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5098", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5097", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4752", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1239", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1242", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4751", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1241", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "GET /api/pettypes/4750", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1237", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1244", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1238", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1243", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1397", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4756", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4755", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1240", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4754", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4753", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1245", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1237", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1238", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1239", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5159", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5155", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5156", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5157", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5158", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5151", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5152", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5153", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5154", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5099", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5098", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5097", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1761", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5096", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5095", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5094", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5093", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5092", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5091", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5158", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5157", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5156", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5155", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5159", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5150", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5154", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5153", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5152", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5151", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6769", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5100", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5100", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "GET /api/specialties", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4018", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5228", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "POST /api/visits", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "GET /api/visits", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5100", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "GET /api/specialties/4419", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5150", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4425", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4426", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "POST /api/specialties", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4756", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4757", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4754", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "GET /api/pettypes", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4755", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4752", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4753", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "PUT /api/pettypes/4750", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4751", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4423", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4424", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4421", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4422", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4420", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4758", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1242", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1243", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1240", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1241", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4422", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4423", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4420", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4421", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5094", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4426", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev9503", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5095", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5092", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4424", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5093", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4425", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5091", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1244", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1245", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5098", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5099", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5096", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5097", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "POST /api/pets", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4419", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5154", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5159", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5153", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5158", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5152", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5151", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4419", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/37", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5150", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5155", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5154", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5157", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5156", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "GET /api/pets", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5159", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5158", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5157", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5156", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5155", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "POST /api/vets", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5151", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5150", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5153", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5152", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4421", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4420", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4423", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4422", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4425", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4424", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4426", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 4.9E-324, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 306.0, "series": [{"data": [[0.0, 306.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 4.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.6967741935483869, "minX": 1.64356788E12, "maxY": 1.6967741935483869, "series": [{"data": [[1.64356788E12, 1.6967741935483869]], "isOverall": false, "label": "PET CLINIC SUITES", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64356788E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.0, "maxY": 18.666666666666668, "series": [{"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/pets/5158", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/pets/5158-Aggregated", "isController": false}, {"data": [[1.0, 10.428571428571429], [3.0, 14.0]], "isOverall": false, "label": "GET /api/vets", "isController": false}, {"data": [[1.6, 11.5]], "isOverall": false, "label": "GET /api/vets-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pets/5159", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pets/5159-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pettypes/4758", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pettypes/4758-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/pettypes/4758", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/pettypes/4758-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4757", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4757-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "DELETE /api/pettypes/4754", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "DELETE /api/pettypes/4754-Aggregated", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "DELETE /api/owners/5150", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "DELETE /api/owners/5150-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/pettypes/4755", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/pettypes/4755-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/pettypes/4756", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/pettypes/4756-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/pettypes/4757", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/pettypes/4757-Aggregated", "isController": false}, {"data": [[4.0, 9.5]], "isOverall": false, "label": "DELETE /api/pettypes/4750", "isController": false}, {"data": [[4.0, 9.5]], "isOverall": false, "label": "DELETE /api/pettypes/4750-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/owners/5153", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/owners/5153-Aggregated", "isController": false}, {"data": [[4.0, 11.0]], "isOverall": false, "label": "DELETE /api/pettypes/4751", "isController": false}, {"data": [[4.0, 11.0]], "isOverall": false, "label": "DELETE /api/pettypes/4751-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/owners/5154", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/owners/5154-Aggregated", "isController": false}, {"data": [[4.0, 6.0]], "isOverall": false, "label": "DELETE /api/owners/5151", "isController": false}, {"data": [[4.0, 6.0]], "isOverall": false, "label": "DELETE /api/owners/5151-Aggregated", "isController": false}, {"data": [[1.0, 11.0]], "isOverall": false, "label": "DELETE /api/pettypes/4752", "isController": false}, {"data": [[1.0, 11.0]], "isOverall": false, "label": "DELETE /api/pettypes/4752-Aggregated", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "DELETE /api/owners/5152", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "DELETE /api/owners/5152-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/pettypes/4753", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/pettypes/4753-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/owners/5157", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/owners/5157-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/owners/5158", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/owners/5158-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/owners/5155", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/owners/5155-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/owners/5156", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/owners/5156-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/owners/5159", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/owners/5159-Aggregated", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "DELETE /api/vets/37", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "DELETE /api/vets/37-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pets/5156", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pets/5156-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/pets/5157", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/pets/5157-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pets/5154", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pets/5154-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/pets/5155", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/pets/5155-Aggregated", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/pets/5152", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/pets/5152-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/pets/5153", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/pets/5153-Aggregated", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/pets/5150", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/pets/5150-Aggregated", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/pets/5151", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/pets/5151-Aggregated", "isController": false}, {"data": [[1.0, 17.28571428571429], [2.0, 8.0], [4.0, 17.0], [3.0, 12.0]], "isOverall": false, "label": "POST /api/pettypes", "isController": false}, {"data": [[1.6, 15.8]], "isOverall": false, "label": "POST /api/pettypes-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5887", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5887-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5767", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5767-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev8359", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev8359-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6730", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6730-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1240", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1240-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/vets/1239", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/vets/1239-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1241", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1241-Aggregated", "isController": false}, {"data": [[3.0, 8.0]], "isOverall": false, "label": "PUT /api/vets/1238", "isController": false}, {"data": [[3.0, 8.0]], "isOverall": false, "label": "PUT /api/vets/1238-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1242", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1242-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/visits/5099", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/visits/5099-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1243", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1243-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1244", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1244-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1245", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1245-Aggregated", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/vets/37", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/vets/37-Aggregated", "isController": false}, {"data": [[4.0, 11.0], [1.0, 5.666666666666667], [3.0, 9.0]], "isOverall": false, "label": "POST /api/owners", "isController": false}, {"data": [[1.9, 7.2]], "isOverall": false, "label": "POST /api/owners-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/vets/1237", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/vets/1237-Aggregated", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "GET /api/visits/5092", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "GET /api/visits/5092-Aggregated", "isController": false}, {"data": [[4.0, 10.0]], "isOverall": false, "label": "GET /api/visits/5091", "isController": false}, {"data": [[4.0, 10.0]], "isOverall": false, "label": "GET /api/visits/5091-Aggregated", "isController": false}, {"data": [[1.0, 15.857142857142858], [3.0, 18.666666666666668]], "isOverall": false, "label": "GET /api/owners", "isController": false}, {"data": [[1.6, 16.700000000000003]], "isOverall": false, "label": "GET /api/owners-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/visits/5094", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/visits/5094-Aggregated", "isController": false}, {"data": [[4.0, 6.0]], "isOverall": false, "label": "GET /api/visits/5093", "isController": false}, {"data": [[4.0, 6.0]], "isOverall": false, "label": "GET /api/visits/5093-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/visits/5096", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/visits/5096-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/visits/5095", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/visits/5095-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/visits/5098", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/visits/5098-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/visits/5097", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/visits/5097-Aggregated", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "GET /api/pettypes/4752", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "GET /api/pettypes/4752-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/vets/1239", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/vets/1239-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/vets/1242", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/vets/1242-Aggregated", "isController": false}, {"data": [[3.0, 4.0]], "isOverall": false, "label": "GET /api/pettypes/4751", "isController": false}, {"data": [[3.0, 4.0]], "isOverall": false, "label": "GET /api/pettypes/4751-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "PUT /api/vets/1241", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "PUT /api/vets/1241-Aggregated", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4750", "isController": false}, {"data": [[2.0, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4750-Aggregated", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/vets/1237", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/vets/1237-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/vets/1244", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/vets/1244-Aggregated", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/vets/1238", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "GET /api/vets/1238-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/vets/1243", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/vets/1243-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1397", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1397-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4756", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4756-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4755", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4755-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "PUT /api/vets/1240", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "PUT /api/vets/1240-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4754", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4754-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4753", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4753-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/vets/1245", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/vets/1245-Aggregated", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "DELETE /api/vets/1237", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "DELETE /api/vets/1237-Aggregated", "isController": false}, {"data": [[4.0, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1238", "isController": false}, {"data": [[4.0, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1238-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "DELETE /api/vets/1239", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "DELETE /api/vets/1239-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pets/5159", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pets/5159-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "PUT /api/pets/5155", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "PUT /api/pets/5155-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "PUT /api/pets/5156", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "PUT /api/pets/5156-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pets/5157", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pets/5157-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/pets/5158", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/pets/5158-Aggregated", "isController": false}, {"data": [[3.0, 10.0]], "isOverall": false, "label": "PUT /api/pets/5151", "isController": false}, {"data": [[3.0, 10.0]], "isOverall": false, "label": "PUT /api/pets/5151-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/pets/5152", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/pets/5152-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pets/5153", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pets/5153-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "PUT /api/pets/5154", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "PUT /api/pets/5154-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/visits/5099", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/visits/5099-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/visits/5098", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/visits/5098-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/visits/5097", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/visits/5097-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1761", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1761-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "PUT /api/visits/5096", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "PUT /api/visits/5096-Aggregated", "isController": false}, {"data": [[1.0, 10.0]], "isOverall": false, "label": "PUT /api/visits/5095", "isController": false}, {"data": [[1.0, 10.0]], "isOverall": false, "label": "PUT /api/visits/5095-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/visits/5094", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/visits/5094-Aggregated", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "PUT /api/visits/5093", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "PUT /api/visits/5093-Aggregated", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "PUT /api/visits/5092", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "PUT /api/visits/5092-Aggregated", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "PUT /api/visits/5091", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "PUT /api/visits/5091-Aggregated", "isController": false}, {"data": [[1.0, 10.0]], "isOverall": false, "label": "PUT /api/owners/5158", "isController": false}, {"data": [[1.0, 10.0]], "isOverall": false, "label": "PUT /api/owners/5158-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/owners/5157", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/owners/5157-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/owners/5156", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/owners/5156-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "PUT /api/owners/5155", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "PUT /api/owners/5155-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/owners/5159", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/owners/5159-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/owners/5150", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/owners/5150-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/owners/5154", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/owners/5154-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/owners/5153", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/owners/5153-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/owners/5152", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/owners/5152-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/owners/5151", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/owners/5151-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6769", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6769-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/visits/5100", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/visits/5100-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/visits/5100", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/visits/5100-Aggregated", "isController": false}, {"data": [[1.0, 8.857142857142858], [3.0, 13.666666666666666]], "isOverall": false, "label": "GET /api/specialties", "isController": false}, {"data": [[1.6, 10.3]], "isOverall": false, "label": "GET /api/specialties-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4018", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4018-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5228", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5228-Aggregated", "isController": false}, {"data": [[1.0, 5.571428571428571], [3.0, 10.333333333333334]], "isOverall": false, "label": "POST /api/visits", "isController": false}, {"data": [[1.6, 7.000000000000001]], "isOverall": false, "label": "POST /api/visits-Aggregated", "isController": false}, {"data": [[4.0, 15.333333333333334], [1.0, 8.428571428571429]], "isOverall": false, "label": "GET /api/visits", "isController": false}, {"data": [[1.9, 10.5]], "isOverall": false, "label": "GET /api/visits-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/visits/5100", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/visits/5100-Aggregated", "isController": false}, {"data": [[3.0, 6.666666666666667]], "isOverall": false, "label": "GET /api/specialties/4419", "isController": false}, {"data": [[3.0, 6.666666666666667]], "isOverall": false, "label": "GET /api/specialties/4419-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/pets/5150", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/pets/5150-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/specialties/4425", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/specialties/4425-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/specialties/4426", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/specialties/4426-Aggregated", "isController": false}, {"data": [[1.0, 5.142857142857143], [3.0, 8.0]], "isOverall": false, "label": "POST /api/specialties", "isController": false}, {"data": [[1.6, 6.0]], "isOverall": false, "label": "POST /api/specialties-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4756", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4756-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/pettypes/4757", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/pettypes/4757-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4754", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4754-Aggregated", "isController": false}, {"data": [[2.0, 7.0], [1.0, 8.285714285714286], [4.0, 11.0], [3.0, 8.0]], "isOverall": false, "label": "GET /api/pettypes", "isController": false}, {"data": [[1.6, 8.399999999999999]], "isOverall": false, "label": "GET /api/pettypes-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4755", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4755-Aggregated", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "PUT /api/pettypes/4752", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "PUT /api/pettypes/4752-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/pettypes/4753", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/pettypes/4753-Aggregated", "isController": false}, {"data": [[2.0, 7.5]], "isOverall": false, "label": "PUT /api/pettypes/4750", "isController": false}, {"data": [[2.0, 7.5]], "isOverall": false, "label": "PUT /api/pettypes/4750-Aggregated", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "PUT /api/pettypes/4751", "isController": false}, {"data": [[3.0, 7.0]], "isOverall": false, "label": "PUT /api/pettypes/4751-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/specialties/4423", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/specialties/4423-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/specialties/4424", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/specialties/4424-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "GET /api/specialties/4421", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "GET /api/specialties/4421-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "GET /api/specialties/4422", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "GET /api/specialties/4422-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/specialties/4420", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/specialties/4420-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pettypes/4758", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pettypes/4758-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/vets/1242", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/vets/1242-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/vets/1243", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/vets/1243-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/vets/1240", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/vets/1240-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/vets/1241", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/vets/1241-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "PUT /api/specialties/4422", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "PUT /api/specialties/4422-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/specialties/4423", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/specialties/4423-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/specialties/4420", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/specialties/4420-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/specialties/4421", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "PUT /api/specialties/4421-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/visits/5094", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/visits/5094-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4426", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4426-Aggregated", "isController": false}, {"data": [[3.0, 10.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev9503", "isController": false}, {"data": [[3.0, 10.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev9503-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/visits/5095", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/visits/5095-Aggregated", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "DELETE /api/visits/5092", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "DELETE /api/visits/5092-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/specialties/4424", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/specialties/4424-Aggregated", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "DELETE /api/visits/5093", "isController": false}, {"data": [[4.0, 9.0]], "isOverall": false, "label": "DELETE /api/visits/5093-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/specialties/4425", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/specialties/4425-Aggregated", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "DELETE /api/visits/5091", "isController": false}, {"data": [[4.0, 8.0]], "isOverall": false, "label": "DELETE /api/visits/5091-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/vets/1244", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/vets/1244-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/vets/1245", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/vets/1245-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/visits/5098", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/visits/5098-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/visits/5099", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/visits/5099-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/visits/5096", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/visits/5096-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/visits/5097", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/visits/5097-Aggregated", "isController": false}, {"data": [[1.0, 6.428571428571428], [3.0, 9.0]], "isOverall": false, "label": "POST /api/pets", "isController": false}, {"data": [[1.6, 7.200000000000001]], "isOverall": false, "label": "POST /api/pets-Aggregated", "isController": false}, {"data": [[3.0, 6.333333333333333]], "isOverall": false, "label": "PUT /api/specialties/4419", "isController": false}, {"data": [[3.0, 6.333333333333333]], "isOverall": false, "label": "PUT /api/specialties/4419-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "DELETE /api/pets/5154", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "DELETE /api/pets/5154-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/owners/5159", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/owners/5159-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/pets/5153", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/pets/5153-Aggregated", "isController": false}, {"data": [[1.0, 11.0]], "isOverall": false, "label": "GET /api/owners/5158", "isController": false}, {"data": [[1.0, 11.0]], "isOverall": false, "label": "GET /api/owners/5158-Aggregated", "isController": false}, {"data": [[4.0, 10.0]], "isOverall": false, "label": "DELETE /api/pets/5152", "isController": false}, {"data": [[4.0, 10.0]], "isOverall": false, "label": "DELETE /api/pets/5152-Aggregated", "isController": false}, {"data": [[4.0, 12.0]], "isOverall": false, "label": "DELETE /api/pets/5151", "isController": false}, {"data": [[4.0, 12.0]], "isOverall": false, "label": "DELETE /api/pets/5151-Aggregated", "isController": false}, {"data": [[4.0, 11.0], [2.0, 12.0]], "isOverall": false, "label": "DELETE /api/specialties/4419", "isController": false}, {"data": [[3.3333333333333335, 11.333333333333334]], "isOverall": false, "label": "DELETE /api/specialties/4419-Aggregated", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/vets/37", "isController": false}, {"data": [[3.0, 9.0]], "isOverall": false, "label": "PUT /api/vets/37-Aggregated", "isController": false}, {"data": [[4.0, 13.0]], "isOverall": false, "label": "DELETE /api/pets/5150", "isController": false}, {"data": [[4.0, 13.0]], "isOverall": false, "label": "DELETE /api/pets/5150-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "GET /api/owners/5155", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "GET /api/owners/5155-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/owners/5154", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/owners/5154-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/5157", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/5157-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/owners/5156", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "GET /api/owners/5156-Aggregated", "isController": false}, {"data": [[1.0, 11.714285714285714], [3.0, 15.666666666666666]], "isOverall": false, "label": "GET /api/pets", "isController": false}, {"data": [[1.6, 12.899999999999999]], "isOverall": false, "label": "GET /api/pets-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5159", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5159-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/pets/5158", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "DELETE /api/pets/5158-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/pets/5157", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/pets/5157-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/pets/5156", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/pets/5156-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/pets/5155", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/pets/5155-Aggregated", "isController": false}, {"data": [[1.0, 5.714285714285714], [3.0, 9.333333333333334]], "isOverall": false, "label": "POST /api/vets", "isController": false}, {"data": [[1.6, 6.800000000000001]], "isOverall": false, "label": "POST /api/vets-Aggregated", "isController": false}, {"data": [[3.0, 8.0]], "isOverall": false, "label": "GET /api/owners/5151", "isController": false}, {"data": [[3.0, 8.0]], "isOverall": false, "label": "GET /api/owners/5151-Aggregated", "isController": false}, {"data": [[3.0, 8.0]], "isOverall": false, "label": "GET /api/owners/5150", "isController": false}, {"data": [[3.0, 8.0]], "isOverall": false, "label": "GET /api/owners/5150-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/owners/5153", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/owners/5153-Aggregated", "isController": false}, {"data": [[3.0, 6.0]], "isOverall": false, "label": "GET /api/owners/5152", "isController": false}, {"data": [[3.0, 6.0]], "isOverall": false, "label": "GET /api/owners/5152-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/specialties/4421", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/specialties/4421-Aggregated", "isController": false}, {"data": [[1.0, 10.0]], "isOverall": false, "label": "DELETE /api/specialties/4420", "isController": false}, {"data": [[1.0, 10.0]], "isOverall": false, "label": "DELETE /api/specialties/4420-Aggregated", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "DELETE /api/specialties/4423", "isController": false}, {"data": [[1.0, 8.0]], "isOverall": false, "label": "DELETE /api/specialties/4423-Aggregated", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/specialties/4422", "isController": false}, {"data": [[1.0, 7.0]], "isOverall": false, "label": "DELETE /api/specialties/4422-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/specialties/4425", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/specialties/4425-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/specialties/4424", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/specialties/4424-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4426", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4426-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 4.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 1570.4, "minX": 1.64356788E12, "maxY": 24483.683333333334, "series": [{"data": [[1.64356788E12, 24483.683333333334]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.64356788E12, 1570.4]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64356788E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.64356788E12, "maxY": 16.700000000000003, "series": [{"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/pets/5158", "isController": false}, {"data": [[1.64356788E12, 11.5]], "isOverall": false, "label": "GET /api/vets", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "GET /api/pets/5159", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "DELETE /api/pettypes/4758", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/pettypes/4758", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4757", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "DELETE /api/pettypes/4754", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "DELETE /api/owners/5150", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "DELETE /api/pettypes/4755", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "DELETE /api/pettypes/4756", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "DELETE /api/pettypes/4757", "isController": false}, {"data": [[1.64356788E12, 9.5]], "isOverall": false, "label": "DELETE /api/pettypes/4750", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "DELETE /api/owners/5153", "isController": false}, {"data": [[1.64356788E12, 11.0]], "isOverall": false, "label": "DELETE /api/pettypes/4751", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "DELETE /api/owners/5154", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "DELETE /api/owners/5151", "isController": false}, {"data": [[1.64356788E12, 11.0]], "isOverall": false, "label": "DELETE /api/pettypes/4752", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "DELETE /api/owners/5152", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "DELETE /api/pettypes/4753", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "DELETE /api/owners/5157", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "DELETE /api/owners/5158", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "DELETE /api/owners/5155", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "DELETE /api/owners/5156", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "DELETE /api/owners/5159", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "DELETE /api/vets/37", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/pets/5156", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/pets/5157", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/pets/5154", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pets/5155", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pets/5152", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/pets/5153", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pets/5150", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pets/5151", "isController": false}, {"data": [[1.64356788E12, 15.8]], "isOverall": false, "label": "POST /api/pettypes", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5887", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5767", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev8359", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6730", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1240", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/vets/1239", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1241", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "PUT /api/vets/1238", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1242", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/visits/5099", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1243", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1244", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1245", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/vets/37", "isController": false}, {"data": [[1.64356788E12, 7.2]], "isOverall": false, "label": "POST /api/owners", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/vets/1237", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/visits/5092", "isController": false}, {"data": [[1.64356788E12, 10.0]], "isOverall": false, "label": "GET /api/visits/5091", "isController": false}, {"data": [[1.64356788E12, 16.700000000000003]], "isOverall": false, "label": "GET /api/owners", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/visits/5094", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/visits/5093", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/visits/5096", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/visits/5095", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/visits/5098", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/visits/5097", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/pettypes/4752", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/vets/1239", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "PUT /api/vets/1242", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/pettypes/4751", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "PUT /api/vets/1241", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4750", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/vets/1237", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "PUT /api/vets/1244", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/vets/1238", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "PUT /api/vets/1243", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1397", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4756", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4755", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "PUT /api/vets/1240", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4754", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4753", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "PUT /api/vets/1245", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "DELETE /api/vets/1237", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "DELETE /api/vets/1238", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "DELETE /api/vets/1239", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "PUT /api/pets/5159", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/pets/5155", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "PUT /api/pets/5156", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "PUT /api/pets/5157", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/pets/5158", "isController": false}, {"data": [[1.64356788E12, 10.0]], "isOverall": false, "label": "PUT /api/pets/5151", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/pets/5152", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "PUT /api/pets/5153", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/pets/5154", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/visits/5099", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "PUT /api/visits/5098", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "PUT /api/visits/5097", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1761", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "PUT /api/visits/5096", "isController": false}, {"data": [[1.64356788E12, 10.0]], "isOverall": false, "label": "PUT /api/visits/5095", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/visits/5094", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/visits/5093", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/visits/5092", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/visits/5091", "isController": false}, {"data": [[1.64356788E12, 10.0]], "isOverall": false, "label": "PUT /api/owners/5158", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "PUT /api/owners/5157", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/owners/5156", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/owners/5155", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "PUT /api/owners/5159", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/owners/5150", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/owners/5154", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/owners/5153", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/owners/5152", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/owners/5151", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6769", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "GET /api/visits/5100", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "DELETE /api/visits/5100", "isController": false}, {"data": [[1.64356788E12, 10.3]], "isOverall": false, "label": "GET /api/specialties", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4018", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5228", "isController": false}, {"data": [[1.64356788E12, 7.000000000000001]], "isOverall": false, "label": "POST /api/visits", "isController": false}, {"data": [[1.64356788E12, 10.5]], "isOverall": false, "label": "GET /api/visits", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "PUT /api/visits/5100", "isController": false}, {"data": [[1.64356788E12, 6.666666666666667]], "isOverall": false, "label": "GET /api/specialties/4419", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/pets/5150", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/specialties/4425", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "GET /api/specialties/4426", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "POST /api/specialties", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4756", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/pettypes/4757", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4754", "isController": false}, {"data": [[1.64356788E12, 8.399999999999999]], "isOverall": false, "label": "GET /api/pettypes", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4755", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/pettypes/4752", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/pettypes/4753", "isController": false}, {"data": [[1.64356788E12, 7.5]], "isOverall": false, "label": "PUT /api/pettypes/4750", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/pettypes/4751", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/specialties/4423", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/specialties/4424", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "GET /api/specialties/4421", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/specialties/4422", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/specialties/4420", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "PUT /api/pettypes/4758", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/vets/1242", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/vets/1243", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/vets/1240", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/vets/1241", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/specialties/4422", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "PUT /api/specialties/4423", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/specialties/4420", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "PUT /api/specialties/4421", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "DELETE /api/visits/5094", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4426", "isController": false}, {"data": [[1.64356788E12, 10.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev9503", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "DELETE /api/visits/5095", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "DELETE /api/visits/5092", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "PUT /api/specialties/4424", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "DELETE /api/visits/5093", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "PUT /api/specialties/4425", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "DELETE /api/visits/5091", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/vets/1244", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "GET /api/vets/1245", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "DELETE /api/visits/5098", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "DELETE /api/visits/5099", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "DELETE /api/visits/5096", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "DELETE /api/visits/5097", "isController": false}, {"data": [[1.64356788E12, 7.200000000000001]], "isOverall": false, "label": "POST /api/pets", "isController": false}, {"data": [[1.64356788E12, 6.333333333333333]], "isOverall": false, "label": "PUT /api/specialties/4419", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "DELETE /api/pets/5154", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "GET /api/owners/5159", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "DELETE /api/pets/5153", "isController": false}, {"data": [[1.64356788E12, 11.0]], "isOverall": false, "label": "GET /api/owners/5158", "isController": false}, {"data": [[1.64356788E12, 10.0]], "isOverall": false, "label": "DELETE /api/pets/5152", "isController": false}, {"data": [[1.64356788E12, 12.0]], "isOverall": false, "label": "DELETE /api/pets/5151", "isController": false}, {"data": [[1.64356788E12, 11.333333333333334]], "isOverall": false, "label": "DELETE /api/specialties/4419", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "PUT /api/vets/37", "isController": false}, {"data": [[1.64356788E12, 13.0]], "isOverall": false, "label": "DELETE /api/pets/5150", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/owners/5155", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/owners/5154", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/owners/5157", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/owners/5156", "isController": false}, {"data": [[1.64356788E12, 12.899999999999999]], "isOverall": false, "label": "GET /api/pets", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5159", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "DELETE /api/pets/5158", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "DELETE /api/pets/5157", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "DELETE /api/pets/5156", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "DELETE /api/pets/5155", "isController": false}, {"data": [[1.64356788E12, 6.800000000000001]], "isOverall": false, "label": "POST /api/vets", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/owners/5151", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/owners/5150", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/owners/5153", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/owners/5152", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "DELETE /api/specialties/4421", "isController": false}, {"data": [[1.64356788E12, 10.0]], "isOverall": false, "label": "DELETE /api/specialties/4420", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "DELETE /api/specialties/4423", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "DELETE /api/specialties/4422", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "DELETE /api/specialties/4425", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "DELETE /api/specialties/4424", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4426", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64356788E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.64356788E12, "maxY": 15.699999999999998, "series": [{"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/pets/5158", "isController": false}, {"data": [[1.64356788E12, 11.3]], "isOverall": false, "label": "GET /api/vets", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "GET /api/pets/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4758", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/pettypes/4758", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4757", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4754", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5150", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4755", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4756", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4757", "isController": false}, {"data": [[1.64356788E12, 4.5]], "isOverall": false, "label": "DELETE /api/pettypes/4750", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5153", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4751", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5154", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5151", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4752", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5152", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4753", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5157", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5158", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5155", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5156", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/37", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/pets/5156", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/pets/5157", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/pets/5154", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pets/5155", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/pets/5152", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/pets/5153", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pets/5150", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pets/5151", "isController": false}, {"data": [[1.64356788E12, 15.199999999999996]], "isOverall": false, "label": "POST /api/pettypes", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5887", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5767", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev8359", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6730", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1240", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1239", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1241", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1238", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1242", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/visits/5099", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1243", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1244", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1245", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/vets/37", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "POST /api/owners", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1237", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/visits/5092", "isController": false}, {"data": [[1.64356788E12, 10.0]], "isOverall": false, "label": "GET /api/visits/5091", "isController": false}, {"data": [[1.64356788E12, 15.699999999999998]], "isOverall": false, "label": "GET /api/owners", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/visits/5094", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/visits/5093", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/visits/5096", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/visits/5095", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/visits/5098", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/visits/5097", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/pettypes/4752", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/vets/1239", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1242", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/pettypes/4751", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1241", "isController": false}, {"data": [[1.64356788E12, 6.5]], "isOverall": false, "label": "GET /api/pettypes/4750", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/vets/1237", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1244", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/vets/1238", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1243", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1397", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4756", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/pettypes/4755", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1240", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4754", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4753", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1245", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1237", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1238", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1239", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5155", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5156", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5157", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5158", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5151", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5152", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5153", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5154", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5099", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5098", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5097", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1761", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5096", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5095", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5094", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5093", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5092", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5091", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5158", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5157", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5156", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5155", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5150", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5154", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5153", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5152", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5151", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6769", "isController": false}, {"data": [[1.64356788E12, 2.0]], "isOverall": false, "label": "GET /api/visits/5100", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5100", "isController": false}, {"data": [[1.64356788E12, 9.499999999999998]], "isOverall": false, "label": "GET /api/specialties", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4018", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5228", "isController": false}, {"data": [[1.64356788E12, 7.000000000000001]], "isOverall": false, "label": "POST /api/visits", "isController": false}, {"data": [[1.64356788E12, 10.4]], "isOverall": false, "label": "GET /api/visits", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5100", "isController": false}, {"data": [[1.64356788E12, 6.666666666666667]], "isOverall": false, "label": "GET /api/specialties/4419", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5150", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/specialties/4425", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "GET /api/specialties/4426", "isController": false}, {"data": [[1.64356788E12, 5.9]], "isOverall": false, "label": "POST /api/specialties", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4756", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4757", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4754", "isController": false}, {"data": [[1.64356788E12, 8.3]], "isOverall": false, "label": "GET /api/pettypes", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4755", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4752", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4753", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4750", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4751", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/specialties/4423", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/specialties/4424", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/specialties/4421", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/specialties/4422", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/specialties/4420", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4758", "isController": false}, {"data": [[1.64356788E12, 5.0]], "isOverall": false, "label": "GET /api/vets/1242", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/vets/1243", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/vets/1240", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/vets/1241", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4422", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4423", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4420", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4421", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5094", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4426", "isController": false}, {"data": [[1.64356788E12, 9.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev9503", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5095", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5092", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4424", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5093", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4425", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5091", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/vets/1244", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "GET /api/vets/1245", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5098", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5099", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5096", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5097", "isController": false}, {"data": [[1.64356788E12, 6.9]], "isOverall": false, "label": "POST /api/pets", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4419", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5154", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "GET /api/owners/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5153", "isController": false}, {"data": [[1.64356788E12, 10.0]], "isOverall": false, "label": "GET /api/owners/5158", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5152", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5151", "isController": false}, {"data": [[1.64356788E12, 10.666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4419", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/37", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5150", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/owners/5155", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/owners/5154", "isController": false}, {"data": [[1.64356788E12, 4.0]], "isOverall": false, "label": "GET /api/owners/5157", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "GET /api/owners/5156", "isController": false}, {"data": [[1.64356788E12, 12.5]], "isOverall": false, "label": "GET /api/pets", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5158", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5157", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5156", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5155", "isController": false}, {"data": [[1.64356788E12, 6.300000000000001]], "isOverall": false, "label": "POST /api/vets", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/owners/5151", "isController": false}, {"data": [[1.64356788E12, 8.0]], "isOverall": false, "label": "GET /api/owners/5150", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/owners/5153", "isController": false}, {"data": [[1.64356788E12, 6.0]], "isOverall": false, "label": "GET /api/owners/5152", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4421", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4420", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4423", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4422", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4425", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4424", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4426", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64356788E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.64356788E12, "maxY": 6.4, "series": [{"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5158", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/vets", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4758", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4758", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4757", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4754", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5150", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4755", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4756", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4757", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4750", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5153", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4751", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5154", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5151", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4752", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5152", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4753", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5157", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5158", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5155", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5156", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/37", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5156", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5157", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5154", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5155", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5152", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5153", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5150", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5151", "isController": false}, {"data": [[1.64356788E12, 6.4]], "isOverall": false, "label": "POST /api/pettypes", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5887", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5767", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev8359", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6730", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1240", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1239", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1241", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1238", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1242", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5099", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1243", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1244", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1245", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/vets/37", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "POST /api/owners", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1237", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5092", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5091", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5094", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5093", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5096", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5095", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5098", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5097", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4752", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1239", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1242", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4751", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1241", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4750", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1237", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1244", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1238", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1243", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1397", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4756", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4755", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1240", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4754", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4753", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1245", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1237", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1238", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1239", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5155", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5156", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5157", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5158", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5151", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5152", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5153", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5154", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5099", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5098", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5097", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1761", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5096", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5095", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5094", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5093", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5092", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5091", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5158", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5157", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5156", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5155", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5150", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5154", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5153", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5152", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5151", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6769", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5100", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5100", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/specialties", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4018", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5228", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "POST /api/visits", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/visits", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5100", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4419", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5150", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4425", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4426", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "POST /api/specialties", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4756", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4757", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4754", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4755", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4752", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4753", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4750", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4751", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4423", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4424", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4421", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4422", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4420", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4758", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1242", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1243", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1240", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1241", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4422", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4423", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4420", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4421", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5094", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4426", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev9503", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5095", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5092", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4424", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5093", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4425", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5091", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1244", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1245", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5098", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5099", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5096", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5097", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "POST /api/pets", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4419", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5154", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5153", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5158", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5152", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5151", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4419", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/37", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5150", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5155", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5154", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5157", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5156", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/pets", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5159", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5158", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5157", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5156", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5155", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "POST /api/vets", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5151", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5150", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5153", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5152", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4421", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4420", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4423", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4422", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4425", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4424", "isController": false}, {"data": [[1.64356788E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4426", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64356788E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.64356788E12, "maxY": 67.0, "series": [{"data": [[1.64356788E12, 67.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.64356788E12, 12.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.64356788E12, 23.650000000000034]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.64356788E12, 14.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.64356788E12, 3.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.64356788E12, 7.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64356788E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 3.0, "minX": 2.0, "maxY": 36.5, "series": [{"data": [[2.0, 36.5], [67.0, 9.0], [86.0, 8.0], [62.0, 6.5], [31.0, 3.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[86.0, 11.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 86.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 2.5, "minX": 2.0, "maxY": 33.5, "series": [{"data": [[2.0, 33.5], [67.0, 8.0], [86.0, 2.5], [62.0, 4.5], [31.0, 3.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[86.0, 10.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 86.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 5.166666666666667, "minX": 1.64356788E12, "maxY": 5.166666666666667, "series": [{"data": [[1.64356788E12, 5.166666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64356788E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.64356788E12, "maxY": 2.1666666666666665, "series": [{"data": [[1.64356788E12, 2.1666666666666665]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.64356788E12, 1.0]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.64356788E12, 0.05]], "isOverall": false, "label": "400", "isController": false}, {"data": [[1.64356788E12, 1.9333333333333333]], "isOverall": false, "label": "204", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "404", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64356788E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.64356788E12, "maxY": 0.16666666666666666, "series": [{"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4758-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1244-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6769-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1242-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev9503-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5152-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5096-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4752-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4425-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5099-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4422-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5099-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "GET /api/vets-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5100-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5152-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5155-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5152-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "POST /api/visits-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "POST /api/owners-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1243-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4424-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5098-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5151-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5151-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5155-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4421-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4755-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1761-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5152-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5091-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5092-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4755-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5157-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1238-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5100-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1239-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5157-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1238-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5095-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4752-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5154-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5157-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5154-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4751-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4420-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1240-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5094-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4758-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5091-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "GET /api/pettypes-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1244-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4754-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1245-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5094-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5150-success", "isController": false}, {"data": [[1.64356788E12, 0.05]], "isOverall": false, "label": "GET /api/specialties/4419-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5093-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5156-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5096-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5157-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4757-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5158-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4754-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "POST /api/vets-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5154-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5153-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1237-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4757-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5093-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5157-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4422-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5159-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4757-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "GET /api/visits-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1241-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5158-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5159-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5151-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5097-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5154-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/37-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5887-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1241-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5152-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4425-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4422-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5151-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5154-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5096-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5155-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1242-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/37-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5158-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5092-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4420-success", "isController": false}, {"data": [[1.64356788E12, 0.05]], "isOverall": false, "label": "DELETE /api/specialties/4419-failure", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5091-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4754-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5159-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5151-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6730-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1237-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5228-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5156-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1238-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev8359-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1239-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5155-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5159-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4751-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1240-success", "isController": false}, {"data": [[1.64356788E12, 0.05]], "isOverall": false, "label": "PUT /api/specialties/4419-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4752-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5095-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5156-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5159-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5092-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4421-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4426-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5150-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1244-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1243-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5095-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4751-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4420-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5153-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5157-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5150-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4755-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5156-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5098-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5156-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4758-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5098-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4423-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4424-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4425-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5153-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5150-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev5767-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5099-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1243-success", "isController": false}, {"data": [[1.64356788E12, 0.03333333333333333]], "isOverall": false, "label": "GET /api/pettypes/4750-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4750-failure", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4756-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4426-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5150-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1240-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5158-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5153-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4423-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4424-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5097-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5153-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5153-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1241-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1242-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "POST /api/pets-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4750-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5154-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4753-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1245-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/37-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1245-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev1397-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "POST /api/specialties-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5155-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5094-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5150-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4018-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4753-success", "isController": false}, {"data": [[1.64356788E12, 0.03333333333333333]], "isOverall": false, "label": "PUT /api/pettypes/4750-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1239-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4421-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4756-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "GET /api/owners-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4426-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "GET /api/specialties-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5156-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5151-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4753-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5159-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1237-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5097-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "GET /api/pets-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5155-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5158-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5158-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5093-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4756-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5100-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4423-success", "isController": false}, {"data": [[1.64356788E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5152-success", "isController": false}, {"data": [[1.64356788E12, 0.16666666666666666]], "isOverall": false, "label": "POST /api/pettypes-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64356788E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.64356788E12, "maxY": 5.1, "series": [{"data": [[1.64356788E12, 5.1]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.64356788E12, 0.06666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64356788E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
