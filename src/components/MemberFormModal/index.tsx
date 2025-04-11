import { useEffect } from 'react';
import { Form } from 'antd';
import BaseModal from '../BaseModal';
import FieldInput from '../FieldInput';
import { IMember, fields } from '../../types';
import moment, { Moment } from 'moment';
import './styles.css';

interface MemberFormModalProps {
  open: boolean;
  mode: 'add' | 'edit';
  initialValues?: IMember | null;
  onSave: (member: Omit<IMember, 'id'>) => void;
  onCancel: () => void;
}

const MemberFormModal: React.FC<MemberFormModalProps> = ({
  open,
  mode,
  initialValues,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();

  // 모달이 열릴 때마다 폼 초기값 설정
  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        joinDate: initialValues.joinDate
          ? moment(initialValues.joinDate)
          : null,
      });
    } else if (!open) {
      // 모달이 닫히면 폼 리셋
      form.resetFields();
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // moment -> string 변환
      const memberData: Omit<IMember, 'id'> = {
        ...values,
        joinDate: values.joinDate
          ? values.joinDate.format('YYYY-MM-DD')
          : moment().format('YYYY-MM-DD'),
      };
      onSave(memberData);
      form.resetFields();
    } catch (err) {
      console.error('Form validation failed:', err);
    }
  };

  return (
    <BaseModal
      open={open}
      title={mode === 'add' ? '회원 추가' : '회원 수정'}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        {fields.map((field) => (
          <Form.Item
            key={field.key}
            name={field.key}
            label={field.label}
            className={field.label === 'Action' ? 'form-item-job' : ''}
            rules={[
              {
                required: field.required,
                message: `${field.label}은 필수입니다`,
              },
              ...(field.maxLength
                ? [
                    {
                      max: field.maxLength,
                      message: `${field.label}은 최대 ${field.maxLength}자까지 입력 가능합니다`,
                    },
                  ]
                : []),
            ]}
          >
            <FieldInput<Moment> field={field} />
          </Form.Item>
        ))}
      </Form>
    </BaseModal>
  );
};

export default MemberFormModal;
