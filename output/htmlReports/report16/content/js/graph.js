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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 5.0, "series": [{"data": [[0.0, 5.0]], "isOverall": false, "label": "GET /api/specialties", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "GET /api/vets", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4452", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4455", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4456", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4453", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/specialties/4454", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "POST /api/visits", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "GET /api/visits", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5189", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5189", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5190", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "POST /api/pettypes", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5190", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5193", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5192", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pets/5191", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4454", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4453", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4456", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4455", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5133", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5132", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5134", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "POST /api/owners", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5193", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "GET /api/owners", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5192", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/owners/5191", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5191", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5190", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5131", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5193", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/visits/5130", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5192", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/5189", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "POST /api/specialties", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "GET /api/pettypes", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5189", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6118", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4059", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5190", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5133", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5134", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5131", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5193", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5132", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5191", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/visits/5130", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/owners/5192", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "POST /api/pets", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev3871", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4787", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4788", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/specialties/4452", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4789", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5192", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5193", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4785", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5190", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/pettypes/4786", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5191", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5132", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5131", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5130", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4785", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1275", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5189", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1277", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "GET /api/pets", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1276", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev2970", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4789", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4788", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4787", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pettypes/4786", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/pets/5189", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5191", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4789", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5192", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4787", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5193", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4788", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4785", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "POST /api/vets", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1279", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pettypes/4786", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/vets/1278", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/pets/5190", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4456", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4454", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4455", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4452", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/specialties/4453", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5134", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "PUT /api/visits/5133", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1275", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1276", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1279", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1277", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/vets/1278", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1275", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1276", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1277", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev7291", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1278", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "DELETE /api/vets/1279", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 4.9E-324, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 155.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 155.0, "series": [{"data": [[0.0, 155.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 4.9E-324, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.64356836E12, "maxY": 1.0, "series": [{"data": [[1.64356836E12, 1.0]], "isOverall": false, "label": "PET CLINIC SUITES", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64356836E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.0, "maxY": 15.0, "series": [{"data": [[1.0, 6.8]], "isOverall": false, "label": "GET /api/specialties", "isController": false}, {"data": [[1.0, 6.8]], "isOverall": false, "label": "GET /api/specialties-Aggregated", "isController": false}, {"data": [[1.0, 7.6]], "isOverall": false, "label": "GET /api/vets", "isController": false}, {"data": [[1.0, 7.6]], "isOverall": false, "label": "GET /api/vets-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4452", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4452-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4455", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4455-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4456", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4456-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/specialties/4453", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/specialties/4453-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/specialties/4454", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/specialties/4454-Aggregated", "isController": false}, {"data": [[1.0, 3.2]], "isOverall": false, "label": "POST /api/visits", "isController": false}, {"data": [[1.0, 3.2]], "isOverall": false, "label": "POST /api/visits-Aggregated", "isController": false}, {"data": [[1.0, 5.4]], "isOverall": false, "label": "GET /api/visits", "isController": false}, {"data": [[1.0, 5.4]], "isOverall": false, "label": "GET /api/visits-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5189", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5189-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/owners/5189", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/owners/5189-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/pets/5190", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/pets/5190-Aggregated", "isController": false}, {"data": [[1.0, 12.0]], "isOverall": false, "label": "POST /api/pettypes", "isController": false}, {"data": [[1.0, 12.0]], "isOverall": false, "label": "POST /api/pettypes-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/owners/5190", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/owners/5190-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5193", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5193-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5192", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5192-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/pets/5191", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/pets/5191-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/specialties/4454", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/specialties/4454-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4453", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4453-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4456", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4456-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4455", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4455-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/visits/5133", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/visits/5133-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/visits/5132", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/visits/5132-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/visits/5134", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/visits/5134-Aggregated", "isController": false}, {"data": [[1.0, 4.8]], "isOverall": false, "label": "POST /api/owners", "isController": false}, {"data": [[1.0, 4.8]], "isOverall": false, "label": "POST /api/owners-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/owners/5193", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/owners/5193-Aggregated", "isController": false}, {"data": [[1.0, 15.0]], "isOverall": false, "label": "GET /api/owners", "isController": false}, {"data": [[1.0, 15.0]], "isOverall": false, "label": "GET /api/owners-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/owners/5192", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/owners/5192-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/owners/5191", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/owners/5191-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/owners/5191", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/owners/5191-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/owners/5190", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/owners/5190-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/visits/5131", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/visits/5131-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/owners/5193", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/owners/5193-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/visits/5130", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/visits/5130-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/5192", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/5192-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/owners/5189", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/owners/5189-Aggregated", "isController": false}, {"data": [[1.0, 3.4]], "isOverall": false, "label": "POST /api/specialties", "isController": false}, {"data": [[1.0, 3.4]], "isOverall": false, "label": "POST /api/specialties-Aggregated", "isController": false}, {"data": [[1.0, 13.8]], "isOverall": false, "label": "GET /api/pettypes", "isController": false}, {"data": [[1.0, 13.8]], "isOverall": false, "label": "GET /api/pettypes-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/owners/5189", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/owners/5189-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6118", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6118-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4059", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4059-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/owners/5190", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/owners/5190-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "DELETE /api/visits/5133", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "DELETE /api/visits/5133-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/visits/5134", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/visits/5134-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/visits/5131", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/visits/5131-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "DELETE /api/owners/5193", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "DELETE /api/owners/5193-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/visits/5132", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/visits/5132-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/owners/5191", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/owners/5191-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/visits/5130", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/visits/5130-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/owners/5192", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/owners/5192-Aggregated", "isController": false}, {"data": [[1.0, 4.2]], "isOverall": false, "label": "POST /api/pets", "isController": false}, {"data": [[1.0, 4.2]], "isOverall": false, "label": "POST /api/pets-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev3871", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev3871-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/pettypes/4787", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/pettypes/4787-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pettypes/4788", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pettypes/4788-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/specialties/4452", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/specialties/4452-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pettypes/4789", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/pettypes/4789-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pets/5192", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pets/5192-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/pets/5193", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/pets/5193-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/pettypes/4785", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/pettypes/4785-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/pets/5190", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/pets/5190-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/pettypes/4786", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/pettypes/4786-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pets/5191", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pets/5191-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/visits/5132", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/visits/5132-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/visits/5131", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/visits/5131-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/visits/5130", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/visits/5130-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pettypes/4785", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pettypes/4785-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/vets/1275", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/vets/1275-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pets/5189", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pets/5189-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/vets/1277", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/vets/1277-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "GET /api/pets", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "GET /api/pets-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/vets/1276", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/vets/1276-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev2970", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev2970-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pettypes/4789", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pettypes/4789-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4788", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4788-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/pettypes/4787", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "GET /api/pettypes/4787-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4786", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4786-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pets/5189", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/pets/5189-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pets/5191", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pets/5191-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/pettypes/4789", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/pettypes/4789-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pets/5192", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/pets/5192-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/pettypes/4787", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/pettypes/4787-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/pets/5193", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/pets/5193-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4788", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4788-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/pettypes/4785", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "PUT /api/pettypes/4785-Aggregated", "isController": false}, {"data": [[1.0, 3.6]], "isOverall": false, "label": "POST /api/vets", "isController": false}, {"data": [[1.0, 3.6]], "isOverall": false, "label": "POST /api/vets-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/vets/1279", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "PUT /api/vets/1279-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4786", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4786-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "PUT /api/vets/1278", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "PUT /api/vets/1278-Aggregated", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pets/5190", "isController": false}, {"data": [[1.0, 6.0]], "isOverall": false, "label": "PUT /api/pets/5190-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/specialties/4456", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/specialties/4456-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/specialties/4454", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/specialties/4454-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/specialties/4455", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/specialties/4455-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/specialties/4452", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/specialties/4452-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/specialties/4453", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/specialties/4453-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/visits/5134", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/visits/5134-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/visits/5133", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "PUT /api/visits/5133-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/vets/1275", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/vets/1275-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/vets/1276", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/vets/1276-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/vets/1279", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/vets/1279-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/vets/1277", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "GET /api/vets/1277-Aggregated", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/vets/1278", "isController": false}, {"data": [[1.0, 2.0]], "isOverall": false, "label": "GET /api/vets/1278-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1275", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1275-Aggregated", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/vets/1276", "isController": false}, {"data": [[1.0, 5.0]], "isOverall": false, "label": "DELETE /api/vets/1276-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/vets/1277", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "DELETE /api/vets/1277-Aggregated", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev7291", "isController": false}, {"data": [[1.0, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev7291-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1278", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1278-Aggregated", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1279", "isController": false}, {"data": [[1.0, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1279-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 0.0, "minX": 1.64356836E12, "maxY": 12211.666666666666, "series": [{"data": [[1.64356836E12, 12211.666666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64356836E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.64356836E12, "maxY": 15.0, "series": [{"data": [[1.64356836E12, 6.8]], "isOverall": false, "label": "GET /api/specialties", "isController": false}, {"data": [[1.64356836E12, 7.6]], "isOverall": false, "label": "GET /api/vets", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4452", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4455", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "PUT /api/specialties/4456", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "PUT /api/specialties/4453", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "PUT /api/specialties/4454", "isController": false}, {"data": [[1.64356836E12, 3.2]], "isOverall": false, "label": "POST /api/visits", "isController": false}, {"data": [[1.64356836E12, 5.4]], "isOverall": false, "label": "GET /api/visits", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5189", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "PUT /api/owners/5189", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "DELETE /api/pets/5190", "isController": false}, {"data": [[1.64356836E12, 12.0]], "isOverall": false, "label": "POST /api/pettypes", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "PUT /api/owners/5190", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5193", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/pets/5192", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "DELETE /api/pets/5191", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "DELETE /api/specialties/4454", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4453", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4456", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/specialties/4455", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/visits/5133", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/visits/5132", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/visits/5134", "isController": false}, {"data": [[1.64356836E12, 4.8]], "isOverall": false, "label": "POST /api/owners", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "PUT /api/owners/5193", "isController": false}, {"data": [[1.64356836E12, 15.0]], "isOverall": false, "label": "GET /api/owners", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "PUT /api/owners/5192", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "PUT /api/owners/5191", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/owners/5191", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "GET /api/owners/5190", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/visits/5131", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/owners/5193", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/visits/5130", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/owners/5192", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/owners/5189", "isController": false}, {"data": [[1.64356836E12, 3.4]], "isOverall": false, "label": "POST /api/specialties", "isController": false}, {"data": [[1.64356836E12, 13.8]], "isOverall": false, "label": "GET /api/pettypes", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/owners/5189", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6118", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4059", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "DELETE /api/owners/5190", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "DELETE /api/visits/5133", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/visits/5134", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "DELETE /api/visits/5131", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "DELETE /api/owners/5193", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "DELETE /api/visits/5132", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "DELETE /api/owners/5191", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/visits/5130", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/owners/5192", "isController": false}, {"data": [[1.64356836E12, 4.2]], "isOverall": false, "label": "POST /api/pets", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev3871", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "DELETE /api/pettypes/4787", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/pettypes/4788", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "DELETE /api/specialties/4452", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/pettypes/4789", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/pets/5192", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/pets/5193", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "DELETE /api/pettypes/4785", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "GET /api/pets/5190", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "DELETE /api/pettypes/4786", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/pets/5191", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "PUT /api/visits/5132", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "PUT /api/visits/5131", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "PUT /api/visits/5130", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/pettypes/4785", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "PUT /api/vets/1275", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "PUT /api/pets/5189", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "PUT /api/vets/1277", "isController": false}, {"data": [[1.64356836E12, 9.0]], "isOverall": false, "label": "GET /api/pets", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "PUT /api/vets/1276", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev2970", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/pettypes/4789", "isController": false}, {"data": [[1.64356836E12, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4788", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "GET /api/pettypes/4787", "isController": false}, {"data": [[1.64356836E12, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4786", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/pets/5189", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "PUT /api/pets/5191", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "PUT /api/pettypes/4789", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "PUT /api/pets/5192", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "PUT /api/pettypes/4787", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "PUT /api/pets/5193", "isController": false}, {"data": [[1.64356836E12, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4788", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "PUT /api/pettypes/4785", "isController": false}, {"data": [[1.64356836E12, 3.6]], "isOverall": false, "label": "POST /api/vets", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "PUT /api/vets/1279", "isController": false}, {"data": [[1.64356836E12, 6.0]], "isOverall": false, "label": "PUT /api/pettypes/4786", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "PUT /api/vets/1278", "isController": false}, {"data": [[1.64356836E12, 6.0]], "isOverall": false, "label": "PUT /api/pets/5190", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/specialties/4456", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/specialties/4454", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/specialties/4455", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/specialties/4452", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/specialties/4453", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "PUT /api/visits/5134", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "PUT /api/visits/5133", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/vets/1275", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/vets/1276", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/vets/1279", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/vets/1277", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/vets/1278", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1275", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "DELETE /api/vets/1276", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "DELETE /api/vets/1277", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev7291", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1278", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "DELETE /api/vets/1279", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64356836E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.64356836E12, "maxY": 14.6, "series": [{"data": [[1.64356836E12, 6.0]], "isOverall": false, "label": "GET /api/specialties", "isController": false}, {"data": [[1.64356836E12, 7.4]], "isOverall": false, "label": "GET /api/vets", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4452", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4455", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4456", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4453", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4454", "isController": false}, {"data": [[1.64356836E12, 3.2]], "isOverall": false, "label": "POST /api/visits", "isController": false}, {"data": [[1.64356836E12, 5.4]], "isOverall": false, "label": "GET /api/visits", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5189", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5189", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5190", "isController": false}, {"data": [[1.64356836E12, 11.8]], "isOverall": false, "label": "POST /api/pettypes", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5190", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5193", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5192", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5191", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4454", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4453", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4456", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4455", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/visits/5133", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/visits/5132", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/visits/5134", "isController": false}, {"data": [[1.64356836E12, 4.8]], "isOverall": false, "label": "POST /api/owners", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5193", "isController": false}, {"data": [[1.64356836E12, 14.6]], "isOverall": false, "label": "GET /api/owners", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5192", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5191", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/owners/5191", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "GET /api/owners/5190", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/visits/5131", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/owners/5193", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/visits/5130", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/owners/5192", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/owners/5189", "isController": false}, {"data": [[1.64356836E12, 3.4]], "isOverall": false, "label": "POST /api/specialties", "isController": false}, {"data": [[1.64356836E12, 13.4]], "isOverall": false, "label": "GET /api/pettypes", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5189", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6118", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4059", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5190", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5133", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5134", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5131", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5193", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5132", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5191", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5130", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5192", "isController": false}, {"data": [[1.64356836E12, 4.2]], "isOverall": false, "label": "POST /api/pets", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev3871", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4787", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4788", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4452", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4789", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/pets/5192", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/pets/5193", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4785", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "GET /api/pets/5190", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4786", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/pets/5191", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5132", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5131", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5130", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/pettypes/4785", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1275", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5189", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1277", "isController": false}, {"data": [[1.64356836E12, 9.0]], "isOverall": false, "label": "GET /api/pets", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1276", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev2970", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/pettypes/4789", "isController": false}, {"data": [[1.64356836E12, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4788", "isController": false}, {"data": [[1.64356836E12, 5.0]], "isOverall": false, "label": "GET /api/pettypes/4787", "isController": false}, {"data": [[1.64356836E12, 6.0]], "isOverall": false, "label": "GET /api/pettypes/4786", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/pets/5189", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5191", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4789", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5192", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4787", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5193", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4788", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4785", "isController": false}, {"data": [[1.64356836E12, 3.6]], "isOverall": false, "label": "POST /api/vets", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1279", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4786", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1278", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5190", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/specialties/4456", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/specialties/4454", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/specialties/4455", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/specialties/4452", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/specialties/4453", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5134", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5133", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/vets/1275", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/vets/1276", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/vets/1279", "isController": false}, {"data": [[1.64356836E12, 3.0]], "isOverall": false, "label": "GET /api/vets/1277", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "GET /api/vets/1278", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1275", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1276", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1277", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev7291", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1278", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1279", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64356836E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.64356836E12, "maxY": 4.9E-324, "series": [{"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/specialties", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/vets", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4452", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4455", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4456", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4453", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/specialties/4454", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "POST /api/visits", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/visits", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5189", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5189", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5190", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "POST /api/pettypes", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5190", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5193", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5192", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pets/5191", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4454", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4453", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4456", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4455", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5133", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5132", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5134", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "POST /api/owners", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5193", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/owners", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5192", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/owners/5191", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5191", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5190", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5131", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5193", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/visits/5130", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5192", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/owners/5189", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "POST /api/specialties", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5189", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6118", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4059", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5190", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5133", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5134", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5131", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5193", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5132", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5191", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/visits/5130", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/owners/5192", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "POST /api/pets", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev3871", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4787", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4788", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/specialties/4452", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4789", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5192", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5193", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4785", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5190", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/pettypes/4786", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5191", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5132", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5131", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5130", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4785", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1275", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5189", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1277", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pets", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1276", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev2970", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4789", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4788", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4787", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pettypes/4786", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/pets/5189", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5191", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4789", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5192", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4787", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5193", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4788", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4785", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "POST /api/vets", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1279", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pettypes/4786", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/vets/1278", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/pets/5190", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4456", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4454", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4455", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4452", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/specialties/4453", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5134", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "PUT /api/visits/5133", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1275", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1276", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1279", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1277", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/vets/1278", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1275", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1276", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1277", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev7291", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1278", "isController": false}, {"data": [[1.64356836E12, 0.0]], "isOverall": false, "label": "DELETE /api/vets/1279", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64356836E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.64356836E12, "maxY": 33.0, "series": [{"data": [[1.64356836E12, 33.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.64356836E12, 9.400000000000006]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.64356836E12, 27.95999999999998]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.64356836E12, 12.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.64356836E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.64356836E12, 4.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64356836E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 4.0, "minX": 31.0, "maxY": 4.0, "series": [{"data": [[31.0, 4.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 31.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 3.0, "minX": 31.0, "maxY": 3.0, "series": [{"data": [[31.0, 3.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 31.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 2.5833333333333335, "minX": 1.64356836E12, "maxY": 2.5833333333333335, "series": [{"data": [[1.64356836E12, 2.5833333333333335]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64356836E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.5, "minX": 1.64356836E12, "maxY": 1.0833333333333333, "series": [{"data": [[1.64356836E12, 1.0833333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.64356836E12, 0.5]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.64356836E12, 1.0]], "isOverall": false, "label": "204", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.64356836E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.64356836E12, "maxY": 0.08333333333333333, "series": [{"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1276-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5134-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4452-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1275-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5193-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5192-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5193-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4786-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5190-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5192-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5131-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5193-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev6118-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4787-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1279-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4456-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "GET /api/vets-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5131-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "POST /api/visits-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4788-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4455-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev3871-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "POST /api/owners-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4455-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1278-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4452-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5130-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5190-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1275-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1275-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5190-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5193-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4789-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1279-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1276-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4785-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5191-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1279-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5192-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5189-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4788-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5191-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4452-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5130-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5130-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5189-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5189-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5190-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4456-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4787-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5131-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4453-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5134-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4454-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1276-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5191-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1277-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "GET /api/pettypes-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1278-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5132-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5189-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4788-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4786-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5191-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5133-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5189-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5190-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5191-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5192-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4785-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4453-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4454-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "POST /api/vets-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5133-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5134-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "POST /api/pets-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4453-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5189-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/5192-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pets/5193-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "POST /api/specialties-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4785-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/pettypes/4787-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/owners/5192-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev2970-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pets/5191-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/vets/1277-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/visits/5133-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "GET /api/visits-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pets/5190-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/visits/5132-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/vets/1278-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4786-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "GET /api/owners-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "GET /api/specialties-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/pettypes/4789-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/owners/5193-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "GET /api/pets-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/specialties/4454-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "DELETE /api/specialties/4455-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/specialties/4456-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "PUT /api/visits/5132-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev7291-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/owners/*/lastname/Testev4059-success", "isController": false}, {"data": [[1.64356836E12, 0.08333333333333333]], "isOverall": false, "label": "POST /api/pettypes-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/vets/1277-success", "isController": false}, {"data": [[1.64356836E12, 0.016666666666666666]], "isOverall": false, "label": "GET /api/pettypes/4789-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64356836E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 2.5833333333333335, "minX": 1.64356836E12, "maxY": 2.5833333333333335, "series": [{"data": [[1.64356836E12, 2.5833333333333335]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.64356836E12, "title": "Total Transactions Per Second"}},
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
