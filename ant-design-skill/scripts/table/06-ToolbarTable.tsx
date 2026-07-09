import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Button, ConfigProvider } from 'antd';
import React, { useState } from 'react';

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

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  status: string;
  creator: string;
  createdAt: number;
};

const tableListDataSource: TableListItem[] = [
  { key: 1, name: '应用A', containers: 10, status: 'online', creator: '负责人A', createdAt: 1710000000 },
  { key: 2, name: '应用B', containers: 5, status: 'running', creator: '负责人B', createdAt: 1710100000 },
  { key: 3, name: '应用C', containers: 3, status: 'error', creator: '负责人C', createdAt: 1710200000 },
];

const SAMPLE_CREATOR_VALUE_ENUM = {
  all: { text: '全部' },
  负责人A: { text: '负责人A' },
  负责人B: { text: '负责人B' },
  负责人C: { text: '负责人C' },
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
  },
  {
    title: '负责人',
    dataIndex: 'creator',
    valueEnum: SAMPLE_CREATOR_VALUE_ENUM,
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '待发布', status: 'Default' },
      running: { text: '发布中', status: 'Processing' },
      online: { text: '发布成功', status: 'Success' },
      error: { text: '发布失败', status: 'Error' },
    },
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'left',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, record) => [
      record.status === 'close' && (
        <Button type="link" key="publish">
          发布
        </Button>
      ),
      (record.status === 'running' || record.status === 'online') && (
        <Button type="link" key="stop">
          停用
        </Button>
      ),
      record.status === 'error' && (
        <Button type="link" key="republish">
          重新发布
        </Button>
      ),
      <Button type="link" key="monitor" disabled={record.status === 'running'}>
        监控
      </Button>,
    ],
  },
];

const renderTabCount = (count: number) => (
  <span className="ds-tab-count">{count}</span>
);

const ToolbarTable = () => {
  const [activeKey, setActiveKey] = useState<React.Key>('tab1');

  return (
    <ProTable<TableListItem>
      columns={columns}
      request={() => {
        return Promise.resolve({
          data: tableListDataSource,
          total: tableListDataSource.length,
          success: true,
        });
      }}
      toolbar={{
        filter: (
          <LightFilter>
            <ProFormDatePicker name="startdate" label="部署日期" />
          </LightFilter>
        ),
        menu: {
          type: 'tab',
          activeKey: activeKey,
          items: [
            {
              key: 'tab1',
              label: <span>应用{renderTabCount(99)}</span>,
            },
            {
              key: 'tab2',
              label: <span>项目{renderTabCount(30)}</span>,
            },
            {
              key: 'tab3',
              label: <span>文档{renderTabCount(12)}</span>,
            },
          ],
          onChange: (key) => {
            setActiveKey(key as string);
          },
        },
        actions: [
          <Button key="primary" type="primary">
            新建应用
          </Button>,
        ],
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={false}
      dateFormatter="string"
      options={{
        setting: {
          draggable: true,
          checkable: true,
          checkedReset: false,
          extra: [
            <Button type="link" key="confirm">
              确认
            </Button>,
          ],
        },
      }}
    />
  );
};

export default () => (
  <ConfigProvider theme={tableTheme}>
    <div
      className="ds-page-card ds-table-card-padded ds-pro-table-card ds-table-card-with-tabs"
    >
      <ToolbarTable />
    </div>
  </ConfigProvider>
);
