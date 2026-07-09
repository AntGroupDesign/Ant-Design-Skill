import '../../references/global-style.css';
import { useState } from 'react';
import { List, Button, Input, Tabs } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const toolbarListData = [
  { name: '实验名称1', desc: '系统性的沉淀B端知识体系', content: [{ label: '模型数', value: 2903 }, { label: '指标数', value: 3720 }, { label: '实验状态', value: '成功', status: 'success' }] },
  { name: '实验名称2', desc: '系统性的沉淀B端知识体系', content: [{ label: '模型数', value: 2904 }, { label: '指标数', value: 3721 }, { label: '实验状态', value: '成功', status: 'success' }] },
  { name: '实验名称3', desc: '系统性的沉淀B端知识体系', content: [{ label: '模型数', value: 2905 }, { label: '指标数', value: 3722 }, { label: '实验状态', value: '成功', status: 'success' }] },
  { name: '实验名称4', desc: '全链路数据监测与智能分析', content: [{ label: '模型数', value: 1832 }, { label: '指标数', value: 2145 }, { label: '实验状态', value: '进行中', status: 'processing' }] },
];

export default function ToolbarList() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { key: 'all', label: '全部实验室', count: 99 },
    { key: 'mine', label: '我创建的实验室', count: 32 },
  ];

  const filteredData = activeTab === 'all' ? toolbarListData : toolbarListData.slice(0, 3);

  return (
    <div>
      <List
        header={
          <div className="toolbar-header ds-card-tab-strip">
            <Tabs
              className="toolbar-tabs"
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabs.map((tab) => ({
                key: tab.key,
                label: (
                  <span>
                    {tab.label}
                    <span className="ds-tab-count">{tab.count}</span>
                  </span>
                ),
              }))}
            />
            <div className="ds-card-toolbar-actions">
              <div className="search-wrapper">
                <Input
                  className="table-filter-search"
                  size="middle"
                  prefix={<SearchOutlined style={{ color: 'var(--color-text-quaternary)' }} />}
                  placeholder="搜索实验名称"
                  style={{ width: 240 }}
                />
              </div>
              <Button type="primary" icon={<PlusOutlined />}>
                新建实验
              </Button>
            </div>
          </div>
        }
        className="ds-list-card"
        dataSource={filteredData}
        renderItem={(item) => (
          <List.Item
            className="list-item-hover"
            actions={[
              <Button key="edit" type="text" size="small" className="list-text-btn">编辑</Button>,
              <Button key="copy" type="text" size="small" className="list-text-btn">复制</Button>,
              <Button key="delete" type="text" size="small" danger className="list-text-btn">删除</Button>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={item.desc}
            />
            <div style={{ display: 'flex', gap: 32, minWidth: 240 }}>
              {item.content.map((c, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--color-text-tertiary)', fontSize: 12 }}>{c.label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    {c.status === 'success' && (
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }} />
                    )}
                    {c.status === 'processing' && (
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
                    )}
                    {typeof c.value === 'number' ? c.value.toLocaleString() : c.value}
                  </div>
                </div>
              ))}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
