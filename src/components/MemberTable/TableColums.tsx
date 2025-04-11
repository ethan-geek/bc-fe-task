// src/components/MemberTable/columns.ts
import { IMember } from '../../types';
import type { Key, ColumnType } from 'antd/es/table/interface';
import { Checkbox, Button, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import FilterDropdown from './FilterDropdown';
import FilterIcon from './FilterIcon';
import { CalendarOutlined, DownOutlined } from '@ant-design/icons';

// 고유 값을 추출하는 유틸리티 함수
const getUniqueMemberFieldValues = (
  members: IMember[],
  key: keyof IMember
): string[] => {
  const values = members.map((member) => String(member[key] ?? ''));
  return [...new Set(values)].filter((value) => value !== '');
};

const createFilterFunction = (key: keyof IMember) => {
  return (value: boolean | Key, member: IMember) =>
    String(member[key] ?? '') === String(value);
};

// columns 정의
export const TableColumns = (
  members: IMember[],
  onEdit: (member: IMember) => void,
  onDelete: (id: string) => void
): ColumnType<IMember>[] => {
  const uniqueNames = getUniqueMemberFieldValues(members, 'name');
  const uniqueAddresses = getUniqueMemberFieldValues(members, 'address');
  const uniqueMemos = getUniqueMemberFieldValues(members, 'memo');
  const uniqueJoinDates = getUniqueMemberFieldValues(members, 'joinDate');
  const uniqueJobs = getUniqueMemberFieldValues(members, 'job');

  return [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      onFilter: createFilterFunction('name'),
      filterDropdown: (props) => (
        <FilterDropdown values={uniqueNames} {...props} />
      ),
      filterIcon: (filtered) => <FilterIcon active={filtered} />,
    },
    {
      title: '주소',
      dataIndex: 'address',
      key: 'address',
      width: 240,
      onFilter: createFilterFunction('address'),
      filterDropdown: (props) => (
        <FilterDropdown values={uniqueAddresses} {...props} />
      ),
      filterIcon: (filtered) => <FilterIcon active={filtered} />,
    },
    {
      title: '메모',
      dataIndex: 'memo',
      key: 'memo',
      width: 240,
      onFilter: createFilterFunction('memo'),
      filterDropdown: (props) => (
        <FilterDropdown values={uniqueMemos} {...props} />
      ),
      filterIcon: (filtered) => <FilterIcon active={filtered} />,
    },
    {
      title: '가입일',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 180,
      onFilter: createFilterFunction('joinDate'),
      filterDropdown: (props) => (
        <FilterDropdown values={uniqueJoinDates} {...props} />
      ),
      filterIcon: (filtered) => <FilterIcon active={filtered} />,
      render: (value: string) => (
        <div className="readonly-datepicker">
          <span>{value}</span>
          <CalendarOutlined className="readonly-icon" />
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'job',
      key: 'job',
      width: 180,
      onFilter: createFilterFunction('job'),
      filterDropdown: (props) => (
        <FilterDropdown values={uniqueJobs} {...props} />
      ),
      filterIcon: (filtered) => <FilterIcon active={filtered} />,
      render: (value: string | undefined) => (
        <div className="readonly-selectbox">
          <span>{value}</span>
          <DownOutlined className="readonly-icon" />
        </div>
      ),
    },
    {
      title: '이메일 수신 동의',
      dataIndex: 'emailConsent',
      key: 'emailConsent',
      width: 140,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <FilterDropdown
          values={['예', '아니오']}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          confirm={confirm}
        />
      ),
      onFilter: (value, record) =>
        String(record.emailConsent) === (value === '예' ? 'true' : 'false'),
      render: (value: boolean) => (
        <Checkbox checked={value} disabled style={{ margin: 0 }} />
      ),
      filterIcon: (filtered) => <FilterIcon active={filtered} />,
    },
    {
      title: '',
      key: 'action',
      width: 68,
      render: (_value: unknown, member: IMember) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: <span className="dropdown-item">수정</span>,
                onClick: () => onEdit(member),
              },
              {
                key: 'delete',
                label: <span className="dropdown-item danger">삭제</span>,
                onClick: () => onDelete(member.id),
              },
            ],
          }}
          trigger={['click']}
          placement="bottomRight"
          overlayClassName="custom-action-dropdown"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
};
