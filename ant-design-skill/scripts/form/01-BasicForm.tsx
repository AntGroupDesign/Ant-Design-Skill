import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormCascader,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormList,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Space, TreeSelect, message } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
import type { TreeDataNode } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';

import '../../references/global-style.css';

type AreaCascaderOption = DefaultOptionType & {
  children?: AreaCascaderOption[];
};

const SAMPLE_AREA_CASCADER: AreaCascaderOption[] = [
  { value: 'zhejiang', label: '浙江', children: [{ value: 'hangzhou', label: '杭州', children: [{ value: 'binjiang', label: '滨江区' }, { value: 'xihu', label: '西湖区' }] }, { value: 'ningbo', label: '宁波', children: [{ value: 'yinzhou', label: '鄞州区' }] }] },
  { value: 'jiangsu', label: '江苏', children: [{ value: 'nanjing', label: '南京', children: [{ value: 'xuanwu', label: '玄武区' }] }] },
];

const SAMPLE_DEPARTMENT_TREE: TreeDataNode[] = [
  { title: '研发部', value: 'rd', children: [{ title: '前端组', value: 'rd-fe', children: [{ title: 'React 小组', value: 'rd-fe-react' }, { title: 'Vue 小组', value: 'rd-fe-vue' }] }, { title: '后端组', value: 'rd-be', children: [{ title: 'Java 小组', value: 'rd-be-java' }, { title: 'Go 小组', value: 'rd-be-go' }] }] },
  { title: '产品部', value: 'pm', children: [{ title: '产品设计组', value: 'pm-design' }, { title: '产品运营组', value: 'pm-ops' }] },
  { title: '技术部', value: 'tech-fe', children: [{ title: '基础架构组', value: 'tech-infra' }, { title: '数据平台组', value: 'tech-data' }] },
];

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default function BasicFormPlayground() {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();

  return (
    <div className="basic-form-page" style={{ padding: '24px 0 0 48px' }}>
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
      layout="vertical"
      name="basic-form"
      onFinish={async () => {
        await waitTime(2000);
        message.success('提交成功');
      }}
      formRef={formRef}
      params={{ id: '100' }}
      formKey="basic-form"
      dateFormatter={(value, valueType) => {
        return value.format('YYYY/MM/DD HH:mm:ss');
      }}
      request={async () => {
        await waitTime(1500);
        return {
          name: '杭州星辰科技有限公司',
          useMode: 'chapter',
        };
      }}
      autoFocusFirstInput
      submitter={{
        render: (_, dom) => (
          <div style={{ textAlign: 'left', marginTop: 32, paddingBottom: 72 }}>
            <Space size={8}>
              <Button onClick={() => formRef.current?.resetFields()}>重置</Button>
              <Button type="primary" onClick={() => formRef.current?.submit()}>提交</Button>
            </Space>
          </div>
        ),
      }}
    >
      <ProForm.Group groupProps={{ style: { display: 'flex', flexWrap: 'wrap', gap: 16 } }}>
        <ProFormText
          width="md"
          name="name"
          required
          dependencies={[['contract', 'name']]}
          label="签约客户名称"
          tooltip="最长 24 个字符"
          placeholder="请输入客户名称"
          rules={[{ required: true, message: '此项为必填项' }]}
        />
        <ProFormText
          width="md"
          name="company"
          label="我方公司名称"
          placeholder="请输入公司名称"
        />
      </ProForm.Group>
      <ProForm.Group groupProps={{ style: { display: 'flex', flexWrap: 'wrap', gap: 16 } }}>
        <ProFormDigit name="count" label="项目团队人数" width="md" />
      </ProForm.Group>
      <ProForm.Group groupProps={{ style: { display: 'flex', flexWrap: 'wrap', gap: 16 } }}>
        <ProFormText
          name={['contract', 'name']}
          width="md"
          label="合同名称"
          placeholder="请输入合同名称"
        />
        <ProFormDateRangePicker
          width="md"
          name={['contract', 'createTime']}
          label="合同有效期"
        />
      </ProForm.Group>
      <ProForm.Group groupProps={{ style: { display: 'flex', flexWrap: 'wrap', gap: 16 } }}>
        <ProFormSelect
          options={[
            { value: 'chapter', label: '盖章后生效' },
            { value: 'sign', label: '签字后生效' },
          ]}
          width="md"
          name="useMode"
          label="合同约定生效方式"
        />
        <ProFormSelect
          width="md"
          options={[
            { value: 'time1', label: '履行完毕后终止（自动续期）' },
            { value: 'time2', label: '履行完毕后终止（不续期）' },
          ]}
          name="unusedMode"
          label="合同约定失效方式"
        />
        <ProFormMoney
          width="md"
          name="money"
          label="合同签约金额"
          fieldProps={{
            numberPopoverRender: true,
          }}
        />
      </ProForm.Group>
      <ProForm.Group groupProps={{ style: { display: 'flex', flexWrap: 'wrap', gap: 16 } }}>
        <ProFormText width="md" name="id" label="主合同编号" placeholder="请输入编号" />
        <ProFormText
          name="project"
          width="md"
          disabled
          label="关联项目"
          initialValue="智慧零售平台"
        />
      </ProForm.Group>
      <ProForm.Group groupProps={{ style: { display: 'flex', flexWrap: 'wrap', gap: 16 } }}>
        <ProFormTextArea
          width="md"
          name="address"
          label="详细办公地址"
          placeholder="请输入详细办公地址"
        />
      </ProForm.Group>
      <ProForm.Group groupProps={{ style: { display: 'flex', flexWrap: 'wrap', gap: 16 } }}>
        <ProFormText
          width="md"
          name="mangerName"
          disabled
          label="商务经理"
          initialValue="负责人A"
        />
      </ProForm.Group>
      <ProForm.Group groupProps={{ style: { display: 'flex', flexWrap: 'wrap', gap: 16 } }}>
        <ProFormCascader
          width="md"
          request={async () => SAMPLE_AREA_CASCADER}
          name="areaList"
          label="所在地区"
          initialValue={['zhejiang', 'hangzhou', 'binjiang']}
          addonAfter="区县"
        />
      </ProForm.Group>
      <ProForm.Group groupProps={{ style: { display: 'flex', flexWrap: 'wrap', gap: 16 } }}>
        <ProFormTreeSelect
          width={328}
          initialValue={['tech-fe']}
          label="所属部门"
          fieldProps={{
            fieldNames: {
              label: 'title',
            },
            treeData: SAMPLE_DEPARTMENT_TREE,
            treeCheckable: true,
            showCheckedStrategy: TreeSelect.SHOW_PARENT,
            placeholder: '请选择部门',
          }}
        />
      </ProForm.Group>
      <ProForm.Group groupProps={{ style: { display: 'flex', flexWrap: 'wrap', gap: 16 } }}>
        <ProFormDatePicker
          name="date"
          label="签约日期"
          width="md"
          transform={(value) => {
            return {
              date: dayjs(value).unix(),
            };
          }}
        />
      </ProForm.Group>
      <ProFormList name="datas" label="补充条款">
        {() => {
          return (
            <>
              <ProFormDatePicker
                name="date"
                label="生效日期"
                width="md"
                transform={(value) => {
                  return {
                    date: dayjs(value).unix(),
                  };
                }}
              />
              <ProFormList name="innerDatas" label="子条款">
                {() => {
                  return (
                    <>
                      <ProFormDatePicker
                        name="date"
                        label="子条款生效日期"
                        width="md"
                        transform={(value) => {
                          return {
                            date: dayjs(value).unix(),
                          };
                        }}
                      />
                    </>
                  );
                }}
              </ProFormList>
            </>
          );
        }}
      </ProFormList>
    </ProForm>
    </div>
  );
}
