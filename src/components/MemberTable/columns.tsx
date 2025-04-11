// src/components/MemberTable/columns.ts
import { IMember } from '../../types';
import type { Key, ColumnType } from 'antd/es/table/interface';
import { Checkbox, Button, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

// 고유 값을 추출하는 유틸리티 함수
const getUniqueMemberFieldValues = (
  members: IMember[],
  key: keyof IMember
): string[] => {
  const values = members.map((member) => String(member[key] ?? ''));
  return [...new Set(values)].filter((value) => value !== '');
};

// 필터 아이템 생성 함수
const createFilters = (values: string[]) => {
  return values.map((value) => ({ text: value, value }));
};

// 필터 함수 생성
const createFilterFunction = (key: keyof IMember) => {
  return (value: boolean | Key, member: IMember) =>
    String(member[key] ?? '') === String(value);
};

// columns 정의
export const getColumns = (
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
      filters: createFilters(uniqueNames),
      onFilter: createFilterFunction('name'),
    },
    {
      title: '주소',
      dataIndex: 'address',
      key: 'address',
      width: 249,
      filters: createFilters(uniqueAddresses),
      onFilter: createFilterFunction('address'),
    },
    {
      title: '메모',
      dataIndex: 'memo',
      key: 'memo',
      width: 249,
      filters: createFilters(uniqueMemos),
      onFilter: createFilterFunction('memo'),
    },
    {
      title: '가입일',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 200,
      filters: createFilters(uniqueJoinDates),
      onFilter: createFilterFunction('joinDate'),
    },
    {
      title: '직업',
      dataIndex: 'job',
      key: 'job',
      width: 249,
      filters: createFilters(uniqueJobs),
      onFilter: createFilterFunction('job'),
      render: (value: string | undefined) => value ?? '',
    },
    {
      title: '이메일 수신 동의',
      dataIndex: 'emailConsent',
      key: 'emailConsent',
      width: 150,
      render: (value: boolean) => (
        <Checkbox checked={value} disabled style={{ margin: 0 }} />
      ),
      filters: [
        { text: '예', value: true },
        { text: '아니오', value: false },
      ],
      onFilter: createFilterFunction('emailConsent'),
    },
    {
      title: '액션',
      key: 'action',
      width: 68,
      render: (_value: unknown, member: IMember) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: '수정',
                onClick: () => onEdit(member),
              },
              {
                key: 'delete',
                label: '삭제',
                onClick: () => onDelete(member.id),
              },
            ],
          }}
        >
          <Button type="text">
            <MoreOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];
};
