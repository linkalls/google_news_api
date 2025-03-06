# Google News API

Google News の RSS フィードを JSON 形式で取得する TypeScript ライブラリです。

## 特徴

- Google News の RSS フィードを JSON に変換
- 国と言語の指定が可能
- キーワード検索対応
- TypeScript 完全対応
- シンプルで使いやすい API

## インストール

```bash
bun add @potetotown/google_news_api
```

## 使い方

```typescript
import { GoogleNewsService } from "@potetotown/google_news_api";

const newsService = new GoogleNewsService();

// 日本のニュースを取得
const news = await newsService.getNews({
  country: "jp",
  language: "ja",
});

// キーワードで検索
const techNews = await newsService.getNews({
  query: "technology",
  language: "en",
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

| パラメータ | 説明                   | 必須   | 例           |
| ---------- | ---------------------- | ------ | ------------ |
| country    | 国コード (ISO 3166-1)  | いいえ | 'jp', 'us'   |
| language   | 言語コード (ISO 639-1) | いいえ | 'ja', 'en'   |
| query      | 検索キーワード         | いいえ | 'technology' |

## エラーハンドリング

```typescript
import { ValidationError, FetchError } from "google_news_api";

try {
  const news = await newsService.getNews({
    country: "invalid",
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("パラメータが不正です:", error.message);
  } else if (error instanceof FetchError) {
    console.error("APIの呼び出しに失敗しました:", error.message);
  } else {
    console.error("予期せぬエラーが発生しました:", error);
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

## 開発者向け情報

### パッケージの公開方法

1. npm にログイン

```bash
npm login  # または bunx npm login
```

2. パッケージのビルドと公開

```bash
# ビルド
bun run build

# パッケージの公開
bun publish --access public
```

### バージョン管理

パッケージのバージョンを更新する場合：

```bash
# パッチバージョンを上げる（バグ修正など）: 1.0.0 → 1.0.1
bun version patch

# マイナーバージョンを上げる（後方互換性のある機能追加）: 1.0.0 → 1.1.0
bun version minor

# メジャーバージョンを上げる（破壊的な変更）: 1.0.0 → 2.0.0
bun version major
```

バージョンを更新したら、以下のコマンドで公開します：

```bash
bun publish
```

## ライセンス

MIT
