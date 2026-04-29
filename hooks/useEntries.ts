import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Entry } from '@/lib/types';

export function useEntries(blockId: string) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      const supabase = createClient();

      const { data } = await supabase
        .from('entries')
        .select('*')
        .eq('block_id', blockId)
        .order('day_number', { ascending: true });

      setEntries(data || []);
      setLoading(false);
    }

    if (blockId) {
      fetchEntries();
    }
  }, [blockId]);

  return { entries, loading };
}
