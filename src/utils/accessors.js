import * as d3 from "d3";
import convertFtoC from './helpers';

const dateParser = d3.timeParse('%Y-%m-%d');

export const yAccessor = (d) => convertFtoC(d.temperatureMax);
export const xAccessor = (d) => dateParser(d.date);
