import '../../references/global-style.css';
import { useState } from 'react';
import { List, Tag, Button, Avatar, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const statusMap = {
  active: { text: '进行中', color: 'success' },
  pending: { text: '待启动', color: 'warning' },
  archived: { text: '已归档', color: 'default' },
};

const basicListData = [
  { id: '1', name: 'Ant Design Pro', description: '开箱即用的中台前端/设计解决方案', status: 'active', owner: '负责人A', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', tags: ['React', 'TypeScript', 'Ant Design'], updatedAt: '2024-02-09' },
  { id: '2', name: 'ProComponents', description: '专业级别的中后台组件库', status: 'active', owner: '负责人B', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', tags: ['React', 'Components'], updatedAt: '2024-02-08' },
  { id: '3', name: 'UmiJS', description: '插件化的企业级前端应用框架', status: 'pending', owner: '负责人C', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', tags: ['Framework', 'React'], updatedAt: '2024-02-07' },
  { id: '4', name: 'dumi', description: '基于 Umi 的文档工具', status: 'archived', owner: '负责人D', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', tags: ['Docs', 'React'], updatedAt: '2024-01-15' },
  { id: '5', name: 'AntV G2', description: '数据驱动的高交互可视化图形语法', status: 'active', owner: '负责人E', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', tags: ['Visualization', 'Canvas'], updatedAt: '2024-02-06' },
];

export default function BasicList() {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const pagedData = basicListData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>1. 基础列表（Basic List）</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>
          适用于以列表形式展示结构化数据的通用场景，每条数据包含标题、描述、状态、标签和操作等基本信息。
        </p>
      </div>

      <List
        header={
          <div className="list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <span style={{ fontSize: 16, fontWeight: 500 }}>项目列表</span>
            <Button type="primary" icon={<PlusOutlined />}>
              新建项目
            </Button>
          </div>
        }
        footer={
          <div className="ds-list-pagination">
            <Pagination
              total={basicListData.length}
              pageSize={pageSize}
              current={page}
              onChange={setPage}
              showSizeChanger={false}
            />
          </div>
        }
        className="ds-list-card"
        dataSource={pagedData}
        renderItem={(item) => (
          <List.Item
            className="list-item-hover"
            actions={[
              <Button type="text" size="small" key="view" className="list-text-btn" style={{ marginLeft: 16 }}>查看</Button>,
              <Button type="text" size="small" key="edit" className="list-text-btn">编辑</Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {item.name}
                  <Tag color={statusMap[item.status].color} style={{ borderRadius: 6, fontWeight: 'normal', color: item.status === 'archived' ? 'var(--color-text-secondary)' : undefined, marginRight: 0 }}>{statusMap[item.status].text}</Tag>
                </span>
              }
              description={item.description}
            />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start' }}>
                {item.tags.slice(0, 3).map((tag) => (
                  <Tag key={tag} style={{ textAlign: 'left', color: 'var(--color-text-secondary)', borderRadius: 6, marginRight: 0 }}>{tag}</Tag>
                ))}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
