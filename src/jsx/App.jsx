import React, {Component} from 'react';
import style from './../styles/styles.less';

// https://d3js.org/
import * as d3 from 'd3';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  componentWillUnMount() {

  }
  parseHtmlToText(d) {
    return d.replace(/(<([^>]+)>)/gi, '');
  }
  extractWorkYear(d) {
    return +d.WORKS_NA_2.split(',')[1];
  }
  extractWorkNAME(d) {
    return this.parseHtmlToText(d.WORKS_NA_2)
  }
  getData() {
    const url = 'https://gist.githubusercontent.com/carmen-tm/6a679d25155e44fb05deb71a75fafa17/raw/ad5f5fef2f842258210754ae3ac442dc466bef4b/json_Designers_2.geojson';
    let get_img = (string) => {
      const array = string.split('/');
      const img_name = array[array.length - 1].slice(0, -2);

      return img_name;
    }
    d3.json(url).then((data) => {
      data = data.features.map((d, i) => {
        d.NAME = this.parseHtmlToText(d.properties.NAME);
        d.SURNAME = this.parseHtmlToText(d.properties.SURNAME);
        d.workPiece = this.extractWorkYear(d.properties);
        d.id = 'woman-' + i;
        d.imgProfile = get_img(d.properties.IMG_SRC_D);
        d.YEAR_B = +d.properties.YEAR_B;
        d.YEAR_D = +d.properties.YEAR_D;
        d.WORKS_NA_2 = d.properties.WORKS_NA_2;
        d.wikipedia = 'https://yle.fi';
        return d;
      }).sort((b, a) => this.extractWorkYear(a.properties) - this.extractWorkYear(b.properties));
      this.createRadialChart(data);
    });
  }
  createRadialChart(data) {
    // Define contants.
    const margin = { top: 0, right: 50, bottom: 0, left: 0 }, // Define margins.
          inner_radius = 50, // Define the inner radius of chart.
          outer_radius = 350, // Define the outer radius of chart.
          my_domain = [1850, 2021], // Define the scale domain
          legend_ring_points = [1920, 1940, 1960, 1980, 2000, 2020],
          color_main = '#e16767', // Define the base main color.
          // Define the x and y radial.
          x = d3.scaleBand()
                .range([Math.PI / 2 + 0.04, Math.PI / 2 + 2 * Math.PI - 0.1])
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

    // Create the center container.
    this.createCenterContainer(chart_elements, width, height, margin);
    // Create radial bars.
    this.createRadialBars(data, chart_elements, inner_radius, width, height, x, y);
    // Create the interactive layer.
    // this.createInteractiveLayer(width, height);
    // Create radial rings.
    this.createRadialRings(chart_elements, width, height, y, legend_ring_points);
    // Create bar info.
    this.createBarInfo(data, chart_elements, width, height, x, y, my_domain)
    // Create a legend.
    this.createLegend(svg);


    setInterval(() => {
      this.updateRadialBars(data, chart_elements, inner_radius, width, height, x, y);
    }, 2000);
  }
  createCenterContainer(chart_elements, width, height, margin) {
    const img_diameter = 200;
    chart_elements.append('foreignObject')
      .attr('x', (width / 2 - img_diameter / 2) + 'px')
      .attr('y', (height / 2 - img_diameter / 2) + 'px')
      .style('width', img_diameter + 'px')
      .style('height', img_diameter + 'px')
      .html('<div class="' + style.img_profile + '" style="width: ' + img_diameter + 'px; height: ' + img_diameter + 'px;"></div>');
    chart_elements.append('g')
      .attr('class', style.center_text)
      .append('text')
      .attr('y', margin.top + height / 2 - 25)
      .style('dominant-baseline', 'hanging')
      .style('text-anchor', 'middle')
      .html('<tspan style="font-size: 19px;" x="' + (width / 2) + '" y="' + (margin.top + height / 2 - 25) + '">100 years</tspan><tspan style="font-size: 16px; font-weight: 600;" x="' + (width / 2) + '" y="' + (margin.top + height / 2) + '">100 INSPIRING WOMEN</tspan><tspan style="font-size: 12px;" x="' + (width/2) + '" y="' + (margin.top + height / 2 + 20) +'">just in Europe</tspan>');
  }
  createRadialBars(data, chart_elements, inner_radius, width, height, x, y) {
    chart_elements.append('g')
                  .attr('class', style.bars_container)
                  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
                  .selectAll('path')
                  .data(data).enter()
                  .append('path')
                  .attr('data-id', d => d.id)
                  .attr('d', d3.arc()
                               .innerRadius(d => y(d['YEAR_B']))
                               .outerRadius(d => y(d['YEAR_D'] || 2021))
                               .startAngle(d => x(d.id))
                               .endAngle(d => x(d.id) + x.bandwidth())
                               .padAngle(0.15)
                               .padRadius(inner_radius))
                  .attr('opacity', 0)
                  .transition()
                  .duration(500)
                  .delay((d, i) => i * 15)
                  .attr('opacity', 1)
                  .style('pointer-events', 'none');
  }
  updateRadialBars(data, chart_elements, inner_radius, width, height, x, y) {
    let min = -20;
    let max = 20;
    d3.selectAll('.' + style.bars_container)
      .selectAll('path')
      .transition()
      .duration(2000)
      .attr('d', d3.arc()
      .innerRadius(d => y(d['YEAR_B'] + Math.floor(Math.random() * (max - min + 1) + min)))
      .outerRadius(d => y(d['YEAR_D'] + Math.floor(Math.random() * (max - min + 1) + min) || 2021))
      .startAngle(d => x(d.id))
      .endAngle(d => x(d.id) + x.bandwidth())
      .padAngle(0.15)
      .padRadius(inner_radius))
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
                      .style('stroke', 'white')
                      .style('stroke-width', '2')
                      .style('pointer-events', 'none');
    chart_legend_rings.selectAll('text')
                      .data(legend_ring_points)
                      .join('text')
                      .attr('x', d => width / 2 + y(d) + 2)
                      .attr('y', d => height / 2)
                      .text(d => d)
                      .style('opacity', 0.7)
                      .style('font-size', '12px')
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
                    const angleToRotate = ((x(d.id) + x.bandwidth() / 2) * 180) / Math.PI - 90;
                    return `rotate(${angleToRotate})`;
                  })
                  .attr('text-anchor', (d) => {
                    return (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'end' : 'start';
                  })
                  .each((d, i, nodes) => {
                    const el = d3.select(nodes[i]);
                    // Name.
                    el.append('text')
                      .attr('data-id', d => d.id)
                      .style('opacity', d => d.wikipedia != '' && d.wikipedia != 'x' ? 0.7 : 0.3)
                      .attr('x', d => (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? -y(d['YEAR_D'] || 2021) - 10 : y(d['YEAR_D'] || 2021) + 10)
                      .attr('y', 0)
                      .text(d => d.NAME + ' ' + d.SURNAME.charAt(0) + '.')
                      .style('font-size', '15px')
                      .style('dominant-baseline', 'middle')
                      // Rotation to improve readability
                      .attr('transform', d => (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? 'rotate(180)' : 'rotate(0)')
                    // Radial line
                    el.append('line')
                      .attr('x1', 120)
                      .attr('x2', y(my_domain[1]) + 100)
                      .attr('y1', 0)
                      .attr('y2', 0)
                      .style('opacity', 0.5)
                      .style('stroke', '#000')
                      .style('stroke-width', 0.15);
                    // Circles on bars.
                    el.append('circle')
                      .attr('class', style.selected_work_point)
                      .attr('cx', d => y(this.extractWorkYear(d)))
                      .attr('cy', 0)
                      .attr('r', 2.5)
                      .style('fill', '#000');
                  })
                  .style('pointer-events', 'none');
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