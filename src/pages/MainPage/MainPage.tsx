import React, {useEffect, useLayoutEffect, useState} from 'react';
import './styles.scss';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4langRu from '@amcharts/amcharts4/lang/ru_RU';
import {Card} from 'antd';
import axios, {AxiosResponse} from 'axios';

am4core.useTheme(am4themes_animated);

interface chartNode {
  node_id: string;
  system_name: string;
  open_time: string;
  close_time: string;
  priority_code: string;
  color: string;
}

interface chartEdge {
  node1: string;
  node2: string;
}

interface chartData {
  nodes: chartNode[];
  edges: chartEdge[];
}

const dateFormat = 'yyyy-MM-dd HH:mm:ss';

const codeColors = {
  '1': 'darkred',
  '2': 'red',
  '3': 'orange',
  '4': 'yellow',
  '5': 'green',
};

const MainPage = () => {
  const [currentChartData, setCurrentChartData] = useState<chartData>({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    axios
      .get('/data/test_graph_light.json')
      .then((r: AxiosResponse<chartData>) => {
        r.data.nodes.map((node) => {
          // @ts-ignore
          node.color = codeColors[node.priority_code[0].toString()];

          return node;
        });

        setCurrentChartData(r.data);
      });
  }, []);

  useLayoutEffect(() => {
    let chart = am4core.create('columnChart', am4charts.XYChart);
    chart.language.locale = am4langRu;
    chart.data = currentChartData?.nodes;
    chart.dateFormatter.inputDateFormat = dateFormat;

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.axisFills.template.disabled = true;
    categoryAxis.dataFields.category = 'system_name';
    categoryAxis.renderer.minGridDistance = 15;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeDasharray = '1,3';

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // @ts-ignore
    dateAxis.tooltip.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.dateFormatter.dateFormat = dateFormat;
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.columns.template.width = am4core.percent(80);
    series.columns.template.strokeOpacity = 1;
    series.columns.template.propertyFields.fill = 'color'; // get color from data
    series.columns.template.propertyFields.stroke = 'color';
    series.columns.template.tooltipText =
      '[bold]{node_id}:[/] {openDateX} - {dateX}';
    series.dataFields.categoryY = 'system_name';
    series.dataFields.openDateX = 'open_time';
    series.dataFields.dateX = 'close_time';
    series.sequencedInterpolation = true;
    // @ts-ignore
    series.tooltip.pointerOrientation = 'vertical';

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'zoomY';

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    return () => {
      chart.dispose();
    };
  }, [currentChartData]);

  return (
    <Card bordered={false}>
      <div id="columnChart" style={{width: '100%', height: '600px'}} />
    </Card>
  );
};

export default MainPage;
