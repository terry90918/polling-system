import { polls } from "@/data/polls.json";

const pollStorage = {
  fetch() {
    return this.format(
      JSON.parse(localStorage.getItem(process.env.VUE_APP_STORAGE_KEY_POLLS)) ||
        polls
    );
  },
  format(polls = []) {
    return polls.map((poll) => {
      poll.answer.options.forEach((option) => {
        option.vote = option.vote || 0;
      });
      return poll;
    });
  },
  save(polls) {
    localStorage.setItem(
      process.env.VUE_APP_STORAGE_KEY_POLLS,
      JSON.stringify(polls)
    );
  },
};

export default pollStorage;
