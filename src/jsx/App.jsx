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
      f_text = chroma.scale(['red', 'rgba(0, 0, 0, 0.3)', 'blue']).padding(-1).domain([scaleMax, 0, scaleMin]);
const margin = {top: 0, right: 50, bottom: 0, left: 0},
      inner_radius = 0,
      outer_radius = 400,
      my_domain = [-3.5, 3.5],
      legend_ring_points = [-2, -1, 0, 1, 2, 3],
      height = window.innerHeight - margin.top - margin.bottom,
      width = window.innerWidth - margin.left - margin.right;

const x = d3.scaleBand()
  .range([Math.PI / 2 + 0.07, Math.PI / 2 + 2 * Math.PI - 0.1])
  .align(0);
const y = d3.scaleLinear()
  .range([inner_radius, outer_radius])
  .domain(my_domain);
const xScale = d3.scaleLinear()
  .range([0, 200])
  .domain([-1, 119]);
const yScale = d3.scaleLinear()
  .range([40, 0])
  .domain([-1, 1]);

let chart_elements,
    interval,
    scales = [],
    avg_tmps = [],
    temperature = scaleMin;
while (temperature < scaleMax) {
  temperature = temperature + 0.05;
  scales.push(temperature);
}

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
      x.domain(data[this.state.year].map(d => d.id));
      this.data = data;
       Object.keys(data).forEach((year) => {
        let temperature = data[year].reduce((accumulator, current, index, array) => (accumulator + current.temp), 0) / data[year].length;
        avg_tmps.push(temperature);
      });
      avg_tmps = [-0.15,-0.28,-0.37,-0.47,-0.26,-0.22,-0.39,-0.43,-0.48,-0.43,-0.44,-0.36,-0.34,-0.15,-0.14,-0.36,-0.46,-0.3,-0.27,-0.27,-0.19,-0.29,-0.27,-0.27,-0.22,-0.11,-0.22,-0.2,-0.36,-0.16,-0.1,-0.16,-0.29,-0.12,-0.2,-0.15,-0.03,0,-0.02,0.12,0.18,0.06,0.09,0.2,0.09,-0.07,-0.03,-0.11,-0.11,-0.17,-0.07,0.01,0.08,-0.13,-0.14,-0.19,0.05,0.06,0.03,-0.03,0.06,0.03,0.05,-0.2,-0.11,-0.06,-0.02,-0.08,0.05,0.03,-0.08,0.01,0.16,-0.07,-0.01,-0.1,0.18,0.07,0.16,0.26,0.32,0.14,0.31,0.16,0.12,0.18,0.32,0.39,0.27,0.45,0.41,0.22,0.23,0.32,0.45,0.33,0.47,0.61,0.39,0.4,0.54,0.63,0.62,0.54,0.68,0.64,0.66,0.54,0.66,0.72,0.61,0.65,0.68,0.74,0.9,1.01,0.92,0.85,0.98,1.02];
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

    // Svg chart container.
    chart_elements = svg.append('g')
      .attr('class', style.chart_elements)
      .attr('transform', 'translate(0, ' + margin.top + ')');

    // Create radial bars.
    this.createRadialBars(data);
    // Create the center container.
    this.createCenterContainer();
    // Create radial rings.
    this.createRadialRings();
    // Create bar info.
    this.createBarInfo(data);
    // Create line chart.
    this.createLineChart();
    this.getCurrentYearAverageTemp(data);
    setTimeout(() => {
      interval = setInterval(() => {
        this.setState((state, props) => ({
          year:state.year +1
        }), () => {
          this.getCurrentYearAverageTemp(this.data[this.state.year]);
          this.updateLineChart();
          this.updateRadialBars(this.data[this.state.year]);
        });
        if (this.state.year >= 2020) {
          clearInterval(interval);
          this.createInteractiveLayer(this.data[this.state.year]);
        }
      }, 300);
    }, 2000);
  }
  createLineChart() {
    chart_elements.append('g')
      .append('text')
      .attr('transform', 'translate(' + (width / 2 - 400) + ', 40)')
      .attr('class', style.title)
      .html('Temperature anomalies');
    const line_container = chart_elements.append('g')
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
      );
    // Add the lines.
    line_container.append('path')
      .attr('class', style.current_avg_temp_line)
      .data([]);
  }
  updateLineChart() {
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d));
    chart_elements.select('.' + style.current_avg_temp_line)
      .attr('class', style.current_avg_temp_line)
      .style('stroke', '#000')
      .attr('d', line(avg_tmps.slice(0, this.state.year - 1901)));
  }
  getCurrentYearAverageTemp(data) {
    this.setState((state, props) => ({
      current_avg_temp:avg_tmps[this.state.year - 1901].toFixed(1)
    }), () => this.updateCenterContainer());
  }
  createCenterContainer() {
    const center_diameter = 175;
    chart_elements.append('g')
      .attr('transform', 'translate(' + (width / 2 - center_diameter / 2) + ',' + (height / 2 - center_diameter / 2) + ')')
      .append('foreignObject')
      .style('width', center_diameter + 'px')
      .style('height', center_diameter + 'px')
      .html('<div class="' + style.center_container + '" style="width: ' + center_diameter + 'px; height: ' + center_diameter + 'px;"></div>');
    chart_elements.append('g')
      .attr('class', style.center_text)
      .append('text')
      .attr('y', margin.top + height / 2)
      .style('text-anchor', 'middle')
      .html('<tspan class="' + style.year_text + '"x="' + (width / 2) + '" y="' + (margin.top + (height / 2) - 35) + '">Year</tspan><tspan class="' + style.year + '" x="' + (width / 2) + '" y="' + (margin.top + (height / 2) + 15) + '">' + this.state.year + '</tspan><tspan class="' + style.temp + '" x="' + (width / 2) + '" y="' + (margin.top + (height / 2) + 45) + '">' + this.state.current_avg_temp + '</tspan>');
  }
  updateCenterContainer() {
    d3.select('.' + style.center_text).select('text').select('.' + style.year).html(this.state.year);
    d3.select('.' + style.center_text).select('text').select('.' + style.temp).attr('fill', f_text(this.state.current_avg_temp)).html(((this.state.current_avg_temp > 0) ? '+' : '') + this.state.current_avg_temp + ' °C');
  }
  createRadialBars(data) {
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
      .duration(300)
      .delay((d, i) => i * 10)
      .attr('opacity', 1)
      .style('pointer-events', 'none');
  }
  updateRadialBars(data) {
    d3.selectAll('.' + style.bars_container)
      .selectAll('path')
      .transition()
      .duration(100)
      .attr('fill', d => (d.country !== '') ? f(data.find(element => element.country === d['country'])['temp']) : y(my_domain[0]))
      .attr('d', d3.arc()
        .innerRadius(d => y(my_domain[0]))
        .outerRadius(d => (d.country !== '') ? y(data.find(element => element.country === d['country'])['temp']) : y(my_domain[0]))
        .startAngle(d => x(d.id))
        .endAngle(d => x(d.id) + x.bandwidth())
        .padRadius(inner_radius));
  }
  createRadialRings() {
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
  createBarInfo(data) {
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
          .attr('x1', 87)
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

    chart_elements.append('g')
      .attr('class', 'continent_arcs')
      .selectAll('path')
      .data(pie(continents_data))
      .enter().append('path')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
      .attr('d',  d3.arc().innerRadius(300).outerRadius(301))
      .style('fill', 'transparent')
      .each((d, i, nodes) => {
        let first_arc_section = /(^.+?)L/;  
        let new_arc = first_arc_section.exec(d3.select(nodes[i]).attr('d'))[1].replace(/,/g , ' ');;
        // Reverse the path if needed.
        if (d.endAngle > (90 * Math.PI / 180) && d.endAngle < (270 * Math.PI / 180)) {
          const start_loc = /M(.*?)A/,
                middle_loc  = /A(.*?)0 0 1/,
                end_loc = /0 0 1 (.*?)$/;
          const new_start = end_loc.exec(new_arc)[1];
          const new_end = start_loc.exec(new_arc)[1];
          const middle_sec = middle_loc.exec(new_arc)[1];
          new_arc = 'M' + new_start + 'A' + middle_sec + '0 0 0 ' + new_end;
        }
        d3.select('.continent_arcs').append('path')
          .attr('class', 'hidden_continent_arcs')
          .attr('id', 'continent_arc' + i)
          .attr('d', new_arc)
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
          .style('fill', 'none');
    });

    //Append the continent names within the arcs.
    chart_elements.append('g')
      .attr('class', style.continent_text)
      .selectAll('text')
      .data(pie(continents_data))
      .enter().append('text')
      .attr('dy', d => (d.endAngle > (90 * Math.PI / 180) && d.endAngle < (270 * Math.PI / 180) ? 10 : 0))
      .append('textPath')
      .attr('startOffset', '50%')
      .style('text-anchor', 'middle')
      .attr('xlink:href', (d, i) => '#continent_arc' + i)
      .text((d) => d.data.name);
  }
  createInteractiveLayer(data) {
    // Interactive layer.
    chart_elements.selectAll('.' + style.bars_aux).remove();
    chart_elements.append('g')
      .attr('class', style.bars_aux)
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .selectAll('a')
      .data(data).enter()
      .append('a')
      .attr('target', '_blank')
      .attr('href', d => '')
      .append('path')
      .attr('class', style.aux)
      .attr('data-id', d => d.id)
      .attr('fill', 'transparent')
      .attr('d', d3.arc()
        .innerRadius(inner_radius)
        .outerRadius(outer_radius + 50)
        .startAngle(d => x(d.id))
        .endAngle(d => x(d.id) + x.bandwidth())
        .padRadius(inner_radius))
      // https://stackoverflow.com/questions/63693132/unable-to-get-node-datum-on-mouseover-in-d3-v6
      .on('mouseover', (event, d) => this.onMouseOver(event, d))
      .on('mouseout', (event, d) => this.onMouseOut(event, d));
  }
  onMouseOver(event, d) {
    if (d.country !== '') {
      d3.select('.' + style.bars_container)
        .selectAll('path:not(path[data-id="' + d.id + '"])')
        .style('opacity', 0.2);
      d3.select('.' + style.bars_info_container)
        .select('text[data-id="' + d.id + '"]')
        .style('opacity', 1);
      d3.select('.' + style.bars_info_container)
        .selectAll('text:not(text[data-id="' + d.id + '"])')
        .style('opacity', 0.2);
      d3.select(event.currentTarget).style('opacity', 1);
      d3.select('.' + style.tooltip)
        .style('left', (event.pageX + 20) + 'px')
        .style('top', (event.pageY + 20) + 'px')
        .style('opacity', 1)
        .html(d.country + ': ' + ((d.temp > 0) ? '+' : '') + d.temp + ' °C');
    }
  }
  onMouseOut(event, d) {
    d3.select(event.currentTarget).style('opacity', 0.8);
    d3.select('.' + style.bars_container)
      .selectAll('path')
      .style('opacity', 1);
    d3.select('.' + style.bars_info_container)
      .selectAll('text')
      .style('opacity', d => 1);
    d3.select('.' + style.tooltip)
      .style('opacity', 0)
  }
  handleSliderValueChange(event) {
    clearInterval(interval);
    const year = parseInt(event.target.value);
    // Create the interactive layer.
    this.createInteractiveLayer(this.data[year]);
    // If year is changed manually we stop the interval.
    this.setState((state, props) => ({
      year:year
    }), () => {
      this.getCurrentYearAverageTemp(this.data[this.state.year]);
      this.updateLineChart();
      this.updateRadialBars(this.data[this.state.year]);
    });
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
        <div className={style.scales_container}>
          {
            // The scale on the right.
            scales.map((scale, i) => ((scale > -0.025 && scale < 0.025) ? (<div key={i} className={style.scale_container} style={{backgroundColor:f(scale), borderLeft:'1px dashed rgba(0, 0, 0, 0.3)'}}><div className={style.scale_text_zero}><div>0 °C</div></div></div>) :  (<div key={i} className={style.scale_container} style={{backgroundColor:f(scale)}}></div>)))
          }
        </div>
        <div className={style.range_container}>
          <div>World data: <a href="https://data.giss.nasa.gov/gistemp/">NASA</a></div>
          <div>Country data: <a href="https://climateknowledgeportal.worldbank.org/download-data">World Bank</a></div>
          <div>Author: <a href="https://twitter.com/teelmo">Teemo Tebest</a>, EBU</div>
          <div>Reference period: 1951–1980</div>
          <input type="range" min={1901} max={2020} value={this.state.year} onChange={(event) => this.handleSliderValueChange(event)} />
        </div>
        <div className={style.tooltip}></div>
      </div>
    );
  }
}
export default App;