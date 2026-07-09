import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Descriptions, Tag } from 'antd';
import type { DescriptionsProps } from 'antd';
import '../../references/global-style.css';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '项目名称',
    children: '数据服务工作台',
  },
  {
    key: '2',
    label: '项目编号',
    children: 'PRJ-20260528-001', /* 编号左对齐，可读内容 */
  },
  {
    key: '3',
    label: '状态',
    children: <Tag color="success">运行中</Tag>, /* 状态字段使用语义色 Tag */
  },
  {
    key: '4',
    label: '创建时间',
    children: '2026-05-28', /* 日期格式 YYYY-MM-DD */
  },
  {
    key: '5',
    label: '数据量',
    children: '123,220kg', /* 千分位 + 计量单位小写 */
  },
  {
    key: '6',
    label: '有效期',
    children: '2026-05-28 ~ 2027-05-27', /* 日期范围，波浪号前后空格 */
  },
  {
    key: '7',
    label: '备注',
    span: 3, /* 长文本占满整行，span = column 值 */
    children: (
      /* 长文本操作 icon 放在灰色块内，跟随文本末尾 */
      <span className="db-descriptions-long-text">
        这里是一段较长的备注内容，支持自动换行，使用灰色背景块包裹以区分普通文本字段。
        <Button
          type="text"
          size="small"
          aria-label="编辑备注"
          className="db-descriptions-action-icon"
          icon={<EditOutlined />}
        />
      </span>
    ),
  },
];

const BasicDescriptions: React.FC = () => (
  <div className="ds-page-card">
    <Descriptions
      className="ds-descriptions"
      title="项目信息"
      column={3} /* 字段多时用 3 列，少时改为 2 */
      items={items}
    />
  </div>
);

export default BasicDescriptions;
