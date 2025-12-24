export enum Platform {
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
  Facebook = 'Facebook',
  Video = 'Video',
  Article = 'Article'
}

export enum Tone {
  Formal = 'Formal',
  Casual = 'Casual',
  Wise = 'Wise'
}

export interface VideoScript {
  hook: string;
  body: string;
  callToAction: string;
  visualCues: string;
}

export interface SocialContent {
  twitterThread: string[];
  linkedInPost: string;
  facebookPost: string;
  videoScript: VideoScript;
}

export interface ViralityScore {
  emotion: number;
  logic: number;
  trendiness: number;
  clarity: number;
  controversy: number;
}

export interface GeneratedContent {
  variations: {
    [Tone.Formal]: SocialContent;
    [Tone.Casual]: SocialContent;
    [Tone.Wise]: SocialContent;
  };
  longArticle: string; // > 2000 chars
  suggestedHashtags: string[];
  suggestedKeywords: string[];
  viralityScore: ViralityScore;
}

export interface InputData {
  text: string;
  image?: string; // base64
  mimeType?: string;
}