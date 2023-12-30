import { useCallback, useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectLanguage } from '@/containers/users/usersSlice';

export const T = (path: string, keyName: string) => {
  const lang = useAppSelector(selectLanguage);
  const [translation, setTranslation] = useState<string>('');

  const fetchData = useCallback(
    async (path: string, keyName: string) => {
      try {
        const res = await fetch(`/locales/${path}.json`);
        const data = await res.json();
        setTranslation(data[keyName][lang]);
      } catch (error) {
        console.error('Error fetching translation:', error);
        setTranslation('');
      }
    },
    [lang],
  );

  useEffect(() => {
    void fetchData(path, keyName);
  }, [fetchData, keyName, path]);

  return translation;
};
