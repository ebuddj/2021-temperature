// https://observablehq.com/@carmen-tm/women-architects-i-didnt-hear-about@1921
import define1 from "./a2e58f97fd5e8d7c@620.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["WomenContestProcess01.gif",new URL("./files/9faa5eee703011081935b88696a58809cfaf74216c493e9b436a5199e7f60428f159a0e2a510aa2a4fc3bec4038929e76fa7c555829e3cc4b67eeb6582ba0c73",import.meta.url)],["Sketches_A.jpg",new URL("./files/fe64377c72e5b5b40f032b76ffd189a02d819d8dcd8648213f79c2bd11baf9a85c7df845a06bce31ce9143ca355256eec49f9949cd7bbf738fcb9190e5805d45",import.meta.url)],["Sketches_B.jpg",new URL("./files/388bd555886b16a98a3888548582029ece06ad10522776030605650d63210674fcaf64798c414900e6b940e170bac8ae52b703bb0b8d846c3cb8d3893fc97a0b",import.meta.url)],["Sketches_C.jpg",new URL("./files/51050924727391680c443fc26f0fad3d8d7b159aa9991af4cc637ec9c845f26ee5da0f99f618fa67362c335e0629e60270f2b5b4988160b4923196717b5c3abb",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Some of the WOMEN ARCHITECTS AND DESIGNERS I didn't hear about at university
Entry for the [Women's History Month dataviz contest](https://observablehq.com/@observablehq/womens-history-month-dataviz-contest)

Data source: [MoMoWo](http://www.momowo.eu/)
`
)});
  main.variable(observer("viewof languageSelector")).define("viewof languageSelector", ["Radio","md"], function(Radio,md){return(
Radio(["en", "es"], {
  label: md`**New!** Language`,
  value: "en" // Default value
})
)});
  main.variable(observer("languageSelector")).define("languageSelector", ["Generators", "viewof languageSelector"], (G, _) => G.input(_));
  main.variable(observer()).define(["languageSelector","md"], function(languageSelector,md){return(
languageSelector === "en"
  ? md`**New!** Click on their names to explore their Wikipedia entries.`
  : md`**Nuevo!** Haz click en sus nombres para explorar sus entradas en Wikipedia.`
)});
  main.variable(observer("chart2")).define("chart2", ["html","styles","drawRadialChart"], function*(html,styles,drawRadialChart)
{
  yield html`
    ${styles}
    <div id="radialChart">      
    </div>`;
  drawRadialChart();
}
);
  main.variable(observer("why")).define("why", ["languageSelector","md"], function(languageSelector,md){return(
languageSelector === "en"
  ? md`# Why
  _Vitruvio, Francesco Borromini, Bernini, Leon Battista Alberti, Michelangelo, Raphael, Filippo Brunelleschi, Andrea Palladio, Alonso Cano, Eugene Viollet-le-Duc, Richard Morris, Otto Wagner,  Antoni Gaudí, Victor Horta, Joseph Maria Olbrich, Hector Guimard, Frank Lloyd Wright, Charles Rennie Mackintosh, Adolf Loos, Walter Gropius, Erich Mendelsohn, Ludwig Mies van der Rohe, Alvar Aalto, Louis Kahn, Philip Johnson,  Oscar Niemeyer, Eero Saarinen, Kenzo Tange, Jørn Utzon, Le Corbusier, Frank Lloyd Wright, Peter Eisenman, Richard Rogers, Richard Meier, Norman Foster, Renzo Piano, Marcel Breuer, Eliel Saarinen, Aldo Rossi, John Nash, Richard Buckminster Fuller, Frank O. Gehry, Shigeru Ban, Rem Koolhas._

  Behind those names are some of the so-called "best architects" of all time. I have studied them with admiration. Still today, around 15 years after those lessons at university, pictures of their work come clearly to my mind. I also remember travelling around Europe seeking their works. They all appear on the city's guides. They are icons, superstars. **But also white, and male.** 

  It's hard to believe what I'm saying, but I cannot recall a single **female architect** being named along the 3 years of "History of Architecture" lessons. I feel disappointed and sad. Their names and works are unknown by architecture students and professionals, let alone by society.

  This tiny piece is a small personal tribute to some of the creative women hidden in history. A small but precious selection, limited in space and time to Europe and the last century. 

  **All of them are strong, inspiring amazing women.**

  ---
  `
  : md`# Por qué
  _Vitruvio, Francesco Borromini, Bernini, Leon Battista Alberti, Michelangelo, Raphael, Filippo Brunelleschi, Andrea Palladio, Alonso Cano, Eugene Viollet-le-Duc, Richard Morris, Otto Wagner,  Antoni Gaudí, Victor Horta, Joseph Maria Olbrich, Hector Guimard, Frank Lloyd Wright, Charles Rennie Mackintosh, Adolf Loos, Walter Gropius, Erich Mendelsohn, Ludwig Mies van der Rohe, Alvar Aalto, Louis Kahn, Philip Johnson,  Oscar Niemeyer, Eero Saarinen, Kenzo Tange, Jørn Utzon, Le Corbusier, Frank Lloyd Wright, Peter Eisenman, Richard Rogers, Richard Meier, Norman Foster, Renzo Piano, Marcel Breuer, Eliel Saarinen, Aldo Rossi, John Nash, Richard Buckminster Fuller, Frank O. Gehry, Shigeru Ban, Rem Koolhas._

  Detrás de estos nombres están algunos de los que conocemos como "mejores arquitectos" de todos los tiempos. Los he estudiado con admiración. Aunque tengo muy mala memoria, todavía hoy, 15 años después de aquellas clases en la universidad, me vienen a la cabeza imágenes de los trabajos de la gran mayoría de ellos. También recuerdo aprovechar mis viajes por Europa para buscar sus obras. Sus nombres aparecen en las guías de arquitectura de cada ciudad. Son iconos, super estrellas, **pero también comparten otro rasgo: son todos hombres blancos**.

  Me resulta increíble, pero no recuerdo haber estudiado a ni una sola **mujer arquitecta** en los 3 años que cursé la asignatura "Historia de la Arquitectura". Me produce tristeza y decepción. Si sus nombres y trabajos son desconocidos por profesionales de la arquitectura y estudiantes, cuánto más lo serán para la sociedad en general.

  Esta pequeña pieza es un tributo personal a algunas de las mujeres creativas escondidas en la historia. Una pequeña pero valiosa selección, limitada en el espacio y en el tiempo a la Europa del último siglo.

  **Todas ellas son mujeres valientes, extraordinarias e inspiradoras.**

  ---
  `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Process notes

**Saturday 27th**: The contest is a bit extended and I wanted to participate, in despite of having very little time. I deciced to research female pioneers of architecture hidden from history. It touches me :)

After many hours of intense research on the web, I found it very difficult to spot an appropriate and diverse dataset. When I was on the edge of giving up, I came across [MoMoWo website](http://www.momowo.eu/) and started reading about their project "Women's Creativity Since the Modern Movement". It looked amazing. I downloaded and read many documents, found their [GIS database](http://www.momowo.polito.it) and decided to start with those materials, ideally completing them with a few more extra elements such as Wikipedia entries (some of them don't have one!!). I would like to go deeper into all this, but time is running out.

**Sunday 28th**: Ok let's have some fun. I have very little time, but I still want to join the community to celebrate _Women through history_ and try my best to try to visualize something with the names and photos collected the day before.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer("drawRadialChart")).define("drawRadialChart", ["heightRadial","xRadial","yRadial","d3","width","margin","locale","languageSelector","colorMain","data","innerRadius","outerRadius","onMouseOver","onMouseOut","myDomain","extractWorkYear"], function(heightRadial,xRadial,yRadial,d3,width,margin,locale,languageSelector,colorMain,data,innerRadius,outerRadius,onMouseOver,onMouseOut,myDomain,extractWorkYear){return(
async function drawRadialChart() {
  const height = heightRadial;
  const x = xRadial;
  const y = yRadial;

  const svg = d3
    .select("#radialChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // CHART TITLE
  const titleChart = svg.append("g").attr('id', 'titleChart');
  const initPosit = 60;
  const diffPosit = 40;
  const fontSize = '40px';

  titleChart
    .append('text')
    .attr('x', width / 2)
    .attr('y', initPosit)
    .text(locale[languageSelector].title.a)
    .style('font-size', fontSize)
    .style('text-anchor', 'middle');
  titleChart
    .append('text')
    .attr('x', width / 2)
    .attr('y', initPosit + diffPosit)
    .text(locale[languageSelector].title.b)
    .style('font-weight', 800)
    .style('font-size', fontSize)
    .style('fill', colorMain)
    .style('text-anchor', 'middle');
  titleChart
    .append('text')
    .attr('x', width / 2)
    .attr('y', initPosit + diffPosit * 2)
    .text(locale[languageSelector].title.c)
    .style('font-size', fontSize)
    .style('text-anchor', 'middle');
  titleChart
    .append('text')
    .attr('x', width / 2)
    .attr('y', initPosit + diffPosit * 3)
    .text(locale[languageSelector].title.d)
    .style('font-size', fontSize)
    .style('text-anchor', 'middle');

  // CENTRAL IMAGE
  const imgWidth = 200;
  const imgTest = d3
    .select("#radialChart")
    .append('div')
    .attr('id', 'imgProfile')
    .style("width", `${imgWidth}px`)
    .style("height", `${imgWidth}px`)
    .style('filter', 'grayscale(100%)')
    .style('border-radius', '50%')
    .style('background-size', 'cover')
    .style('background-position', 'center center')
    .style('position', 'absolute')
    .style('top', `${margin.top + height / 2 - imgWidth / 2}px`)
    .style('left', `${width / 2 - imgWidth / 2}px`)
    .append('p')
    .attr('class', 'workInfoExtra')
    .text('');

  // CENTRAL TEXT
  // If empty image: some central text visible
  const titleCenter = svg.append("g").attr('id', 'centerText');
  titleCenter
    .append('text')
    .attr('x', width / 2)
    .attr('y', margin.top + height / 2 - 25)
    .text(locale[languageSelector].centerText.a)
    .style('font-size', '19px')
    .style("dominant-baseline", "hanging")
    .style('text-anchor', 'middle')
    .style('fill', colorMain);
  titleCenter
    .append('text')
    .attr('x', width / 2)
    .attr('y', margin.top + height / 2)
    .text(locale[languageSelector].centerText.b)
    .style('font-size', '16px')
    .style('font-weight', 800)
    .style("dominant-baseline", "hanging")
    .style('text-anchor', 'middle')
    .style('fill', colorMain);
  titleCenter
    .append('text')
    .attr('x', width / 2)
    .attr('y', margin.top + height / 2 + 20)
    .text(locale[languageSelector].centerText.c)
    .style('font-size', '12px')
    .style("dominant-baseline", "hanging")
    .style('text-anchor', 'middle')
    .style('fill', colorMain);

  // SVG CHART
  const chartElGroup = svg
    .append("g")
    .attr('id', 'chartElGroup')
    .attr("transform", `translate(0,${margin.top})`);

  // RADIAL BARS
  const barsGroup = chartElGroup
    .append("g")
    .attr('id', 'barsGroup')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  barsGroup
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr('data-id', d => d.id)
    .attr('fill', colorMain)
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(d => y(+d['YEAR_B']))
        .outerRadius(d => y(+d['YEAR_D'] || 2021))
        .startAngle(d => x(d.id))
        .endAngle(d => x(d.id) + x.bandwidth())
        .padAngle(0.15)
        .padRadius(innerRadius)
    )
    .attr('opacity', 0)
    .transition()
    .duration(500)
    .delay((d, i) => i * 15)
    .attr('opacity', 1)
    .style("pointer-events", "none");

  ///////////

  // NEW!! Aux elements for interaction
  const barsAux = chartElGroup
    .append("g")
    .attr('id', 'barsAux')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  barsAux
    .selectAll("a")
    .data(data)
    .enter()
    .append("a")
    .attr("target", "_blank")
    .attr("href", d =>
      d.wikipedia != "" && d.wikipedia != "x" ? d.wikipedia : null
    )
    .append("path")
    .attr("class", "aux")
    .attr('data-id', d => d.id)
    .attr('fill', "transparent")
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius + 120)
        .startAngle(d => x(d.id))
        .endAngle(d => x(d.id) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius)
    )
    .style("cursor", d =>
      d.wikipedia != "" && d.wikipedia != "x" ? "pointer" : "auto"
    )
    .on("mouseover", onMouseOver)
    .on("mouseout", onMouseOut);

  ///////

  // TIME RINGS
  const decades = [1920, 1940, 1960, 1980, 2000, 2020];
  const constDates = chartElGroup.append('g').attr('id', 'circlesDates');

  constDates
    .selectAll('circle')
    .data(decades)
    .join('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', d => y(d))
    .style('fill', 'none')
    .style('stroke', 'white')
    .style('stroke-width', '2')
    .style("pointer-events", "none");

  constDates
    .selectAll('text')
    .data(decades)
    .join('text')
    .attr('x', d => width / 2 + y(d) + 2)
    .attr('y', d => height / 2)
    .text(d => d)
    .style('fill', colorMain)
    .style('opacity', 0.7)
    .style('font-size', '12px')
    .style("pointer-events", "none");

  // WOMEN'S INFO
  const womenInfoGroup = chartElGroup
    .append("g")
    .attr('id', 'womenInfo')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  womenInfoGroup
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "womanInfo")
    .attr('id', d => d.id)
    .attr('opacity', 0.8)
    .attr("transform", function(d) {
      const defunctionYear = +d["YEAR_D"] || 2021;
      const angleToRotate =
        ((x(d.id) + x.bandwidth() / 2) * 180) / Math.PI - 90;
      return `rotate(${angleToRotate})`;
    })
    .attr("text-anchor", function(d) {
      return (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI
        ? "end"
        : "start";
    })
    .each(function(d) {
      const el = d3.select(this);

      // NAMES (anchors to wikipedia links)
      el.append("text")
        .attr('data-id', d => d.id)
        //.style('opacity', 0.5)
        .style("opacity", d =>
          d.wikipedia != "" && d.wikipedia != "x" ? 0.7 : 0.3
        )
        .attr('x', function(d) {
          return (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
            Math.PI
            ? -y(+d["YEAR_D"] || 2021) - 10
            : y(+d["YEAR_D"] || 2021) + 10;
        })
        .attr('y', 0)
        .text(d => `${d.NAME} ${d.SURNAME.charAt(0)}.`)
        .style('font-size', '15px')
        .style("text-decoration", d =>
          d.wikipedia != "" && d.wikipedia != "x" ? "underline" : "none"
        )
        .style("dominant-baseline", "middle")
        // Rotation to improve readability
        .attr("transform", function(d) {
          return (x(d.id) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
            Math.PI
            ? "rotate(180)"
            : "rotate(0)";
        });

      // LINES
      el.append('line')
        .attr("x1", 120)
        .attr("x2", y(myDomain[1]) + 100)
        .attr("y1", 0)
        .attr("y2", 0)
        .style("stroke", "black")
        .style('opacity', 0.7)
        .style('stroke-width', 0.15);

      // SELECTED WORK POINT
      el.append('circle')
        .attr('class', 'selectedWorkPoint')
        .attr('cx', d => y(extractWorkYear(d)))
        .attr('cy', 0)
        .attr('r', 2.5)
        .style('fill', "black");
    })
    .style("pointer-events", "none");

  // LEGEND
  // Just on desktop
  if (width >= 940) {
    d3.select('#barsGroup path') // First path
      .clone()
      .attr('id', "legendBar")
      .attr('transform', 'translate(50, 476)rotate(-5)');

    d3.select('#womenInfo g .selectedWorkPoint') // First group
      .clone()
      .attr('id', "legendInfo")
      .attr('transform', 'translate(50, 445)');

    const legend = svg.append('g').attr('id', 'legend');

    legend
      .append('line')
      .attr('x1', width - 117)
      .attr('x2', width - 117)
      .attr('y1', margin.top + height - 30)
      .attr('y2', margin.top + height - 50)
      .style('stroke', "black")
      .style('stroke-width', 0.5)
      .style('stroke-dasharray', 3);
    legend
      .append('line')
      .attr('x1', width - 195)
      .attr('x2', width - 195)
      .attr('y1', margin.top + height - 30)
      .attr('y2', margin.top + height + 5)
      .style('stroke', "black")
      .style('stroke-width', 0.5)
      .style('stroke-dasharray', 3);

    legend
      .append('text')
      .attr('x', width - 190)
      .attr('y', margin.top + height)
      .text(locale[languageSelector].legend.yearOfBirth)
      .style('font-size', '12px');
    legend
      .append('text')
      .attr('x', width - 70)
      .attr('y', margin.top + height - 25)
      .text(locale[languageSelector].legend.name)
      .style('opacity', 0.5)
      .style('font-size', '16px');
    legend
      .append('text')
      .attr('x', width - 150)
      .attr('y', margin.top + height - 75)
      .text(locale[languageSelector].legend.exampleWork.a)
      .style('font-size', '12px');
    legend
      .append('text')
      .attr('x', width - 150)
      .attr('y', margin.top + height - 60)
      .text(locale[languageSelector].legend.exampleWork.b)
      .style('font-size', '12px');
  }
}
)});
  main.variable(observer("onMouseOver")).define("onMouseOver", ["d3","extractWorkNAME"], function(d3,extractWorkNAME){return(
function onMouseOver(event, d, i) {
  const myImgProfile = d.imgProfile;
  const myId = d.id;
  //console.log(myImgProfile);

  d3.select('#barsGroup')
    .selectAll(`path:not(path[data-id=${myId}])`)
    .style('opacity', 0.5);

  d3.select('#womenInfo')
    .selectAll(`text[data-id=${myId}]`)
    .style('opacity', 1);

  d3.select('#womenInfo')
    .selectAll(`text:not(text[data-id=${myId}])`)
    .style('opacity', 0.2);

  // Update bckg img
  d3.select('#imgProfile')
    .style(
      'background-image',
      `url(https://carmen-tm.github.io/WomenArchitectsTable/assets/${myImgProfile})`
    )
    .select('p')
    .text(extractWorkNAME(d));

  d3.select(this).style('opacity', 1);
}
)});
  main.variable(observer("onMouseOut")).define("onMouseOut", ["d3"], function(d3){return(
function onMouseOut(event, d, i) {
  d3.select(this).style('opacity', 0.8);

  d3.select('#barsGroup')
    .selectAll('path')
    .style("opacity", 1);

  d3.select('#womenInfo')
    .selectAll(`text`)
    .style('opacity', d =>
      d.wikipedia != "" && d.wikipedia != "x" ? 0.7 : 0.3
    );

  d3.select('#imgProfile')
    .style('background-image', `none`)
    .select('p')
    .text('');
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Data exploration`
)});
  main.variable(observer("viewof search03")).define("viewof search03", ["Search","architectsAndDesigners_Features"], function(Search,architectsAndDesigners_Features){return(
Search(
  architectsAndDesigners_Features.map(d => d.properties),
  {
    placeholder: "Buscador designers_2Features"
  }
)
)});
  main.variable(observer("search03")).define("search03", ["Generators", "viewof search03"], (G, _) => G.input(_));
  main.variable(observer("viewof table03")).define("viewof table03", ["Table","search03","html"], function(Table,search03,html){return(
Table(search03, {
  //rows: 110,
  columns: [
    "NAME",
    "SURNAME",
    "YEAR_B",
    "YEAR_D",
    //"IMG_SRC_D",
    "WORKS_NA_2"
    //"WORK_PREC"
  ],
  format: {
    //culmen_length_mm: x => x.toFixed(1),
    //culmen_depth_mm: x => x.toFixed(1),
    //sex: x => x === "MALE" ? "M" : x === "FEMALE" ? "F" : ""
    NAME: x => html`${x}`,
    SURNAME: x => html`${x}`,
    IMG_SRC_D: x => html`${x}`,
    //IMAGE: x => html`${x}`,
    WORKS_NA_2: x => html`${x}`,
    //WORK_PREC: x => html`${x}`,
    WORKS_IMG1: x => html`${x}`
    //html`<span class="contratos-btn"></span><span class="contratos-label">${x}</span>`,
  }
})
)});
  main.variable(observer("table03")).define("table03", ["Generators", "viewof table03"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**New!** Process sketches ✍🏻`
)});
  main.variable(observer()).define(["html","FileAttachment"], async function(html,FileAttachment){return(
html`
<figure style="display: width: 600px">
  ${await FileAttachment("Sketches_A.jpg").image()}
  <figcaption></figcaption>
</figure>
<figure style="display: inline-block; width: 315px">
  ${await FileAttachment("Sketches_B.jpg").image()}
  <figcaption></figcaption>
</figure>
<figure style="display: inline-block; width: 315px">
  ${await FileAttachment("Sketches_C.jpg").image()}
  <figcaption></figcaption>
</figure>
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### First approach: a simple timeline`
)});
  main.variable(observer("chart")).define("chart", ["d3","height","width","margin","data","y","axisBottom","x","myDomain","colorMain","parseHtmlToText","extractWorkYear"], function(d3,height,width,margin,data,y,axisBottom,x,myDomain,colorMain,parseHtmlToText,extractWorkYear)
{
  //const svg = d3.select(DOM.svg(width, height));
  const svg = d3
    .create('svg')
    .attr('height', height)
    .attr('width', width);

  const g = svg
    .append("g")
    .attr("transform", (d, i) => `translate(${margin.left} ${margin.top})`);

  const groups = g
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "civ");

  groups.attr("transform", (d, i) => `translate(0 ${y(i)})`);

  // Timeline axis - years
  svg
    .append("g")
    .attr(
      "transform",
      `translate(${margin.left} ${height - margin.bottom + 20})`
    )
    .call(axisBottom);

  groups.each(function(d) {
    const bandWidth = y.bandwidth();
    const el = d3.select(this);
    const bornYear = +d["YEAR_B"];
    const defunctionYear = +d["YEAR_D"] || 2021;

    el.append('line')
      .attr("x1", x(myDomain[0]))
      .attr("x2", x(myDomain[1]))
      .attr("y1", bandWidth * 0.5)
      .attr("y2", bandWidth * 0.5)
      .style("stroke", "grey")
      .style('stroke-width', 0.5)
      .style('stroke-dasharray', 3);

    el.append('rect')
      .attr("x", d => x(bornYear))
      .attr("height", bandWidth)
      .attr("width", d => x(defunctionYear) - x(bornYear))
      .attr('fill', colorMain);

    el.append("text")
      //.text(d => `${d.NAME} ${d.SURNAME}`)
      .text(d => `${parseHtmlToText(d.NAME)}`)
      .attr("x", d => x(bornYear) - 5)
      .attr("y", bandWidth / 2)
      .attr("fill", "black")
      .style("text-anchor", "end")
      .style("dominant-baseline", "middle")
      .style('font-size', '1.5rem');

    el.append('circle')
      .attr('cx', d => x(extractWorkYear(d)))
      .attr('cy', bandWidth / 2)
      .attr('r', 3)
      .style('fill', "black");
  });

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Final approach: going radial`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**New!** Time-lapse process captures 🙃`
)});
  main.variable(observer("processGIF")).define("processGIF", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("WomenContestProcess01.gif").image()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Improvements`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

**Update** after the [contest resolution](https://observablehq.com/@observablehq/announcing-the-womens-history-month-dataviz-contest-winne) with some extra improvements :)
  - [x] Improve hover interaction: I have added auxiliar shapes that cover bigger areas for interactions, instead of using just the text names areas.
  - [x] Language ES/EN toggle: done, via radio btn.
  - [x] Search for each woman's wikipedia entry and implement the interactions on click with that info.
  - [x] Compile some visual info about the process: sketches, screenshots?
  - [ ] Small walk around / autoplay?
  - [ ] Responsive?
---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Appendix`
)});
  main.variable(observer("json_architectsAndDesigners_URL")).define("json_architectsAndDesigners_URL", function(){return(
"https://gist.githubusercontent.com/carmen-tm/6a679d25155e44fb05deb71a75fafa17/raw/ad5f5fef2f842258210754ae3ac442dc466bef4b/json_Designers_2.geojson"
)});
  main.variable(observer("json_architectsAndDesigners")).define("json_architectsAndDesigners", ["json_architectsAndDesigners_URL"], async function(json_architectsAndDesigners_URL){return(
(await fetch(
  json_architectsAndDesigners_URL
)).json()
)});
  main.variable(observer("architectsAndDesigners_Features")).define("architectsAndDesigners_Features", ["json_architectsAndDesigners"], function(json_architectsAndDesigners){return(
json_architectsAndDesigners.features
)});
  main.variable(observer("wikipedia")).define("wikipedia", function(){return(
{
  en: {
    "woman-0": "https://en.wikipedia.org/wiki/Sonia_Delaunay",
    "woman-1": "https://en.wikipedia.org/wiki/Gunta_St%C3%B6lzl",
    "woman-2": "https://en.wikipedia.org/wiki/Helena_Kottler_Vurnik",
    "woman-3": "https://en.wikipedia.org/wiki/Alma_Siedhoff-Buscher",
    "woman-4": "https://en.wikipedia.org/wiki/Marianne_Brandt",
    "woman-5": "x",
    "woman-6": "https://en.wikipedia.org/wiki/Margarete_Sch%C3%BCtte-Lihotzky",
    "woman-7": "https://en.wikipedia.org/wiki/Elisabeth_Scott",
    "woman-8": "https://en.wikipedia.org/wiki/Eileen_Gray",
    "woman-9": "x",
    "woman-10": "https://en.wikipedia.org/wiki/Aino_Aalto",
    "woman-11": "https://en.wikipedia.org/wiki/Maria_Cotescu",
    "woman-12": "https://en.wikipedia.org/wiki/Martta_Martikainen-Ypy%C3%A4",
    "woman-13": "https://en.wikipedia.org/wiki/Lilly_Reich",
    "woman-14": "https://en.wikipedia.org/wiki/Mary_Medd",
    "woman-15": "https://en.wikipedia.org/wiki/Susie_Cooper",
    "woman-16": "https://en.wikipedia.org/wiki/Judith_Ledeboer",
    "woman-17": "https://en.wikipedia.org/wiki/Liane_Zimbler",
    "woman-18": "https://en.wikipedia.org/wiki/Greta_Magnusson-Grossman",
    "woman-19": "x",
    "woman-20": "x",
    "woman-21": "https://en.wikipedia.org/wiki/Elsi_Borg",
    "woman-22": "https://en.wikipedia.org/wiki/Anni_Albers",
    "woman-23": "https://en.wikipedia.org/wiki/Elena_Luzzatto",
    "woman-24": "https://en.wikipedia.org/wiki/Lux_Guyer",
    "woman-25": "https://sl.wikipedia.org/wiki/Sonja_Lapajne-Oblak",
    "woman-26": "https://en.wikipedia.org/wiki/Alexandra_Paschalidou-Moreti",
    "woman-27": "https://it.wikipedia.org/wiki/Antonia_Campi",
    "woman-28": "https://en.wikipedia.org/wiki/Franca_Helg",
    "woman-29": "https://en.wikipedia.org/wiki/Jane_Drew",
    "woman-30": "https://en.wikipedia.org/wiki/Tamara_Katsenelenbogen",
    "woman-31": "https://en.wikipedia.org/wiki/Stefania_Filo_Speziale",
    "woman-32": "https://en.wikipedia.org/wiki/Alison_and_Peter_Smithson",
    "woman-33": "https://en.wikipedia.org/wiki/Lina_Bo_Bardi",
    "woman-34": "https://de.wikipedia.org/wiki/Hans_und_Annemarie_Hubacher",
    "woman-35": "https://en.wikipedia.org/wiki/Nanna_Ditzel",
    "woman-36": "x",
    "woman-37": "https://sl.wikipedia.org/wiki/Nives_Kalin_Vehovar",
    "woman-38": "https://en.wikipedia.org/wiki/Ivanka_Raspopovi%C4%87",
    "woman-39": "x",
    "woman-40": "https://it.wikipedia.org/wiki/Nanda_Vigo",
    "woman-41": "https://en.wikipedia.org/wiki/Cini_Boeri",
    "woman-42": "https://en.wikipedia.org/wiki/Ljiljana_Baki%C4%87",
    "woman-43":
      "https://de.wikipedia.org/wiki/Ralf_Sch%C3%BCler_und_Ursulina_Sch%C3%BCler-Witte",
    "woman-44": "x",
    "woman-45": "https://en.wikipedia.org/wiki/Margaret_Staal-Kropholler",
    "woman-46":
      "https://en.wikipedia.org/wiki/Maria_Jos%C3%A9_Marques_da_Silva",
    "woman-47": "x",
    "woman-48": "https://pl.wikipedia.org/wiki/Teresa_Kruszewska",
    "woman-49": "x",
    "woman-50": "https://en.wikipedia.org/wiki/Anna_Castelli_Ferrieri",
    "woman-51": "https://en.wikipedia.org/wiki/Sigrid_Kressmann-Zschach",
    "woman-52": "https://en.wikipedia.org/wiki/Charlotte_Perriand",
    "woman-53": "x",
    "woman-54": "https://hr.wikipedia.org/wiki/Hildegard_Auf-Frani%C4%87",
    "woman-55": "https://en.wikipedia.org/wiki/Simone_Guillissen",
    "woman-56": "x",
    "woman-57": "x",
    "woman-58": "https://en.wikipedia.org/wiki/Nathalie_Du_Pasquier",
    "woman-59": "https://en.wikipedia.org/wiki/Gae_Aulenti",
    "woman-60": "https://de.wikipedia.org/wiki/Verena_Dietrich",
    "woman-61": "https://en.wikipedia.org/wiki/Andr%C3%A9e_Putman",
    "woman-62": "https://en.wikipedia.org/wiki/%C3%89dith_Girard",
    "woman-63": "x",
    "woman-64": "https://en.wikipedia.org/wiki/Zaha_Hadid",
    "woman-65": "https://sv.wikipedia.org/wiki/Marianne_Dahlb%C3%A4ck",
    "woman-66": "https://en.wikipedia.org/wiki/Margarete_Heymann",
    "woman-67": "https://en.wikipedia.org/wiki/Maria_Teresa_Parpagliolo",
    "woman-68": "https://en.wikipedia.org/wiki/Jadwiga_Grabowska-Hawrylak",
    "woman-69": "https://en.wikipedia.org/wiki/Amanda_Levete",
    "woman-70": "https://en.wikipedia.org/wiki/Fiona_Raby",
    "woman-71": "x",
    "woman-72": "x",
    "woman-73": "https://en.wikipedia.org/wiki/Catherine_Furet",
    "woman-74": "https://pl.wikipedia.org/wiki/Irena_Bajerska",
    "woman-75": "https://en.wikipedia.org/wiki/Benedetta_Tagliabue",
    "woman-76": "https://en.wikipedia.org/wiki/Odile_Decq",
    "woman-77": "https://en.wikipedia.org/wiki/Patricia_Urquiola",
    "woman-78":
      "https://en.wikipedia.org/wiki/Mary_Reynolds_(landscape_designer)",
    "woman-79": "https://sv.wikipedia.org/wiki/Gunilla_Svensson",
    "woman-80": "x",
    "woman-81": "https://en.wikipedia.org/wiki/Manuelle_Gautrand",
    "woman-82": "x",
    "woman-83": "https://en.wikipedia.org/wiki/Sheila_O%27Donnell",
    "woman-84": "https://en.wikipedia.org/wiki/Christine_Conix",
    "woman-85": "https://en.wikipedia.org/wiki/Eva_Ji%C5%99i%C4%8Dn%C3%A1",
    "woman-86": "x",
    "woman-87": "x",
    "woman-88": "x",
    "woman-89": "https://nl.wikipedia.org/wiki/Jeanne_Dekkers",
    "woman-90": "https://en.wikipedia.org/wiki/Ilse_Crawford",
    "woman-91": "https://en.wikipedia.org/wiki/Carme_Pin%C3%B3s",
    "woman-92": "x",
    "woman-93": "x",
    "woman-94": "https://en.wikipedia.org/wiki/Victoria_Angelova",
    "woman-95": "x",
    "woman-96": "https://en.wikipedia.org/wiki/Hanne_Kj%C3%A6rholm",
    "woman-97": "https://en.wikipedia.org/wiki/Francine_Houben",
    "woman-98": "x",
    "woman-99": "x"
  },
  es: {
    "woman-0": "https://es.wikipedia.org/wiki/Sonia_Delaunay",
    "woman-1": "https://es.wikipedia.org/wiki/Gunta_St%C3%B6lzl",
    "woman-2": "x",
    "woman-3": "https://es.wikipedia.org/wiki/Alma_Siedhoff-Buscher",
    "woman-4": "https://es.wikipedia.org/wiki/Marianne_Brandt",
    "woman-5": "x",
    "woman-6": "https://es.wikipedia.org/wiki/Margarete_Sch%C3%BCtte-Lihotzky",
    "woman-7": "https://es.wikipedia.org/wiki/Elisabeth_Whitworth_Scott",
    "woman-8": "https://es.wikipedia.org/wiki/Eileen_Gray",
    "woman-9": "x",
    "woman-10": "https://es.wikipedia.org/wiki/Aino_Aalto",
    "woman-11": "x",
    "woman-12": "https://es.wikipedia.org/wiki/Martta_Martikainen-Ypy%C3%A4",
    "woman-13": "https://es.wikipedia.org/wiki/Lilly_Reich",
    "woman-14": "x",
    "woman-15": "x",
    "woman-16": "x",
    "woman-17": "x",
    "woman-18": "https://es.wikipedia.org/wiki/Greta_Magnusson-Grossman",
    "woman-19": "https://es.wikipedia.org/wiki/Rita_Fern%C3%A1ndez_Queimadelos",
    "woman-20": "x",
    "woman-21": "https://es.wikipedia.org/wiki/Elsi_Naemi_Borg",
    "woman-22": "https://es.wikipedia.org/wiki/Anni_Albers",
    "woman-23": "https://es.wikipedia.org/wiki/Elena_Luzzatto",
    "woman-24": "https://es.wikipedia.org/wiki/Lux_Guyer",
    "woman-25": "x",
    "woman-26": "x",
    "woman-27": "x",
    "woman-28": "https://es.wikipedia.org/wiki/Franca_Helg",
    "woman-29": "https://es.wikipedia.org/wiki/Jane_Drew",
    "woman-30":
      "https://es.wikipedia.org/wiki/Tamara_Davydovna_Katsenelenbogen",
    "woman-31": "x",
    "woman-32": "https://es.wikipedia.org/wiki/Alison_y_Peter_Smithson",
    "woman-33": "https://es.wikipedia.org/wiki/Lina_Bo_Bardi",
    "woman-34": "x",
    "woman-35": "x",
    "woman-36": "x",
    "woman-37": "x",
    "woman-38": "x",
    "woman-39": "x",
    "woman-40": "x",
    "woman-41": "https://es.wikipedia.org/wiki/Cini_Boeri",
    "woman-42": "x",
    "woman-43": "x",
    "woman-44": "x",
    "woman-45": "https://es.wikipedia.org/wiki/Margaret_Kropholler-Staal",
    "woman-46":
      "https://es.wikipedia.org/wiki/Maria_Jos%C3%A9_Marques_da_Silva",
    "woman-47": "x",
    "woman-48": "x",
    "woman-49": "x",
    "woman-50": "https://es.wikipedia.org/wiki/Anna_Castelli_Ferrieri",
    "woman-51": "x",
    "woman-52": "https://es.wikipedia.org/wiki/Charlotte_Perriand",
    "woman-53": "x",
    "woman-54": "x",
    "woman-55": "x",
    "woman-56": "x",
    "woman-57": "x",
    "woman-58": "x",
    "woman-59": "https://es.wikipedia.org/wiki/Gae_Aulenti",
    "woman-60": "x",
    "woman-61": "https://es.wikipedia.org/wiki/Andr%C3%A9e_Putman",
    "woman-62": "x",
    "woman-63": "x",
    "woman-64": "https://es.wikipedia.org/wiki/Zaha_Hadid",
    "woman-65": "x",
    "woman-66": "x",
    "woman-67": "x",
    "woman-68": "x",
    "woman-69": "https://es.wikipedia.org/wiki/Amanda_Levete",
    "woman-70": "x",
    "woman-71": "x",
    "woman-72": "x",
    "woman-73": "x",
    "woman-74": "x",
    "woman-75": "https://es.wikipedia.org/wiki/Benedetta_Tagliabue",
    "woman-76": "https://es.wikipedia.org/wiki/Odile_Decq",
    "woman-77": "https://es.wikipedia.org/wiki/Patricia_Urquiola",
    "woman-78": "x",
    "woman-79": "x",
    "woman-80": "https://es.wikipedia.org/wiki/Blanca_Lle%C3%B3_Fern%C3%A1ndez",
    "woman-81": "https://es.wikipedia.org/wiki/Manuelle_Gautrand",
    "woman-82": "https://es.wikipedia.org/wiki/In%C3%AAs_Lobo",
    "woman-83": "https://es.wikipedia.org/wiki/Sheila_O%27Donnell",
    "woman-84": "https://es.wikipedia.org/wiki/Christine_Conix",
    "woman-85": "https://es.wikipedia.org/wiki/Eva_Ji%C5%99i%C4%8Dn%C3%A1",
    "woman-86": "x",
    "woman-87": "x",
    "woman-88": "x",
    "woman-89": "https://nl.wikipedia.org/wiki/Jeanne_Dekkers",
    "woman-90": "x",
    "woman-91": "https://es.wikipedia.org/wiki/Carme_Pin%C3%B3s",
    "woman-92": "x",
    "woman-93": "x",
    "woman-94": "x",
    "woman-95": "x",
    "woman-96": "x",
    "woman-97": "https://es.wikipedia.org/wiki/Francine_Houben",
    "woman-98": "x",
    "woman-99": "x"
  }
}
)});
  main.variable(observer("data")).define("data", ["table03","parseHtmlToText","extractWorkYear","getImg","wikipedia","languageSelector"], function(table03,parseHtmlToText,extractWorkYear,getImg,wikipedia,languageSelector){return(
table03
  .map((d, i) => {
    d.NAME = parseHtmlToText(d.NAME);
    d.SURNAME = parseHtmlToText(d.SURNAME);
    d.workPiece = extractWorkYear(d);
    d.id = `woman-${i}`;
    d.imgProfile = getImg(d.IMG_SRC_D);
    d.wikipedia = wikipedia[languageSelector][`woman-${i}`];
    return d;
  })
  //.sort((a, b) => d3.ascending(a.NAME, b.NAME)) // By name
  //.sort((a, b) => b.YEAR_B - a.YEAR_B) // By bird
  //.sort((a, b) => extractWorkYear(a) - extractWorkYear(b)) // By selected piece
  .sort((b, a) => extractWorkYear(a) - extractWorkYear(b))
)});
  main.variable(observer("viewof dataTable")).define("viewof dataTable", ["Table","data"], function(Table,data){return(
Table(data, {
  columns: ["NAME", "SURNAME", "MARRIEDN", "workPiece", "id", "wikipedia"],
  sort: "workPiece"
})
)});
  main.variable(observer("dataTable")).define("dataTable", ["Generators", "viewof dataTable"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`### Handful functions`
)});
  main.variable(observer("extractWorkYear")).define("extractWorkYear", function(){return(
d => +d.WORKS_NA_2.split(',')[1]
)});
  main.variable(observer("extractWorkNAME")).define("extractWorkNAME", ["parseHtmlToText"], function(parseHtmlToText){return(
d => parseHtmlToText(d.WORKS_NA_2)
)});
  main.variable(observer("getImg")).define("getImg", function(){return(
function(string) {
  //console.log(string);
  const array = string.split('/');
  const imgName = array[array.length - 1].slice(0, -2);

  return imgName;
}
)});
  main.variable(observer("workYear")).define("workYear", ["data"], function(data){return(
data.map(d => +d.WORKS_NA_2.split(',')[1])
)});
  main.variable(observer("parseHtmlToText")).define("parseHtmlToText", function(){return(
d => d.replace(/(<([^>]+)>)/gi, "")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Dimensions`
)});
  main.variable(observer("margin")).define("margin", function(){return(
{ top: 160, right: 10, bottom: 50, left: 70 }
)});
  main.variable(observer("height")).define("height", function(){return(
3000
)});
  main.variable(observer("heightRadial")).define("heightRadial", function(){return(
1000
)});
  main.variable(observer("myDomain")).define("myDomain", function(){return(
[1850, 2021]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### B. Timeline Radials`
)});
  main.variable(observer("xRadial")).define("xRadial", ["d3","data"], function(d3,data){return(
d3
  .scaleBand()
  .range([Math.PI / 2 + 0.04, Math.PI / 2 + 2 * Math.PI - 0.1])
  .align(0)
  .domain(data.map(d => d.id))
)});
  main.variable(observer("innerRadius")).define("innerRadius", function(){return(
50
)});
  main.variable(observer("outerRadius")).define("outerRadius", function(){return(
350
)});
  main.variable(observer("yRadial")).define("yRadial", ["d3","innerRadius","outerRadius","myDomain"], function(d3,innerRadius,outerRadius,myDomain){return(
d3
  .scaleLinear()
  .range([innerRadius, outerRadius])
  .domain(myDomain)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### A. Timeline chart`
)});
  main.variable(observer("x")).define("x", ["d3","myDomain","width","margin"], function(d3,myDomain,width,margin){return(
d3
  .scaleLinear()
  .domain(myDomain)
  .range([0, width - margin.left - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], function(d3,data,height,margin){return(
d3
  .scaleBand()
  .domain(d3.range(data.length))
  .range([0, height - margin.bottom - margin.top])
  .padding(0.4)
)});
  main.variable(observer("axisBottom")).define("axisBottom", ["d3","x"], function(d3,x){return(
d3
  .axisBottom(x)
  .tickPadding(2)
  .tickFormat(d => d)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Some styles `
)});
  main.variable(observer("colorMain")).define("colorMain", function(){return(
'#E16767'
)});
  main.variable(observer("colorBckg")).define("colorBckg", function(){return(
"#f0f0f0"
)});
  main.variable(observer("styles")).define("styles", ["html","colorBckg"], function(html,colorBckg){return(
html`
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Baumans&display=swap" rel="stylesheet">

<style>
  svg {
    font-family: 'Baumans', sans-serif;
  }
  #radialChart {
    background-color: ${colorBckg};
  }
  #imgProfile {
    box-shadow: 0px 0px 27px 2px rgba(0,0,0,0.15) inset;
    -webkit-box-shadow: 0px 0px 27px 2px rgba(0,0,0,0.15) inset;
    -moz-box-shadow: 0px 0px 27px 2px rgba(0,0,0,0.15) inset;
  }

  #barsGroup path#legendBar{
    opacity: 1!important;
  }

  .workInfoExtra {
    position: relative;
    top: 150px;
    left: 70px;
    font-size: 10px;
    font-family: 'Baumans', sans-serif;
    //background: rgba(255,255,255,0.5);
    background: ${colorBckg};
    padding: 0 5px;
  }
</style>
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Language `
)});
  main.variable(observer("locale")).define("locale", function(){return(
{
  en: {
    title: {
      a: "Some of the",
      b: "WOMEN ARCHITECTS & DESIGNERS",
      c: "I didn't hear about",
      d: "at University"
    },
    centerText: {
      a: "100 years",
      b: "100 INSPIRING WOMEN",
      c: "just in Europe"
    },
    legend: {
      yearOfBirth: "Year of birth",
      name: "Name",
      exampleWork: {
        a: "One example of",
        b: "her artistic work"
      }
    }
  },
  es: {
    title: {
      a: "Algunas de las",
      b: "MUJERES ARQUITECTAS & DISEÑADORAS",
      c: "de las que no escuché hablar",
      d: "en la universidad"
    },
    centerText: {
      a: "100 años",
      b: "100 MUJERES INSPIRADORAS",
      c: "solo en Europa"
    },
    legend: {
      yearOfBirth: "Año de nacimiento",
      name: "Nombre",
      exampleWork: {
        a: "Un ejemplo de su",
        b: "trabajo artístico"
      }
    }
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Appendix `
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("Radio", child1);
  main.import("Toggle", child1);
  main.import("Checkbox", child1);
  main.import("Range", child1);
  main.import("Select", child1);
  main.import("Text", child1);
  main.import("Table", child1);
  main.import("Search", child1);
  return main;
}
