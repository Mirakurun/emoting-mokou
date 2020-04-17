<template>
  <q-page padding>
    <q-infinite-scroll debounce="1000" :offset="10" @load="onLoad">
      <div id="infinite-scroll" class="row">
        <div class="col-12 col-sm-12 col-md-9 col-lg-10">
          <div class="row">
            <div class="col">
              <q-input
                v-model="search"
                placeholder="Search emotes..."
                color="teal"
                dense
                :outlined="!$q.dark.isActive"
                :filled="$q.dark.isActive"
                @keyup.enter="onSearch"
              >
                <template #append>
                  <q-icon
                    class="cursor-pointer"
                    color="teal"
                    name="fas fa-search"
                    size="xs"
                    @click="onSearch"
                  />
                </template>
              </q-input>
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
      <template #loading>
        <div class="row justify-center q-my-xl">
          <q-spinner-dots color="light-blue" size="xl" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script>
import EmoteCard from 'components/EmoteCard';
import TwitterTimeline from 'components/TwitterTimeline';
import { timelineMixin } from 'mixins/timeline';

export default {
  name: 'PageIndex',
  components: {
    EmoteCard,
    TwitterTimeline,
  },
  mixins: [timelineMixin],
  data() {
    return {
      data: [],
      search: '',
    };
  },
  computed: {
    aggregated() {
      return this.data.map(val => val.id);
    },
  },
  methods: {
    async onLoad(index, done) {
      try {
        const { data, status } = await this.$axios.post(
          `emote/random?index=${index}&size=18`,
          {
            aggregated: this.aggregated,
          }
        );

        if (status === 200) {
          if (data.length) {
            this.data = this.data.concat(data);
            done();
          } else {
            done(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    onSearch() {
      this.$router.push({ name: 'search', query: { query: this.search } });
    },
  },
};
</script>
