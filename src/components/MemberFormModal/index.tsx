import { useEffect, useMemo } from 'react';
import { Form } from 'antd';
import BaseModal from '../BaseModal';
import FieldInput from '../FieldInput';
import { IMember, fields } from '../../types';
import moment, { Moment } from 'moment';
import './styles.css';

// 필드 레이블과 IMember 속성 매핑
const fieldToKeyMap: Record<string, keyof IMember> = {
  이름: 'name',
  주소: 'address',
  메모: 'memo',
  가입일: 'joinDate',
  직업: 'job',
  '이메일 수신 동의': 'emailConsent',
};

interface MemberFormModalProps {
  open: boolean;
  mode: 'add' | 'edit';
  initialValues?: IMember | null;
  onSave: (member: IMember) => void;
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

  const formattedInitialValues = useMemo(() => {
    return initialValues
      ? {
          [fieldToKeyMap['이름']]: initialValues.name,
          [fieldToKeyMap['주소']]: initialValues.address,
          [fieldToKeyMap['메모']]: initialValues.memo,
          [fieldToKeyMap['가입일']]: initialValues.joinDate
            ? moment(initialValues.joinDate)
            : null,
          [fieldToKeyMap['직업']]: initialValues.job,
          [fieldToKeyMap['이메일 수신 동의']]: initialValues.emailConsent,
        }
      : {};
  }, [initialValues]);

  // 모달이 열릴 때마다 폼 초기값 설정
  useEffect(() => {
    if (open) {
      form.setFieldsValue(formattedInitialValues);
    } else {
      form.resetFields();
    }
  }, [open, form, formattedInitialValues]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      // 폼 데이터를 IMember 객체로 변환
      const memberData: IMember = {
        id: initialValues?.id || Date.now().toString(),
        name: values[fieldToKeyMap['이름']] || '',
        address: values[fieldToKeyMap['주소']] || '',
        memo: values[fieldToKeyMap['메모']] || '',
        joinDate: values[fieldToKeyMap['가입일']].format('YYYY-MM-DD'),
        job: values[fieldToKeyMap['직업']] || undefined,
        emailConsent: values[fieldToKeyMap['이메일 수신 동의']] || false,
      };
      onSave(memberData);
      form.resetFields();
    });
  };

  return (
    <BaseModal
      open={open}
      title={mode === 'add' ? '회원 추가' : '회원 수정'}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        initialValues={formattedInitialValues ?? undefined}
        layout="vertical"
      >
        {fields.map((field) => (
          <Form.Item
            key={field.label}
            name={fieldToKeyMap[field.label]}
            label={field.label}
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
