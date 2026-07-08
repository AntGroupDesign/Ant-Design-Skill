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
          gridTemplateColumns: responsive ? '1fr' : 'repeat(4, minmax(0, 1fr))',
          gap: token.marginSM,
          alignItems: 'stretch',
          width: '100%',
          background: 'transparent',
        }}
      >
        <StatisticCard
          className="ds-statistic-card"
          bordered={false}
          style={cardStyle}
          statistic={{
            title: '支付金额',
            value: 2176,
            valueStyle: { fontSize: 28, lineHeight: '36px', fontWeight: 600 },
            icon: renderIcon(
              <EuroOutlined style={{ color: token.colorPrimary, fontSize: iconFontSize }} />,
              token.colorPrimaryBg,
            ),
          }}
        />
        <StatisticCard
          className="ds-statistic-card"
          bordered={false}
          style={cardStyle}
          statistic={{
            title: '访客数',
            value: 475,
            valueStyle: { fontSize: 28, lineHeight: '36px', fontWeight: 600 },
            icon: renderIcon(
              <UserOutlined style={{ color: token.colorWarning, fontSize: iconFontSize }} />,
              token.colorWarningBg,
            ),
          }}
        />
        <StatisticCard
          className="ds-statistic-card"
          bordered={false}
          style={cardStyle}
          statistic={{
            title: '成功订单数',
            value: 87,
            valueStyle: { fontSize: 28, lineHeight: '36px', fontWeight: 600 },
            icon: renderIcon(
              <CheckCircleOutlined style={{ color: token.colorSuccess, fontSize: iconFontSize }} />,
              token.colorSuccessBg,
            ),
          }}
        />
        <StatisticCard
          className="ds-statistic-card"
          bordered={false}
          style={cardStyle}
          statistic={{
            title: '浏览量',
            value: 1754,
            valueStyle: { fontSize: 28, lineHeight: '36px', fontWeight: 600 },
            icon: renderIcon(
              <EyeOutlined style={{ color: purpleIcon.color, fontSize: iconFontSize }} />,
              purpleIcon.bg,
            ),
          }}
        />
      </div>
    </RcResizeObserver>
  );
};
