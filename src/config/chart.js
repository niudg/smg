let app = {}
app.config = {
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
}
var labelOption = {
  show: false,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {
      textBorderColor: '#fff',
    },
  },
}
let histogramOption = {
  title: {
    text: ' ',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: [],
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      mark: { show: true },
      //dataView: { show: true, readOnly: false },
      magicType: {
        show: true,
        type: ['line', 'bar', 'stack'],
        title: {
          line: '折れ線グラフ',
          bar: '柱状グラフ',
          stack: '積み上げグラフ',
        },
      },
      //restore: { show: true },
      //saveAsImage: { show: true },
    },
  },
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: [],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [],
}

let pipeOption = {
  title: {
    text: ' ',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}',
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 20,
    bottom: 20,
    data: [],
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: '55%',
      center: ['40%', '50%'],
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}

module.exports = {
  labelOption,
  histogramOption,
  pipeOption,
}
