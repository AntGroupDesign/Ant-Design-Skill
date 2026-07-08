import { StatisticCard } from '@ant-design/pro-components';
import { EllipsisOutlined } from '@ant-design/icons';

const chartStyle = {
  display: 'block',
  width: '100%',
  height: 280,
  objectFit: 'contain' as const,
};

export default () => {
  return (
    <StatisticCard
      className="ds-statistic-card"
      bordered={false}
      title="大盘趋势"
      tooltip="大盘说明"
      style={{ width: '100%', maxWidth: 560 }}
      extra={<EllipsisOutlined />}
      chart={
        <img
          src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
          alt="柱状图"
          style={chartStyle}
        />
      }
    />
  );
};
