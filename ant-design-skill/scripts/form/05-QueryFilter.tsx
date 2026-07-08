import {
  ProFormDatePicker,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import { Col, Space } from 'antd';
import '../../references/global-style.css';

export default function QueryFilterPlayground() {
  return (
    <div style={{ padding: 'var(--space-xxxl)' }}>
      <QueryFilter
        defaultCollapsed
        defaultFormItemsNumber={5}
        split={false}
        searchGutter={[24, 16]}
        submitter={{
          render: (_, dom) => (
            <Col flex="auto" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Space size={8}>
                {dom}
              </Space>
            </Col>
          ),
        }}
      >
        <ProFormText name="name" label="应用名称" width="md" />
        <ProFormDatePicker name="createDate" label="创建时间" width="md" />
        <ProFormText name="status" label="应用状态" width="md" />
        <ProFormDatePicker name="replyDate" label="响应日期" width="md" />
        <ProFormDatePicker name="startDate" label="开始时间" width="md" />
        <ProFormDatePicker name="endDate" label="结束时间" width="md" />
        <ProFormText name="owner" label="负责人" width="md" />
        <ProFormText name="region" label="所在区域" width="md" />
      </QueryFilter>
    </div>
  );
}
