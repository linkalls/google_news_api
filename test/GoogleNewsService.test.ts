import { describe, expect, test, beforeEach, afterEach, mock } from "bun:test";
import { GoogleNewsService } from "../src/services/GoogleNewsService";
import { ValidationError, FetchError } from "../src/types";
import { mockRSSResponse } from "./mocks/rss-response";

// グローバルのfetchをモック化
const originalFetch = globalThis.fetch;
beforeEach(() => {
  // デフォルトのモック実装を設定
  globalThis.fetch = async () => {
    return {
      ok: true,
      text: async () => mockRSSResponse,
      statusText: "OK"
    } as Response;
  };
});

// テスト後に元のfetchを復元
afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("GoogleNewsService", () => {
  let service: GoogleNewsService;

  beforeEach(() => {
    service = new GoogleNewsService();
  });

  describe("パラメータバリデーション", () => {
    test("不正な言語コードでエラーを投げる", async () => {
      await expect(
        service.getNews({ language: "invalid" })
      ).rejects.toThrowError(ValidationError);
    });

    test("不正な国コードでエラーを投げる", async () => {
      await expect(
        service.getNews({ country: "invalid" })
      ).rejects.toThrowError(ValidationError);
    });

    test("100文字を超えるクエリでエラーを投げる", async () => {
      const longQuery = "a".repeat(101);
      await expect(
        service.getNews({ query: longQuery })
      ).rejects.toThrowError(ValidationError);
    });
  });

  describe("ニュースの取得", () => {
    test("正常にニュースを取得できる", async () => {
      const result = await service.getNews({
        language: "ja",
        country: "jp"
      });

      expect(Array.isArray(result.items)).toBe(true);
      expect(result.metadata).toMatchObject({
        title: expect.any(String),
        language: expect.any(String),
        generator: expect.any(String),
        lastBuildDate: expect.any(String)
      });
    });

    test("検索クエリでニュースを取得できる", async () => {
      const result = await service.getNews({
        query: "test",
        language: "ja"
      });

      expect(Array.isArray(result.items)).toBe(true);
      expect(result.items[0]).toMatchObject({
        title: expect.any(String),
        link: expect.any(String),
        pubDate: expect.any(String),
        description: expect.any(String),
        source: expect.any(String)
      });
    });
  });

  describe("エラーハンドリング", () => {
    test("フェッチに失敗した場合エラーを投げる", async () => {
      globalThis.fetch = async () => {
        throw new Error("Network error");
      };

      await expect(
        service.getNews()
      ).rejects.toThrowError(FetchError);
    });

    test("不正なRSSレスポンスでエラーを投げる", async () => {
      globalThis.fetch = async () => {
        return {
          ok: true,
          text: async () => "invalid xml",
          statusText: "OK"
        } as Response;
      };

      await expect(
        service.getNews()
      ).rejects.toThrowError(FetchError);
    });
  });
});
