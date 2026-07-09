import { EllipsisOutlined, RightOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';
import { Space, theme } from 'antd';
import { useId } from 'react';

const trendSeries = [52, 58, 61, 59, 64, 68, 72, 78, 80, 82.3];

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
      preserveAspectRatio="none"
      width="100%"
      height={height}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.08} />
          <stop offset="100%" stopColor={color} stopOpacity={0.22} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
}

export default () => {
  const { token } = theme.useToken();
  const gradientId = useId().replace(/:/g, '');

  return (
    <StatisticCard
      className="ds-statistic-card"
      bordered={false}
      style={{ width: '100%', maxWidth: 480, borderRadius: token.borderRadiusLG }}
      statistic={{
        title: (
          <div className="ds-card-title-row">
            <Space size={8} align="center">
              <span className="ds-table-title">部门一</span>
              <RightOutlined style={{ color: token.colorText, fontSize: 16 }} />
            </Space>
            <EllipsisOutlined style={{ color: token.colorTextSecondary, fontSize: 16 }} />
          </div>
        ),
        value: 1102893,
        prefix: '¥',
        valueStyle: {
          color: token.colorTextHeading,
          fontFamily: token.fontFamily,
          fontSize: 30,
          fontWeight: 600,
          lineHeight: '38px',
        },
        description: (
          <div style={{ marginTop: token.marginXS }}>
            <Space size={20} wrap={false} style={{ color: token.colorTextSecondary }}>
              <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '22px' }}>
                实际完成度{' '}
                <span style={{ color: token.colorTextSecondary, fontWeight: 400 }}>82.3%</span>
              </span>
              <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '22px' }}>
                当前目标{' '}
                <span style={{ color: token.colorTextSecondary, fontWeight: 400 }}>¥6000</span>
              </span>
            </Space>
          </div>
        ),
      }}
      chart={
        <div
          className="ds-statistic-mini-chart"
          style={{ marginTop: token.margin, marginBottom: 0 }}
        >
          <MiniAreaSparkline
            color={token.colorPrimary}
            series={trendSeries}
            gradientId={`basic-statistic-${gradientId}`}
          />
        </div>
      }
    />
  );
};
