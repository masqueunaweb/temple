import { Block, Entry, Profile } from '@/lib/types';
import { createClient as createBrowserClient } from './client';
import { createClient as createServerClient } from './server';

// Profile queries
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data;
}

export async function createProfile(userId: string, username?: string): Promise<Profile | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .insert({ id: userId, username: username || null })
    .select()
    .single();

  if (error) return null;
  return data;
}

// Block queries
export async function getActiveBlock(userId: string): Promise<Block | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('blocks')
    .select('*')
    .eq('user_id', userId)
    .eq('completed', false)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

export async function createBlock(userId: string, dimension: string): Promise<Block | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('blocks')
    .insert({
      user_id: userId,
      dimension,
      started_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return null;
  return data;
}

export async function getBlockById(blockId: string): Promise<Block | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('blocks')
    .select('*')
    .eq('id', blockId)
    .single();

  if (error) return null;
  return data;
}

export async function getBlocksByUser(userId: string): Promise<Block[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('blocks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) return [];
  return data || [];
}

// Entry queries
export async function getEntriesByBlock(blockId: string): Promise<Entry[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('block_id', blockId)
    .order('day_number', { ascending: true });

  if (error) return [];
  return data || [];
}

export async function getTodayEntry(blockId: string, dayNumber: number): Promise<Entry | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('block_id', blockId)
    .eq('day_number', dayNumber)
    .single();

  if (error) return null;
  return data;
}

export async function createEntry(
  blockId: string,
  userId: string,
  dayNumber: number,
  type: 'firma' | 'fallo',
  note?: string,
  failReason?: string
): Promise<Entry | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('entries')
    .insert({
      block_id: blockId,
      user_id: userId,
      day_number: dayNumber,
      type,
      note: note || null,
      fail_reason: failReason || null,
    })
    .select()
    .single();

  if (error) return null;
  return data;
}

export async function updateEntry(
  entryId: string,
  updates: Partial<Pick<Entry, 'note' | 'fail_reason'>>
): Promise<Entry | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('entries')
    .update(updates)
    .eq('id', entryId)
    .select()
    .single();

  if (error) return null;
  return data;
}
