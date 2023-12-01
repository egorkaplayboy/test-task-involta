import { DOMParser } from "xmldom";

export const state = () => ({
  news: [],
  selectedFilter: "all",
  currentPage: 1,
  pageSize: 4,
});
export const mutations = {
  setNews(state, news) {
    state.news = news;
  },
  setSelectedFilter(state, filter) {
    state.selectedFilter = filter;
  },
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
};
export const getters = {
  formattedDate: (state) => (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("ru-RU", options);
  },
  totalPages: (state) => {
    const { news, pageSize } = state;
    return Math.ceil(news.length / pageSize);
  },
  filteredNews: (state) => {
    const { currentPage, pageSize, news } = state;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return news.slice(startIndex, endIndex);
  },
  displayPages: (state, getters) => {
    const totalPages = getters.totalPages;
    const currentPage = state.currentPage;
    const displayRange = 2;
    const firstPage = 1;
    const lastPage = totalPages;
    let pages = [];
    pages.push(firstPage);
    for (
      let i = currentPage - displayRange;
      i <= currentPage + displayRange;
      i++
    ) {
      if (i > firstPage && i < lastPage) {
        pages.push(i);
      }
    }
    pages.push(lastPage);

    return pages;
  },
};
export const actions = {
  async fetchMosNews({ commit }) {
    const mosNews = await fetchNewsData("http://localhost:3000/api/mos-rss");
    commit("setNews", mosNews);
    return mosNews;
  },
  async fetchLentaNews({ commit }) {
    const lentaNews = await fetchNewsData(
      "http://localhost:3000/api/lenta-rss"
    );
    commit("setNews", lentaNews);
    return lentaNews;
  },
  async fetchAllNews({ dispatch, commit }) {
    const mosNews = await dispatch("fetchMosNews");
    const lentaNews = await dispatch("fetchLentaNews");
    commit("setNews", [...mosNews, ...lentaNews]);
  },
};

async function fetchNewsData(url) {
  try {
    const response = await fetch(url);
    const xmlData = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlData, "text/xml");
    const channel = xml.getElementsByTagName("channel")[0];
    const channelLink = channel.getElementsByTagName("link")[0].textContent;
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
        source: channelLink,
      };
    });
    return parsedItems;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    return [];
  }
}
