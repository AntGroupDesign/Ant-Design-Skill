import '../../references/global-style.css';
import { useState } from 'react';
import { List, Tag, Button, Avatar, Progress, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const selectListData = [
  { title: '智慧零售平台', desc: '面向企业级中后台的设计解决方案', progress: 80 },
  { title: 'Ant Design', desc: '面向企业级中后台的设计解决方案', progress: 65 },
  { title: '云原生微服务框架', desc: '面向企业级中后台的设计解决方案', progress: 100 },
  { title: '数据可视化引擎', desc: '面向企业级中后台的设计解决方案', progress: 30 },
];

export default function SelectableList() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 选中项排在前面，未选中项跟在后面
  const orderedData = [
    ...selectListData.filter((d) => selectedKeys.includes(d.title)),
    ...selectListData.filter((d) => !selectedKeys.includes(d.title)),
  ];

  const toggleSelect = (title: string) => {
    setSelectedKeys((prev) =>
      prev.includes(title) ? prev.filter((k) => k !== title) : [...prev, title]
    );
  };

  const toggleAll = () => {
    if (selectedKeys.length === selectListData.length) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(selectListData.map((d) => d.title));
    }
  };

  const isAllChecked = selectedKeys.length === selectListData.length;
  const isIndeterminate = selectedKeys.length > 0 && selectedKeys.length < selectListData.length;

  return (
    <div>
      <List
        header={
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 500 }}>支持选中的列表</span>
                {selectedKeys.length > 0 && (
                  <Tag color="processing" style={{ borderRadius: 6 }}>已选 {selectedKeys.length} 项</Tag>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {selectedKeys.length > 0 && (
                  <Button danger>批量删除</Button>
                )}
                <Button type="primary" icon={<PlusOutlined />}>
                  新建
                </Button>
              </div>
            </div>
            <div className="select-all-row" style={{ display: 'flex', alignItems: 'center', padding: '12px 0', margin: 0 }}>
              <Checkbox
                checked={isAllChecked}
                indeterminate={isIndeterminate}
                onChange={toggleAll}
                style={{ marginRight: 8 }}
              />
              <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>全选</span>
            </div>
          </>
        }
        className="ds-list-card"
        dataSource={orderedData}
        renderItem={(item) => (
          <List.Item
            className="list-item-hover"
            onClick={() => toggleSelect(item.title)}
            style={{ cursor: 'pointer', padding: '12px 0' }}
            actions={[
              <Button type="text" size="small" key="invite" onClick={(e) => e.stopPropagation()} className="list-text-btn" style={{ marginLeft: 16 }}>邀请</Button>,
              <Button type="text" size="small" key="publish" onClick={(e) => e.stopPropagation()} className="list-text-btn">发布</Button>,
            ]}
          >
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Checkbox
                checked={selectedKeys.includes(item.title)}
                indeterminate={false}
                onChange={() => toggleSelect(item.title)}
                onClick={(e) => e.stopPropagation()}
                style={{ marginRight: 12 }}
              />
              <Avatar
                src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
                style={{ marginRight: 16 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: 'var(--color-text-tertiary)', fontSize: 14 }}>{item.desc}</div>
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 200 }}>
                  <div style={{ marginBottom: 4 }}>{item.progress === 100 ? '已完成' : '发布中'}</div>
                  <Progress
                    percent={item.progress}
                    size="small"
                    strokeColor={item.progress === 100 ? 'var(--color-success)' : 'var(--color-primary)'}
                    format={(percent) => `${percent}%`}
                  />
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
