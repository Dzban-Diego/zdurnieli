import { getTheme } from '@/actions';
import ImportExport from '@/components/ImportExport';
import { headers } from 'next/headers';
import React from 'react';

export default async function Page() {
  const theme = await getTheme();
  const headersList = headers();
  const domain = headersList.get("x-forwarded-host") || "";
  const citySlug = domain.split('.')[0]

  return (
    <ImportExport theme={theme} citySlug={citySlug} />
  );
}
