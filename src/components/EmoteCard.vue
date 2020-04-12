<template>
  <q-card class="full-height column">
    <q-img contain :src="imageURL" :ratio="4 / 3" />
    <q-card-section class="text-body1 text-grey-14">
      <template v-if="isHighlightCaption">
        <template v-for="(text, i) in highlightCaption[0].texts">
          <mark v-if="text.type === 'hit'" :key="i" class="text-weight-bold">{{
            text.value
          }}</mark>
          <mark v-else-if="text.value === ' '" :key="i">&nbsp;</mark>
          <template v-else>{{ text.value }}</template>
        </template>
      </template>
      <div v-else>{{ caption }}</div>
    </q-card-section>
    <q-card-section class="q-pa-sm">
      <template v-if="isHighlightTags">
        <q-chip
          v-for="(tag, i) in highlightTags"
          :key="i"
          color="light-blue-1"
          size="sm"
        >
          <template v-for="(text, j) in tag.texts">
            <mark
              v-if="text.type === 'hit'"
              :key="j"
              class="text-weight-bold text-pink"
              >{{ text.value }}
            </mark>
            <mark v-else-if="text.value === ' '" :key="j">&nbsp;</mark>
            <template v-else>&nbsp;</template>
          </template>
        </q-chip>
      </template>
      <q-chip
        v-for="tag in remainingTags"
        :key="tag"
        color="light-blue-1"
        size="sm"
        text-color="pink"
        >{{ tag }}</q-chip
      >
    </q-card-section>
    <q-card-actions align="right" class="col items-end">
      <q-btn
        v-if="$store.state.user.username"
        flat
        round
        color="teal"
        :icon="isFavorite ? 'fas fa-bookmark' : 'far fa-bookmark'"
        @click="isFavorite ? onRemoveFromFavorites(id) : onAddToFavorites(id)"
      />
      <q-btn v-if="$store.state.user.username" flat round color="teal">
        <q-icon color="teal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="r-jwli3a r-4qtqp9 r-yyyyoo r-1q142lx r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
          >
            <g>
              <path
                d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"
              />
            </g>
          </svg>
        </q-icon>
      </q-btn>
      <q-btn
        v-if="$store.state.user.role === 'admin'"
        flat
        round
        color="teal"
        icon="far fa-edit"
        :to="`/emote/${id}`"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'EmoteCard',
  props: {
    id: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    highlight: {
      type: Array,
      default() {
        return [];
      },
    },
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    highlightCaption() {
      return this.highlight.filter(highlight => {
        return highlight.path === 'caption';
      });
    },
    highlightTags() {
      return this.highlight.filter(highlight => {
        return highlight.path === 'tags';
      });
    },
    isHighlightCaption() {
      return this.highlight.some(highlight => {
        return highlight.path === 'caption';
      });
    },
    isHighlightTags() {
      return this.highlight.some(highlight => {
        return highlight.path === 'tags';
      });
    },
    imageURL() {
      return `${process.env.EMOTES}/${this.filename}`;
    },
    isFavorite() {
      return this.$store.state.user.favorites.includes(this.id);
    },
    remainingTags() {
      const highlights = this.highlightTags.map(tag => {
        return tag.texts
          .map(text => {
            return text.value;
          })
          .join('');
      });

      return this.tags.filter(tag => {
        return !highlights.includes(tag);
      });
    },
  },
  methods: {
    async onAddToFavorites(id) {
      try {
        const { status } = await this.$axios.post('user/favorites', { id });

        if (status === 204) {
          this.$store.dispatch('user/fetchFavorites');
        }
      } catch (error) {
        console.error(error);
      }
    },
    async onRemoveFromFavorites(id) {
      try {
        const { status } = await this.$axios.delete(`user/favorites/${id}`);

        if (status === 204) {
          this.$store.dispatch('user/fetchFavorites');
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
