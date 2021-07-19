import React, {Component} from 'react';
import style from './../styles/styles.less';

// https://d3js.org/
import * as d3 from 'd3';

// https://vis4.net/chromajs/
import chroma from 'chroma-js';

// Use chroma to make the color scale.
// https://gka.github.io/chroma.js/
const f = chroma.scale('RdYlBu').domain([3,0,-3]);
let interval;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year:1901
    }
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  componentWillUnMount() {
    clearInterval(interval);
  }
  getData() {
    d3.json('./data/data.json').then((data) => {
      this.data = data;

      this.createRadialChart(data[this.state.year]);
    });
  }
  createRadialChart(data) {
    // Define contants.
    const margin = { top: 0, right: 50, bottom: 0, left: 0 }, // Define margins.
          inner_radius = 0, // Define the inner radius of chart.
          outer_radius = 400, // Define the outer radius of chart.
          my_domain = [-3.5, 2.2], // Define the scale domain
          legend_ring_points = [-2, -1, 0, 1, 2],
          color_main = '#e16767', // Define the base main color.
          // Define the x and y radial.
          x = d3.scaleBand()
                .range([Math.PI / 2 + 0.07, Math.PI / 2 + 2 * Math.PI - 0.1])
                .align(0)
                .domain(data.map(d => d.id)),
          y = d3.scaleLinear()
                .range([inner_radius, outer_radius])
                .domain(my_domain),
          // Define width and height.
          height = window.innerHeight,
          width = window.innerWidth - margin.left - margin.right;

    // Create the svg.
    const svg = d3.select('.' + style.chart_container)
                  .append('svg')
                  .attr('preserveAspectRatio', 'xMinYMin meet')
                  .attr('viewBox', '-0 -0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
                  .classed('svg-content', true);

    // Svg chart container.
    const chart_elements = svg.append('g')
                              .attr('class', style.chart_elements)
                              .attr('transform', 'translate(0, ' + margin.top + ')');

    // Create radial bars.
    this.createRadialBars(data, chart_elements, inner_radius, width, height, x, y, my_domain);
    // Create the center container.
    this.createCenterContainer(chart_elements, width, height, margin);
    // Create the interactive layer.
    // this.createInteractiveLayer(width, height);
    // Create radial rings.
    this.createRadialRings(chart_elements, width, height, y, legend_ring_points);
    // Create bar info.
    this.createBarInfo(data, chart_elements, width, height, x, y, my_domain)
    // Create a legend.
    // this.createLegend(svg);

    setTimeout(() => {
      interval = setInterval(() => {
        this.setState((state, props) => ({
          year:state.year +1
        }), () => {
          this.updateCenterContainer(width, height, margin);
          this.updateRadialBars(this.data[this.state.year], chart_elements, inner_radius, width, height, x, y, my_domain)
        });
        if (this.state.year >= 2020) {
          clearInterval(interval);
        }
      }, 400);
    }, 3500);
  }
  createCenterContainer(chart_elements, width, height, margin) {
    const img_diameter = 210;
    chart_elements.append('foreignObject')
      .attr('x', (width / 2 - img_diameter / 2) + 'px')
      .attr('y', (height / 2 - img_diameter / 2) + 'px')
      .style('width', img_diameter + 'px')
      .style('height', img_diameter + 'px')
      .html('<div class="' + style.center_container + '" style="width: ' + img_diameter + 'px; height: ' + img_diameter + 'px;"></div>');
    chart_elements.append('g')
      .attr('class', style.center_text)
      .append('text')
      .attr('y', margin.top + height / 2)
      .style('dominant-baseline', 'hanging')
      .style('text-anchor', 'middle')
      .html('<tspan style="font-size: 20px;" x="' + (width / 2) + '" y="' + (margin.top + height / 2 - 35) + '">Year</tspan><tspan class="' + style.year + '" x="' + (width / 2) + '" y="' + (margin.top + height / 2 - 10) + '">' + this.state.year + '</tspan>');
  }
  updateCenterContainer(width, height) {
    d3.select('.' + style.center_text).select('text').select('.' + style.year).html(this.state.year);
  }
  createRadialBars(data, chart_elements, inner_radius, width, height, x, y, my_domain) {
    chart_elements.append('g')
                  .attr('class', style.bars_container)
                  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
                  .selectAll('path')
                  .data(data).enter()
                  .append('path')
                  .attr('fill', d => f(d['temp']))
                  .attr('data-id', d => d.id)
                  .attr('d', d3.arc()
                               .innerRadius(d => y(my_domain[0]))
                               .outerRadius(d => (d.country !== '') ? y(d['temp']) : y(my_domain[0]))
                               .startAngle(d => x(d.id))
                               .endAngle(d => x(d.id) + x.bandwidth())
                               // .padAngle(0.15)
                               .padRadius(inner_radius))
                  .attr('opacity', 0)
                  .transition()
                  .duration(500)
                  .delay((d, i) => i * 15)
                  .attr('opacity', 1)
                  .style('pointer-events', 'none');
  }
  updateRadialBars(data, chart_elements, inner_radius, width, height, x, y, my_domain) {
    d3.selectAll('.' + style.bars_container)
      .selectAll('path')
      .transition()
      .duration(350)
      .attr('fill', d => (d.country !== '') ? f(data.find(element => element.country === d['country'])['temp']) : y(my_domain[0]))
      .attr('d', d3.arc()
                  .innerRadius(d => y(my_domain[0]))
                  .outerRadius(d => (d.country !== '') ? y(data.find(element => element.country === d['country'])['temp']) : y(my_domain[0]))
                  .startAngle(d => x(d.id))
                  .endAngle(d => x(d.id) + x.bandwidth())
                  // .padAngle(0.15)
                  .padRadius(inner_radius));
  }
  createRadialRings(chart_elements, width, height, y, legend_ring_points, color_main) {
    const chart_legend_rings = chart_elements.append('g').attr('class', style.chart_legend_rings);
    chart_legend_rings.selectAll('circle')
                      .data(legend_ring_points)
                      .join('circle')
                      .attr('cx', width / 2)
                      .attr('cy', height / 2)
                      .attr('r', d => y(d))
                      .style('fill', 'none')
                      .style('stroke', (d) => (d === 0) ? '#fff' : '#fff')
                      .style('stroke-width', (d) => (d === 0) ? 4 : 2)
                      .style('pointer-events', 'none');
    chart_legend_rings.selectAll('text')
                      .data(legend_ring_points)
                      .join('text')
                      .attr('x', d => width / 2 + y(d) + 2)
                      .attr('y', d => height / 2)
                      .text(d => (d > 0) ? '+' + d + '.0 °C' : d + '.0 °C')
                      .style('opacity', 0.7)
                      .style('font-size', (d) => (d === 0) ? '12pt' : '10pt')
                      .style('font-weight', (d) => (d === 0) ? 600 : 400)
                      .style('pointer-events', 'none');
  }
  createBarInfo(data, chart_elements, width, height, x, y, my_domain) {
    chart_elements.append('g')
                  .attr('class', style.bars_info_container)
                  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
                  .selectAll('g')
                  .data(data).enter()
                  .append('g')
                  .attr('class', style.bar_info_container)
                  .attr('id', d => d.id)
                  .attr('opacity', 0.8)
                  .attr('transform', (d) => {
                    const angle_to_rotate = ((x(d.id) + x.bandwidth() / 2) * 180) / Math.PI - 90;
                    return 'rotate(' + angle_to_rotate + ')';
                  })
                  .attr('text-anchor', (d) => {
                    return (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'end' : 'start';
                  })
                  .each((d, i, nodes) => {
                    const el = d3.select(nodes[i]);
                    // Name.
                    el.append('text')
                      .attr('data-id', d => d.id)
                      .attr('x', d => (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? -y(my_domain[1]) - 10 : y(my_domain[1]) + 10)
                      .attr('y', 0)
                      .text(d => d.country)
                      .style('font-size', '8pt')
                      .style('dominant-baseline', 'middle')
                      // Rotation to improve readability
                      .attr('transform', d => (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'rotate(180)' : 'rotate(0)')
                    // Radial line
                    el.append('line')
                      .attr('x1', 120)
                      .attr('x2', y(my_domain[1]) + 5)
                      .attr('y1', 0)
                      .attr('y2', 0)
                      .style('opacity', 0.4)
                      .style('stroke', '#000')
                      .style('stroke-width', 0.15);
                    // Circles on bars.
                  })
                  .style('pointer-events', 'none');

    let continents_data = [{name: "Africa", value: 55},{name: "Asia", value: 42},{name: "Europe", value: 49},{name: "Oceania", value: 20},{name: "N. America", value: 20},{name: "S. America", value: 13}];

    let pie = d3.pie()
      .startAngle(95 * Math.PI/180)
      .endAngle(85 * Math.PI/180 + 2 * Math.PI)
      .value(d => d.value)
      .sort(null);

    chart_elements.selectAll('.continent_arcs')
      .data(pie(continents_data))
      .enter().append('path')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .attr('class', 'continent_arcs')
      .attr('d',  d3.arc().innerRadius(300).outerRadius(301))
      .style("fill", (d,i) => 'transparent')
      .each((d,i,nodes) => {
        //Search pattern for everything between the start and the first capital L
        let firstArcSection = /(^.+?)L/;  
        let new_arc = firstArcSection.exec(d3.select(nodes[i]).attr('d'))[1].replace(/,/g , ' ');;
        if (d.endAngle > Math.PI/2 && d.endAngle < 270 * Math.PI/180) {
          let start_loc = /M(.*?)A/,
              middle_loc  = /A(.*?)0 0 1/,
              end_loc = /0 0 1 (.*?)$/;
          let new_start = end_loc.exec(new_arc)[1];
          let new_end = start_loc.exec(new_arc)[1];
          let middle_sec = middle_loc.exec(new_arc)[1];
          //Build up the new arc notation, set the sweep-flag to 0
          new_arc = 'M' + new_start + 'A' + middle_sec + '0 0 0 ' + new_end;
        }//if
        
        //Create a new invisible arc that the text can flow along
        chart_elements.append('path')
          .attr('class', 'hidden_continent_arcs')
          .attr('id', 'continent_arc' + i)
          .attr('d', new_arc)
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
          .style('fill', 'none');
    });

    //Append the month names within the arcs
    chart_elements.selectAll('.' + style.continent_text)
      .data(pie(continents_data))
      .enter().append('text')
      .attr('class', style.continent_text)
      .attr('dy', d => (d.endAngle > Math.PI/2 && d.endAngle < 270 * Math.PI/180 ? 10 : 0))
      .append('textPath')
      .attr('startOffset','50%')
      .style('text-anchor','middle')
      .attr('xlink:href', (d,i) => '#continent_arc' + i)
      .text((d) => d.data.name);

  }
  createLegend(svg) {
    // Legend.
    const legend_bar = d3.select('.' + style.bars_container + ' path')
                        .clone()
                        .attr('class', style.legend_bar)
                        .attr('transform', 'translate(150, 300)rotate(-5)'),
          legend_dot = d3.select('.' + style.bars_info_container + ' g .' + style.selected_work_point)
                        .clone()
                        .attr('class', style.legend_info)
                        .attr('transform', 'translate(150, 260)'),
          legend = svg.append('g').attr('class', style.legend);

    legend.append('line')
          .attr('x1', legend_bar.node().getBoundingClientRect().x)
          .attr('x2', legend_bar.node().getBoundingClientRect().x)
          .attr('y1', legend_bar.node().getBoundingClientRect().y + legend_bar.node().getBoundingClientRect().height - 18)
          .attr('y2', legend_bar.node().getBoundingClientRect().y + 46)
          .style('stroke', '#000')
          .style('stroke-width', 0.5)
          .style('stroke-dasharray', 3);
    legend.append('text')
          .attr('x', legend_bar.node().getBoundingClientRect().x + legend_bar.node().getBoundingClientRect().width + 5)
          .attr('y', legend_bar.node().getBoundingClientRect().y + 17)
          .text('Name')
          .style('opacity', 0.5)
          .style('font-size', '16px');
    legend.append('text')
          .attr('x', legend_bar.node().getBoundingClientRect().x + 5)
          .attr('y', legend_bar.node().getBoundingClientRect().y + 45)
          .text('Year of birth')
          .style('font-size', '12px');
    legend.append('line')
          .attr('x1', legend_dot.node().getBoundingClientRect().x + 2.5)
          .attr('x2', legend_dot.node().getBoundingClientRect().x + 2.5)
          .attr('y1', legend_dot.node().getBoundingClientRect().y - 30)
          .attr('y2', legend_dot.node().getBoundingClientRect().y)
          .style('stroke', '#000')
          .style('stroke-width', 0.5)
          .style('stroke-dasharray', 3);  
    legend.append('text')
          .attr('x', legend_dot.node().getBoundingClientRect().x + 2.5)
          .attr('text-anchor', 'middle')
          .attr('y', legend_dot.node().getBoundingClientRect().y - 52)
          .text('One example of')
          .style('font-size', '12px');
    legend.append('text')
          .attr('x', legend_dot.node().getBoundingClientRect().x + 2.5)
          .attr('text-anchor', 'middle')
          .attr('y', legend_dot.node().getBoundingClientRect().y - 37)
          .text('her artistic work')
          .style('font-size', '12px');
  }
  createInteractiveLayer() {
    // Interactive layer.
    // const barsAux = chart_elements
    //   .append('g')
    //   .attr('class', style.bars_aux)
    //   .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
    //   .selectAll('a')
    //   .data(data).enter()
    //   .append('a')
    //   .attr('target', '_blank')
    //   .attr('href', d => d.wikipedia != '' && d.wikipedia != 'x' ? d.wikipedia : null)
    //   .append('path')
    //   .attr('class', style.aux)
    //   .attr('data-id', d => d.id)
    //   .attr('fill', 'transparent')
    //   .attr('d', d3.arc()
    //                .innerRadius(inner_radius)
    //                .outerRadius(outer_radius + 120)
    //                .startAngle(d => x(d.id))
    //                .endAngle(d => x(d.id) + x.bandwidth())
    //                .padAngle(0.01)
    //                .padRadius(inner_radius))
    //   // https://stackoverflow.com/questions/63693132/unable-to-get-node-datum-on-mouseover-in-d3-v6
    //   .on('mouseover', (event, d) => this.onMouseOver(event, d))
    //   .on('mouseout', (event, d) => this.onMouseOut(event, d));
  }
  onMouseOver(event, d) {
  //   d3.select('.' + style.bars_container)
  //     .selectAll('path:not(path[data-id=' + d.id + '])')
  //     .style('opacity', 0.5);
  //   d3.select('.' + style.bars_info_container)
  //     .selectAll('text[id=' + d.id + '])')
  //     .style('opacity', 1);
  //   d3.select('.' + style.bars_info_container)
  //     .selectAll('text:not(text[data-id=' + d.id + '])')
  //     .style('opacity', 0.2);
  //   d3.select('.' + style.img_profile)
  //     .style('background-image', 'url(https://carmen-tm.github.io/WomenArchitectsTable/assets/' + d.imgProfile + ')')

  //   d3.select(event.currentTarget).style('opacity', 1);
  }
  onMouseOut(event, d) {
  //   d3.select(event.currentTarget).style('opacity', 0.8);
  //   d3.select('.' + style.bars_container)
  //     .selectAll('path')
  //     .style('opacity', 1);
  //   d3.select('.' + style.bars_info_container)
  //     .selectAll('text')
  //     .style('opacity', d => d.wikipedia != '' && d.wikipedia != 'x' ? 0.7 : 0.3);
  //   d3.select('.' + style.img_profile)
  //     .style('background-image', 'none');
  }
  // shouldComponentUpdate(nextProps, nextState) {}
  // static getDerivedStateFromProps(props, state) {}
  // getSnapshotBeforeUpdate(prevProps, prevState) {}
  // static getDerivedStateFromError(error) {}
  // componentDidCatch() {}
  render() {
    return (
      <div className={style.app}>
        <div className={style.chart_container}></div>
      </div>
    );
  }
}
export default App;