<template>
  <div class="cards">
    <router-link
      v-for="poll in polls"
      :key="poll.id"
      :to="`/poll/${poll.id}`"
      class="card"
    >
      <img class="card__img" src="~@/assets/img.png" alt="chart" />
      <div>
        <div>{{ poll.publishedDate | moment("DD MMM YYYY") }}</div>
        <div v-text="poll.title" />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    polls: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
}
.card {
  display: flex;
  width: 50%;
  box-shadow: 0 0 1px black;
  padding: 5px 10px;
  box-sizing: border-box;
  &__img {
    width: 90px;
    height: 90px;
  }
}
</style>
