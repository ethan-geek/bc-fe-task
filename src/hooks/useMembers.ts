import { useState, useEffect } from 'react';
import { IMember } from '../types';
import { localStorageService } from '../services/localStorageService';

export const isLocalStorage = import.meta.env.VITE_STORAGE === 'local-storage';

export function useMembers(initial: IMember[] = []) {
  const [members, setMembers] = useState<IMember[]>(
    isLocalStorage ? [] : [...initial]
  );

  useEffect(() => {
    if (isLocalStorage) {
      const saved = localStorageService.getMembers();
      setMembers(saved);
    }
  }, []);

  const update = (next: IMember[]) => {
    setMembers(next);
    if (isLocalStorage) localStorageService.saveMembers(next);
  };

  const addMember = (member: IMember) => {
    update([member, ...members]);
  };

  const updateMember = (member: IMember) => {
    update(members.map((m) => (m.id === member.id ? member : m)));
  };

  const removeMember = (id: string) => {
    update(members.filter((m) => m.id !== id));
  };

  return { members, addMember, updateMember, removeMember };
}
