(function (React, ReactDOM, d3) {
    'use strict';
  
    var React__default = 'default' in React ? React['default'] : React;
    ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;
  
    const csvUrl =
      'https://raw.githubusercontent.com/teohangxanh/5320/main/ICE-6/fake_data.csv';
    const width = 960;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 50, left: 200 };
  
  
  
    const App = () => {
      const [data, setData] = React.useState(null);
  
      React.useEffect(() => {
        const row = d => {
          d.Weight = +d['2019'];
          return d;
        };
        d3.csv(csvUrl, row).then(data => {
          setData(data.slice(0, 10));
        });
      }, []);
  
      if (!data) {
        return React__default.createElement( 'pre', null, "Loading..." );
      }
  
      const innerHeight = height - margin.top - margin.bottom - 100;
      const innerWidth = width - margin.left - margin.right;
  
      const yScale = d3.scaleBand()
        .domain(data.map(d => d.Student))
        .range([0, innerHeight]);
  
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Weight)])
        .range([0, innerWidth]);
  
      return (
        React__default.createElement( 'svg', { width: width, height: height },
          React__default.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
            xScale.ticks().map(tickValue => (
              React__default.createElement( 'g', { key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
                React__default.createElement( 'line', { y2: innerHeight, stroke: "blue" }),
                React__default.createElement( 'text', {
                  style: { textAnchor: 'middle' }, dy: ".70em", y: innerHeight + 3 },
                  tickValue
                )
              )
            )),
            yScale.domain().map(tickValue => (
              React__default.createElement( 'text', {
                key: tickValue, style: { textAnchor: 'end' }, x: -3, dy: ".32em", y: yScale(tickValue) + yScale.bandwidth() / 2 },
                tickValue
              )
            )),
            data.map(d => (
              React__default.createElement( 'rect', {
                key: d.Student, x: 0, y: yScale(d.Student), width: xScale(d.Weight), height: yScale.bandwidth() })
            ))
          )
        )
      );
    };
    const rootElement = document.getElementById('root');
    ReactDOM.render(React__default.createElement( App, null ), rootElement);
  
  }(React, ReactDOM, d3));
  