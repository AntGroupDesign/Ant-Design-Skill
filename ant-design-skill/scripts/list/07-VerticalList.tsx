import '../../references/global-style.css';
import { List, Tag, Button, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const verticalListData = [
  { title: '智慧零售平台', tags: ['技术专栏', '设计语言', '云原生'], content: '面向企业级中后台的数据可视化解决方案，以最小的接入成本提供丰富的图表类型与交互能力，助力业务快速搭建数据看板与分析报表。', image: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png', stars: 156, likes: 230, comments: 12 },
  { title: 'Ant Design', tags: ['设计语言', '前端框架'], content: '一套企业级 UI 设计语言和 React 组件库，致力于提供高品质的 UI 设计资源和开发工具，帮助设计师和开发者提升工作效率。', image: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png', stars: 1280, likes: 956, comments: 89 },
  { title: '云原生微服务框架', tags: ['微服务', 'Kubernetes', 'DevOps'], content: '基于容器化和服务网格的新一代微服务架构，提供完善的微服务治理能力、流量管理和可观测性方案，助力企业数字化转型。', image: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png', stars: 423, likes: 318, comments: 45 },
];

export default function VerticalList() {
  return (
    <div>
      <List
        header={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 500 }}>竖排样式</span>
            <Button type="primary" icon={<PlusOutlined />}>
              新建
            </Button>
          </div>
        }
        className="ds-list-card"
        dataSource={verticalListData}
        renderItem={(item) => (
          <List.Item className="list-item-hover">
            <div style={{ display: 'flex', gap: 16, width: '100%', alignItems: 'stretch' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>{item.title}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                    {item.tags.map((tag) => (
                      <Tag key={tag} style={{ color: 'var(--color-text)', borderRadius: 6, marginRight: 0 }}>{tag}</Tag>
                    ))}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-text)' }}>
                    {item.content}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 24, fontSize: 14, color: 'var(--color-text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {item.stars}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 10v12" />
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                    {item.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    </svg>
                    {item.comments}
                  </span>
                </div>
              </div>
              {/* 右：封面图——遵循「列表条目内部布局」规则：
                  外层跟随条目高度，内层固定尺寸，整体相对列表项垂直居中 */}
              <div
                className="ds-list-item-media"
                style={{
                  width: 272,
                }}
              >
                <div
                  className="ds-list-item-media-box"
                  style={{
                    width: 272,
                    height: 160,
                  }}
                >
                  <Image
                    width={272}
                    height={160}
                    src={item.image}
                    alt={item.title}
                  />
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
