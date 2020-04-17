<template>
  <q-page
    padding
    :class="{
      flex: !$store.state.user.favorites.length,
      'flex-center': !$store.state.user.favorites.length,
    }"
  >
    <div class="row">
      <div class="col-12 col-sm-12 col-md-9 col-lg-10">
        <div v-if="!$store.state.user.favorites.length">
          Nothing here...
        </div>
        <div class="row">
          <div
            :class="[
              { 'text-grey-14': !$q.dark.isActive },
              'text-h4',
              'q-my-md',
            ]"
          >
            Favorites
          </div>
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
      </div>
      <div class="col-12 gt-sm col-md-3 col-lg-2">
        <twitter-timeline :key="timelineKey" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios';
import EmoteCard from 'components/EmoteCard';
import TwitterTimeline from 'components/TwitterTimeline';
import { timelineMixin } from 'mixins/timeline';

export default {
  name: 'PageFavorites',
  components: {
    EmoteCard,
    TwitterTimeline,
  },
  mixins: [timelineMixin],
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
