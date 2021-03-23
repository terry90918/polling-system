<template>
  <div class="container">
    <chart :polls="poll" @update:vote="updateVote" />
  </div>
</template>

<script>
import chart from "@/components/chart";
import pollStorage from "@/utils/poll-storage";

export default {
  name: "Poll",
  components: {
    chart,
  },
  data() {
    return {
      polls: pollStorage.fetch(),
      select: this.$route.params.id,
    };
  },
  computed: {
    poll() {
      return this.polls.filter((i) => i.id == this.select);
    },
  },
  watch: {
    polls: {
      deep: true,
      handler(val) {
        pollStorage.save(val);
      },
    },
  },
  methods: {
    updateVote(vote) {
      const poll = this.polls.find((i) => i.id === vote.id);
      const option = poll.answer.options.find((i) => vote.optionId === i.id);
      option.vote = option.vote + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  width: 100%;
  margin: auto;
}
</style>
