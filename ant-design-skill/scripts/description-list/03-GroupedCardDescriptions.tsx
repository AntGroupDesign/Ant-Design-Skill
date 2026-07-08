/**
 * 分组卡片描述列表 — 多语义分组、每组独立 Card + Descriptions 只读展示
 * 适用场景：如「项目信息」「服务配置」等多组结构化字段页
 */
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Flex } from 'antd';
import type { DescriptionsProps } from 'antd';
import type { CSSProperties } from 'react';
import React from 'react';

/** 分组 Card 内容区遵循页面级白卡 16/24；标题区只承担标题顶部与水平对齐 */
export const descriptionGroupCardStyles = {
  header: {
    padding: 'var(--padding) var(--nav-space-6) 0',
    borderBottom: 'none' as const,
    minHeight: 'auto',
  },
  body: {
    padding: 'var(--padding) var(--nav-space-6)',
  },
};

/** 白卡片外观 */
export const descriptionGroupCardStyle: CSSProperties = {
  background: 'var(--color-bg-container)',
  borderRadius: 'var(--border-radius-lg)',
  boxShadow: 'var(--shadow)',
};

const accountItems: DescriptionsProps['items'] = [
  { key: 'projectName', label: '项目名称', children: '数据服务工作台' },
  { key: 'projectCode', label: '项目编号', children: 'PRJ-20260528-001' },
  { key: 'owner', label: '负责人', children: '项目负责人' },
  { key: 'status', label: '运行状态', children: '运行中' },
  {
    key: 'description',
    label: '项目说明',
    span: 2,
    children: (
      <span className="db-descriptions-long-text">
        用于展示项目基础信息、服务范围、负责人和当前运行状态等结构化内容。
        <Button
          type="text"
          size="small"
          aria-label="编辑项目说明"
          className="db-descriptions-action-icon"
          icon={<EditOutlined />}
        />
      </span>
    ),
  },
];

const orgItems: DescriptionsProps['items'] = [
  { key: 'serviceName', label: '服务名称', children: '数据同步服务' },
  { key: 'serviceCode', label: '服务编号', children: 'SVC-001' },
  { key: 'environment', label: '部署环境', children: '生产环境' },
  { key: 'region', label: '部署区域', children: '华东一区' },
  { key: 'version', label: '当前版本', children: 'v2.8.0' },
  { key: 'releaseDate', label: '发布时间', children: '2026-05-28' },
  { key: 'sla', label: '服务等级', children: '99.9%' },
  { key: 'monitorStatus', label: '监控状态', children: '已接入' },
  { key: 'changeOwner', label: '变更负责人', children: '运维负责人' },
  { key: 'businessScene', label: '业务场景', children: '数据同步、任务调度与服务监控' },
];

const GroupedCardDescriptions: React.FC = () => (
  <Flex vertical gap={16 /* --margin */}>
    <Card
      title="项目信息"
      bordered={false}
      style={descriptionGroupCardStyle}
      styles={descriptionGroupCardStyles}
    >
      <Descriptions className="ds-descriptions" column={2} items={accountItems} />
    </Card>
    <Card
      title="服务配置"
      bordered={false}
      style={descriptionGroupCardStyle}
      styles={descriptionGroupCardStyles}
    >
      <Descriptions className="ds-descriptions" column={3} items={orgItems} />
    </Card>
  </Flex>
);

export default GroupedCardDescriptions;
