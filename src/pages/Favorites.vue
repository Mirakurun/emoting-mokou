<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-9 col-lg-10">
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
        <emote-results :emotes="data" :loading="loading" :status="status">
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

    <!-- Page scroller -->
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="fas fa-arrow-up" color="teal" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios';
import EmoteResults from 'components/EmoteResults';
import TwitterTimeline from 'components/TwitterTimeline';
import { timelineMixin } from 'mixins/timeline';

export default {
  name: 'PageFavorites',
  metaInfo() {
    return {
      title: 'Emoting Mokou',
      titleTemplate: '%s - Favorites',
      meta: [
        {
          name: 'description',
          content: 'Favorites',
        },
      ],
    };
  },
  components: {
    EmoteResults,
    TwitterTimeline,
  },
  mixins: [timelineMixin],
  data() {
    return {
      data: [],
      loading: false,
      status: 0,
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
        const { data, status } = await this.$axios.get(
          '/user/populate-favorites'
        );

        this.data = data;
        this.loading = false;
        this.status = status;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
