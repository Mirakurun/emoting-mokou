<template>
  <q-card :bordered="$q.dark.isActive" class="full-height column">
    <q-img contain :src="imageURL" :ratio="4 / 3" />
    <q-card-section class="text-body1 caption">
      <template v-if="isHighlightCaption">
        <template v-for="(text, i) in highlightCaption[0].texts">
          <mark v-if="text.type === 'hit'" :key="i" class="text-weight-bold">{{
            text.value
          }}</mark>
          <mark v-else-if="text.value === ' '" :key="i">&nbsp;</mark>
          <template v-else>{{ text.value }}</template>
        </template>
      </template>
      <template v-else>
        {{ caption }}
      </template>
    </q-card-section>
    <q-card-section class="q-pa-sm" style="max-width: 100%">
      <template v-if="isHighlightTags" style="max-width: 100%">
        <q-chip
          v-for="(tag, i) in highlightTags"
          :key="i"
          class="q-ml-none"
          dense
        >
          <div class="ellipsis">
            <template v-for="(text, j) in tag.texts">
              <mark
                v-if="text.type === 'hit'"
                :key="j"
                class="text-weight-bold"
                >{{ text.value }}</mark
              >
              <mark v-else-if="text.value === ' '" :key="j">&nbsp;</mark>
              <template v-else>{{ text.value }}</template>
            </template>
          </div>
        </q-chip>
      </template>
      <q-chip
        v-for="tag in remainingTags"
        :key="tag"
        class="q-ml-none"
        dense
        :label="tag"
      />
    </q-card-section>
    <q-card-actions align="right" class="col items-end">
      <q-btn
        v-if="$store.state.user.username"
        flat
        round
        color="blue"
        :icon="isFavorite ? 'fas fa-bookmark' : 'far fa-bookmark'"
        @click="isFavorite ? onRemoveFromFavorites(id) : onAddToFavorites(id)"
      />
      <q-btn v-if="$store.state.user.username" flat round color="blue">
        <q-icon color="blue">
          <add-tweet-icon />
        </q-icon>
      </q-btn>
      <q-btn
        v-if="$store.state.user.role === 'admin'"
        flat
        round
        color="blue"
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

<style lang="scss" scoped>
.q-card--dark {
  background-color: $blue-grey-10;
}

.q-card {
  & ::v-deep .caption {
    color: $grey-14;
  }
}

.q-card--dark {
  & ::v-deep .caption {
    color: $grey-4;
  }
}

.q-chip {
  background-color: $light-blue-1;
  color: $pink;
  max-width: 100%;
}

.q-chip mark {
  color: $pink;
}

.q-chip--dark {
  background-color: $blue-grey-10;
  border: 1px solid $pink-4;
  color: $light-blue-4;
}

.q-chip--dark mark {
  color: $light-blue;
}
</style>
