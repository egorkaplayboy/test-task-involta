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
        <NewsItem v-for="item in news" :key="item.id" :news="item" />
      </ul>
    </div>
  </main>
</template>

<script>
import NewsItem from "../components/NewsItem.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "IndexPage",
  components: { NewsItem },
  computed: {
    ...mapState(["news", "selectedFilter"]),
  },
  methods: {
    ...mapActions(["fetchMosNews", "fetchLentaNews", "fetchAllNews"]),
    async showAllNews() {
      this.$store.commit("setSelectedFilter", "all");
      this.$router.push({ query: { source: "all" } });
      await this.fetchAllNews();
    },
    async showLentaNews() {
      this.$store.commit("setSelectedFilter", "lenta");
      this.$router.push({ query: { source: "lenta" } });
      await this.fetchLentaNews();
    },
    async showMosNews() {
      this.$store.commit("setSelectedFilter", "mos");
      this.$router.push({ query: { source: "mos" } });
      await this.fetchMosNews();
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
</style>
