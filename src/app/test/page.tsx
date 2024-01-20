'use client';

import { getCollectionPoint } from '@/actions/branch/getCollectionPoint';
import { useEffect } from 'react';

export default function TestPage() {
  useEffect(() => {
    func();

    async function func() {
      const res = await getCollectionPoint();
      console.log(res);
    }
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}
