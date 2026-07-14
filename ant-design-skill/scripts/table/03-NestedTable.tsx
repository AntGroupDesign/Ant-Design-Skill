import React from 'react';
import type { TableColumnsType } from 'antd';
import { Badge, Button, ConfigProvider, Dropdown, Space, Table } from 'antd';

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

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

const moreMenuItems = [
  { key: '1', label: '操作一' },
  { key: '2', label: '操作二' },
];

const expandDataSource: ExpandedDataType[] = Array.from({ length: 3 }).map((_, i) => ({
  key: i.toString(),
  date: '2024-12-24 23:12:00',
  name: '生产环境 v2.1.0',
  upgradeNum: '已升级：56 台',
}));

const dataSource: DataType[] = Array.from({ length: 3 }).map((_, i) => ({
  key: i.toString(),
  name: '移动端客户端',
  platform: 'iOS',
  version: '10.3.4.5654',
  upgradeNum: 500,
  creator: '负责人A',
  createdAt: '2024-12-24 23:12:00',
}));

const expandColumns: TableColumnsType<ExpandedDataType> = [
  { title: '更新时间', dataIndex: 'date', key: 'date' },
  { title: '版本名称', dataIndex: 'name', key: 'name' },
  {
    title: '状态',
    key: 'state',
    render: () => <Badge status="success" text="已完成" />,
  },
  { title: '升级情况', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  {
    title: '操作',
    key: 'operation',
    width: 160,
    render: () => (
      <Space size={8} align="center" className="table-action-cell" style={{ whiteSpace: 'nowrap' }}>
        <Button type="link">暂停</Button>
        <Button type="link">停止</Button>
        <Dropdown menu={{ items: moreMenuItems }}>
          <Button type="link">更多</Button>
        </Dropdown>
      </Space>
    ),
  },
];

const columns: TableColumnsType<DataType> = [
  { title: '应用名称', dataIndex: 'name', key: 'name', width: 180, fixed: 'left' },
  { title: '平台', dataIndex: 'platform', key: 'platform', width: 120 },
  { title: '版本号', dataIndex: 'version', key: 'version', width: 160 },
  { title: '升级数量', dataIndex: 'upgradeNum', key: 'upgradeNum', width: 120 },
  { title: '负责人', dataIndex: 'creator', key: 'creator', width: 120 },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 180 },
  {
    title: '操作',
    key: 'operation',
    width: 160,
    fixed: 'right',
    render: () => (
      <Space size={8} align="center" className="table-action-cell" style={{ whiteSpace: 'nowrap' }}>
        <Button type="link">发布</Button>
      </Space>
    ),
  },
];

const expandedRowRender = () => (
  <Table<ExpandedDataType>
    columns={expandColumns}
    dataSource={expandDataSource}
    pagination={false}
  />
);

const App: React.FC = () => (
  <ConfigProvider theme={tableTheme}>
    <div className="ds-page-card ds-table-card-padded">
      <div className="ds-card-title-row">
        <span className="ds-table-title">应用版本列表</span>
      </div>
      <Table<DataType>
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={dataSource}
        scroll={{ x: 1040 }}
      />
    </div>
  </ConfigProvider>
);

export default App;
