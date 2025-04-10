import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { vi } from 'vitest';

const mockOnConfirm = vi.fn();
const mockOnCancel = vi.fn();

describe('DeleteConfirmModal', () => {
  it('모달이 올바른 내용을 표시해야 합니다', () => {
    render(
      <DeleteConfirmModal
        open={true}
        name="John Doe"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText('회원 삭제')).toBeInTheDocument();
    expect(
      screen.getByText('"John Doe" 회원을 삭제하시겠습니까?')
    ).toBeInTheDocument();
  });

  it('삭제 버튼 클릭 시 onConfirm 콜백이 호출되어야 합니다', async () => {
    render(
      <DeleteConfirmModal
        open={true}
        name="John Doe"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('회원 삭제')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: '삭제' }));

    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('취소 버튼 클릭 시 onCancel 콜백이 호출되어야 합니다', async () => {
    render(
      <DeleteConfirmModal
        open={true}
        name="John Doe"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('회원 삭제')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: '취소' }));

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
