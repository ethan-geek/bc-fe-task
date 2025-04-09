// src/components/MemberTable/columns.ts
import { IMember } from '../../types';
import type { Key, ColumnType } from 'antd/es/table/interface';
import { Checkbox, Button, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

// 고유 값을 추출하는 유틸리티 함수
const getUniqueValues = (members: IMember[], key: keyof IMember): string[] => {
  const values = members.map((member) => String(member[key] ?? ''));
  return [...new Set(values)].filter((value) => value !== '');
};

// columns 정의
export const getColumns = (
  members: IMember[],
  onEdit: (member: IMember) => void,
  onDelete: (id: string) => void
): ColumnType<IMember>[] => {
  const uniqueNames = getUniqueValues(members, 'name');
  const uniqueAddresses = getUniqueValues(members, 'address');
  const uniqueMemos = getUniqueValues(members, 'memo');
  const uniqueJoinDates = getUniqueValues(members, 'joinDate');
  const uniqueJobs = getUniqueValues(members, 'job');

  return [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      filters: uniqueNames.map((name) => ({ text: name, value: name })),
      onFilter: (value: boolean | Key, member: IMember) =>
        member.name === String(value),
    },
    {
      title: '주소',
      dataIndex: 'address',
      key: 'address',
      width: 249,
      filters: uniqueAddresses.map((address) => ({
        text: address,
        value: address,
      })),
      onFilter: (value: boolean | Key, member: IMember) =>
        member.address === String(value),
    },
    {
      title: '메모',
      dataIndex: 'memo',
      key: 'memo',
      width: 249,
      filters: uniqueMemos.map((memo) => ({ text: memo, value: memo })),
      onFilter: (value: boolean | Key, member: IMember) =>
        member.memo === String(value),
    },
    {
      title: '가입일',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 200,
      filters: uniqueJoinDates.map((date) => ({ text: date, value: date })),
      onFilter: (value: boolean | Key, member: IMember) =>
        member.joinDate === String(value),
    },
    {
      title: '직업',
      dataIndex: 'job',
      key: 'job',
      width: 249,
      filters: uniqueJobs.map((job) => ({ text: job, value: job })),
      onFilter: (value: boolean | Key, member: IMember) =>
        member.job === String(value),
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
      onFilter: (value: boolean | Key, member: IMember) =>
        member.emailConsent === value,
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
