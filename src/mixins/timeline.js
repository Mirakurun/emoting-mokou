export const timelineMixin = {
  data() {
    return {
      timelineKey: 0,
    };
  },
  computed: {
    darkMode() {
      return this.$store.state.user.darkMode;
    },
  },
  watch: {
    darkMode() {
      this.timelineKey += 1;
    },
  },
};
