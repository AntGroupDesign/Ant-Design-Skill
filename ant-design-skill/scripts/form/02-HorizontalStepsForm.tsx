import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useRef } from 'react';

import '../../references/global-style.css';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default function HorizontalStepsFormPlayground() {
  const formRef = useRef<ProFormInstance>();

  return (
    <div className="ds-page-card steps-form-page-card">
      <div className="horizontal-steps-form">
        <div className="horizontal-steps-form-inner">
          <StepsForm<{
            name: string;
          }>
            formRef={formRef}
            onFinish={async () => {
              await waitTime(1000);
              message.success('提交成功');
            }}
            formProps={{
              validateMessages: {
                required: '此项为必填项',
              },
            }}
            stepsProps={{
              style: { maxWidth: 600, margin: '0 auto 40px' },
            }}
            submitter={{
              render: (props) => {
                return (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    <Space size={8}>
                      {props.step > 0 && <Button onClick={() => props.onPre?.()}>上一步</Button>}
                      {props.step < 2 && (
                        <Button type="primary" onClick={() => props.onSubmit?.()}>
                          下一步
                        </Button>
                      )}
                      {props.step === 2 && (
                        <Button type="primary" onClick={() => props.onSubmit?.()}>
                          提交
                        </Button>
                      )}
                    </Space>
                  </div>
                );
              },
            }}
            containerStyle={{ width: '100%', maxWidth: 700 }}
          >
            <StepsForm.StepForm<{
              name: string;
            }>
              name="steps-from-base"
              title="创建实验"
              stepProps={{
                description: '这里填入基本信息',
              }}
              layout="vertical"
              onFinish={async () => {
                await waitTime(2000);
                return true;
              }}
            >
              <ProFormText
                name="name"
                label="实验名称"
                width="md"
                tooltip="最长为 24 位，用于标定的唯一 id"
                placeholder="请输入名称"
                rules={[{ required: true }]}
              />
              <ProFormDatePicker name="date" label="日期" width="md" />
              <ProFormDateRangePicker name="dateTime" label="时间区间" width="md" />
              <ProFormTextArea
                name="remark"
                label="备注"
                width="xl"
                placeholder="请输入备注"
                fieldProps={{
                  style: { minHeight: 76, resize: 'vertical' },
                }}
              />
            </StepsForm.StepForm>
            <StepsForm.StepForm<{
              checkbox: string;
            }>
              name="steps-from-checkbox"
              title="设置参数"
              stepProps={{
                description: '这里填入运维参数',
              }}
              layout="vertical"
              onFinish={async () => {
                return true;
              }}
            >
              <ProFormCheckbox.Group
                name="checkbox"
                label="迁移类型"
                width="md"
                options={['结构迁移', '全量迁移', '增量迁移', '全量校验']}
              />
              <ProForm.Group>
                <ProFormText name="dbname" label="业务 DB 用户名" width="md" />
                <ProFormDatePicker name="datetime" label="记录保存时间" width="sm" />
                <ProFormCheckbox.Group
                  name="checkbox2"
                  label="迁移类型"
                  width="md"
                  options={['完整 LOB', '不同步 LOB', '受限制 LOB']}
                />
              </ProForm.Group>
            </StepsForm.StepForm>
            <StepsForm.StepForm
              name="steps-from-time"
              title="发布实验"
              stepProps={{
                description: '这里填入发布标准',
              }}
              layout="vertical"
            >
              <ProFormCheckbox.Group
                name="checkbox"
                label="部署单元"
                width="md"
                rules={[{ required: true }]}
                options={['部署单元 1', '部署单元 2', '部署单元 3']}
              />
              <ProFormSelect
                label="部署分组策略"
                name="remark"
                width="md"
                rules={[{ required: true }]}
                initialValue="1"
                options={[
                  { value: '1', label: '策略一' },
                  { value: '2', label: '策略二' },
                ]}
              />
              <ProFormSelect
                label="Pod 调度策略"
                name="remark2"
                width="md"
                initialValue="2"
                options={[
                  { value: '1', label: '策略一' },
                  { value: '2', label: '策略二' },
                ]}
              />
            </StepsForm.StepForm>
          </StepsForm>
        </div>
      </div>
    </div>
  );
}
