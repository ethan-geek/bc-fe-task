import BaseModal from '../BaseModal';

interface DeleteConfirmModalProps {
  open: boolean;
  name: string;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  name,
  onDeleteConfirm,
  onDeleteCancel,
}) => (
  <BaseModal
    open={open}
    title="회원 삭제"
    onOk={onDeleteConfirm}
    onCancel={onDeleteCancel}
    okText="삭제"
    cancelText="취소"
  >
    <p>{`"${name}" 회원을 삭제하시겠습니까?`}</p>
  </BaseModal>
);

export default DeleteConfirmModal;
