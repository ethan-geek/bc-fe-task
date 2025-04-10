import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import MemberPage from '../pages/MemberPage';

beforeAll(() => {
  window.getComputedStyle = () =>
    ({
      getPropertyValue: () => '',
    }) as unknown as CSSStyleDeclaration;
});
describe('MemberPage', () => {
  it('회원 추가 시 테이블에 새로운 회원이 보여야 합니다', async () => {
    render(<MemberPage initial={[]} />);
    const user = userEvent.setup();

    // 1. 회원 추가 버튼 클릭
    await user.click(screen.getByRole('button', { name: '회원 추가' }));

    // 2. 기본 정보 입력 (텍스트 필드만)
    await user.type(screen.getByLabelText('이름'), 'Test');
    await user.type(screen.getByLabelText('주소'), '서울');
    await user.type(screen.getByLabelText('메모'), '메모');
    // 3. 체크박스 클릭
    await user.click(screen.getByLabelText('이메일 수신 동의'));

    // 4. 저장
    await user.click(screen.getByRole('button', { name: '확인' }));

    // 5. 테이블 행 개수로만 확인
    const rows = await screen.findAllByRole('row');

    // 실제 데이터가 들어 있는 행만 필터링
    const dataRows = rows.filter((row) => {
      const cells = within(row).queryAllByRole('cell');
      return cells.length > 0;
    });

    expect(dataRows.length).toBe(1);
  });
});
