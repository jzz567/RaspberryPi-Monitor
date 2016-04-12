$(function () {
    get_cpu_info();
    get_temp();
    get_mem_info();
    //get_cpu_usage();
    var $time = $("#time");
    var int;
    var temp_data_array = [null, null, null, null, null, null, null, null, null];
    var data = {
        labels: ["时间", "时间", "时间", "时间", "时间", "时间", "时间", "时间", "时间"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "black",
                pointColor: "grey",
                pointStrokeColor: "#fff",
                data: temp_data_array
            }
        ]
    };
    var cpu_options = {
        scaleOverride: true,
        scaleSteps: 16,
        scaleStartValue: 0,
        scaleStepWidth: 5,
        scaleLabel: "<%=value%>℃",
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve: false,

        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: false,

        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };
    var mem_options = {
        scaleOverride: true,
        scaleSteps: 20,
        scaleStartValue: 0,
        scaleStepWidth: 5,
        scaleLabel: "<%=value%>%",
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve: false,

        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: false,

        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };
    var cpu_temp_chart = new Chart($("#cpu_temp_chart").get(0).getContext("2d")).Line(data, cpu_options);
    var mem_info_chart = new Chart($("#mem_info_chart").get(0).getContext("2d")).Line(data, mem_options);
    get_data_auto();

    $time.change(function () {
        clearInterval(int);
        get_data_auto();
    });

    $('#refresh').click(function () {
        get_temp();
    });

    function get_data_auto() {
        int = self.setInterval(function () {
            get_temp();
            get_mem_info();
        }, $time.val() * 1000);
    }

    function get_temp() {
        $.get("get_temp.php", "", function (data) {
            $('#cpu_temp').text("CPU温度" + (data / 1000) + "℃");
            cpu_temp_chart.removeData();
            cpu_temp_chart.addData([data / 1000], get_date());
        });


    }

    function get_cpu_info() {
        $.get("get_cpu_info.php", "", function (data) {
            $('#cpu_info').html(data);
        });
    }

    function get_mem_info() {
        var date = new Date();
        $.get("get_mem_info.php", "", function (data) {
            $('#mem_info').html(data + "%");
            mem_info_chart.removeData();
            mem_info_chart.addData([parseInt(data.split("使用率:")[1])], get_date());
        });
    }

    // function get_cpu_usage() {
    //     $.get("get_cpu_usage.php", "", function (data) {
    //         $('#cpu_usage').text("CPU使用率:" + data + "%");
    //     });
    // }

    function get_date() {
        var date = new Date();
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
});