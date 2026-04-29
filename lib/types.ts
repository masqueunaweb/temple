export type Dimension = 'interior' | 'maquina' | 'trinchera' | 'afilado' | 'tribu';

export type EntryType = 'firma' | 'fallo';

export type FailLevel = 'desliz' | 'patron' | 'punto_ciego';

export interface Profile {
  id: string;
  username: string | null;
  created_at: string;
}

export interface Block {
  id: string;
  user_id: string;
  dimension: Dimension;
  started_at: string;
  completed: boolean;
  created_at: string;
}

export interface Entry {
  id: string;
  block_id: string;
  user_id: string;
  day_number: number;
  type: EntryType;
  note: string | null;
  fail_reason: string | null;
  created_at: string;
}

export interface DayStatus {
  dayNumber: number;
  status: 'pending' | 'firma' | 'fallo';
  note?: string;
  failReason?: string;
}
