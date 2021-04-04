import { convertFtoC, dateParser } from './helpers';

export const lineChartAccessors = {
  xAccessor: (d) => dateParser(d.date),
  yAccessor: (d) => convertFtoC(d.temperatureMax),
}

export const scatterPlotAccessors = {
  xAccessor: (d) => d.dewPoint,
  yAccessor: (d) => d.humidity,
  colorAccessor: (d) => d.cloudCover,
}
