import { EllipsisOutlined, RightOutlined } from '@ant-design/icons';
import { Card, Space, theme } from 'antd';

const chartStyle = {
  display: 'block',
  width: '100%',
  height: 'auto',
};

export default () => {
  const { token } = theme.useToken();
  return (
    <Card
      className="ds-statistic-card"
      bordered={false}
      style={{ width: '100%', maxWidth: 480, borderRadius: token.borderRadiusLG }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Space size={8} style={{ fontSize: 18, fontWeight: 600, lineHeight: '26px' }}>
          <span>部门一</span>
          <RightOutlined style={{ color: token.colorTextHeading, fontSize: 16 }} />
        </Space>
        <EllipsisOutlined style={{ color: token.colorTextSecondary, fontSize: 18 }} />
      </div>

      <div
        style={{
          marginTop: 24,
          color: token.colorTextHeading,
          fontFamily: token.fontFamily,
          fontSize: 30,
          fontWeight: 600,
          lineHeight: '38px',
        }}
      >
        ¥1,102,893
      </div>

      <Space size={20} wrap={false} style={{ marginTop: 10, color: token.colorTextSecondary }}>
        <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '22px' }}>
          实际完成度{' '}
          <span style={{ color: token.colorTextSecondary, fontWeight: 400 }}>82.3%</span>
        </span>
        <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '22px' }}>
          当前目标{' '}
          <span style={{ color: token.colorTextSecondary, fontWeight: 400 }}>¥6000</span>
        </span>
      </Space>

      <div className="ds-statistic-mini-chart" style={{ marginTop: 18 }}>
        <img
          src="https://gw.alipayobjects.com/zos/alicdn/BA_R9SIAV/charts.svg"
          alt="chart"
          style={chartStyle}
        />
      </div>
    </Card>
  );
};
