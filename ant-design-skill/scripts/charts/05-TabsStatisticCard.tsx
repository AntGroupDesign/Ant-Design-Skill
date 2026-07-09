import { useMemo, useState } from 'react';
import { Area } from '@ant-design/charts';
import { ProCard, StatisticCard, StatisticProps } from '@ant-design/pro-components';
import { Tag, theme } from 'antd';

const { Statistic } = StatisticCard;

const statusColorMap: Record<NonNullable<StatisticProps['status']>, string> = {
  success: '#52c41a',
  processing: '#1677ff',
  error: '#ff4d4f',
  warning: '#faad14',
  default: '#d9d9d9',
};

type TabStatisticItem = {
  key: string;
  title: string;
  value: number;
  suffix?: string;
  precision?: number;
  status?: StatisticProps['status'];
  state?: {
    label: string;
    color: 'success' | 'processing' | 'error' | 'warning' | 'default';
  };
  total?: boolean;
};

const linkedChartDataMap: Record<string, Array<{ month: string; value: number }>> = {
  '1': [
    { month: '1月', value: 92 },
    { month: '2月', value: 94 },
    { month: '3月', value: 96 },
    { month: '4月', value: 97 },
    { month: '5月', value: 98.6 },
  ],
  '2': [
    { month: '1月', value: 112 },
    { month: '2月', value: 118 },
    { month: '3月', value: 121 },
    { month: '4月', value: 125 },
    { month: '5月', value: 128 },
  ],
  '3': [
    { month: '1月', value: 620 },
    { month: '2月', value: 710 },
    { month: '3月', value: 760 },
    { month: '4月', value: 820 },
    { month: '5月', value: 859 },
  ],
  '4': [
    { month: '1月', value: 48 },
    { month: '2月', value: 46 },
    { month: '3月', value: 44 },
    { month: '4月', value: 43 },
    { month: '5月', value: 42.3 },
  ],
};

const items: TabStatisticItem[] = [
  { key: '1', status: 'success', title: '经营总计', value: 98.6, suffix: '分', precision: 1, state: { label: '正常', color: 'success' }, total: true },
  { key: '2', status: 'success', title: '用户', value: 1284560, state: { label: '正常', color: 'success' } },
  { key: '3', status: 'processing', title: '交易', value: 8592300, suffix: '元', state: { label: '处理中', color: 'processing' } },
  { key: '4', status: 'error', title: '留存', value: 42.3, suffix: '%', precision: 1, state: { label: '异常', color: 'error' } },
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
  const [activeKey, setActiveKey] = useState('1');
  const { token } = theme.useToken();
  const activeItem = items.find((item) => item.key === activeKey);

  const linkedChartConfig = useMemo(
    () => ({
      data: linkedChartDataMap[activeKey] ?? linkedChartDataMap['1'],
      xField: 'month',
      yField: 'value',
      height: 200,
      autoFit: true,
      style: {
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
        sizeField: 3,
        style: {
          fill: token.colorPrimary,
          stroke: token.colorBgContainer,
          lineWidth: 2,
        },
      },
      axis: {
        y: {
          grid: true,
        },
      },
    }),
    [activeKey, token],
  );

  return (
    <div className="ds-page-shell">
      <ProCard
        className="ds-statistic-card ds-statistic-tabs"
        bordered={false}
        tabs={{
          activeKey,
          onChange: setActiveKey,
          items: items.map((item) => ({
            key: item.key,
            style: { width: '100%' },
            label: (
              <div className={`ds-statistic-tab-label${item.total ? ' ds-statistic-tab-label-total' : ''}`}>
                {item.status && !item.total ? (
                  <span
                    className="ds-statistic-tab-status-dot"
                    style={{ background: statusColorMap[item.status] }}
                  />
                ) : null}
                <Statistic
                  layout="vertical"
                  title={item.title}
                  value={item.value}
                  suffix={item.suffix}
                  precision={item.precision}
                  description={
                    item.state ? (
                      <Tag className="ds-statistic-tab-status-tag" color={item.state.color}>
                        {item.state.label}
                      </Tag>
                    ) : undefined
                  }
                />
              </div>
            ),
            children: null,
          })),
        }}
      />

      <div className="ds-statistic-linked-content">
        <div className="ds-statistic-linked-card-grid">
          <ProCard className="ds-page-card" bordered={false}>
            新增用户
            <div style={{ marginTop: 8, fontSize: 28, fontWeight: 600 }}>38,420</div>
          </ProCard>
          <ProCard className="ds-page-card" bordered={false}>
            活跃用户
            <div style={{ marginTop: 8, fontSize: 28, fontWeight: 600 }}>1,284,560</div>
          </ProCard>
          <ProCard className="ds-page-card" bordered={false}>
            付费用户
            <div style={{ marginTop: 8, fontSize: 28, fontWeight: 600 }}>186,320</div>
          </ProCard>
        </div>

        <ProCard className="ds-page-card ds-statistic-linked-panel" bordered={false}>
          <div className="ds-statistic-linked-panel-title">
            关联展示内容 - {activeItem?.title}
          </div>
          <div className="ds-only-charts-block" style={{ width: '100%', height: 200, marginTop: 16 }}>
            <Area {...linkedChartConfig} />
          </div>
        </ProCard>
      </div>
    </div>
  );
};
