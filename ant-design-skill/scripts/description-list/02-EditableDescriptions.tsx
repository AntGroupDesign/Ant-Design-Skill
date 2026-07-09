/**
 * 可编辑描述列表 — 查阅与即时编辑一体
 * 适用场景：复杂多维数据需要行内修改、保存纠错与更新
 *
 * 使用 @ant-design/pro-components 的 ProDescriptions 实现可编辑描述列表
 */
import type { ActionType } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Input } from 'antd';
import React, { useRef } from 'react';
import '../../references/global-style.css';

const EditableDescriptions: React.FC = () => {
  const actionRef = useRef<ActionType>();

  return (
    <div className="ds-page-card">
      <ProDescriptions
        className="ds-descriptions"
        actionRef={actionRef}
        title="可编辑的定义列表"
        request={async () => {
          return Promise.resolve({
            success: true,
            data: {
              rate: 5,
              id: '这是一段文本columns',
              date: '20200809',
              money: '1212100',
              state: 'all',
              state2: 'open',
            },
          });
        }}
        editable={{
          /* editable 会自动生成编辑入口；render 中不要再叠加第二个编辑 icon */
          onSave: async () => {
            return true; /* 返回 true 退出编辑态 */
          },
        }}
        columns={[
          {
            title: '文本',
            key: 'text',
            dataIndex: 'id',
            copyable: true, /* 支持复制 */
            ellipsis: true, /* 超长省略 */
          },
          {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            editable: false, /* 该列禁止编辑 */
            valueEnum: {
              all: { text: '全部', status: 'Default' },
              open: { text: '未解决', status: 'Error' },
              closed: { text: '已解决', status: 'Success' },
            },
          },
          {
            title: '状态2',
            key: 'state2',
            dataIndex: 'state2',
            renderFormItem: () => (
              /* 自定义编辑控件 */
              <Input placeholder="输入 Success 切换分值" />
            ),
          },
          {
            title: '分值',
            dataIndex: 'fraction',
            /* valueType 支持函数，根据其他字段值动态切换类型 */
            valueType: (record) => {
              if (record?.state2 === 'Success') return 'select';
              return 'digit';
            },
            fieldProps: {
              mode: 'multiple',
            },
            request: async () =>
              ['A', 'B', 'D', 'E', 'F'].map((item, index) => ({
                label: item,
                value: index,
              })),
          },
          {
            title: '时间',
            key: 'date',
            dataIndex: 'date',
            valueType: 'date',
          },
          {
            title: '评分',
            key: 'rate',
            dataIndex: 'rate',
            valueType: 'rate',
          },
          {
            title: '金额',
            key: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
          {
            title: '操作',
            valueType: 'option', /* 操作列固定使用 option 类型 */
            render: () => [
              <a target="_blank" rel="noopener noreferrer" key="link">
                链路
              </a>,
              <a target="_blank" rel="noopener noreferrer" key="warning">
                报警
              </a>,
              <a target="_blank" rel="noopener noreferrer" key="view">
                查看
              </a>,
            ],
          },
        ]}
      >
        {/* 也可通过子组件方式追加字段 */}
        <ProDescriptions.Item dataIndex="percent" label="百分比" valueType="percent">
          100
        </ProDescriptions.Item>
      </ProDescriptions>
    </div>
  );
};

export default EditableDescriptions;
