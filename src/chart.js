import { yAccessor, xAccessor } from './utils/accessors';

async function drawLineChart() {
  const dataset = await d3.json('./../my_weather_data.json');

  console.table(xAccessor(dataset[0]));
}

drawLineChart();
