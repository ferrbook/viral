import { Platform } from './types';
import { Twitter, Linkedin, Facebook, Video, Edit3 } from 'lucide-react';

export const PLATFORM_CONFIG: any = {
  [Platform.Twitter]: {
    icon: Twitter,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20',
    label: 'Twitter Thread',
  },
  [Platform.LinkedIn]: {
    icon: Linkedin,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    label: 'LinkedIn',
  },
  [Platform.Facebook]: {
    icon: Facebook,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    label: 'Facebook',
  },
  [Platform.Video]: {
    icon: Video,
    color: 'text-fuchsia-400',
    bgColor: 'bg-fuchsia-500/10',
    borderColor: 'border-fuchsia-500/20',
    label: 'TikTok / Reels',
  },
  [Platform.Article]: {
    icon: Edit3,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    label: 'Long Article',
  },
};
