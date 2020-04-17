<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-9 col-lg-10">
        <div class="row">
          <div class="col">
            <searchbar :search-fn="searchFn" :search.sync="search" />
          </div>
        </div>
        <div class="row q-pt-md q-col-gutter-md">
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
import EmoteCard from 'components/EmoteCard';
import TwitterTimeline from 'components/TwitterTimeline';
import Searchbar from 'components/Searchbar';
import { timelineMixin } from 'mixins/timeline';

export default {
  name: 'PageSearch',
  components: {
    EmoteCard,
    Searchbar,
    TwitterTimeline,
  },
  mixins: [timelineMixin],
  props: {
    query: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      search: '',
      data: [],
    };
  },
  watch: {
    $route(to) {
      this.onSearch(to.query.query);
    },
  },
  created() {
    this.onSearch(this.query);
  },
  methods: {
    async onSearch(query) {
      try {
        const { data } = await this.$axios.get(`emote?query=${query}`);

        this.data = data;
      } catch (error) {
        console.error(error);
      }
    },
    searchFn() {
      this.$router.push({ query: { query: this.search } });
    },
  },
};
</script>
