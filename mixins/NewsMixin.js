import { mapState, mapActions, mapGetters } from "vuex";

export const NewsMixin = {
  computed: {
    ...mapState([
      "news",
      "selectedFilter",
      "currentPage",
      "selectedView",
      "pageSize",
      "searchValue",
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
    this.$router.push({
      query: {
        source: this.selectedFilter,
        page: this.currentPage,
        search: this.searchValue,
      },
    });
  },
  async asyncData({ store }) {
    await store.dispatch("fetchAllNews");
  },
};
