export const mockRSSResponse = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <generator>NFE/5.0</generator>
    <title>Google ニュース - テクノロジー - 最新</title>
    <link>https://news.google.com/news/feed?hl=ja&amp;gl=JP</link>
    <language>ja</language>
    <lastBuildDate>Thu, 06 Mar 2024 09:23:01 GMT</lastBuildDate>
    <item>
      <title>テストニュースタイトル1</title>
      <link>https://news.google.com/articles/test1</link>
      <guid isPermaLink="false">tag:google.com,2024:test1</guid>
      <pubDate>Thu, 06 Mar 2024 09:20:00 GMT</pubDate>
      <description>テストニュース1の説明文です。</description>
      <source url="https://example.com">Example News</source>
      <media:content url="https://example.com/image1.jpg" medium="image" />
    </item>
    <item>
      <title>テストニュースタイトル2</title>
      <link>https://news.google.com/articles/test2</link>
      <guid isPermaLink="false">tag:google.com,2024:test2</guid>
      <pubDate>Thu, 06 Mar 2024 09:15:00 GMT</pubDate>
      <description>&lt;img src="https://example.com/image2.jpg"&gt;テストニュース2の説明文です。</description>
      <source url="https://example2.com">Example News 2</source>
    </item>
  </channel>
</rss>`;
