import { StatisticCard } from '@ant-design/pro-components';
import { theme } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import type { CSSProperties } from 'react';
import { useId, useState } from 'react';

const cardStyle: CSSProperties = {
  width: '100%',
  height: '100%',
};

/** Ant Design Charts 面积类填充渐变配置参考：上浅下深，同色派生；具体字段以项目 Charts 版本文档为准。 */
const getMiniChartFillGradient = (color: string) =>
  `l(90) 0:color-mix(in srgb, ${color} 12%, transparent) 1:color-mix(in srgb, ${color} 32%, transparent)`;

type MiniChartType = 'area' | 'line' | 'column';

type MetricItem = {
  key: string;
  title: string;
  value: number;
  precision?: number;
  suffix?: string;
  semanticColor: string;
  chartType: MiniChartType;
  series: number[];
};

function MiniAreaSparkline({
  color,
  series,
  gradientId,
}: {
  color: string;
  series: number[];
  gradientId: string;
}) {
  const width = 240;
  const height = 72;
  const padding = 2;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;

  const points = series.map((value, index) => {
    const x = padding + (index / (series.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const linePath = `M ${points.join(' L ')}`;
  const areaPath = `${linePath} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <svg
      className="ds-statistic-mini-chart"
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.12} />
          <stop offset="100%" stopColor={color} stopOpacity={0.32} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
}

function MiniLineSparkline({ color, series }: { color: string; series: number[] }) {
  const width = 240;
  const height = 72;
  const padding = 2;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const points = series.map((value, index) => {
    const x = padding + (index / (series.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <svg
      className="ds-statistic-mini-chart"
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      aria-hidden
    >
      <path d={`M ${points.join(' L ')}`} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
}

function MiniColumnSparkline({ color, series }: { color: string; series: number[] }) {
  const width = 240;
  const height = 72;
  const padding = 2;
  const gap = 4;
  const max = Math.max(...series) || 1;
  const barWidth = (width - padding * 2 - gap * (series.length - 1)) / series.length;

  return (
    <svg
      className="ds-statistic-mini-chart"
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      aria-hidden
    >
      {series.map((value, index) => {
        const barHeight = Math.max(4, (value / max) * (height - padding * 2));
        const x = padding + index * (barWidth + gap);
        const y = height - padding - barHeight;

        return (
          <rect
            key={`${value}-${index}`}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={2}
            fill={color}
            opacity={0.72}
          />
        );
      })}
    </svg>
  );
}

export default () => {
  const [responsive, setResponsive] = useState(false);
  const { token } = theme.useToken();
  const gradientPrefix = useId().replace(/:/g, '');

  const items: MetricItem[] = [
    {
      key: 'cpu',
      title: 'CPU 使用率',
      value: 68.4,
      precision: 1,
      suffix: '%',
      semanticColor: token.colorPrimary,
      chartType: 'area',
      series: [52, 58, 55, 63, 61, 66, 68.4],
    },
    {
      key: 'memory',
      title: '内存使用率',
      value: 74.2,
      precision: 1,
      suffix: '%',
      semanticColor: token.colorSuccess,
      chartType: 'line',
      series: [68, 70, 69, 72, 71, 73, 74.2],
    },
    {
      key: 'disk',
      title: '磁盘使用率',
      value: 61.8,
      precision: 1,
      suffix: '%',
      semanticColor: token.colorWarning,
      chartType: 'column',
      series: [57, 58, 59, 60, 60.5, 61, 61.8],
    },
  ];

  const renderMiniChart = (item: MetricItem) => {
    // 各类型均使用 item.semanticColor；Area 填充方向为上浅下深，禁止线条与填充不同色系。
    if (item.chartType === 'area') {
      return (
        <MiniAreaSparkline
          color={item.semanticColor}
          series={item.series}
          gradientId={`${gradientPrefix}-${item.key}`}
        />
      );
    }

    if (item.chartType === 'line') {
      return <MiniLineSparkline color={item.semanticColor} series={item.series} />;
    }

    return <MiniColumnSparkline color={item.semanticColor} series={item.series} />;
  };

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: responsive ? '1fr' : `repeat(${items.length}, minmax(0, 1fr))`,
          gap: token.marginSM,
          alignItems: 'stretch',
          width: '100%',
          background: 'transparent',
        }}
      >
        {items.map((item) => (
          <StatisticCard
            key={item.key}
            className="ds-statistic-card"
            bordered={false}
            style={cardStyle}
            statistic={{
              title: item.title,
              value: item.value,
              precision: item.precision,
              suffix: item.suffix,
              valueStyle: { fontSize: 28, lineHeight: '36px', fontWeight: 600 },
            }}
            chart={renderMiniChart(item)}
          />
        ))}
      </div>
    </RcResizeObserver>
  );
};

export { getMiniChartFillGradient };
