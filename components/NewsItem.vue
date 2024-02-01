<template>
  <div>
    <div class="gridNew" v-if="selectedView === 'grid'">
      <div class="gridNew__block">
        <h3>
          {{ news.title }}
        </h3>
        <p>
          {{ news.description }}
        </p>
        <a :href="news.link">Подробнее</a>
      </div>
      <div class="gridNew__info">
        <span>{{ news.source }}</span>
        <span>{{ formattedDate(news.pubDate) }}</span>
      </div>
    </div>
    <div class="horizontalNew" v-else>
      <div class="horizontalNew__flex">
        <div class="horizontalNew__block">
          <img :src="news.imgUrl" alt="Photo" />
        </div>
        <div class="horizontalNew__block">
          <h3>{{ news.title }}</h3>
          <p>
            {{ news.description }}
          </p>
        </div>
      </div>
      <div class="horizontalNew__info">
        <span>{{ news.source }}</span>
        <span>{{ formattedDate(news.pubDate) }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
  props: {
    news: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["formattedDate"]),
    ...mapState(["selectedView"]),
  },
};
</script>
<style scoped>
.gridNew {
  height: 256px;
  box-shadow: 0px 1px 4px 0px #0000000d;
  box-shadow: 0px 2px 4px 0px #0000000d;
  background-color: #fff;
  border-radius: 3px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.gridNew__block {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.gridNew__info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.horizontalNew {
  height: 190px;
  box-shadow: 0px 1px 4px 0px #0000000d;
  box-shadow: 0px 2px 4px 0px #0000000d;
  background-color: #fff;
  border-radius: 3px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.horizontalNew__flex {
  display: flex;
  align-items: center;
}
.horizontalNew__block:last-child {
  margin-left: 15px;
}
.horizontalNew__info {
  display: flex;
  justify-content: space-between;
}
img {
  height: 100px;
  width: 200px;
  object-fit: cover;
}
h3 {
  color: #0029ff;
  font-size: 18px;
  font-weight: 700;
}
p {
  font-weight: 400;
  font-size: 14px;
  color: #000;
}
a {
  color: #0029ff;
  font-weight: 400;
  font-size: 14px;
}
span {
  font-weight: 400;
  font-size: 14px;
  color: #dcdcdc;
  text-decoration: underline;
}
@media (max-width: 700px) {
  .horizontalNew,
  .gridNew {
    padding: 10px;
    margin: 10px;
  }
  .horizontalNew {
    height: auto;
  }
  .horizontalNew__flex {
    display: flex;
    flex-direction: column;
  }
  img {
    height: auto;
    width: auto;
    object-fit: cover;
  }
}
@media (max-width: 570px) {
  .gridNew {
    height: auto;
  }
}
</style>
