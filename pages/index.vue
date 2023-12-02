<template>
  <main>
    <div class="filters">
      <div class="filters__left">
        <p :class="{ active: selectedFilter === 'all' }" @click="showAllNews">
          Все
        </p>
        <p
          :class="{ active: selectedFilter === 'lenta' }"
          @click="showLentaNews"
        >
          Lenta.ru
        </p>
        <p :class="{ active: selectedFilter === 'mos' }" @click="showMosNews">
          Mos.ru
        </p>
      </div>
      <div class="filters__right">
        <img src="/grid.png" alt="grid" @click="setGridView('grid')" />
        <img
          src="/horizotal.png"
          alt="horizontal"
          @click="setGridView('horizontal')"
        />
      </div>
    </div>
    <div class="news">
      <div :class="selectedView">
        <NewsItem
          v-for="item in slicedFilteredNews"
          :key="item.id"
          :news="item"
        />
      </div>
    </div>
    <div class="paginate">
      <button
        v-for="page in displayPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
    </div>
  </main>
</template>

<script>
import NewsItem from "../components/NewsItem.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "IndexPage",
  components: { NewsItem },
  computed: {
    ...mapState([
      "news",
      "selectedFilter",
      "currentPage",
      "selectedView",
      "pageSize",
    ]),
    ...mapGetters(["totalPages", "filteredNews", "displayPages"]),
    slicedFilteredNews() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredNews.slice(startIndex, endIndex);
    },
  },
  methods: {
    ...mapActions(["fetchMosNews", "fetchLentaNews", "fetchAllNews"]),
    async showAllNews() {
      const { query } = this.$route;
      this.$store.commit("setSelectedFilter", "all");
      this.$router.push({ query: { ...query, source: "all" } });
      await this.fetchAllNews();
      this.goToPage(1);
    },
    async showLentaNews() {
      const { query } = this.$route;
      this.$store.commit("setSelectedFilter", "lenta");
      this.$router.push({ query: { ...query, source: "lenta" } });
      await this.fetchLentaNews();
      this.goToPage(1);
    },
    async showMosNews() {
      const { query } = this.$route;
      this.$store.commit("setSelectedFilter", "mos");
      this.$router.push({ query: { ...query, source: "mos" } });
      await this.fetchMosNews();
      this.goToPage(1);
    },
    goToPage(page) {
      const { query } = this.$route;
      this.$store.commit("setCurrentPage", page);
      this.$router.push({ query: { ...query, page } });
    },
    setGridView(view) {
      this.$store.commit("setSelectedView", view);
      localStorage.setItem("selectedView", view);
    },
  },
  mounted() {
    const view = localStorage.getItem("selectedView");
    this.$store.commit("setSelectedView", view);
    this.$router.push({ query: { page: 1, source: "all" } });
  },
  async asyncData({ store }) {
    await store.dispatch("fetchAllNews");
  },
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
.filters__left p.active {
  color: #000000;
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

.grid {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
.horizontal {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
.paginate {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
.paginate button {
  font-weight: 700;
  font-size: 18px;
  color: #000000;
  cursor: pointer;
  margin: 0 10px;
  outline: none;
  border: none;
  background-color: inherit;
}
.paginate button.active {
  color: #0029ff;
}
@media (max-width: 570px) {
  .grid {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
