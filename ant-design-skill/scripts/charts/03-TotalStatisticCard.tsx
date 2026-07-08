import { theme } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

interface MetricItem {
  key: string;
  color: string;
  title: string;
  value: string;
  description: string;
}

function MetricCell({
  item,
  bordered,
  showMarker,
  stacked,
}: {
  item: MetricItem;
  bordered: boolean;
  showMarker: boolean;
  stacked: boolean;
}) {
  const { token } = theme.useToken();

  return (
    <div
      className="ds-total-statistic-cell"
      style={{
        boxSizing: 'border-box',
        minWidth: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        minHeight: 112,
        paddingInline: 'var(--nav-space-6)',
        borderInlineStart: bordered && !stacked ? `1px solid ${token.colorSplit}` : undefined,
        borderBlockStart: bordered && stacked ? `1px solid ${token.colorSplit}` : undefined,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        {showMarker ? (
          <span
            style={{
              width: 8,
              height: 8,
              flex: '0 0 8px',
              borderRadius: '50%',
              background: item.color,
            }}
          />
        ) : null}
        <span
          className="ds-total-statistic-title"
          style={{
            color: token.colorTextSecondary,
          }}
        >
          {item.title}
        </span>
      </div>
      <div
        className="ds-total-statistic-value"
        style={{
          marginTop: 10,
        }}
      >
        {item.value}
      </div>
      <div className="ds-total-statistic-description" style={{ marginTop: 8, color: token.colorTextSecondary }}>
        {item.description}
      </div>
    </div>
  );
}

export default () => {
  const [responsive, setResponsive] = useState(false);
  const { token } = theme.useToken();
  const metrics: MetricItem[] = [
    {
      key: 'total',
      color: token.colorPrimary,
      title: '总流量(人次)',
      value: '601,986,875',
      description: '整体汇总',
    },
    {
      key: 'paid',
      color: token.colorPrimary,
      title: '付费流量',
      value: '3,701,928',
      description: '占比 61.5%',
    },
    {
      key: 'free',
      color: token.colorSuccess,
      title: '免费流量',
      value: '1,806,062',
      description: '占比 38.5%',
    },
  ];

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 760);
      }}
    >
      <div
        className="ds-statistic-card ds-total-statistic-card"
        style={{
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          overflow: 'hidden',
          paddingInline: 0,
        }}
      >
        <div
          className="ds-total-statistic-grid"
          style={{
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            gridTemplateColumns: responsive ? '1fr' : `repeat(${metrics.length}, minmax(0, 1fr))`,
          }}
        >
          {metrics.map((item, index) => (
            <MetricCell key={item.key} item={item} bordered={index > 0} showMarker={index > 0} stacked={responsive} />
          ))}
        </div>
      </div>
    </RcResizeObserver>
  );
};
