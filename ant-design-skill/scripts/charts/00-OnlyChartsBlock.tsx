import { useMemo } from 'react';
import { Area } from '@ant-design/charts';
import { StatisticCard } from '@ant-design/pro-components';
import { EllipsisOutlined } from '@ant-design/icons';
import { theme } from 'antd';

const marketTrendData = [
  { month: '10月 2018', value: 12 },
  { month: '11月', value: 24 },
  { month: '12月', value: 36 },
  { month: '1月 2019', value: 30 },
  { month: '2月', value: 42 },
  { month: '3月', value: 48 },
  { month: '4月', value: 54 },
];

const toRgba = (color: string, alpha: number) => {
  const hex = color.replace('#', '');
  const normalized =
    hex.length === 3 ? hex.split('').map((char) => char + char).join('') : hex;
  const value = Number.parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default () => {
  const { token } = theme.useToken();

  const config = useMemo(
    () => ({
      data: marketTrendData,
      xField: 'month',
      yField: 'value',
      height: 280,
      autoFit: true,
      scale: {
        y: {
          domain: [0, 60],
          nice: true,
        },
      },
      style: {
        // G2 渐变语法；勿用 CSS color-mix，Canvas 无法解析会导致面积区不渲染
        fill: `l(270) 0:${toRgba(token.colorPrimary, 0.08)} 1:${toRgba(token.colorPrimary, 0.22)}`,
      },
      line: {
        style: {
          stroke: token.colorPrimary,
          lineWidth: 2,
        },
      },
      point: {
        shapeField: 'circle',
        sizeField: 4,
        style: {
          fill: token.colorPrimary,
          stroke: token.colorBgContainer,
          lineWidth: 2,
        },
      },
      axis: {
        y: {
          labelFormatter: (value: number) => `${value}%`,
          grid: true,
        },
      },
      tooltip: {
        items: [{ channel: 'y', valueFormatter: (value: number) => `${value}%` }],
      },
    }),
    [token],
  );

  return (
    <StatisticCard
      className="ds-statistic-card"
      bordered={false}
      title="大盘趋势"
      tooltip="大盘说明"
      style={{ width: '100%', maxWidth: 560 }}
      extra={<EllipsisOutlined />}
      chart={
        <div className="ds-only-charts-block" style={{ width: '100%', height: 280 }}>
          <Area {...config} />
        </div>
      }
    />
  );
};
