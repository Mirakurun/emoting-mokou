<template>
  <q-page
    padding
    :class="{
      flex: !$store.state.user.favorites.length,
      'flex-center': !$store.state.user.favorites.length,
    }"
  >
    <div v-if="!$store.state.user.favorites.length">
      Nothing here...
    </div>
    <div class="row q-col-gutter-md">
      <div
        v-for="(emote, index) in data"
        :key="index"
        class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
      >
        <emote-card v-bind="emote" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios';
import EmoteCard from 'components/EmoteCard';

export default {
  name: 'PageFavorites',
  components: {
    EmoteCard,
  },
  data() {
    return {
      data: [],
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const { status } = await axiosInstance.get('user/profile');

      if (status === 200) {
        next();
      }
    } catch (error) {
      console.error(error);
      next('*');
    }
  },
  created() {
    this.populateFavorites();
  },
  methods: {
    async populateFavorites() {
      try {
        const { data } = await this.$axios.get('/user/populate-favorites');

        this.data = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
