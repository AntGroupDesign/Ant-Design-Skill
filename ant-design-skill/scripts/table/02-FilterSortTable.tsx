/**
 * 支持筛选排序的表格模板
 *
 * 列宽要点：
 * - 首列文本列必须设置 width（百分或像素），避免无限撑开
 * - 混合百分比与固定像素列宽时使用 tableLayout="fixed"
 * - 操作列（2 个文字链接）width 不小于 160，内容 whiteSpace: nowrap
 */
import React from 'react';
import { Button, ConfigProvider, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';

import '../../references/global-style.css';

const tableTheme = {
  token: {
    fontSize: 14,
    colorPrimary: '#1677ff',
    borderRadius: 6,
  },
  components: {
    Table: {
      headerBg: '#fafafa',
      headerHoverBg: '#fafafa',
    },
  },
};

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '30%',
    ellipsis: true,
    filters: [
      { text: '用户C', value: '用户C' },
      {
        text: '分类一',
        value: '分类一',
        children: [
          { text: '用户A', value: '用户A' },
          { text: '用户B', value: '用户B' },
        ],
      },
      {
        text: '分类二',
        value: '分类二',
        children: [
          { text: '用户C', value: '用户C' },
          { text: '用户D', value: '用户D' },
        ],
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value as string),
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: '40%',
    filters: [
      { text: '区域A', value: '区域A' },
      { text: '区域B', value: '区域B' },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.address.includes(value as string),
  },
  {
    title: '操作',
    key: 'action',
    width: 160,
    render: () => (
      <Space size={8} align="center" className="table-action-cell" style={{ whiteSpace: 'nowrap' }}>
        <Button type="link">编辑</Button>
        <Button type="link">删除</Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  { key: '1', name: '用户A', age: 32, address: '区域A办公点' },
  { key: '2', name: '用户B', age: 42, address: '区域B办公点' },
  { key: '3', name: '用户C', age: 32, address: '区域C办公点' },
  { key: '4', name: '用户D', age: 28, address: '区域D办公点' },
];

const App: React.FC = () => (
  <ConfigProvider theme={tableTheme}>
    <div className="ds-page-card ds-table-card-padded">
      <div className="ds-card-title-row">
        <span className="ds-table-title">用户筛选列表</span>
      </div>
      <Table<DataType>
        tableLayout="fixed"
        columns={columns}
        dataSource={data}
      />
    </div>
  </ConfigProvider>
);

export default App;
