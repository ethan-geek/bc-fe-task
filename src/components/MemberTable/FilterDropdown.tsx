// src/components/MemberTable/FilterDropdown.tsx
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import './filterDropdown.css';

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
  // const handleClick = (value: string) => {
  //   const alreadySelected = selectedKeys.includes(value);
  //   const nextKeys = alreadySelected
  //     ? selectedKeys.filter((k) => k !== value)
  //     : [value];

  //   setSelectedKeys(nextKeys);
  //   confirm();
  // };

  // return (
  //   <div className="custom-filter-dropdown">
  //     {values.map((value) => {
  //       const isSelected = selectedKeys.includes(value);
  //       return (
  //         <div
  //           key={value}
  //           className={`custom-filter-item ${isSelected ? 'active' : ''}`}
  //           onClick={() => handleClick(value)}
  //         >
  //           <span className="checkbox" />
  //           <span className="label">{value}</span>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

  const handleChange = (value: string) => (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    const newKeys = checked
      ? [...selectedKeys, value]
      : selectedKeys.filter((k) => k !== value);
    setSelectedKeys(newKeys);
    confirm(); // 선택 즉시 반영
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
