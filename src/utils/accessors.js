const dateParser = d3.timeParse('%Y-%m-%d');
export const yAccessor = (d) => d.temperatureMax;
export const xAccessor = (d) => dateParser(d.date);
