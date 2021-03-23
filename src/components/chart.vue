<template>
  <div>
    <div v-if="!today">
      <div v-for="poll in polls" :key="poll.id" class="header">
        <h1 class="header__title" v-text="poll.title" />
        <hr class="header__br" />
        <div class="header__date">
          PUBLISHED:
          {{ poll.publishedDate | moment("Do, DD MMMM, YYYY, h:mm a") }}
        </div>
      </div>
    </div>
    <div :class="['chart', { chart__today: today }, { chart__poll: !today }]">
      <div class="chart__container">
        <div v-if="today" class="today">
          <span class="today__icon"></span>
          Today's Poll
        </div>
        <div v-for="poll in polls" :key="poll.id" class="poll">
          <div>
            <span
              :class="['poll__title', { 'md-none': !today }]"
              v-text="poll.title"
            />
            <span v-if="today" class="poll__date">{{
              poll.publishedDate | moment("DD MMM YYYY")
            }}</span>
          </div>
          <div class="poll__btns">
            <button
              v-for="(option, i) in poll.answer.options"
              :key="`${poll.id}-${option.id}`"
              :class="['poll__btn', `poll__btn--${i}`]"
              @click="vote(poll.id, option.id)"
              v-text="`${option.label}: ${option.vote}`"
            />
          </div>
        </div>
      </div>
      <highcharts
        class="chart__highcharts"
        :options="options"
        :callback="callback"
      />
      <div class="chart__total">Total number of votes recorded: {{ totalVote }}</div>
    </div>
  </div>
</template>

<script>
import exportingInit from "highcharts/modules/exporting";
import Highcharts from "highcharts";

exportingInit(Highcharts);

export default {
  name: "Chart",
  props: {
    polls: {
      type: Array,
      default: () => [],
    },
    today: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      options: {
        chart: {
          backgroundColor: this.today ? "lightgray" : "lightskyblue",
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
        },
        title: {
          text: "%",
          align: "center",
          verticalAlign: "center",
        },
        tooltip: {
          headerFormat: "{series.name}<br>",
          pointFormat: "{point.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              distance: -30,
              format: "<b>{point.percentage:.1f}",
              style: {
                color: "white",
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            innerSize: "40%",
            name: "Poll",
            data: [
              {
                name: "Yes",
                y: 0,
              },
              {
                name: "No",
                y: 0,
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    totalVote() {
      let total = 0;
      this.polls.forEach((i) => {
        i.answer.options.forEach((j) => {
          total = total + j.vote;
        });
      });
      return total;
    },
  },
  watch: {
    polls: {
      deep: true,
      handler(val) {
        if (!val) return;
        const color = ["orange", "darkblue"];
        const data = val[0]?.answer?.options.map((i, j) => {
          return {
            color: color[j],
            name: i.label,
            y: i.vote,
          };
        });
        this.options.series[0].data = data;
      },
      immediate: true,
    },
  },
  methods: {
    callback(c) {
      const centerY = c.series[0].center[1],
        titleHeight = parseInt(c.title.styles.fontSize);
      c.setTitle({
        y: centerY + titleHeight / 2,
      });
    },
    vote(id, optionId) {
      const info = { id, optionId };
      this.$emit("update:vote", info);
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  &__container {
    width: 70%;
    min-height: 200px;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
  &__highcharts {
    width: 30%;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
  &__poll {
    background-color: lightskyblue;
  }
  &__today {
    background-color: lightgray;
  }
  &__total {
    width: 100%;
    @media screen and (max-width: 600px) {
      text-align: center;
    }
  }
}
.header {
  width: 100%;
  margin-bottom: 20px;
  &__date {
    text-align: right;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
}
.poll {
  &__btns {
    margin-bottom: 20px;
  }
  &__btn {
    border: none;
    display: block;
    padding: 5px;
    margin-bottom: 5px;
    &--0 {
      background-color: orange;
      color: white;
    }
    &--1 {
      background-color: darkblue;
      color: white;
    }
    &--2 {
      background-color: #91ed7d;
      color: white;
    }
    &--3 {
      background-color: #f7a35b;
      color: white;
    }
    &--4 {
      background-color: #8086e8;
      color: white;
    }
    &--5 {
      background-color: #f15d80;
      color: white;
    }
  }
  &__date {
    color: darkblue;
  }
  &__title {
    margin-right: 10px;
    @media screen and (max-width: 600px) {
      display: block;
      margin-right: initial;
      margin-bottom: 10px;
    }
  }
}
.today {
  color: darkblue;
  &__icon {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: darkblue;
    border-radius: 100% 100% 100% 0;
  }
}

.md-none {
  @media screen and (min-width: 600px) {
    display: none;
  }
}
</style>
