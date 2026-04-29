import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Block } from '@/lib/types';

export function useActiveBlock() {
  const [block, setBlock] = useState<Block | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlock() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('blocks')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      setBlock(data);
      setLoading(false);
    }

    fetchBlock();
  }, []);

  return { block, loading };
}
