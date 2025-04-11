import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemberFormModal from '../components/MemberFormModal';
import { IMember } from '../types';

import { vi } from 'vitest';

beforeAll(() => {
  // JSDOM 환경에서 getComputedStyle 에러 방지용 설정
  window.getComputedStyle = () =>
    ({
      getPropertyValue: () => '',
    }) as unknown as CSSStyleDeclaration;
});

const mockMember: IMember = {
  id: '1',
  name: 'John Doe',
  address: '서울 강남구',
  memo: '외국인',
  joinDate: '2024-10-02',
  job: '개발자',
  emailConsent: true,
};

const mockOnSave = vi.fn();
const mockOnCancel = vi.fn();

describe('MemberFormModal', () => {
  it('추가 모달이 정상적으로 렌더링되어야 합니다', async () => {
    render(
      <MemberFormModal
        open={true}
        mode="add"
        initialValues={null}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('회원 추가')).toBeInTheDocument();
    });

    expect(screen.getByLabelText('이름')).toBeInTheDocument();
    expect(screen.getByLabelText('주소')).toBeInTheDocument();
    expect(screen.getByLabelText('메모')).toBeInTheDocument();
    expect(screen.getByLabelText('가입일')).toBeInTheDocument();
    expect(screen.getByLabelText('Action')).toBeInTheDocument();
    expect(screen.getByLabelText('이메일 수신 동의')).toBeInTheDocument();
  });

  it('수정 모달이 초기값과 함께 정상적으로 렌더링되어야 합니다', async () => {
    render(
      <MemberFormModal
        open={true}
        mode="edit"
        initialValues={mockMember}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('회원 수정')).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('서울 강남구')).toBeInTheDocument();
    expect(screen.getByDisplayValue('외국인')).toBeInTheDocument();
    expect(screen.queryByText('개발자')).toBeInTheDocument(); // value 대신 내부 텍스트로 검사
    expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument();
  });

  it('취소 버튼 클릭 시 onCancel 콜백이 호출되어야 합니다', async () => {
    const user = userEvent.setup();

    render(
      <MemberFormModal
        open={true}
        mode="add"
        initialValues={null}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('회원 추가')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: '취소' }));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
