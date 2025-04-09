import BaseModal from '../BaseModal';

interface DeleteConfirmModalProps {
  open: boolean;
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  name,
  onConfirm,
  onCancel,
}) => (
  <BaseModal
    open={open}
    title="회원 삭제"
    onOk={onConfirm}
    onCancel={onCancel}
    okText="삭제"
    cancelText="취소"
  >
    <p>{`"${name}" 회원을 삭제하시겠습니까?`}</p>
  </BaseModal>
);

export default DeleteConfirmModal;
