import { DOMParser } from "xmldom";

export const state = () => ({
  news: [],
  selectedFilter: "all",
  currentPage: 1,
  pageSize: 4,
  selectedView: "grid",
  searchValue: "",
  newsCache: {},
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
  setSelectedView(state, view) {
    state.selectedView = view;
  },
  setSearchValue(state, value) {
    state.searchValue = value;
  },
  setNewsCache(state, { filter, news }) {
    state.newsCache[filter] = news;
  },
};
export const getters = {
  formattedDate: (state) => (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("ru-RU", options);
  },
  filteredNews: (state) => {
    const { news, searchValue } = state;
    return news.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  },
  totalPages: (state, getters) => {
    const { pageSize } = state;
    const { filteredNews } = getters;
    return Math.ceil(filteredNews.length / pageSize);
  },
  displayPages: (state, getters) => {
    const totalPages = getters.totalPages;
    const currentPage = state.currentPage;
    const displayRange = 1;
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
  async fetchMosNews({ commit, state }) {
    if (!state.newsCache["mos"]) {
      try {
        const mosNews = await fetchNewsData(
          "http://localhost:3000/api/mos-rss"
        );
        commit("setNewsCache", { filter: "mos", news: mosNews });
        commit("setNews", mosNews);
        return mosNews;
      } catch (error) {
        console.error("Error fetching Moscow news:", error);
        commit("setNews", []);
        return [];
      }
    } else {
      commit("setNews", state.newsCache["mos"]);
      return state.newsCache["mos"];
    }
  },
  async fetchLentaNews({ commit, state }) {
    if (!state.newsCache["lenta"]) {
      try {
        const lentaNews = await fetchNewsData(
          "http://localhost:3000/api/lenta-rss"
        );
        commit("setNewsCache", { filter: "lenta", news: lentaNews });
        commit("setNews", lentaNews);
        return lentaNews;
      } catch (error) {
        console.error("Error fetching Lenta news:", error);
        commit("setNews", []);
        return [];
      }
    } else {
      commit("setNews", state.newsCache["lenta"]);
      return state.newsCache["lenta"];
    }
  },
  async fetchAllNews({ dispatch, commit }) {
    try {
      const mosNews = await dispatch("fetchMosNews");
      const lentaNews = await dispatch("fetchLentaNews");
      commit("setNews", [...lentaNews, ...mosNews]);
    } catch (error) {
      console.error("Error fetching all news:", error);
      commit("setNews", []);
    }
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
        description: description ? description.textContent.split(".")[0] : "",
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
