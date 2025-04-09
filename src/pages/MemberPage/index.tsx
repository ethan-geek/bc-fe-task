import { useState } from 'react';
import { Button } from 'antd';
import MemberTable from '../../components/MemberTable';
import MemberFormModal from '../../components/MemberFormModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import { IMember, initialMembers } from '../../types';
import { PlusOutlined } from '@ant-design/icons';
import './styles.css';

// 테스트용 더미 데이터 추가
// const testMembers: IMember[] = Array.from({ length: 20 }, (_, index) => ({
//   id: String(index + 3),
//   name: `Member ${index + 3}`,
//   address: `주소 ${index + 3}`,
//   memo: `메모 ${index + 3}`,
//   joinDate: '2024-10-03',
//   job: index % 3 === 0 ? '개발자' : index % 3 === 1 ? 'PO' : '디자이너',
//   emailConsent: index % 2 === 0,
// }));

const allMembers = [...initialMembers];

const MemberPage: React.FC = () => {
  const [members, setMembers] = useState<IMember[]>(allMembers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editMember, setEditMember] = useState<IMember | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleSave = (member: IMember) => {
    if (editMember) {
      setMembers(members.map((m) => (m.id === member.id ? member : m)));
    } else {
      setMembers([member, ...members]);
    }
    setIsFormOpen(false);
    setEditMember(null);
  };

  const handleDelete = () => {
    if (deleteId) {
      setMembers(members.filter((m) => m.id !== deleteId));
      setIsDeleteOpen(false);
      setDeleteId(null);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys as string[]);
    },
  };

  return (
    <div className="member-page-container">
      <div className="header-container">
        <h1 className="header-title">회원 목록</h1>
        <Button
          type="primary"
          onClick={() => setIsFormOpen(true)}
          icon={<PlusOutlined />}
          className="add-button"
        >
          추가
        </Button>
      </div>
      <MemberTable
        members={members}
        rowSelection={rowSelection}
        onEdit={(member) => {
          setEditMember(member);
          setIsFormOpen(true);
        }}
        onDelete={(id) => {
          setDeleteId(id);
          setIsDeleteOpen(true);
        }}
      />
      <MemberFormModal
        open={isFormOpen}
        mode={editMember ? 'edit' : 'add'}
        initialValues={editMember}
        onSave={handleSave}
        onCancel={() => {
          setIsFormOpen(false);
          setEditMember(null);
        }}
      />
      <DeleteConfirmModal
        open={isDeleteOpen}
        name={members.find((m) => m.id === deleteId)?.name || ''}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </div>
  );
};

export default MemberPage;
