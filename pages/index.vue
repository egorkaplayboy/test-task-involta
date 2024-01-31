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
        <svg
          @click="setGridView('grid')"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            v-if="selectedView === 'grid'"
            width="8"
            height="8"
            fill="#0029FF"
          />
          <rect v-else width="8" height="8" fill="#C4C4C4" />
          <rect
            v-if="selectedView === 'grid'"
            y="10"
            width="8"
            height="8"
            fill="#0029FF"
          />
          <rect v-else y="10" width="8" height="8" fill="#C4C4C4" />
          <rect
            v-if="selectedView === 'grid'"
            x="10"
            width="8"
            height="8"
            fill="#0029FF"
          />
          <rect v-else x="10" width="8" height="8" fill="#C4C4C4" />
          <rect
            v-if="selectedView === 'grid'"
            x="10"
            y="10"
            width="8"
            height="8"
            fill="#0029FF"
          />
          <rect v-else x="10" y="10" width="8" height="8" fill="#C4C4C4" />
        </svg>

        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="setGridView('horizontal')"
        >
          <rect
            v-if="selectedView === 'horizontal'"
            width="18"
            height="8"
            fill="#0029FF"
          />
          <rect v-else width="18" height="8" fill="#C4C4C4" />
          <rect
            v-if="selectedView === 'horizontal'"
            y="10"
            width="18"
            height="8"
            fill="#0029FF"
          />
          <rect v-else y="10" width="18" height="8" fill="#C4C4C4" />
        </svg>
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
import { NewsMixin } from "../mixins/NewsMixin";

export default {
  name: "IndexPage",
  components: { NewsItem },
  mixins: [NewsMixin],
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
.filters__right svg {
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
