import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemberTable from '../components/MemberTable';
import { IMember } from '../types';
import { vi } from 'vitest';

const mockMembers: IMember[] = [
  {
    id: '1',
    name: 'John Doe',
    address: '서울 강남구',
    memo: '외국인',
    joinDate: '2024-10-02',
    job: '개발자',
    emailConsent: true,
  },
  {
    id: '2',
    name: 'Foo Bar',
    address: '서울 서초구',
    memo: '한국인',
    joinDate: '2024-10-01',
    job: 'PO',
    emailConsent: false,
  },
];

const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();

describe('MemberTable', () => {
  const defaultProps = {
    members: mockMembers,
    rowSelection: {
      selectedRowKeys: [],
      onChange: vi.fn(),
    },
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
  };

  it('테이블이 모든 회원 데이터를 정확히 렌더링해야 합니다', () => {
    render(<MemberTable {...defaultProps} />);

    // 테이블 헤더가 정상적으로 렌더링되어야 합니다.
    expect(screen.getByText('이름')).toBeInTheDocument();
    expect(screen.getByText('주소')).toBeInTheDocument();
    expect(screen.getByText('메모')).toBeInTheDocument();
    expect(screen.getByText('가입일')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('이메일 수신 동의')).toBeInTheDocument();
    expect(screen.getByText('액션')).toBeInTheDocument();

    // 각 회원 데이터가 테이블에 표시되어야 합니다.
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('서울 강남구')).toBeInTheDocument();
    expect(screen.getByText('외국인')).toBeInTheDocument();
    expect(screen.getByText('2024-10-02')).toBeInTheDocument();
    expect(screen.getByText('개발자')).toBeInTheDocument();

    expect(screen.getByText('Foo Bar')).toBeInTheDocument();
    expect(screen.getByText('서울 서초구')).toBeInTheDocument();
    expect(screen.getByText('한국인')).toBeInTheDocument();
    expect(screen.getByText('2024-10-01')).toBeInTheDocument();
    expect(screen.getByText('PO')).toBeInTheDocument();
  });

  it('이름으로 회원을 필터링할 수 있어야 합니다', async () => {
    render(<MemberTable {...defaultProps} />);

    // 필터 버튼은 ant-table-filter-trigger 클래스를 가짐
    const filterButtonContainer = await waitFor(() =>
      document.querySelector('.ant-table-filter-trigger')
    );

    if (!filterButtonContainer) {
      throw new Error('필터 버튼을 찾을 수 없습니다');
    }

    // 필터 버튼 내부에서 role="img"와 aria-label="filter"를 가진 요소 찾기
    const filterButton = within(
      filterButtonContainer as HTMLElement
    ).getByLabelText('filter');

    await userEvent.click(filterButton);

    const dropdown = await waitFor(() =>
      document.querySelector('.ant-dropdown')
    );
    if (!dropdown) throw new Error('Filter dropdown not found');

    const johnDoeOption = within(dropdown as HTMLElement).getByText('John Doe');
    await userEvent.click(johnDoeOption);

    const confirmButton = within(dropdown as HTMLElement).queryByRole(
      'button',
      { name: /저장|OK/i }
    );
    if (confirmButton) {
      await userEvent.click(confirmButton);
    }

    const tableBody = document.querySelector('.ant-table-tbody');
    if (!tableBody) throw new Error('Table body not found');

    expect(
      within(tableBody as HTMLElement).getByText('John Doe')
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(
        within(tableBody as HTMLElement).queryByText('Foo Bar')
      ).not.toBeInTheDocument()
    );
  });

  it('수정 버튼 클릭 시 onEdit 콜백이 호출되어야 합니다', async () => {
    render(<MemberTable {...defaultProps} />);

    const actionButtons = screen.getAllByRole('button', { name: /more/i });
    await userEvent.click(actionButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('수정')).toBeInTheDocument();
    });

    const editButton = await screen.getByText('수정');
    await userEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockMembers[0]);
  });

  it('삭제 버튼 클릭 시 onDelete 콜백이 호출되어야 합니다', async () => {
    render(<MemberTable {...defaultProps} />);

    const actionButtons = screen.getAllByRole('button', { name: /more/i });
    await userEvent.click(actionButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('삭제')).toBeInTheDocument();
    });

    const deleteButton = await screen.getByText('삭제');
    await userEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});
