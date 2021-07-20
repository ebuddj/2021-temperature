import React, {Component} from 'react';
import style from './../styles/styles.less';

// https://d3js.org/
import * as d3 from 'd3';

// https://vis4.net/chromajs/
import chroma from 'chroma-js';

// Use chroma to make the color scale.
// https://gka.github.io/chroma.js/

const scaleMax = 3,
      scaleMin = -3,
      f = chroma.scale('RdYlBu').padding(-0.1).domain([scaleMax, 0, scaleMin]),
      f_text = chroma.scale(['red', 'rgba(0, 0, 0, 0.3)', 'blue']).padding(-1).domain([scaleMax, 0, scaleMin]),
      margin = {top: 0, right: 50, bottom: 0, left: 0},
      inner_radius = 0,
      outer_radius = 400,
      my_domain = [-3.5, 2.2],
      legend_ring_points = [-2, -1, 0, 1, 2],
      height = window.innerHeight - margin.top - margin.bottom,
      width = window.innerWidth - margin.left - margin.right;
let scales = [], temperature = scaleMin;
while (temperature < scaleMax) {
  temperature = temperature + 0.05;
  scales.push(temperature);
}
let interval;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avg_tmps:[],
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
    // Create the svg.
    const svg = d3.select('.' + style.chart_container)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '-0 -0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
      .classed('svg-content', true);

    // Define the x and y radial.
    const x = d3.scaleBand()
      .range([Math.PI / 2 + 0.07, Math.PI / 2 + 2 * Math.PI - 0.1])
      .align(0)
      .domain(data.map(d => d.id));
    const y = d3.scaleLinear()
      .range([inner_radius, outer_radius])
      .domain(my_domain);
    // Svg chart container.
    const chart_elements = svg.append('g')
      .attr('class', style.chart_elements)
      .attr('transform', 'translate(0, ' + margin.top + ')');

    // Create radial bars.
    this.createRadialBars(data, chart_elements, x, y);
    // Create the center container.
    this.createCenterContainer(chart_elements);
    // Create the interactive layer.
    // this.createInteractiveLayer(width, height);
    // Create radial rings.
    this.createRadialRings(chart_elements, y);
    // Create bar info.
    this.createBarInfo(data, chart_elements, x, y);

    const xScale = d3.scaleLinear().range([0, 200]);
    const yScale = d3.scaleLinear().range([40, 0]);
      xScale.domain([-1, 120]);
      yScale.domain([-1, 1]);

    chart_elements.append('text')
    .attr('transform', 'translate(' + (width / 2 - 400) + ', 40)')
      .attr('class', style.title)
      .html('Temperature anomalies');

    let line_container = chart_elements.append('g')
      .attr('class', style.line_container)
      .attr('transform', 'translate(' + (width / 2 + 200) + ', 20)');
    line_container.append('text')
      .attr('x', 5)
      .attr('class', style.linegraptext)
      .html('world');
    line_container.append('g')
      .attr('class', style.grid)
      .call(d3.axisLeft(yScale)
        .ticks(1)
        .tickFormat(i => i + ' °C')
        .tickSizeInner(-200)
        .tickSizeOuter(0)
      )

    // Add the lines.
    let line_path = line_container.append('path')
      .attr('class', style.current_avg_temp_line)
      .data([]);

    this.updateLineChart(chart_elements);

    this.getCurrentYearAverageTemp(data);
    setTimeout(() => {
      interval = setInterval(() => {
        this.setState((state, props) => ({
          year:state.year +1
        }), () => {
          this.getCurrentYearAverageTemp(this.data[this.state.year]);
          this.updateLineChart(chart_elements, xScale, yScale);
          this.updateRadialBars(this.data[this.state.year], chart_elements, x, y);
        });
        if (this.state.year >= 2020) {
          clearInterval(interval);
        }
      }, 400);
    }, 3500);
  }
  updateLineChart(chart_elements, xScale, yScale) {
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d));

    chart_elements.select('.' + style.current_avg_temp_line)
      .attr('class', style.current_avg_temp_line)
      .style('stroke', '#000')
      .attr('d', line(this.state.avg_tmps));
  }
  getCurrentYearAverageTemp(data) {
    let temperature = data.reduce((accumulator, current, index, array) => (accumulator + current.temp), 0) / data.length;
    this.setState((state, props) => ({
      avg_tmps:state.avg_tmps.concat(temperature),
      current_avg_temp:temperature.toFixed(1)
    }), () => this.updateCenterContainer());
  }
  createCenterContainer(chart_elements) {
    const center_diameter = 210;
    chart_elements.append('foreignObject')
      .attr('x', (width / 2 - center_diameter / 2) + 'px')
      .attr('y', (height / 2 - center_diameter / 2) + 'px')
      .style('width', center_diameter + 'px')
      .style('height', center_diameter + 'px')
      .html('<div class="' + style.center_container + '" style="width: ' + center_diameter + 'px; height: ' + center_diameter + 'px;"></div>');
    chart_elements.append('g')
      .attr('class', style.center_text)
      .append('text')
      .attr('y', margin.top + height / 2)
      .style('dominant-baseline', 'hanging')
      .style('text-anchor', 'middle')
      .html('<tspan class="' + style.year_text + '"x="' + (width / 2) + '" y="' + (margin.top + height / 2 - 45) + '">Year</tspan><tspan class="' + style.year + '" x="' + (width / 2) + '" y="' + (margin.top + height / 2 - 20) + '">' + this.state.year + '</tspan><tspan class="' + style.temp + '" x="' + (width / 2) + '" y="' + (margin.top + height / 2 + 30) + '">' + this.state.current_avg_temp + '</tspan>');
  }
  updateCenterContainer() {
    d3.select('.' + style.center_text).select('text').select('.' + style.year).html(this.state.year);
    d3.select('.' + style.center_text).select('text').select('.' + style.temp).attr('fill', f_text(this.state.current_avg_temp)).html(((this.state.current_avg_temp > 0) ? '+' : '') + this.state.current_avg_temp + ' °C');
  }
  createRadialBars(data, chart_elements, x, y) {
    chart_elements.append('g')
      .attr('class', style.bars_container)
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
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
        .padRadius(inner_radius))
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .delay((d, i) => i * 15)
      .attr('opacity', 1)
      .style('pointer-events', 'none');
  }
  updateRadialBars(data, chart_elements, x, y) {
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
        .padRadius(inner_radius));
  }
  createRadialRings(chart_elements, y) {
    const chart_legend_rings = chart_elements.append('g').attr('class', style.chart_legend_rings);
    chart_legend_rings.selectAll('circle')
      .data(legend_ring_points)
      .join('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', d => y(d))
      .style('fill', 'none')
      .style('stroke', d => (d === 0) ? '#fff' : '#fff')
      .style('stroke-width', d => (d === 0) ? 4 : 2)
      .style('pointer-events', 'none');
    chart_legend_rings.selectAll('text')
      .data(legend_ring_points)
      .join('text')
      .attr('x', d => width / 2 + y(d) + 2)
      .attr('y', d => height / 2)
      .text(d => (d > 0) ? '+' + d + '.0 °C' : d + '.0 °C')
      .style('opacity', 0.7)
      .style('font-size', d => (d === 0) ? '12pt' : '10pt')
      .style('font-weight', d => (d === 0) ? 700 : 400)
      .style('pointer-events', 'none');
  }
  createBarInfo(data, chart_elements, x, y) {
    chart_elements.append('g')
      .attr('class', style.bars_info_container)
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
      .selectAll('g')
      .data(data).enter()
      .append('g')
      .attr('class', style.bar_info_container)
      .attr('id', d => d.id)
      .attr('opacity', 0.8)
      .attr('transform', d => 'rotate(' + (((x(d.id) + x.bandwidth() / 2) * 180) / Math.PI - 90) + ')')
      .attr('text-anchor', d => (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'end' : 'start')
      .each((d, i, nodes) => {
        // Name.
        d3.select(nodes[i]).append('text')
          .attr('data-id', d => d.id)
          .attr('x', d => (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? -y(my_domain[1]) - 10 : y(my_domain[1]) + 10)
          .attr('y', 0)
          .text(d => d.country)
          .style('font-size', '8pt')
          .style('dominant-baseline', 'middle')
          .attr('transform', d => (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'rotate(180)' : 'rotate(0)')
        // Radial line
        d3.select(nodes[i]).append('line')
          .attr('x1', 120)
          .attr('x2', y(my_domain[1]) + 5)
          .attr('y1', 0)
          .attr('y2', 0)
          .style('opacity', 0.4)
          .style('stroke', '#000')
          .style('stroke-width', 0.15);
      })
      .style('pointer-events', 'none');

    const continents_data = [{name:'Africa',value:55},{name:'Asia',value:42},{name:'Europe',value:49},{name:'Oceania',value:20},{name:'N. America',value:20},{name:'S. America',value:13}];

    const pie = d3.pie()
      .startAngle(95 * Math.PI /180)
      .endAngle(85 * Math.PI / 180 + 2 * Math.PI)
      .value(d => d.value)
      .sort(null);

    chart_elements.selectAll('.continent_arcs')
      .data(pie(continents_data))
      .enter().append('path')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
      .attr('class', 'continent_arcs')
      .attr('d',  d3.arc().innerRadius(300).outerRadius(301))
      .style('fill', 'transparent')
      .each((d, i, nodes) => {
        let first_arc_section = /(^.+?)L/;  
        let new_arc = first_arc_section.exec(d3.select(nodes[i]).attr('d'))[1].replace(/,/g , ' ');;
        // Reverse the path if needed.
        if (d.endAngle > (90 * Math.PI / 180) && d.endAngle < (270 * Math.PI / 180)) {
          let start_loc = /M(.*?)A/,
              middle_loc  = /A(.*?)0 0 1/,
              end_loc = /0 0 1 (.*?)$/;
          let new_start = end_loc.exec(new_arc)[1];
          let new_end = start_loc.exec(new_arc)[1];
          let middle_sec = middle_loc.exec(new_arc)[1];
          new_arc = 'M' + new_start + 'A' + middle_sec + '0 0 0 ' + new_end;
        }
        chart_elements.append('path')
          .attr('class', 'hidden_continent_arcs')
          .attr('id', 'continent_arc' + i)
          .attr('d', new_arc)
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
          .style('fill', 'none');
    });

    //Append the continent names within the arcs.
    chart_elements.selectAll('.' + style.continent_text)
      .data(pie(continents_data))
      .enter().append('text')
      .attr('class', style.continent_text)
      .attr('dy', d => (d.endAngle > Math.PI/2 && d.endAngle < 270 * Math.PI/180 ? 10 : 0))
      .append('textPath')
      .attr('startOffset', '50%')
      .style('text-anchor', 'middle')
      .attr('xlink:href', (d, i) => '#continent_arc' + i)
      .text((d) => d.data.name);
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
  // onMouseOver(event, d) {
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
  // }
  // onMouseOut(event, d) {
  //   d3.select(event.currentTarget).style('opacity', 0.8);
  //   d3.select('.' + style.bars_container)
  //     .selectAll('path')
  //     .style('opacity', 1);
  //   d3.select('.' + style.bars_info_container)
  //     .selectAll('text')
  //     .style('opacity', d => d.wikipedia != '' && d.wikipedia != 'x' ? 0.7 : 0.3);
  //   d3.select('.' + style.img_profile)
  //     .style('background-image', 'none');
  // }
  // shouldComponentUpdate(nextProps, nextState) {}
  // static getDerivedStateFromProps(props, state) {}
  // getSnapshotBeforeUpdate(prevProps, prevState) {}
  // static getDerivedStateFromError(error) {}
  // componentDidCatch() {}
  render() {
    return (
      <div className={style.app}>
        <div className={style.chart_container}></div>
        <div className={style.scales_container}>
          {
            // The scale on the right.
            scales.map((scale, i) => ((scale > -0.025 && scale < 0.025) ? (<div key={i} className={style.scale_container} style={{backgroundColor:f(scale), borderLeft:'1px dashed rgba(0, 0, 0, 0.3)'}}><div className={style.scale_text_zero}><div>0 °C</div></div></div>) :  (<div key={i} className={style.scale_container} style={{backgroundColor:f(scale)}}></div>)))
          }
        </div>
      </div>
    );
  }
}
export default App;