import React, { useCallback, useContext, useMemo } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, ConfigProvider, Table } from 'antd';
import type { TableColumnsType } from 'antd';

import '../../references/global-style.css';

const tableTheme = {
  token: {
    fontSize: 14,
    colorPrimary: '#1677ff',
    borderRadius: 8,
    borderRadiusLG: 8,
  },
  components: {
    Table: {
      headerBg: '#fafafa',
      headerHoverBg: '#fafafa',
    },
  },
};

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const columns: TableColumnsType<DataType> = [
  { title: '', key: 'sort', align: 'center', width: 48, render: () => <DragHandle /> },
  { title: '姓名', dataIndex: 'name', width: 120 },
  { title: '年龄', dataIndex: 'age', width: 80 },
  { title: '地址', dataIndex: 'address', width: 240 },
];

const initialData: DataType[] = [
  { key: '1', name: '用户A', age: 32, address: '区域A办公点' },
  { key: '2', name: '用户B', age: 42, address: '区域B办公点' },
  { key: '3', name: '用户C', age: 32, address: '区域C办公点' },
];

interface SortableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const SortableRow = React.forwardRef<HTMLTableRowElement, SortableRowProps>((props, ref) => {
  const {
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] });

  const mergedRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      setNodeRef(node);
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref, setNodeRef],
  );

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={mergedRef} style={style} />
    </RowContext.Provider>
  );
});
SortableRow.displayName = 'SortableRow';

interface DraggableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  itemKeys: string[];
  onSortDragEnd: (event: DragEndEvent) => void;
}

const DraggableBody: React.FC<DraggableBodyProps> = ({ itemKeys, onSortDragEnd, ...props }) => (
  <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onSortDragEnd}>
    <SortableContext items={itemKeys} strategy={verticalListSortingStrategy}>
      <tbody {...props} />
    </SortableContext>
  </DndContext>
);

const App: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<DataType[]>(initialData);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.key === active?.id);
        const overIndex = prevState.findIndex((record) => record.key === over?.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  const tableComponents = useMemo(
    () => ({
      body: {
        wrapper: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
          <DraggableBody
            {...props}
            itemKeys={dataSource.map((item) => item.key)}
            onSortDragEnd={onDragEnd}
          />
        ),
        row: SortableRow,
      },
    }),
    [dataSource],
  );

  return (
    <ConfigProvider theme={tableTheme}>
      <div className="ds-page-card ds-table-card-padded">
        <div className="ds-card-title-row">
          <span className="ds-table-title">排序列表</span>
        </div>
        <Table<DataType>
          rowKey="key"
          showHeader
          tableLayout="fixed"
          components={tableComponents}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    </ConfigProvider>
  );
};

export default App;
