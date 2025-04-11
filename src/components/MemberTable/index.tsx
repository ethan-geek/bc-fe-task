// src/components/MemberTable.tsx
import { useMemo } from 'react';
import { Table } from 'antd';
import { IMember } from '../../types';
import { getColumns } from './columns';
import './styles.css';

interface MemberTableProps {
  members: IMember[];
  rowSelection: {
    selectedRowKeys: string[];
    onChange: (selectedKeys: React.Key[]) => void;
  };
  onEdit: (member: IMember) => void;
  onDelete: (id: string) => void;
}

const MemberTable: React.FC<MemberTableProps> = ({
  members,
  rowSelection,
  onEdit,
  onDelete,
}) => {
  const columns = useMemo(
    () => getColumns(members, onEdit, onDelete),
    [members, onEdit, onDelete]
  );

  return (
    <Table
      className="custom-table"
      dataSource={members}
      columns={columns}
      rowKey="id"
      rowSelection={rowSelection}
      pagination={false}
      scroll={{ x: 1297, y: 'calc(100vh - 48px - 38px)' }}
    />
  );
};

export default MemberTable;
