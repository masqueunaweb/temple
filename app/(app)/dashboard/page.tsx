'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import SignButton from '@/components/blocks/SignButton';
import InspirationQuote from '@/components/blocks/InspirationQuote';
import HorizontalImageScroll from '@/components/blocks/HorizontalImageScroll';
import { getDayNumber } from '@/lib/utils';
import { DIMENSIONS } from '@/lib/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const router = useRouter();
  const [activeBlock, setActiveBlock] = useState<any>(null);
  const [todayEntry, setTodayEntry] = useState<any>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [dimension, setDimension] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const mainContentRef = useRef<HTMLDivElement>(null);
  const dayNumberRef = useRef<HTMLParagraphElement>(null);
  const signButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!loading && mainContentRef.current) {
      // Animar el número del día
      if (dayNumberRef.current) {
        gsap.fromTo(
          dayNumberRef.current,
          { opacity: 0, y: 50, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
      }

      // Animar el botón de firma
      if (signButtonRef.current) {
        gsap.fromTo(
          signButtonRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 }
        );
      }
    }
  }, [loading]);

  const loadData = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    // Fetch active block
    const { data: blocks } = await supabase
      .from('blocks')
      .select('*')
      .eq('user_id', user.id)
      .eq('completed', false)
      .order('created_at', { ascending: false })
      .limit(1);

    const block = blocks?.[0];
    if (!block) {
      router.push('/bloque/nuevo');
      return;
    }

    const dayNum = getDayNumber(block.started_at);
    const dim = DIMENSIONS.find(d => d.id === block.dimension);

    // Fetch today's entry
    const { data: entry } = await supabase
      .from('entries')
      .select('*')
      .eq('block_id', block.id)
      .eq('day_number', dayNum)
      .single();

    setActiveBlock(block);
    setCurrentDay(dayNum);
    setDimension(dim);
    setTodayEntry(entry);
    setLoading(false);
  };

  const handleSign = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('entries').insert({
      block_id: activeBlock.id,
      user_id: user.id,
      day_number: currentDay,
      type: 'firma',
    });

    // Reload data
    loadData();
  };

  const handleFail = async () => {
    // TODO: Implementar modal de fallo
    console.log('Fallo - implementar modal');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  const dayString = currentDay.toString().padStart(2, '0');

  return (
    <div ref={mainContentRef} className="space-y-12">
      <div className="text-center space-y-2">
        <p
          ref={dayNumberRef}
          className="font-satoshi text-display font-bold tracking-tight"
        >
          {dayString}
        </p>
        <p className="font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary">
          {dimension?.name}
        </p>
      </div>

      <div ref={signButtonRef}>
        <SignButton
          isSigned={todayEntry?.type === 'firma'}
          isFailed={todayEntry?.type === 'fallo'}
          onSign={handleSign}
          onFail={handleFail}
        />
      </div>

      <InspirationQuote />
      
      <HorizontalImageScroll />
    </div>
  );
}
