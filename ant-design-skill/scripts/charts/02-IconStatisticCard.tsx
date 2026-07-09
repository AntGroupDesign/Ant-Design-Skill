import {
  CheckCircleOutlined,
  EuroOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';
import { theme } from 'antd';

import RcResizeObserver from 'rc-resize-observer';
import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';

const iconWrapStyle: CSSProperties = {
  width: 42,
  height: 42,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const iconFontSize = 24;
const cardStyle: CSSProperties = {
  width: '100%',
  height: '100%',
};

const getStatisticGridColumns = (count: number, responsive: boolean) => {
  if (responsive) return '1fr';
  if (count <= 2) return 'repeat(auto-fit, minmax(260px, 320px))';
  return `repeat(${Math.min(count, 4)}, minmax(0, 1fr))`;
};

/** antd 预设 purple-6 / purple-1，用于同级指标卡第四项等辅助指标 */
const purpleIcon = { color: '#722ed1', bg: '#f9f0ff' };

export default () => {
  const [responsive, setResponsive] = useState(false);
  const { token } = theme.useToken();

  const renderIcon = (icon: ReactNode, background: string) => (
    <span
      style={{
        ...iconWrapStyle,
        borderRadius: token.borderRadiusLG,
        background,
      }}
    >
      {icon}
    </span>
  );

  const items = [
    {
      key: 'payment',
      title: '支付金额',
      value: 2176,
      icon: renderIcon(
        <EuroOutlined style={{ color: token.colorPrimary, fontSize: iconFontSize }} />,
        token.colorPrimaryBg,
      ),
    },
    {
      key: 'visitor',
      title: '访客数',
      value: 475,
      icon: renderIcon(
        <UserOutlined style={{ color: token.colorWarning, fontSize: iconFontSize }} />,
        token.colorWarningBg,
      ),
    },
    {
      key: 'success',
      title: '成功订单数',
      value: 87,
      icon: renderIcon(
        <CheckCircleOutlined style={{ color: token.colorSuccess, fontSize: iconFontSize }} />,
        token.colorSuccessBg,
      ),
    },
    {
      key: 'views',
      title: '浏览量',
      value: 1754,
      icon: renderIcon(
        <EyeOutlined style={{ color: purpleIcon.color, fontSize: iconFontSize }} />,
        purpleIcon.bg,
      ),
    },
  ];

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
          gridTemplateColumns: getStatisticGridColumns(items.length, responsive),
          gap: token.marginSM,
          alignItems: 'stretch',
          justifyContent: !responsive && items.length <= 2 ? 'start' : 'stretch',
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
              valueStyle: { fontSize: 28, lineHeight: '36px', fontWeight: 600 },
              icon: item.icon,
            }}
          />
        ))}
      </div>
    </RcResizeObserver>
  );
};
