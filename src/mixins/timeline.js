export const timelineMixin = {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.timelineKey += 1;
    });
  },
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
