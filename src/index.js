'use strict';
(function(data, d3) {

    var margin = {
            top: 5,
            right: 2,
            bottom: 4,
            left: 5
        },
        outerWidth = 1024,
        outerHeight = 768;

    var height = outerHeight - margin.top - margin.bottom;
    var color = d3.scale.category20b();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([height, height])
        .padding(1.5);

    var svg = d3.select('#root')
        .append('svg:svg')
        .attr('viewBox', '0 0 ' + outerWidth + ' ' + outerHeight + '')
        .attr('class', 'bubble');

    var nodes = bubble.nodes({ children: data }).filter(function(d) {
        return !d.children;
    });

    var bubbles = svg.selectAll('bubble')
        .data(nodes)
        .enter()
        .append('svg:g')
        .attr('class', 'node')
        .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });

    bubbles.append('svg:circle')
        .attr('r', function(d) {
            return d.r;
        })
        .style('fill', function(d) {
            return color(d.value);
        });

    bubbles.append('text')
        .attr('dy', '.3em')
        .attr('text-anchor', 'middle')
        .text(function(d) {
            return d.label;
        });
}([
    { label: 'B', value: 5 },
    { label: 'E', value: 3 },
    { label: 'A', value: 1 },
    { label: 'D', value: 5 },
    { label: 'F', value: 2 },
    { label: 'C', value: 3 },
    { label: 'G', value: 1 },
    { label: 'I', value: 3 },
    { label: 'J', value: 2 }

], window.d3));
