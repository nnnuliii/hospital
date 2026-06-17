// 广东试点医院地图 颜色稳定可控最终版
function initGuangdongHospitalMap() {
    const chartDom = document.getElementById('gd-hospital-map');
    const myChart = echarts.init(chartDom);

    const option = {
        geo: {
            map: '广东',
            itemStyle: {
                color: '#E2F2F8',
                borderColor: '#298EAF'
            }
        },
        visualMap: { show: false, seriesIndex: -1 },
        legend: { show: false },
        series: [
            // 文字居左点位 #298EAF
            {
                name: '医院左',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: 16,
                label: {
                    show: true,
                    formatter: '{b}',
                    fontSize: 10,
                    position: 'left'
                },
                tooltip: { show: false },
                data: [
                    {name:"广东省人民医院", value:[113.2876301, 23.12582985, 1], itemStyle:{color:"#298EAF"}},
                    {name:"广东省中医院", value:[113.2774343, 23.12366407, 1], itemStyle:{color:"#298EAF"}},
                    {name:"广州医科大学附属第一医院", value:[113.2640723, 23.11336191, 1], itemStyle:{color:"#298EAF"}},
                    {name:"广州市第一人民医院", value:[113.2590503, 23.13526059, 1], itemStyle:{color:"#298EAF"}},
                    {name:"南方医科大学深圳医院", value:[113.8979833, 22.55216841, 1], itemStyle:{color:"#298EAF"}},
                    {name:"珠海市人民医院", value:[113.5949842, 22.28485697, 1], itemStyle:{color:"#298EAF"}}
                ]
            },
            // 文字居右点位 #298EAF
            {
                name: '医院右',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: 16,
                label: {
                    show: true,
                    formatter: '{b}',
                    fontSize: 10,
                    position: 'right'
                },
                tooltip: { show: false },
                data: [
                    {name:"中山大学附属第一医院（南沙院区）", value:[113.5074469, 22.73980496, 1], itemStyle:{color:"#298EAF"}},
                    {name:"汕头大学医学院第一附属医院", value:[116.7066623, 23.36313903, 1], itemStyle:{color:"#298EAF"}},
                    {name:"北京大学深圳医院", value:[114.0494504, 22.55602422, 1], itemStyle:{color:"#298EAF"}},
                    {name:"暨南大学附属第一医院", value:[113.3503983, 23.12633131, 1], itemStyle:{color:"#298EAF"}},
                    {name:"中山大学附属第五医院", value:[113.5732827, 22.29890796, 1], itemStyle:{color:"#298EAF"}},
                    {name:"中山大学附属第六医院", value:[113.3637502, 23.129945, 1], itemStyle:{color:"#298EAF"}}
                ]
            },
            // 文字居上点位 #298EAF
            {
                name: '医院上',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: 16,
                label: {
                    show: true,
                    formatter: '{b}',
                    fontSize: 10,
                    position: 'top'
                },
                tooltip: { show: false },
                data: [
                    {name:"深圳市人民医院", value:[114.128688, 22.55649552, 1], itemStyle:{color:"#298EAF"}},
                    {name:"中山大学附属第一医院（越秀院区）", value:[113.2899438, 23.12548693, 1], itemStyle:{color:"#298EAF"}},
                    {name:"中山大学附属口腔医院", value:[113.2831163, 23.13087444, 1], itemStyle:{color:"#298EAF"}},
                    {name:"南方医科大学南方医院", value:[113.3284482, 23.18888075, 1], itemStyle:{color:"#298EAF"}},
                    {name:"中山大学附属第三医院", value:[113.3320016, 23.13352772, 1], itemStyle:{color:"#298EAF"}},
                    {name:"广东省妇幼保健院", value:[113.2487117, 23.14834824, 1], itemStyle:{color:"#298EAF"}}
                ]
            },
            // 文字居下点位 绿色#127b5a
            {
                name: '医院下',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: 16,
                label: {
                    show: true,
                    formatter: '{b}',
                    fontSize: 10,
                    position: 'bottom'
                },
                tooltip: { show: false },
                data: [
                    {name:"香港大学深圳医院", value:[113.9778232, 22.5281414, 1], itemStyle:{color:"#298EAF"}},
                    {name:"中山大学孙逸仙纪念医院", value:[113.2562676, 23.10940126, 1], itemStyle:{color:"#298EAF"}},
                    {name:"中山大学中山眼科中心", value:[113.3197894, 23.12488057, 1], itemStyle:{color:"#298EAF"}},
                    {name:"中山大学肿瘤防治中心", value:[113.2912098, 23.1315872, 1], itemStyle:{color:"#298EAF"}},
                    {name:"南方医科大学珠江医院", value:[113.2682891, 23.08147595, 1], itemStyle:{color:"#298EAF"}},
                    {name:"广州医科大学附属妇女儿童医疗中心", value:[113.3206347, 23.12555298, 1], itemStyle:{color:"#298EAF"}},
                    {name:"佛山复星禅诚医院", value:[113.0848374, 23.00539811, 1], itemStyle:{color:"#298EAF"}},
                    {name:"广东祈福医院", value:[113.32411, 22.9684084, 1], itemStyle:{color:"#298EAF"}}
                ]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}
window.addEventListener('load', initGuangdongHospitalMap);