function initHeatmap() {
  // 1. 数据
    const xData = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022] ;
    const yData = ['中国', '波兰', '英国', '德国', '法国', '加拿大', '美国'] ;
    const data = [[0, 0, 254.8], [1, 0, 281.9], [2, 0, 334.81], [3, 0, 369.44], [4, 0, 416.67], [5, 0, 465.54], [6, 0, 508.83], [7, 0, 551.16], [0, 1, 550.46], [1, 1, 601.03], [2, 1, 633.51], [3, 1, 600.52], [4, 1, 674.98], [5, 1, 696.2], [6, 1, 757.75], [7, 1, 805.81], [0, 2, 809.76], [1, 2, 819.24], [2, 2, 861.87], [3, 2, 897.5], [4, 2, 958.0], [5, 2, 887.57], [6, 2, 971.8], [7, 2, 1143.59], [0, 3, 813.47], [1, 3, 859.86], [2, 3, 896.93], [3, 3, 954.72], [4, 3, 1041.89], [5, 3, 1049.6], [6, 3, 1145.92], [7, 3, 1149.09], [0, 4, 1138.37], [1, 4, 887.22], [2, 4, 886.21], [3, 4, 891.78], [4, 4, 947.08], [5, 4, 924.24], [6, 4, 988.0], [7, 4, 1037.74], [0, 5, 1352.02], [1, 5, 1521.95], [2, 5, 1571.89], [3, 5, 1623.6], [4, 5, 1647.26], [5, 5, 1622.57], [6, 5, 1884.86], [7, 5, 1994.13], [0, 6, 1598.92], [1, 6, 1667.36], [2, 6, 1715.4], [3, 6, 1783.58], [4, 6, 1874.78], [5, 6, 1855.7], [6, 6, 2021.68], [7, 6, 2088.34]] ;

  // 2. 图表配置
  const option = {
    tooltip: {
      position: 'top',
      textStyle: {
        color: '#54aecf'
      },
      formatter: function(params) {
        const year = xData[params.data[0]];
        const country = yData[params.data[1]];
        const value = params.data[2];
        return `${country} (${year}年)<br/>${value} 美元/人`;
      }
    },
    grid: {
      top: '17%',
      bottom: '8%',
      width: '50%',
      left: '25%'
        },
    xAxis: {
      type: 'category',
      data: xData,
      splitArea: { show: true },
      axisLabel: { formatter: '{value} 年' }
    },
    yAxis: {
      type: 'category',
      data: yData,
      splitArea: { show: true }
    },
    visualMap: {
      type: 'continuous',
      min: 0,
      max: 2200,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      top: '1%',
      seriesIndex: 0,
      splitNumber: 0,
      showTick: false,
      label: { show: false },
      text: ["2200 美元/人", "200 美元/人"],
      textStyle: { fontSize: 12 },
      inRange: {
        color: ["#E2F2F8", "#C4E4F0", "#90CDE2", "#54AECF", "#298EAF"]
      },
      outOfRange: { color: '#F3F9FC' }
    },
    series: [{
      name: '自愿计划/家庭自付费用',
      type: 'heatmap',
      data: data,
      label: { show: true, fontSize: 12, color: "#103456" },
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' }
      }
    }]
  };

  // 3. 初始化图表
  const chartDom = document.getElementById('heatmap');
  const myChart = echarts.init(chartDom);
  myChart.setOption(option);

  // 4. 自适应窗口
  window.addEventListener('resize', () => myChart.resize());
}

// 页面加载完成后自动运行
window.addEventListener('load', initHeatmap);