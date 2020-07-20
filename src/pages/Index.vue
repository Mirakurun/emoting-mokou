<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-9 col-lg-10">
        <div class="row">
          <div class="col">
            <searchbar :search-fn="searchFn" :search.sync="search" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-infinite-scroll
              debounce="1000"
              :disable="$route.name !== 'home'"
              :offset="10"
              @load="onLoad"
            >
              <emote-results
                class="q-pt-md"
                :emotes="data"
                :index="index"
                :status="status"
              />
              <template #loading>
                <div class="row justify-center q-my-xl">
                  <q-spinner-dots color="light-blue" size="xl" />
                </div>
              </template>
            </q-infinite-scroll>
          </div>
        </div>
        <div v-if="done" class="row">
          <div class="col text-subtitle1 text-center q-py-md">
            End of results
          </div>
        </div>
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
import EmoteResults from 'components/EmoteResults';
import TwitterTimeline from 'components/TwitterTimeline';
import Searchbar from 'components/Searchbar';
import { timelineMixin } from 'mixins/timeline';

export default {
  name: 'Index',
  metaInfo() {
    return {
      title: 'Emoting Mokou',
      meta: [
        {
          name: 'description',
          content: 'Home',
        },
      ],
    };
  },
  components: {
    EmoteResults,
    Searchbar,
    TwitterTimeline,
  },
  mixins: [timelineMixin],
  data() {
    return {
      index: 0,
      data: [],
      done: false,
      search: '',
      status: 0,
    };
  },
  computed: {
    aggregated() {
      return this.data.map(val => val.id);
    },
  },
  methods: {
    async onLoad(index, done) {
      this.index = index;

      try {
        const { data, status } = await this.$axios.post(
          `/emote/random?index=${index}&size=18`,
          {
            aggregated: this.aggregated,
          }
        );

        if (status === 200) {
          this.status = status;
          if (data.length) {
            this.data = this.data.concat(data);
            done();
          } else {
            done(true);
            this.done = true;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    searchFn() {
      this.$router.push({ name: 'search', query: { query: this.search } });
    },
  },
};
</script>
