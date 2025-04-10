import { Input, DatePicker, Select, Checkbox } from 'antd';
import { IField } from '../../types';
import { Moment } from 'moment';

interface FieldInputProps<T> {
  id: string;
  field: IField;
  value?: T;
  onChange?: (value: T) => void;
}

const FieldInput = <T,>({ id, field, value, onChange }: FieldInputProps<T>) => {
  switch (field.type) {
    case 'text':
      return (
        <Input
          id={id}
          value={value as string}
          onChange={(e) => onChange?.(e.target.value as T)}
          maxLength={field.maxLength}
        />
      );
    case 'textarea':
      return (
        <Input.TextArea
          id={id}
          value={value as string}
          onChange={(e) => onChange?.(e.target.value as T)}
          maxLength={field.maxLength}
        />
      );
    case 'date':
      return (
        <DatePicker
          id={id}
          value={(value as Moment) ?? null}
          onChange={(date) => onChange?.(date as T)}
          format="YYYY-MM-DD"
        />
      );
    case 'select':
      return (
        <Select
          id={id}
          value={value as string}
          onChange={(val) => onChange?.(val as T)}
          options={field.options?.map((opt) => ({ label: opt, value: opt }))}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          id={id}
          checked={value as boolean}
          onChange={(e) => onChange?.(e.target.checked as T)}
        />
      );
    default:
      return null;
  }
};

export default FieldInput;
