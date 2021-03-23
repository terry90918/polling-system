<template>
  <div class="container">
    <chart :today="true" :polls="firstPoll" @update:vote="updateVote" />
    <card :polls="withoutFirstPolls" />
  </div>
</template>

<script>
import card from "@/components/card";
import chart from "@/components/chart";
import pollStorage from "@/utils/poll-storage";

export default {
  name: "Polls",
  components: {
    card,
    chart,
  },
  data() {
    return {
      polls: pollStorage.fetch(),
      select: 1,
    };
  },
  computed: {
    firstPoll() {
      if (!this.polls.length) return [];
      return this.polls.filter((i) => i.id === this.select);
    },
    withoutFirstPolls() {
      if (!this.polls.length) return [];
      return this.polls.filter((i) => i.id !== this.select);
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
