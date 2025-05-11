import { promisify } from "util";
import { parseString } from "xml2js";
import type { GoogleNewsParams, NewsResponse } from "../types";
import { FetchError } from "../types";
import { sanitizeParams, validateParams } from "../validators/params";

const parseXML = promisify(parseString);

export class GoogleNewsService {
  constructor({
    country = null,
    language = null,
  }: { country?: string | null; language?: string | null } = {}) {
    this.country = country;
    this.language = language;
  }

  private country: string | null = null;
  private language: string | null = null;
  private readonly BASE_URL = "https://news.google.com/rss";

   private stripHtmlTags(html: string): string {
    // まずHTMLタグを削除
    const withoutTags = html.replace(/<[^>]*>/g, '');
    
    // 一般的なHTMLエンティティをデコード
    return withoutTags
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/&copy;/g, '©')
      .replace(/&reg;/g, '®')
  }

  private buildUrl(params: GoogleNewsParams): string {
    const sanitizedParams = sanitizeParams(params);
    let url = this.BASE_URL;

    if (sanitizedParams.query) {
      url = `${this.BASE_URL}/search?q=${sanitizedParams.query}`;
    }

    const queryParams: string[] = [];

    // コンストラクタで設定された値またはパラメータで渡された値を使用
    const effectiveCountry = sanitizedParams.country || this.country;
    const effectiveLanguage = sanitizedParams.language || this.language;

    if (effectiveCountry) {
      queryParams.push(`gl=${effectiveCountry}`);
    }

    if (effectiveLanguage) {
      queryParams.push(`hl=${effectiveLanguage}`);
    }

    if (queryParams.length > 0) {
      url += `${url.includes("?") ? "&" : "?"}${queryParams.join("&")}`;
    }

    return url;
  }

  private async fetchRSS(url: string): Promise<string> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new FetchError(
          `Failed to fetch RSS feed: ${response.statusText}`
        );
      }

      return await response.text();
    } catch (error) {
      if (error instanceof FetchError) {
        throw error;
      }
      throw new FetchError(`Network error: ${(error as Error).message}`);
    }
  }

  private async parseRSSToJSON(rss: any): Promise<NewsResponse> {
    const channel = rss.rss.channel[0];

    const itemPromises = channel.item.map(async (item: any) => {
      return {
        title: item.title[0],
        link: item.link[0],
        pubDate: item.pubDate[0],
        description: this.stripHtmlTags(item.description[0]),
        source: item.source?.[0]?._ || "Google News",
      };
    });

    const items = await Promise.all(itemPromises);

    return {
      items,
      metadata: {
        lastBuildDate: channel.lastBuildDate[0],
        generator: channel.generator[0],
        title: channel.title[0],
        language: channel.language[0],
      },
    };
  }

  public async getNews(params: GoogleNewsParams = {}): Promise<NewsResponse> {
    // パラメータのバリデーション
    validateParams(params);

    // URLの構築
    const url = this.buildUrl(params);

    // RSSフィードの取得
    const rssContent = await this.fetchRSS(url);

    try {
      // XMLをパース
      const parsedXML = await parseXML(rssContent);

      // JSONに変換（非同期処理を含む）
      return await this.parseRSSToJSON(parsedXML);
    } catch (error) {
      throw new FetchError(
        `Failed to parse RSS feed: ${(error as Error).message}`
      );
    }
  }
}
