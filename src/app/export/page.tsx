import { getTheme } from '@/actions';
import ImportExport from '@/components/ImportExport';
import React from 'react';

export default async function Page() {
  const theme = await getTheme();

  return (
    <ImportExport theme={theme}/>
  );
}
