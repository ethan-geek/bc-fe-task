// src/components/MemberTable/FilterDropdown.tsx
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import './styles.css';

interface FilterDropdownProps {
  values: string[];
  selectedKeys: React.Key[];
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  confirm: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  values,
  selectedKeys,
  setSelectedKeys,
  confirm,
}) => {
  const handleChange = (value: string) => (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    const newKeys = checked
      ? [...selectedKeys, value]
      : selectedKeys.filter((k) => k !== value);
    setSelectedKeys(newKeys);
    confirm();
  };

  return (
    <div className="custom-filter-dropdown">
      {values.map((value) => (
        <Checkbox
          key={value}
          checked={selectedKeys.includes(value)}
          onChange={handleChange(value)}
          className="filter-checkbox"
        >
          {value}
        </Checkbox>
      ))}
    </div>
  );
};

export default FilterDropdown;
