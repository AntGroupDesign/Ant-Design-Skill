import { useState } from 'react';
import { List, Tag, Button, Avatar, Input, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../references/global-style.css';

const editListDefault = [
  { id: '1', name: '智慧零售平台', image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', desc: '我是一条测试的描述' },
  { id: '2', name: 'Ant Design', image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', desc: '我是一条测试的描述' },
  { id: '3', name: '云原生微服务框架', image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg', desc: '我是一条测试的描述' },
];

export default function EditList() {
  const [data, setData] = useState(editListDefault);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', desc: '' });

  const startEdit = (item: (typeof editListDefault)[0]) => {
    setEditingId(item.id);
    setEditForm({ name: item.name, desc: item.desc });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', desc: '' });
  };

  const saveEdit = (id: string) => {
    setData((prev) => prev.map((item) => (item.id === id ? { ...item, ...editForm } : item)));
    setEditingId(null);
    setEditForm({ name: '', desc: '' });
    message.success('保存成功');
  };

  const confirmDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditForm({ name: '', desc: '' });
    }
    message.success('删除成功');
  };

  return (
    <div>
      <List
        header={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
            <span style={{ fontSize: 16, fontWeight: 500 }}>可编辑列表</span>
            <Button type="primary" icon={<PlusOutlined />}>
              新建
            </Button>
          </div>
        }
        className="list-surface-card"
        dataSource={data}
        renderItem={(item) => {
          const isEditing = editingId === item.id;
          return (
            <List.Item
              className="list-item-hover"
              actions={
                isEditing
                  ? [
                      <Button type="text" size="small" key="save" onClick={() => saveEdit(item.id)} className="list-text-btn" style={{ marginLeft: 16 }}>保存</Button>,
                      <Button type="text" size="small" key="cancel" onClick={cancelEdit} className="list-text-btn">取消</Button>,
                      <Popconfirm
                        key="delete"
                        title="确定删除此项？"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => confirmDelete(item.id)}
                      >
                        <Button type="text" size="small" danger className="list-text-btn">删除</Button>
                      </Popconfirm>,
                    ]
                  : [
                      <Button type="text" size="small" key="edit" onClick={() => startEdit(item)} className="list-text-btn" style={{ marginLeft: 16 }}>编辑</Button>,
                      <Popconfirm
                        key="delete"
                        title="确定删除此项？"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => confirmDelete(item.id)}
                      >
                        <Button type="text" size="small" danger className="list-text-btn">删除</Button>
                      </Popconfirm>,
                    ]
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isEditing ? (
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        style={{ width: 200 }}
                      />
                    ) : (
                      item.name
                    )}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <Tag color="processing" style={{ borderRadius: 6, fontWeight: 'normal', marginRight: 0 }}>Ant Design</Tag>
                      <Tag color="success" style={{ borderRadius: 6, fontWeight: 'normal', marginRight: 0 }}>可视化</Tag>
                    </div>
                  </div>
                }
                description={
                  isEditing ? (
                    <Input.TextArea
                      className="edit-desc-textarea"
                      value={editForm.desc}
                      onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
                      rows={2}
                      style={{ marginTop: 8 }}
                    />
                  ) : (
                    item.desc
                  )
                }
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
}
