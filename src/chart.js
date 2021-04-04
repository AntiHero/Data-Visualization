import * as d3 from 'd3';
import { lineChartAccessors, scatterPlotAccessors } from './utils/accessors';
import './styles/style.css';

async function getDataset() {
  const dataset = await d3.json('./my_weather_data.json');

  return dataset;
}

function drawLineChart(dataset) {
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

  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const wrapper = d3.select('.line-chart');

  const svg = wrapper
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const bounds = svg
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  const yScale = d3
    .scaleLinear()
    // min-max input values
    .domain(d3.extent(dataset, lineChartAccessors.yAccessor))
    // min-max output values
    .range([dimensions.boundedHeight, 0]);

  const freezingTempPlacement = yScale(0);

  // freezingTemps
  bounds
    .append('rect')
    .attr('x', 0)
    .attr('width', dimensions.boundedWidth)
    .attr('y', freezingTempPlacement)
    .attr('height', dimensions.boundedHeight - freezingTempPlacement)
    .attr('fill', '#2b65ec');

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, lineChartAccessors.xAccessor))
    .range([0, dimensions.boundedWidth]);

  const lineGenerator = d3
    .line()
    .x((d) => xScale(lineChartAccessors.xAccessor(d)))
    .y((d) => yScale(lineChartAccessors.yAccessor(d)));

  // line
  bounds
    .append('path')
    .attr('d', lineGenerator(dataset))
    .attr('fill', 'none')
    .attr('stroke', '#c3c3c3')
    .attr('stroke-width', 2);

  const yAxisGenerator = d3.axisLeft().scale(yScale);

  // yAxis
  bounds.append('g').call(yAxisGenerator);

  const xAxisGenerator = d3.axisBottom().scale(xScale);

  // xAxis
  bounds
    .append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.boundedHeight}px)`);
}

function drawScatterPlot(dataset) {
  const width = d3.min([window.innerHeight * 0.9, window.innerWidth * 0.9]);

  const dimensions = {
    width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    },
  };

  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const wrapper = d3.select('.scatterplot');

  const svg = wrapper
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const bounds = svg
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, scatterPlotAccessors.xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, scatterPlotAccessors.yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const colorScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, scatterPlotAccessors.colorAccessor))
    .range(['skyblue', 'darkslategrey']);

  function drawDots(data) {
    const dots = bounds.selectAll('circle').data(data);

    dots
      .join('circle')
      .attr('cx', (d) => xScale(scatterPlotAccessors.xAccessor(d)))
      .attr('cy', (d) => yScale(scatterPlotAccessors.yAccessor(d)))
      .attr('r', 5)
      .attr('fill', (d) => colorScale(scatterPlotAccessors.colorAccessor(d)));
  }

  drawDots(dataset);

  const xAxisGenerator = d3.axisBottom().scale(xScale);

  const xAxis = bounds
    .append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.boundedHeight}px)`);

  // xAxisLabel
  xAxis
    .append('text')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', dimensions.margin.bottom - 10)
    .attr('fill', 'black')
    .style('font-size', '1.4em')
    .html('Dew point(&deg;F)');

  const yAxisGenerator = d3.axisLeft().scale(yScale).ticks(5);

  // yAxis
  bounds.append('g').call(yAxisGenerator);

  xAxis
    .append('text')
    .attr('x', dimensions.boundedHeight / 2)
    .attr('y', -dimensions.margin.right - 20)
    .attr('fill', 'black')
    .html('Relative humidity')
    .style('font-size', '1.4em')
    .style('transform', 'rotate(-90deg)')
    .style('text-anchor', 'middle');
}

getDataset().then((dataset) => {
  drawLineChart(dataset);
  drawScatterPlot(dataset);
});
