import { Modal, Button } from 'antd';

interface BaseModalProps {
  open: boolean;
  title: string;
  onOk: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
  okText?: string;
  cancelText?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  title,
  onOk,
  onCancel,
  children,
  okText = '저장',
  cancelText = '취소',
}) => (
  <Modal
    open={open}
    title={title}
    onOk={onOk}
    onCancel={onCancel}
    footer={[
      <Button key="cancel" className="btn-cancel" onClick={onCancel}>
        {cancelText}
      </Button>,
      <Button key="ok" type="primary" onClick={onOk}>
        {okText}
      </Button>,
    ]}
  >
    {children}
  </Modal>
);

export default BaseModal;
