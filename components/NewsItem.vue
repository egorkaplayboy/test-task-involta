<template>
  <div class="new">
    <div v-if="selectedView === 'horizontal'" class="new__block">
      <img :src="news.imgUrl" alt="Photo" />
    </div>
    <div class="new__block">
      <h3>
        {{ news.title }}
      </h3>
      <p>
        {{ news.description }}
      </p>
      <a :href="news.link">Подробнее</a>
    </div>
    <div class="new__info">
      <span>{{ news.source }}</span>
      <span>{{ formattedDate(news.pubDate) }}</span>
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
.new {
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
.new__block {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.new__info {
  display: flex;
  align-items: center;
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
</style>
