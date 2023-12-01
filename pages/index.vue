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
        <img src="/grid.png" alt="grid" />
        <img src="/horizotal.png" alt="horizontal" />
      </div>
    </div>
    <div class="news">
      <ul>
        <NewsItem v-for="item in filteredNews" :key="item.id" :news="item" />
      </ul>
    </div>
    <div class="paginate">
      <p
        v-for="page in displayPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </p>
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
    ...mapState(["news", "selectedFilter", "currentPage"]),
    ...mapGetters(["totalPages", "filteredNews", "displayPages"]),
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
.news ul {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.paginate {
  display: flex;
  align-items: center;
  justify-content: center;
}
.paginate p {
  font-weight: 700;
  font-size: 18px;
  color: #000000;
  cursor: pointer;
  margin: 0 10px;
}
.paginate p.active {
  color: #0029ff;
}
</style>
