import '../../references/global-style.css';
import { useState } from 'react';
import { List, Tag, Button, Avatar, Progress } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';

const expandListData = [
  { title: '智慧零售平台', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', progress: 80, detail: '该平台集成了商品管理、库存管理、订单处理等核心能力，支持多渠道销售策略和智能补货推荐。当前已完成80%的功能开发，预计下月上线试运营。' },
  { title: '企业级设计体系', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', progress: 100, detail: '面向企业级产品的设计体系，提供完整的设计规范、丰富的组件库和开发资源，服务于中后台产品的前端设计与研发。当前版本已稳定运行。' },
  { title: '云原生微服务框架', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', progress: 45, detail: '基于 Kubernetes 的微服务编排框架，集成服务注册发现、配置中心、链路追踪等核心中间件，当前正在推进灰度发布功能的开发。' },
  { title: '数据可视化引擎', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', progress: 60, detail: '面向企业级数据可视化场景的渲染引擎，支持大规模图表渲染与交互分析能力。当前正在优化实时数据流渲染性能。' },
];

export default function ExpandableList() {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpandedKeys((prev) =>
      prev.includes(title) ? prev.filter((k) => k !== title) : [...prev, title]
    );
  };

  return (
    <div>
      <List
        header={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 500 }}>支持展开的列表</span>
            <Button type="primary" icon={<PlusOutlined />}>
              新建
            </Button>
          </div>
        }
        className="ds-list-card"
        dataSource={expandListData}
        renderItem={(item) => {
          const isExpanded = expandedKeys.includes(item.title);
          return (
            <List.Item className="list-item-hover" style={{ padding: '12px 0' }}>
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleExpand(item.title)}
                >
                  <span style={{ marginRight: 8, color: 'var(--color-text-secondary)', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                    <RightOutlined />
                  </span>
                  <Avatar src={item.avatar} style={{ marginRight: 16 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, marginRight: 8 }}>
                      <span style={{ fontWeight: 500 }}>{item.title}</span>
                      <Tag color="processing" style={{ borderRadius: 6, marginRight: 0 }}>Ant Design</Tag>
                      <Tag color="success" style={{ borderRadius: 6, marginRight: 0 }}>可视化</Tag>
                    </div>
                    <div style={{ color: 'var(--color-text-tertiary)', fontSize: 14 }}>面向企业级中后台的设计解决方案</div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 200 }}>
                      <div style={{ marginBottom: 4 }}>{item.progress === 100 ? '已完成' : '发布中'}</div>
                      <Progress
                        percent={item.progress}
                        size="small"
                        strokeColor={item.progress === 100 ? 'var(--color-success)' : 'var(--color-primary)'}
                        format={(percent) => `${percent}%`}
                      />
                    </div>
                  </div>
                  <Button type="text" className="list-text-btn">邀请</Button>
                </div>
                {isExpanded && (
                  <div style={{ paddingTop: 12, paddingLeft: 68 }}>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
                      {item.detail}
                    </div>
                    <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
                      <span><span style={{ color: 'var(--color-text-tertiary)' }}>创建时间：</span>2024-01-15</span>
                      <span><span style={{ color: 'var(--color-text-tertiary)' }}>负责人：</span>管理员</span>
                      <span><span style={{ color: 'var(--color-text-tertiary)' }}>成员数：</span>12</span>
                    </div>
                  </div>
                )}
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
