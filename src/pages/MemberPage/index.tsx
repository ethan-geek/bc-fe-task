import { useState } from 'react';
import { Button } from 'antd';
import MemberTable from '../../components/MemberTable';
import MemberFormModal from '../../components/MemberFormModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import { IMember, initialMembers } from '../../types';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

import { useMembers } from '../../hooks/useMembers';

import './styles.css';

interface MemberPageProps {
  initial?: IMember[];
}

const MemberPage: React.FC<MemberPageProps> = ({
  initial = initialMembers,
}) => {
  const { members, addMember, updateMember, removeMember } =
    useMembers(initial);
  const [isMemberFormOpen, setMemberFormOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberBeingEdited, setMemberBeingEdited] = useState<IMember | null>(
    null
  );
  const [memberIdToDelete, setMemberIdToDelete] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleMemberSave = (member: IMember) => {
    if (memberBeingEdited) {
      updateMember({ ...member, id: memberBeingEdited.id });
    } else {
      addMember({ ...member, id: uuidv4() });
    }
    setMemberFormOpen(false);
    setMemberBeingEdited(null);
  };

  const handleDeleteConfirm = () => {
    if (memberIdToDelete) {
      removeMember(memberIdToDelete);
      setDeleteModalOpen(false);
      setMemberIdToDelete(null);
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
          onClick={() => setMemberFormOpen(true)}
          icon={<PlusOutlined />}
          className="add-button"
          aria-label="회원 추가"
        >
          추가
        </Button>
      </div>
      <MemberTable
        members={members}
        rowSelection={rowSelection}
        onEdit={(member) => {
          setMemberBeingEdited(member);
          setMemberFormOpen(true);
        }}
        onDelete={(id) => {
          setMemberIdToDelete(id);
          setDeleteModalOpen(true);
        }}
      />
      <MemberFormModal
        open={isMemberFormOpen}
        mode={memberBeingEdited ? 'edit' : 'add'}
        initialValues={memberBeingEdited}
        onSave={handleMemberSave}
        onCancel={() => {
          setMemberFormOpen(false);
          setMemberBeingEdited(null);
        }}
      />
      <DeleteConfirmModal
        open={isDeleteModalOpen}
        name={members.find((m) => m.id === memberIdToDelete)?.name || ''}
        onDeleteConfirm={handleDeleteConfirm}
        onDeleteCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default MemberPage;
