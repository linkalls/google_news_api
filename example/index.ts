import { GoogleNewsService } from '../src';

const news = new GoogleNewsService();

const result = await news.getNews({
  language: "ja",
  country: "jp",
  query: "紫咲シオン",
});

console.log(result.items.length);

result.items.forEach((item) => {
  console.log(item.title);
  console.log(item.link);
  console.log(item.pubDate);
  console.log(item.description);
  console.log(item.source);
  console.log("--------------");
});
