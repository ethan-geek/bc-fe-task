import MemberPage from './pages/MemberPage';
import { initialMembers } from './types';
// 테스트용 더미 데이터 추가
// const testMembers: IMember[] = Array.from({ length: 20 }, (_, index) => ({
//   id: String(index + 3),
//   name: `Member ${index + 3}`,
//   address: `주소 ${index + 3}`,
//   memo: `메모 ${index + 3}`,
//   joinDate: '2024-10-03',
//   job: index % 3 === 0 ? '개발자' : index % 3 === 1 ? 'PO' : '디자이너',
//   emailConsent: index % 2 === 0,
// }));

function App() {
  const allMembers = [...initialMembers];

  return <MemberPage initial={allMembers} />;
}

export default App;
