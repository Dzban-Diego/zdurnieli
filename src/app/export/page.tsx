import { getTheme } from '@/actions';
import ImportExport from '@/components/ImportExport';
import React from 'react';

export const runtime = 'edge'; // 'nodejs' is the default
export const preferredRegion = 'fra1'; // only execute this function on iad1
export const dynamic = 'force-dynamic'; // no caching

export default async function Page() {
  const theme = await getTheme();

  return (
    <ImportExport theme={theme}/>
  );
}
