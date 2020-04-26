import { axiosInstance } from 'boot/axios';

export const emoteMixin = {
  data() {
    return {
      emote: {},
    };
  },
  created() {
    this.fetchEmote(this.$route.params.id);
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
    async fetchEmote(id) {
      try {
        const { data, status } = await axiosInstance.get(`/emote/${id}`);

        if (status === 200) {
          this.emote = data;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
