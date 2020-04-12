<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-9 col-lg-10">
        <div class="row">
          <div class="col">
            <q-input
              v-model="search"
              placeholder="Search emotes..."
              dense
              rounded
              outlined
              @keyup.enter="fetchEmote"
            >
              <template #append>
                <q-icon
                  class="cursor-pointer"
                  name="fas fa-search"
                  @click="fetchEmote"
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
      <div class="col-12 gt-sm col-md-3 col-lg-2">twitter</div>
    </div>
  </q-page>
</template>

<script>
import EmoteCard from 'components/EmoteCard';

export default {
  name: 'PageIndex',
  components: {
    EmoteCard,
  },
  data() {
    return {
      search: '',
      data: [],
    };
  },
  created() {
    this.fetchRandomEmotes();
  },
  methods: {
    async fetchEmote() {
      try {
        const { data } = await this.$axios.get(`emote?query=${this.search}`);

        this.data = data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRandomEmotes() {
      try {
        const { data } = await this.$axios.get('emote/random?size=20');

        this.data = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
