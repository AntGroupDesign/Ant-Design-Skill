/**
 * QueryList —— 查询列表（Query List）
 *
 * 基于 AntDesign5.0_Skill 的「PageHeader 外置 + 双卡分组」规范实现：
 * - PageHeader（标题 + 操作按钮组）：位于所有 Card 外部
 * - 搜索卡：搜索条件 + 操作按钮
 * - 列表卡：结果标题 + 结果级操作 + 列表条目 + 分页（内部用 <Divider/> 分隔列表与分页栏）
 *
 * 全局 token 约束：
 * - 内容卡片阴影：var(--shadow)（禁止使用 --nav-shadow-dropdown）
 * - 页面兜底色由 Layout 层提供 var(--nav-color-bg-layout)
 * - Card 内弱底块（hover、筛选面板）用 var(--nav-color-bg-canvas)
 */

import '../../references/global-style.css';
import { useState } from 'react';
import { List, Tag, Button, Avatar, Input, Select, Pagination, Card, Divider, Space } from 'antd';

const statusMap = {
  active: { text: '进行中', color: 'success' },
  pending: { text: '待启动', color: 'warning' },
  archived: { text: '已归档', color: 'default' },
} as const;

type StatusKey = keyof typeof statusMap;

interface QueryListItem {
  id: string;
  name: string;
  description: string;
  status: StatusKey;
  owner: string;
  avatar: string;
  tags: string[];
  updatedAt: string;
}

const queryListGridColumns = 'minmax(280px, 1fr) 112px 120px 104px';

const basicListData: QueryListItem[] = [
  { id: '1', name: 'Ant Design Pro', description: '开箱即用的中台前端/设计解决方案', status: 'active', owner: '负责人A', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', tags: ['React', 'TypeScript', 'Ant Design'], updatedAt: '2024-02-09' },
  { id: '2', name: 'ProComponents', description: '专业级别的中后台组件库', status: 'active', owner: '负责人B', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', tags: ['React', 'Components'], updatedAt: '2024-02-08' },
  { id: '3', name: 'UmiJS', description: '插件化的企业级前端应用框架', status: 'pending', owner: '负责人C', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', tags: ['Framework', 'React'], updatedAt: '2024-02-07' },
  { id: '4', name: 'dumi', description: '基于 Umi 的文档工具', status: 'archived', owner: '负责人D', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', tags: ['Docs', 'React'], updatedAt: '2024-01-15' },
  { id: '5', name: 'AntV G2', description: '数据驱动的高交互可视化图形语法', status: 'active', owner: '负责人E', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', tags: ['Visualization', 'Canvas'], updatedAt: '2024-02-06' },
];

export default function QueryList() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [filteredData, setFilteredData] = useState(basicListData);

  const handleSearch = () => {
    let result = [...basicListData];
    if (searchText) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (statusFilter) {
      result = result.filter((item) => item.status === statusFilter);
    }
    setFilteredData(result);
  };

  const handleReset = () => {
    setSearchText('');
    setStatusFilter(undefined);
    setFilteredData(basicListData);
  };

  return (
    <div className="ds-page-shell">
      {/* === 1. PageHeader（位于主内容 Card 外部） === */}
      <div className="ds-page-header">
        <div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--nav-color-text-active)',
              marginBottom: 4,
            }}
          >
            查询列表
          </div>
          <div style={{ fontSize: 13, color: 'var(--nav-color-text-secondary)' }}>
            设置多个筛选条件，一次性提交查询，精准筛选目标数据。
          </div>
        </div>
        <Space size="small">
          <Button onClick={handleReset}>
            重置
          </Button>
          <Button type="primary">
            新建
          </Button>
        </Space>
      </div>

      {/* === 2. 搜索卡：查询条件 === */}
      <Card
        bordered={false}
        className="ds-search-panel"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--nav-space-4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label
              style={{
                fontSize: 14,
                color: 'var(--nav-color-text-active)',
                whiteSpace: 'nowrap',
              }}
            >
              项目名称：
            </label>
            <Input
              placeholder="请输入项目名称"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label
              style={{
                fontSize: 14,
                color: 'var(--nav-color-text-active)',
                whiteSpace: 'nowrap',
              }}
            >
              状态：
            </label>
            <Select
              placeholder="请选择状态"
              value={statusFilter}
              onChange={(v) => setStatusFilter(v)}
              style={{ flex: 1 }}
              allowClear
              options={[
                { label: '进行中', value: 'active' },
                { label: '待启动', value: 'pending' },
                { label: '已归档', value: 'archived' },
              ]}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 8 }}>
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </div>
        </div>
      </Card>

      {/* === 3. 列表卡：结果标题 + 结果级操作 + 列表条目 + 分页（方案 B：ds-list-card 承担水平 24px） === */}
      <Card
        bordered={false}
        className="ds-list-card"
        style={{
          overflow: 'hidden',
        }}
      >
        <div className="list-card-toolbar">
          <div className="list-card-title">
            查询结果
            <span className="list-card-title-meta">共 {filteredData.length} 条</span>
          </div>
          <Space size={8}>
            <Button>导出数据</Button>
          </Space>
        </div>
        {filteredData.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 0',
              color: 'var(--nav-color-text-tertiary)',
            }}
          >
            暂无数据
          </div>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <div style={{ minWidth: 760 }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: queryListGridColumns,
                    columnGap: 'var(--nav-space-4)',
                    alignItems: 'center',
                    padding: '12px var(--padding)',
                    borderBottom: '1px solid var(--color-border-secondary)',
                    color: 'var(--color-text-secondary)',
                    fontSize: 13,
                    lineHeight: '22px',
                  }}
                >
                  <span>项目名称</span>
                  <span>状态</span>
                  <span>更新时间</span>
                  <span>操作</span>
                </div>
              </div>
              <List
                style={{ background: 'transparent', minWidth: 760 }}
                dataSource={filteredData}
                renderItem={(item) => (
                  <List.Item className="list-item-hover" style={{ padding: 0 }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: queryListGridColumns,
                        columnGap: 'var(--nav-space-4)',
                        alignItems: 'center',
                        width: '100%',
                        padding: 'var(--padding)',
                      }}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={item.name}
                        description={
                          <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                            <span>{item.description}</span>
                            {item.tags.slice(0, 2).map((tag) => (
                              <Tag
                                key={tag}
                                style={{
                                  color: 'var(--color-text)',
                                  borderRadius: 6,
                                  marginRight: 0,
                                }}
                              >
                                {tag}
                              </Tag>
                            ))}
                          </span>
                        }
                      />
                      <Tag
                        color={statusMap[item.status].color}
                        style={{
                          width: 'fit-content',
                          borderRadius: 6,
                          fontWeight: 'normal',
                          color: item.status === 'archived' ? 'var(--color-text-secondary)' : undefined,
                          marginRight: 0,
                        }}
                      >
                        {statusMap[item.status].text}
                      </Tag>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{item.updatedAt}</span>
                      <Space size={8}>
                        <Button type="text" size="small" className="list-text-btn">
                          查看
                        </Button>
                        <Button type="text" size="small" className="list-text-btn">
                          编辑
                        </Button>
                      </Space>
                    </div>
                  </List.Item>
                )}
              />
            </div>
            <Divider style={{ margin: 0, width: 'auto', minWidth: 0 }} />
            <div className="ds-list-pagination">
              <Pagination total={filteredData.length} pageSize={5} showSizeChanger={false} />
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
