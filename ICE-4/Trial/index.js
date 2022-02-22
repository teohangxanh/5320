import { select } from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const face = svg.append('circle')
    .attr('r', height / 2)
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('fill', 'yellow');