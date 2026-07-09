import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, ConfigProvider, DatePicker, Space, Table } from 'antd';

import '../../references/global-style.css';

const { RangePicker } = DatePicker;

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
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
} as const;

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    width: 140,
    dataIndex: 'name',
    fixed: 'left',
  },
  {
    title: '容器数量',
    width: 100,
    dataIndex: 'containers',
    align: 'left',
    search: false,
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '请求量',
    width: 100,
    align: 'left',
    dataIndex: 'callNumber',
  },
  {
    title: '部署进度',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: ProcessMap[item.status as keyof typeof ProcessMap],
    }),
  },
  {
    title: '负责人',
    width: 100,
    dataIndex: 'creator',
    valueType: 'select',
  },
  {
    title: '部署时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
    formItemRender: () => <RangePicker />,
  },
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
    search: false,
  },
  {
    title: '操作',
    width: 80,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: () => [
      <Button type="link" key="detail">
        详情
      </Button>,
    ],
  },
];

const tableListDataSource: TableListItem[] = [
  { key: 1, name: '服务A', containers: 10, callNumber: 100, progress: 80, creator: '创建人A', status: 'online', createdAt: 1710000000, memo: '运行稳定' },
  { key: 2, name: '服务B', containers: 5, callNumber: 50, progress: 60, creator: '创建人B', status: 'running', createdAt: 1710100000, memo: '部署中' },
  { key: 3, name: '服务C', containers: 3, callNumber: 30, progress: 100, creator: '创建人C', status: 'close', createdAt: 1710200000, memo: '已停用' },
];

const BatchTable = () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        defaultSelectedRowKeys: [1],
      }}
      tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
        <div
          className="table-batch-alert"
          style={{
            background: '#fafafa',
            borderRadius: 6,
            padding: '8px 12px',
          }}
        >
          <Space size={24}>
            <Space size={8} align="center" className="table-batch-alert-cell">
              <span className="ds-text-main">已选 {selectedRowKeys.length} 项</span>
              <Button type="link" onClick={onCleanSelected}>
                取消选择
              </Button>
            </Space>
            <span className="ds-text-main">
              容器总数: {selectedRows.reduce((pre, item) => pre + item.containers, 0)} 个
            </span>
            <span className="ds-text-main">
              请求总量: {selectedRows.reduce((pre, item) => pre + item.callNumber, 0)} 次
            </span>
          </Space>
        </div>
      )}
      tableAlertOptionRender={() => (
        <Space size={16} className="table-batch-alert-cell">
          <Button type="link">批量重启</Button>
          <Button type="link">批量下线</Button>
          <Button type="link">导出数据</Button>
        </Space>
      )}
      dataSource={tableListDataSource}
      scroll={{ x: 1300 }}
      options={false}
      search={false}
      pagination={{ pageSize: 5 }}
      rowKey="key"
      headerTitle="批量操作"
      toolBarRender={() => [<Button key="export">导出报表</Button>]}
    />
  );
};

export default () => (
  <ConfigProvider theme={tableTheme}>
    <div className="ds-page-card ds-table-card-padded ds-pro-table-card">
      <BatchTable />
    </div>
  </ConfigProvider>
);
