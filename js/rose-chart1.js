// 自动生成的玫瑰图配置 - 请确保页面中存在 <div id="rose-chart" style="width:1000px;height:700px;"></div>
(function() {
    function initRose() {
        var dom = document.getElementById('rose-chart');
        if (!dom) {
            console.error('找不到容器 #rose-chart');
            return;
        }
        var chart = echarts.init(dom, 'white');
        var option = {renderer: 'canvas'});
        var option_rose-chart = {
    "animation": true,
    "animationThreshold": 2000,
    "animationDuration": 1000,
    "animationEasing": "cubicOut",
    "animationDelay": 0,
    "animationDurationUpdate": 300,
    "animationEasingUpdate": "cubicOut",
    "animationDelayUpdate": 0,
    "aria": {
        "enabled": false
    },
    "color": [
        "#04328C",
        "#0A4A9E",
        "#1F6F99",
        "#3C88A6",
        "#298EAF",
        "#3DA0C2",
        "#54AECF",
        "#70B9DA",
        "#90CDE2",
        "#64B8E8",
        "#0C9AF2",
        "#13C9F2",
        "#4DD4F5",
        "#22F2F2",
        "#86F5F5"
    ],
    "series": [
        {
            "type": "pie",
            "colorBy": "data",
            "legendHoverLink": true,
            "selectedMode": false,
            "selectedOffset": 10,
            "clockwise": true,
            "startAngle": 90,
            "minAngle": 0,
            "minShowLabelAngle": 0,
            "avoidLabelOverlap": true,
            "stillShowZeroSum": true,
            "percentPrecision": 2,
            "showEmptyCircle": true,
            "emptyCircleStyle": {
                "color": "lightgray",
                "borderColor": "#000",
                "borderWidth": 0,
                "borderType": "solid",
                "borderDashOffset": 0,
                "borderCap": "butt",
                "borderJoin": "bevel",
                "borderMiterLimit": 10,
                "opacity": 1
            },
            "data": [
                {
                    "name": "\u5fc3\u810f\u75c5\u5b66-\u7535\u751f\u7406\u5b66",
                    "value": 6.06
                },
                {
                    "name": "\u542c\u529b\u5b66-\u542c\u529b\u5b66\u8bc4\u4f30",
                    "value": 4.71
                },
                {
                    "name": "\u5c3f\u52a8\u529b\u5b66-\u538b\u529b\u4e0e\u6d41\u91cf\u6d4b\u5b9a",
                    "value": 4.54
                },
                {
                    "name": "\u795e\u7ecf\u751f\u7406\u5b66-\u5468\u56f4\u795e\u7ecf\u751f\u7406\u5b66",
                    "value": 4.44
                },
                {
                    "name": "\u547c\u5438\u751f\u7406\u5b66-\u7761\u7720\u7814\u7a76",
                    "value": 3.55
                },
                {
                    "name": "\u5fc3\u810f\u75c5\u5b66-\u8d85\u58f0\u5fc3\u52a8\u56fe",
                    "value": 3.54
                },
                {
                    "name": "\u53ef\u5c48\u6027\u4e59\u72b6\u7ed3\u80a0\u955c\u68c0\u67e5",
                    "value": 3.39
                },
                {
                    "name": "\u8180\u80f1\u955c\u68c0\u67e5",
                    "value": 3.18
                },
                {
                    "name": "\u7ed3\u80a0\u955c\u68c0\u67e5",
                    "value": 2.98
                },
                {
                    "name": "\u80c3\u955c\u68c0\u67e5",
                    "value": 2.95
                },
                {
                    "name": "\u975e\u4ea7\u79d1\u8d85\u58f0",
                    "value": 2.77
                },
                {
                    "name": "\u53cc\u80fdX\u7ebf\u5438\u6536\u6d4b\u5b9a\u6cd5",
                    "value": 2.73
                },
                {
                    "name": "\u78c1\u5171\u632f\u6210\u50cf",
                    "value": 2.64
                },
                {
                    "name": "\u94a1\u5242\u704c\u80a0\u9020\u5f71",
                    "value": 2.48
                },
                {
                    "name": "\u8ba1\u7b97\u673a\u65ad\u5c42\u626b\u63cf",
                    "value": 1.83
                }
            ],
            "radius": [
                "0%",
                "70%"
            ],
            "center": [
                "60%",
                "50%"
            ],
            "roseType": "radius",
            "label": {
                "show": true,
                "position": "outside",
                "color": "#298EAF",
                "margin": 8,
                "fontSize": 12,
                "fontWeight": "bold",
                "formatter": function(params) {    return params.name + ':' + params.value + ' \u5468';}
            },
            "labelLine": {
                "is_show": false
            },
            "tooltip": {
                "show": true,
                "trigger": "item",
                "triggerOn": "mousemove|click",
                "axisPointer": {
                    "type": "line"
                },
                "showContent": true,
                "alwaysShowContent": false,
                "showDelay": 0,
                "hideDelay": 100,
                "enterable": false,
                "confine": false,
                "appendToBody": false,
                "transitionDuration": 0.4,
                "formatter": "{b}: {c}\u5468",
                "textStyle": {
                    "fontSize": 14
                },
                "borderWidth": 0,
                "padding": 5,
                "order": "seriesAsc"
            }
        }
    ],
    "legend": [
        {
            "data": [
                "\u5fc3\u810f\u75c5\u5b66-\u7535\u751f\u7406\u5b66",
                "\u542c\u529b\u5b66-\u542c\u529b\u5b66\u8bc4\u4f30",
                "\u5c3f\u52a8\u529b\u5b66-\u538b\u529b\u4e0e\u6d41\u91cf\u6d4b\u5b9a",
                "\u795e\u7ecf\u751f\u7406\u5b66-\u5468\u56f4\u795e\u7ecf\u751f\u7406\u5b66",
                "\u547c\u5438\u751f\u7406\u5b66-\u7761\u7720\u7814\u7a76",
                "\u5fc3\u810f\u75c5\u5b66-\u8d85\u58f0\u5fc3\u52a8\u56fe",
                "\u53ef\u5c48\u6027\u4e59\u72b6\u7ed3\u80a0\u955c\u68c0\u67e5",
                "\u8180\u80f1\u955c\u68c0\u67e5",
                "\u7ed3\u80a0\u955c\u68c0\u67e5",
                "\u80c3\u955c\u68c0\u67e5",
                "\u975e\u4ea7\u79d1\u8d85\u58f0",
                "\u53cc\u80fdX\u7ebf\u5438\u6536\u6d4b\u5b9a\u6cd5",
                "\u78c1\u5171\u632f\u6210\u50cf",
                "\u94a1\u5242\u704c\u80a0\u9020\u5f71",
                "\u8ba1\u7b97\u673a\u65ad\u5c42\u626b\u63cf"
            ],
            "selected": {},
            "show": true,
            "left": "1%",
            "top": "center",
            "orient": "vertical",
            "padding": 5,
            "itemGap": 10,
            "itemWidth": 25,
            "itemHeight": 14,
            "textStyle": {
                "fontSize": 10
            },
            "backgroundColor": "transparent",
            "borderColor": "#ccc",
            "borderWidth": 1,
            "borderRadius": 0,
            "pageButtonItemGap": 5,
            "pageButtonPosition": "end",
            "pageFormatter": "{current}/{total}",
            "pageIconColor": "#2f4554",
            "pageIconInactiveColor": "#aaa",
            "pageIconSize": 15,
            "animationDurationUpdate": 800,
            "selector": false,
            "selectorPosition": "auto",
            "selectorItemGap": 7,
            "selectorButtonGap": 10
        }
    ],
    "tooltip": {
        "show": true,
        "trigger": "item",
        "triggerOn": "mousemove|click",
        "axisPointer": {
            "type": "line"
        },
        "showContent": true,
        "alwaysShowContent": false,
        "showDelay": 0,
        "hideDelay": 100,
        "enterable": false,
        "confine": false,
        "appendToBody": false,
        "transitionDuration": 0.4,
        "textStyle": {
            "fontSize": 14
        },
        "borderWidth": 0,
        "padding": 5,
        "order": "seriesAsc"
    },
    "title": [
        {
            "show": true,
            "text": "2025\u5e74\u82f1\u56fd\u5341\u4e94\u9879\u8bca\u65ad\u6d4b\u8bd5\u7b49\u5f85\u65f6\u957f\u5206\u5e03\u60c5\u51b5",
            "target": "blank",
            "subtarget": "blank",
            "left": "center",
            "padding": 5,
            "itemGap": 10,
            "textAlign": "auto",
            "textVerticalAlign": "auto",
            "triggerEvent": false,
            "textStyle": {
                "fontSize": 17
            }
        }
    ],
    "graphic": [
        {
            "type": "circle",
            "shape": {
                "cx": 600.0,
                "cy": 350.0,
                "r": 173.44059405940592
            },
            "style": {
                "fill": "rgba(0,0,0,0)",
                "stroke": "red",
                "lineWidth": 2,
                "lineDash": [
                    5,
                    5
                ]
            },
            "z": 100
        },
        {
            "type": "text",
            "left": 788.440594059406,
            "top": 320.0,
            "style": {
                "text": "1\u4e2a\u6708\u22484.29\u5468",
                "fill": "red",
                "fontSize": 14
            },
            "z": 100
        }
    ]
};
        chart.setOption(option);
        window.addEventListener('resize', function() { chart.resize(); });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRose);
    } else {
        initRose();
    }
})();
