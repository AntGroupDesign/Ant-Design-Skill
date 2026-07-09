import type { ProFormColumnsType } from '@ant-design/pro-components';
import {
  BetaSchemaForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import '../../references/global-style.css';

const valueEnum = {
  all: { text: '全部', status: 'Default' },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '解决中',
    status: 'Processing',
  },
};

type DataItem = {
  name: string;
  state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: 'm',
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum,
    width: 'm',
  },
];

export default function EmbedFormPlayground() {
  return (
    <div className="embed-form-page ds-page-card ds-form-panel">
      <ProForm name="schema-form-embed" submitter={{ render: false }}>
      <div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius)', padding: 'var(--padding) var(--nav-space-6)', marginBottom: 'var(--margin)' }}>
        <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-secondary)', marginBottom: 'var(--margin)', color: 'var(--color-text)' }}>通用信息</div>
        <ProForm.Group>
          <ProFormText name="username" label="用户名" width="md"
            rules={[{ required: true, message: '请输入用户名' }]} />
          <ProFormSelect
            name="select-multiple"
            label="多选"
            width="md"
            valueEnum={{
              red: 'Red',
              green: 'Green',
              blue: 'Blue',
            }}
            fieldProps={{
              mode: 'multiple',
            }}
            placeholder="请选择"
            rules={[
              {
                required: true,
                message: 'Please select your favorite colors!',
                type: 'array',
              },
            ]}
          />
        </ProForm.Group>
      </div>

      <div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius)', padding: 'var(--padding) var(--nav-space-6)', marginBottom: 'var(--margin)' }}>
        <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-secondary)', marginBottom: 'var(--margin)', color: 'var(--color-text)' }}>合同信息</div>
        <BetaSchemaForm<DataItem> layoutType="Embed" columns={columns} />
      </div>

      <div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius)', padding: 'var(--padding) var(--nav-space-6)', marginBottom: 'var(--margin)' }}>
        <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-secondary)', marginBottom: 'var(--margin)', color: 'var(--color-text)' }}>详细信息</div>
        <ProForm.Group>
          <ProFormDatePicker name="createName" label="创建时间" width="md" />
          <ProFormDatePicker name="updateName" label="更新时间" width="md" />
        </ProForm.Group>
        <BetaSchemaForm<DataItem>
          layoutType="Embed"
          columns={[
            {
              title: '状态',
              dataIndex: 'groupState',
              valueType: 'select',
              width: 'm',
              valueEnum,
            },
            {
              title: '标题',
              width: 'm',
              dataIndex: 'groupTitle',
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: '此项为必填项',
                  },
                ],
              },
            },
          ]}
        />
      </div>

      <div style={{ textAlign: 'left', marginTop: 24 }}>
        <Space size={8}>
          <Button>取消</Button>
          <Button type="primary" htmlType="submit">提交</Button>
        </Space>
      </div>
    </ProForm>
    </div>
  );
}
