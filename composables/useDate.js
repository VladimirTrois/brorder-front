import { useState } from 'nuxt/app';
import { useIntervalFn } from '@vueuse/core';
import { getDateWritten } from '~/functions/date';

export const useCurrentDate = () => {
  const currentDate = useState('currentDate', () => getDateWritten(new Date()));

  useIntervalFn(() => {
    const now = new Date();
    currentDate.value = getDateWritten(now);
  }, 3000 * 60 * 60); // Check every 3 hours

  return currentDate;
};
