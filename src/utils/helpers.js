import * as d3 from "d3";

export function convertFtoC(temp) {
  return (temp - 32) / 1.8;
}

export const dateParser = d3.timeParse('%Y-%m-%d');
