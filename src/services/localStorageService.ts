import { IMember } from '../types';

const STORAGE_KEYS = {
  BC_MEMBERS: 'BC_MEMBERS',
};

export const localStorageService = {
  getMembers(): IMember[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BC_MEMBERS);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error(
        '로컬 스토리지에서 회원 정보를 불러오는 중 오류 발생:',
        error
      );
      return [];
    }
  },

  saveMembers(members: IMember[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.BC_MEMBERS, JSON.stringify(members));
    } catch (error) {
      console.error(
        '로컬 스토리지에 회원 정보를 저장하는 중 오류 발생:',
        error
      );
    }
  },
};
