<template>
  <header class="header">
    <div class="header__left">
      <h2>Список новостей</h2>
      <img src="/refresh.png" alt="Refresh" @click="refreshNews" />
    </div>
    <div class="header__right">
      <input
        type="text"
        :value="searchValue"
        @input="updateSearchValue($event.target.value)"
      />
      <img src="/find.png" alt="Find" class="icon" />
    </div>
  </header>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["searchValue"]),
  },
  methods: {
    ...mapMutations(["setSearchValue", "setCurrentPage", "setSelectedFilter"]),
    ...mapActions(["fetchAllNews"]),
    updateSearchValue(newValue) {
      this.setCurrentPage(1);
      this.setSearchValue(newValue);
      const { query } = this.$route;
      this.$router.push({ query: { ...query, search: newValue } });
    },
    refreshNews() {
      this.setSelectedFilter("all");
      this.setCurrentPage(1);
      this.setSearchValue("");
      this.fetchAllNews();
    },
  },
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  margin: 10px;
}
.header__left {
  display: flex;
  align-items: center;
}
.header__left img {
  width: 40px;
  height: 40px;
  margin-left: 15px;
  cursor: pointer;
}
.header__left h2 {
  font-weight: 700;
  font-size: 36px;
}
.header__right {
  position: relative;
}
.header__right input {
  padding-right: 40px;
  padding-left: 10px;
  height: 40px;
  width: 300px;
  border-radius: 3px;
  outline: none;
  border: none;
  font-size: 20px;
  box-shadow: 0px 1px 4px 0px #0000000d;
  box-shadow: 0px 2px 4px 0px #0000000d;
}
.header__right .icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
}
@media (max-width: 720px) {
  .header {
    display: flex;
    flex-direction: column;
    margin: 10px;
    justify-content: space-between;
  }
}
</style>
