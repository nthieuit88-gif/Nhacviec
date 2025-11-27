import { LucideIcon } from 'lucide-react';

export interface Task {
  id: number;
  date: number;
  month: string;
  title: string;
  time: string;
  location: string;
  urgent: boolean;
  status: string;
  attendees: number;
}

export interface Document {
  id: number;
  title: string;
  timeLeft: string;
  deadline: string;
  urgent: boolean;
  progress: number;
}

export interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export type TabType = 'dashboard' | 'calendar' | 'docs' | 'reports' | 'settings';
