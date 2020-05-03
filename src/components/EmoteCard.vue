<template>
  <router-link :to="`/emotes/${id}`">
    <q-card :bordered="$q.dark.isActive" class="full-height column">
      <q-img
        :alt="caption"
        contain
        :src="`statics/images/emotes/${filename}`"
        :ratio="4 / 3"
      />
      <q-card-section class="text-body1 caption">
        <div :title="caption">
          <template v-if="isHighlightCaption">
            <template v-for="(text, i) in highlightCaption[0].texts">
              <mark
                v-if="text.type === 'hit'"
                :key="i"
                class="text-weight-bold"
                >{{ text.value }}</mark
              >
              <mark v-else-if="text.value === ' '" :key="i">&nbsp;</mark>
              <template v-else>{{ text.value }}</template>
            </template>
          </template>
          <template v-else>
            {{ caption }}
          </template>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-sm" style="max-width: 100%">
        <template v-if="isHighlightTags" style="max-width: 100%">
          <q-chip
            v-for="(tag, i) in highlightTags"
            :key="i"
            class="q-ml-none"
            dense
            :title="tag"
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
          :title="tag"
        />
      </q-card-section>
      <q-card-actions align="right" class="col items-end">
        <add-to-favorites-btn :id="id" flat round />
        <add-to-tweet-btn :id="id" :filename="filename" flat round />
        <edit-emote-btn :id="id" flat round />
      </q-card-actions>
    </q-card>
  </router-link>
</template>

<script>
import AddToFavoritesBtn from 'components/AddToFavoritesBtn';
import AddToTweetBtn from 'components/AddToTweetBtn';
import EditEmoteBtn from 'components/EditEmoteBtn';

export default {
  name: 'EmoteCard',
  components: {
    AddToFavoritesBtn,
    AddToTweetBtn,
    EditEmoteBtn,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    filename: {
      type: String,
      default: '',
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
};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
}

.q-card {
  transition: all 0.2s ease-in-out;
}

.q-card:hover {
  transform: scale(1.05);
  box-shadow: $shadow-10;
}

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
