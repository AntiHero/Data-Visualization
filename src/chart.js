import { yAccessor, xAccessor } from './utils/accessors';

async function drawLineChart() {
  const dataset = await d3.json('./my_weather_data.json');

  const dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  };

  dimensions.boundWidth = dimensions.width
    - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundHeight = dimensions.height
    - dimensions.margin.top - dimensions.margin.bottom;

  const wrapper = d3.select('.wrapper');

  const svg = wrapper.append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const bounds = svg
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`,
    );

  const yScale = d3
    .scaleLinear()
    // min-max input values
    .domain(d3.extent(dataset, yAccessor))
    // min-max output values
    .range([dimensions.boundHeight, 0]);

  const freezingTempPlacement = yScale(0);

  const freezingTemps = bounds.append('rect')
    .attr('x', 0)
    .attr('width', dimensions.boundWidth)
    .attr('y', freezingTempPlacement)
    .attr('height', dimensions.boundHeight - freezingTempPlacement)
    .attr('fill', '#e0f3f3');

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundWidth]);

  const lineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)));

  const line = bounds.append('path')
    .attr('d', lineGenerator(dataset))
    .attr('fill', 'none')
    .attr('stroke', '#dda0dd')
    .attr('stroke-width', 2);

  console.table(yScale(32));
}

drawLineChart();
