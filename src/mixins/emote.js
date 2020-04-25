import { axiosInstance } from 'boot/axios';

export const emoteMixin = {
  data() {
    return {
      emote: {},
    };
  },
  created() {
    this.fetchEmote();
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
  methods: {
    async fetchEmote() {
      try {
        const { data, status } = await axiosInstance.get(
          `/emote/${this.$route.params.id}`
        );

        if (status === 200) {
          this.emote = data;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
