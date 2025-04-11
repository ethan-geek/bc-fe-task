// src/components/MemberTable/FilterIcon.tsx
import React from 'react';

interface FilterIconProps {
  active?: boolean;
  className?: string;
}

const FilterIcon: React.FC<FilterIconProps> = ({
  active = false,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 12 12"
      className={`filter-icon ${active ? 'active' : ''} ${className ?? ''}`}
    >
      <path d="M4.09 9.82c0 .208.166.375.372.375h3.075a.373.373 0 0 0 .373-.375V7.523H4.09zm6.224-8.015H1.686a.375.375 0 0 0-.322.562l2.593 4.406h4.088l2.593-4.406a.376.376 0 0 0-.324-.562" />
    </svg>
  );
};

export default FilterIcon;
