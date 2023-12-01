<template>
  <main>
    <div class="filters">
      <div class="filters__left">
        <p>Все</p>
        <p>Lenta.ru</p>
        <p>Mos.ru</p>
      </div>
      <div class="filters__right">
        <img src="/grid.png" alt="grid" />
        <img src="/horizotal.png" alt="horizontal" />
      </div>
    </div>
    <div class="news">
      <ul>
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </ul>
    </div>
  </main>
</template>

<script>
import { DOMParser } from "xmldom";
import NewsItem from "../components/NewsItem.vue";

async function fetchNewsData(url) {
  try {
    const response = await fetch(url);
    const xmlData = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlData, "text/xml");
    const items = xml.getElementsByTagName("item");
    const parsedItems = Array.from(items).map((item, index) => {
      const title = item.getElementsByTagName("title")[0];
      const link = item.getElementsByTagName("link")[0];
      const description = item.getElementsByTagName("description")[0];
      const pubDate = item.getElementsByTagName("pubDate")[0];
      const enclosure = item.getElementsByTagName("enclosure")[0];
      return {
        id: index,
        title: title ? title.textContent : "",
        link: link ? link.textContent : "",
        description: description ? description.textContent : "",
        pubDate: pubDate ? pubDate.textContent : "",
        imgUrl: enclosure ? enclosure.getAttribute("url") : "",
      };
    });
    return parsedItems;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    return [];
  }
}

export default {
  name: "IndexPage",
  async asyncData() {
    const mosNews = await fetchNewsData("http://localhost:3000/api/mos-rss");
    const lentaNews = await fetchNewsData(
      "http://localhost:3000/api/lenta-rss"
    );
    const allNews = [...mosNews, ...lentaNews];
    return { mosNews, lentaNews, allNews };
  },
  components: { NewsItem },
};
</script>
<style scoped>
main {
  margin-top: 30px;
}
.filters {
  display: flex;
  justify-content: space-between;
}
.filters__left {
  display: flex;
}
.filters__left p {
  margin: 0 10px;
  cursor: pointer;
  color: #0029ff;
  font-weight: 700;
  font-size: 14px;
}
.filters__left p:hover {
  color: #000000;
}
.filters__right img {
  cursor: pointer;
  margin: 0 5px;
}
.news {
  margin-top: 15px;
}
.news ul {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>
