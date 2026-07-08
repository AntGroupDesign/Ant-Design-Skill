import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, Descriptions, Space, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useCallback, useRef, useState } from 'react';

import '../../references/global-style.css';

const STEP_COUNT = 5;
const LAST_STEP = STEP_COUNT - 1;

const STEP_META = [
  { title: '基本信息', description: '业务方 · 负责人' },
  { title: '依赖梳理', description: '业务方 · 平台' },
  { title: '资源申请', description: '平台 · 基础设施组' },
  { title: '安全评审', description: '安全 · 合规组' },
  { title: '最终确认', description: '多方会签' },
];

const waitTime = (time: number = 100) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), time);
  });

export default function VerticalStepsFormPlayground() {
  const formRef = useRef<ProFormInstance>();
  const [formSnapshot, setFormSnapshot] = useState<Record<string, unknown>>({});

  const refreshSnapshot = useCallback(() => {
    setFormSnapshot(formRef.current?.getFieldsValue?.() ?? {});
  }, []);

  const handleSaveDraft = useCallback(async () => {
    refreshSnapshot();
    await waitTime(300);
    message.success('草稿已保存');
  }, [refreshSnapshot]);

  return (
    <div className="ds-page-card steps-form-page-card">
      <div className="vertical-steps-form vertical-steps-form--five-steps">
        <StepsForm<Record<string, unknown>>
          stepsProps={{
            direction: 'vertical',
            style: { width: '100%' },
          }}
          formRef={formRef}
          onFinish={async () => {
            await waitTime(800);
            message.success('提交成功');
          }}
          formProps={{
            validateMessages: { required: '此项为必填项' },
          }}
          layoutRender={({ stepsDom, formDom }) => (
            <div className="vertical-steps-form-layout">
              <div className="vertical-steps-form-steps">{stepsDom}</div>
              <div className="vertical-steps-form-content">{formDom}</div>
            </div>
          )}
          submitter={{
            render: (props) => (
              <div style={{ textAlign: 'left' }}>
                <Space size={8}>
                  {props.step > 0 ? <Button onClick={() => props.onPre?.()}>上一步</Button> : null}
                  <Button icon={<SaveOutlined />} onClick={handleSaveDraft}>
                    暂存草稿
                  </Button>
                  {props.step < LAST_STEP ? (
                    <Button type="primary" onClick={() => props.onSubmit?.()}>
                      下一步
                    </Button>
                  ) : (
                    <Button type="primary" onClick={() => props.onSubmit?.()}>
                      提交
                    </Button>
                  )}
                </Space>
              </div>
            ),
          }}
        >
          <StepsForm.StepForm
            name="step-basic"
            title={STEP_META[0].title}
            stepProps={{ description: STEP_META[0].description }}
            onFinish={async () => {
              refreshSnapshot();
              return true;
            }}
          >
            <ProFormText name="serviceName" label="服务名称" width="md" rules={[{ required: true }]} />
            <ProFormText name="serviceCode" label="服务编码" width="md" rules={[{ required: true }]} />
            <ProFormText name="owner" label="业务负责人" width="md" rules={[{ required: true }]} />
            <ProFormDatePicker name="plannedDate" label="计划上线日期" width="md" rules={[{ required: true }]} />
          </StepsForm.StepForm>

          <StepsForm.StepForm
            name="step-deps"
            title={STEP_META[1].title}
            stepProps={{ description: STEP_META[1].description }}
            onFinish={async () => {
              refreshSnapshot();
              return true;
            }}
          >
            <ProFormSelect
              name="upstreamDeps"
              label="上游依赖服务"
              width="lg"
              mode="multiple"
              options={['用户中心', '商品目录', '订单中心']}
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              name="topologyNote"
              label="依赖拓扑说明"
              width="xl"
              fieldProps={{ style: { minHeight: 76, resize: 'vertical' } }}
            />
            <ProFormUploadButton
              name="archDiagram"
              label="架构拓扑图"
              title="上传文件"
              max={1}
              fieldProps={{ listType: 'text' }}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm
            name="step-resource"
            title={STEP_META[2].title}
            stepProps={{ description: STEP_META[2].description }}
            onFinish={async () => {
              refreshSnapshot();
              return true;
            }}
          >
            <ProFormDigit name="cpuCores" label="CPU（核）" width="sm" min={1} rules={[{ required: true }]} />
            <ProFormDigit name="memoryGb" label="内存（GB）" width="sm" min={1} rules={[{ required: true }]} />
            <ProFormDigit name="instanceCount" label="实例数" width="sm" min={1} rules={[{ required: true }]} />
            <ProFormUploadButton
              name="resourceDoc"
              label="资源评估单"
              title="上传评估单"
              max={1}
              fieldProps={{ listType: 'text' }}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm
            name="step-security"
            title={STEP_META[3].title}
            stepProps={{ description: STEP_META[3].description }}
            onFinish={async () => {
              refreshSnapshot();
              return true;
            }}
          >
            <ProFormSelect
              name="dataLevel"
              label="数据分级"
              width="md"
              options={[
                { label: 'L2 · 内部', value: 'L2' },
                { label: 'L3 · 敏感', value: 'L3' },
              ]}
              rules={[{ required: true }]}
            />
            <ProFormUploadButton
              name="pentestReport"
              label="渗透测试报告"
              title="上传报告"
              max={1}
              fieldProps={{ listType: 'text' }}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm
            name="step-confirm"
            title={STEP_META[4].title}
            stepProps={{ description: STEP_META[4].description }}
            onFinish={async () => {
              refreshSnapshot();
              return true;
            }}
          >
            <div className="steps-confirm-summary">
              <Descriptions
                title="申请信息汇总"
                bordered
                size="small"
                column={1}
                items={[
                  { key: '1', label: '服务名称', children: String(formSnapshot.serviceName ?? '—') },
                  { key: '2', label: '服务编码', children: String(formSnapshot.serviceCode ?? '—') },
                  { key: '3', label: '业务负责人', children: String(formSnapshot.owner ?? '—') },
                ]}
              />
            </div>
            <div className="steps-confirm-checklist">
              <ProFormCheckbox name="businessConfirmed" rules={[{ required: true, message: '请确认业务方意见' }]}>
                业务方确认信息真实完整
              </ProFormCheckbox>
              <ProFormCheckbox name="platformConfirmed" rules={[{ required: true, message: '请确认平台方意见' }]}>
                平台方确认资源已评估
              </ProFormCheckbox>
              <ProFormCheckbox name="securityConfirmed" rules={[{ required: true, message: '请确认安全方意见' }]}>
                安全方确认风险可控
              </ProFormCheckbox>
            </div>
          </StepsForm.StepForm>
        </StepsForm>
      </div>
    </div>
  );
}
