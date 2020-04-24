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
