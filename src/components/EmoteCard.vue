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
          class="text-pink"
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
            <template v-else>{{ text.value }}</template>

            <template v-if="j < tag.texts.length - 1">&zwj;</template>
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
          <add-tweet-icon />
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
import AddTweetIcon from 'components/AddTweetIcon';

export default {
  name: 'EmoteCard',
  components: {
    AddTweetIcon,
  },
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
