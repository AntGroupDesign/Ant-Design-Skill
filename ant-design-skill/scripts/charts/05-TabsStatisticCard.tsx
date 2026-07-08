import { useState } from 'react';
import { ProCard, StatisticCard, StatisticProps } from '@ant-design/pro-components';
import { Tag } from 'antd';

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

const items: TabStatisticItem[] = [
  { key: '1', status: 'success', title: '经营总计', value: 98.6, suffix: '分', precision: 1, state: { label: '正常', color: 'success' }, total: true },
  { key: '2', status: 'success', title: '用户', value: 1284560, state: { label: '正常', color: 'success' } },
  { key: '3', status: 'processing', title: '交易', value: 8592300, suffix: '元', state: { label: '处理中', color: 'processing' } },
  { key: '4', status: 'error', title: '留存', value: 42.3, suffix: '%', precision: 1, state: { label: '异常', color: 'error' } },
];

export default () => {
  const [activeKey, setActiveKey] = useState('1');

  return (
    <div className="ds-page-shell">
      {/* 页签联动指标卡：只展示等分 Tab + 指标数值，不放业务内容 */}
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

      {/* 关联展示内容：卡片外部独立区块，由 .ds-page-shell / .ds-statistic-linked-content 的 gap 统一承担间距 */}
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
            关联展示内容 - {items.find((i) => i.key === activeKey)?.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa', borderRadius: 6, height: 200, marginTop: 16 }}>
            当前选中：{items.find((i) => i.key === activeKey)?.title}（在此渲染图表 / 表格 / 列表等独立区块）
          </div>
        </ProCard>
      </div>
    </div>
  );
};
