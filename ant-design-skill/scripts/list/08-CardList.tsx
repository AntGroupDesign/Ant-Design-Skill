import { useState } from 'react';
import { Card, Tag, Button, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../references/global-style.css';

const cardStatusMap = {
  stable: { text: '稳定版', color: 'success' },
  beta: { text: '测试版', color: 'processing' },
  deprecated: { text: '已废弃', color: 'default' },
};

const cardListData = [
  { id: '1', title: 'ProTable', category: '表格组件', description: '高级表格组件，支持搜索、筛选、排序等功能', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg', downloads: 125000, rating: 4.8, status: 'stable' },
  { id: '2', title: 'ProForm', category: '表单组件', description: '高级表单组件，简化表单开发流程', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', downloads: 98000, rating: 4.9, status: 'stable' },
  { id: '3', title: 'ProLayout', category: '布局组件', description: '开箱即用的中后台布局方案', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg', downloads: 156000, rating: 4.7, status: 'stable' },
  { id: '4', title: 'ProCard', category: '卡片组件', description: '可分割的卡片组件，支持多种布局', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', downloads: 67000, rating: 4.6, status: 'stable' },
  { id: '5', title: 'ProDescriptions', category: '描述列表', description: '高级描述列表组件，支持编辑和请求', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg', downloads: 45000, rating: 4.5, status: 'beta' },
  { id: '6', title: 'ProList', category: '列表组件', description: '高级列表组件，支持多种展示模式', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', downloads: 52000, rating: 4.7, status: 'stable' },
];

export default function CardList() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const toggleCard = (id: string) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>8. 卡片列表（Card List）</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-tertiary)', margin: 0 }}>
          网格布局卡片样式展示，每个对象拥有平等的展示机会，突出对象本身，支持点击和选中。
        </p>
      </div>

      <div className="ds-list-card">
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16 }}>
          <span style={{ fontSize: 16, fontWeight: 500 }}>卡片列表</span>
          <div>
            {selectedCards.length > 0 && (
              <Tag color="processing" style={{ marginRight: 8, borderRadius: 6 }}>
                已选 {selectedCards.length} 项
              </Tag>
            )}
            <Button type="primary" icon={<PlusOutlined />}>
              新建
            </Button>
          </div>
        </div>

        <div
          className="card-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            paddingBottom: 24,
          }}
        >
          {cardListData.map((item) => {
            const isSelected = selectedCards.includes(item.id);
            return (
              <Card
                key={item.id}
                className={`card-item ${isSelected ? 'card-selected' : ''}`}
                onClick={() => toggleCard(item.id)}
              >
                {/* 选中角标 */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      width: 0,
                      height: 0,
                      border: '10px solid var(--color-primary)',
                      borderBottomColor: 'transparent',
                      borderLeftColor: 'transparent',
                      borderTopRightRadius: 6,
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  />
                )}

                {/* 内容区 */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 'var(--nav-space-3)',
                      minWidth: 0,
                      marginBottom: 32,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: '1 1 auto' }}>
                      <Avatar src={item.avatar} size={24} />
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--nav-space-2)',
                          maxWidth: '100%',
                          minWidth: 0,
                          flex: '1 1 auto',
                        }}
                      >
                        <span
                          style={{
                            minWidth: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: 16,
                            fontWeight: 500,
                          }}
                        >
                          {item.title}
                        </span>
                        <Tag
                          color={cardStatusMap[item.status].color}
                          style={{ flex: '0 0 auto', marginInlineEnd: 0, borderRadius: 6 }}
                        >
                          {cardStatusMap[item.status].text}
                        </Tag>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 'var(--nav-space-2)',
                        flex: '0 0 auto',
                        marginLeft: 'auto',
                        whiteSpace: 'nowrap',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button type="text" size="small" className="list-text-btn">安装</Button>
                      <Button type="text" size="small" className="list-text-btn">文档</Button>
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--color-text)', marginBottom: 12, flex: 1 }}>
                    {item.description}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-quaternary)', display: 'flex', alignItems: 'center' }}>
                    {item.category} · {(item.downloads / 1000).toFixed(1)}K 下载 ·{' '}
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {item.rating}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
