<template>
  <q-page padding>
    <div class="row">
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
              @keyup.enter="onSearch(search)"
            >
              <template #append>
                <q-icon
                  class="cursor-pointer"
                  color="teal"
                  name="fas fa-search"
                  size="xs"
                  @click="onSearch(search)"
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
  </q-page>
</template>

<script>
import EmoteCard from 'components/EmoteCard';
import TwitterTimeline from 'components/TwitterTimeline';
import { timelineMixin } from 'mixins/timeline';

export default {
  name: 'PageSearch',
  components: {
    EmoteCard,
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
  },
};
</script>
