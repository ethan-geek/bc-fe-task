import { useState } from 'react';
import { Button } from 'antd';
import MemberTable from '../../components/MemberTable';
import MemberFormModal from '../../components/MemberFormModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import { IMember, initialMembers } from '../../types';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

import { useMembers } from '../../hooks/useMembers';
import { useModal } from '../../hooks/useModal';

import './styles.css';

interface MemberPageProps {
  initial?: IMember[];
}

const MemberPage: React.FC<MemberPageProps> = ({
  initial = initialMembers,
}) => {
  const { members, addMember, updateMember, removeMember } =
    useMembers(initial);

  const createOrEditModal = useModal();
  const deleteModal = useModal();

  const [memberBeingEdited, setMemberBeingEdited] = useState<IMember | null>(
    null
  );
  const [memberIdToDelete, setMemberIdToDelete] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys as string[]);
    },
  };

  const handleCreateNew = () => {
    setMemberBeingEdited(null);
    createOrEditModal.openModal();
  };

  const handleEdit = (member: IMember) => {
    setMemberBeingEdited(member);
    createOrEditModal.openModal();
  };

  const handleDelete = (id: string) => {
    setMemberIdToDelete(id);
    deleteModal.openModal();
  };

  const handleDeleteCancel = () => {
    deleteModal.closeModal();
    setMemberIdToDelete(null);
  };

  const handleMemberSave = (member: Omit<IMember, 'id'>) => {
    if (memberBeingEdited) {
      updateMember({ ...member, id: memberBeingEdited.id });
    } else {
      addMember({ ...member, id: uuidv4() });
    }
    createOrEditModal.closeModal();
    setMemberBeingEdited(null);
  };

  const handleDeleteConfirm = () => {
    if (memberIdToDelete) {
      removeMember(memberIdToDelete);
      deleteModal.closeModal();
      setMemberIdToDelete(null);
    }
  };

  return (
    <div className="member-page-container">
      <div className="header-container">
        <h1 className="header-title">회원 목록</h1>
        <Button
          type="primary"
          onClick={handleCreateNew}
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
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <MemberFormModal
        open={createOrEditModal.isOpen}
        mode={memberBeingEdited ? 'edit' : 'add'}
        initialValues={memberBeingEdited}
        onSave={handleMemberSave}
        onCancel={() => {
          createOrEditModal.closeModal();
          setMemberBeingEdited(null);
        }}
      />
      <DeleteConfirmModal
        open={deleteModal.isOpen}
        name={members.find((m) => m.id === memberIdToDelete)?.name || ''}
        onDeleteConfirm={handleDeleteConfirm}
        onDeleteCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default MemberPage;
