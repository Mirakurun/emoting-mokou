export const emoteMixin = {
  data() {
    return {
      emote: {},
    };
  },
  computed: {
    isSeries() {
      if (Array.isArray(this.emote.series) && this.emote.series.length) {
        return true;
      }
      return false;
    },
    series() {
      if (this.emote.series) {
        return this.emote.series.map(panel => {
          return panel.id;
        });
      }
      return null;
    },
  },
};
