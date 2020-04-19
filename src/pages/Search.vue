<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-9 col-lg-10">
        <div class="row">
          <div class="col">
            <searchbar :search-fn="searchFn" :search.sync="search" />
          </div>
        </div>
        <div class="row q-pt-md">
          <div class="text-subtitle1">
            {{ data.length }} search result(s) for
            <span class="text-weight-bold">"{{ query }}"</span>
          </div>
        </div>
        <emote-results class="q-pt-md" :emotes="data" :loading="loading">
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
import EmoteResults from 'components/EmoteResults';
import TwitterTimeline from 'components/TwitterTimeline';
import Searchbar from 'components/Searchbar';
import { timelineMixin } from 'mixins/timeline';

export default {
  name: 'PageSearch',
  components: {
    EmoteResults,
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
      loading: false,
    };
  },
  watch: {
    $route(to) {
      const { query } = to.query;
      this.onSearch(query);
      this.search = query;
    },
  },
  created() {
    this.onSearch(this.query);
  },
  methods: {
    async onSearch(query) {
      try {
        this.search = query;
        this.loading = true;
        const { data } = await this.$axios.get(`emote?query=${query}`);

        this.data = data;
        this.loading = false;
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
