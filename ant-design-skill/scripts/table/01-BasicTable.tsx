import React from 'react';
import { Button, ConfigProvider, Space, Table, Tag, Tooltip } from 'antd';
import type { TableProps } from 'antd';

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
  key: string;
  name: string;
  age: number;
  address: string;
  status: 'success' | 'warning' | 'error';
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
    render: (text) => <Tooltip title={text}>{text}</Tooltip>,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: DataType['status']) => {
      const map = {
        success: { color: 'success', text: '正常' },
        warning: { color: 'warning', text: '警告' },
        error: { color: 'error', text: '异常' },
      };
      const { color, text } = map[status];
      return <Tag color={color}>{text}</Tag>;
    },
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
  { key: '1', name: '用户A', age: 32, address: '区域A办公点', status: 'success' },
  { key: '2', name: '用户B', age: 42, address: '区域B办公点', status: 'warning' },
  { key: '3', name: '用户C', age: 32, address: '区域C办公点', status: 'error' },
];

const App: React.FC = () => (
  <ConfigProvider theme={tableTheme}>
    <div className="ds-page-card ds-table-card-padded">
      <div className="ds-card-title-row">
        <span className="ds-table-title">用户列表</span>
      </div>
      <Table<DataType> columns={columns} dataSource={data} />
    </div>
  </ConfigProvider>
);

export default App;
