import { DOMParser } from "xmldom";

export const state = () => ({
  mosNews: [],
  lentaNews: [],
  allNews: [],
});
export const mutations = {
  SET_MOS_NEWS(state, news) {
    state.mosNews = news;
  },
  SET_LENTA_NEWS(state, news) {
    state.lentaNews = news;
  },
  SET_ALL_NEWS(state) {
    state.allNews = [...state.mosNews, ...state.lentaNews];
  },
};
export const getters = {
  formattedDate: (state) => (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("ru-RU", options);
  },
};
export const actions = {
  async fetchMosNews({ commit }) {
    const mosNews = await fetchNewsData("http://localhost:3000/api/mos-rss");
    commit("SET_MOS_NEWS", mosNews);
  },
  async fetchLentaNews({ commit }) {
    const lentaNews = await fetchNewsData(
      "http://localhost:3000/api/lenta-rss"
    );
    commit("SET_LENTA_NEWS", lentaNews);
  },
  async fetchAllNews({ dispatch, commit }) {
    await dispatch("fetchMosNews");
    await dispatch("fetchLentaNews");
    commit("SET_ALL_NEWS");
  },
};

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
