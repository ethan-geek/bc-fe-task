import { Input, DatePicker, Select, Checkbox } from 'antd';
import { IField } from '../../types';
import { Moment } from 'moment';

interface FieldInputProps<T> {
  field: IField;
  value?: T;
  onChange?: (value: T) => void;
}

const FieldInput = <T,>({ field, value, onChange }: FieldInputProps<T>) => {
  switch (field.type) {
    case 'text':
      return (
        <Input
          value={value as string}
          onChange={(e) => onChange?.(e.target.value as T)}
          maxLength={field.maxLength}
        />
      );
    case 'textarea':
      return (
        <Input.TextArea
          value={value as string}
          onChange={(e) => onChange?.(e.target.value as T)}
          maxLength={field.maxLength}
        />
      );
    case 'date':
      return (
        <DatePicker
          value={value as Moment}
          onChange={(date) => onChange?.(date as T)}
          format="YYYY-MM-DD"
        />
      );
    case 'select':
      return (
        <Select
          value={value as string}
          onChange={(val) => onChange?.(val as T)}
          options={field.options?.map((opt) => ({ label: opt, value: opt }))}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          checked={value as boolean}
          onChange={(e) => onChange?.(e.target.checked as T)}
        />
      );
    default:
      return null;
  }
};

export default FieldInput;
