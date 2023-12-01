<template>
  <li class="new">
    <h3>
      Первые земельные участки реализованы на специальных торгах для малого и
      среднего бизнеса
    </h3>
    <p>
      На каждый участок претендовали в среднем шесть участников. Стоимость одной
      из сделок выросла в ходе аукциона в 26 раз.
    </p>
    <a href="#">Подробнее</a>
    <div class="new__info">
      <span>www.mos.ru</span>
      <span>12.01.2020</span>
    </div>
  </li>
</template>
<script>
export default {};
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
  flex-direction: column;
  justify-content: space-between;
}
.new__info {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
