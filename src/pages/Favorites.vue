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
        <emote-results :emotes="data" :loading="loading">
          <template #loading>
            <div class="row justify-center">
              <q-spinner-dots color="light-blue" size="xl" />
            </div>
          </template>
        </emote-results>
      </div>
      <div class="col-12 gt-sm col-md-3 col-lg-2">
        <twitter-timeline :key="timelineKey" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios';
import EmoteResults from 'components/EmoteResults';
import TwitterTimeline from 'components/TwitterTimeline';
import { timelineMixin } from 'mixins/timeline';

export default {
  name: 'PageFavorites',
  components: {
    EmoteResults,
    TwitterTimeline,
  },
  mixins: [timelineMixin],
  data() {
    return {
      data: [],
      loading: false,
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
        this.loading = true;
        const { data } = await this.$axios.get('/user/populate-favorites');

        this.data = data;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
