# Google News API

Google NewsのRSSフィードをJSON形式で取得するTypeScriptライブラリです。

## 特徴

- Google NewsのRSSフィードをJSONに変換
- 国と言語の指定が可能
- キーワード検索対応
- TypeScript完全対応
- シンプルで使いやすいAPI

## インストール

```bash
bun add google_news_api
```

## 使い方

```typescript
import { GoogleNewsService } from 'google_news_api';

const newsService = new GoogleNewsService();

// 日本のニュースを取得
const news = await newsService.getNews({
  country: 'jp',
  language: 'ja'
});

// キーワードで検索
const techNews = await newsService.getNews({
  query: 'technology',
  language: 'en'
});

// レスポンスの形式
interface NewsResponse {
  items: {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    source: string;
  }[];
  metadata: {
    lastBuildDate: string;
    generator: string;
    title: string;
    language: string;
  };
}
```

## パラメータ

| パラメータ | 説明 | 必須 | 例 |
|------------|------|------|-----|
| country | 国コード (ISO 3166-1) | いいえ | 'jp', 'us' |
| language | 言語コード (ISO 639-1) | いいえ | 'ja', 'en' |
| query | 検索キーワード | いいえ | 'technology' |

## エラーハンドリング

```typescript
import { ValidationError, FetchError } from 'google_news_api';

try {
  const news = await newsService.getNews({
    country: 'invalid'
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('パラメータが不正です:', error.message);
  } else if (error instanceof FetchError) {
    console.error('APIの呼び出しに失敗しました:', error.message);
  } else {
    console.error('予期せぬエラーが発生しました:', error);
  }
}
```

## 開発

```bash
# 依存関係のインストール
bun install

# テストの実行
bun test

# ビルド
bun run build
```

## ライセンス

MIT
