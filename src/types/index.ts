export interface GoogleNewsParams {
  country?: string;
  language?: string;
  query?: string;
}

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
}

export interface NewsResponse {
  items: NewsItem[];
  metadata: {
    lastBuildDate: string;
    generator: string;
    title: string;
    language: string;
  };
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class FetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FetchError';
  }
}
