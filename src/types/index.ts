// src/types/index.ts
export interface IField {
  type: 'text' | 'textarea' | 'date' | 'select' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[];
  maxLength?: number;
}

export interface IMember {
  id: string;
  name: string;
  address?: string;
  memo?: string;
  joinDate: string;
  job?: '개발자' | 'PO' | '디자이너';
  emailConsent: boolean;
}

export const fields: IField[] = [
  { type: 'text', label: '이름', required: true, maxLength: 20 },
  { type: 'text', label: '주소', required: false, maxLength: 20 },
  { type: 'textarea', label: '메모', required: false, maxLength: 50 },
  { type: 'date', label: '가입일', required: true },
  {
    type: 'select',
    label: '직업',
    required: false,
    options: ['개발자', 'PO', '디자이너'],
  },
  { type: 'checkbox', label: '이메일 수신 동의', required: false },
];

export const initialMembers: IMember[] = [
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
