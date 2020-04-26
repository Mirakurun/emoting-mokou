<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-9 col-lg-6 offset-lg-2 q-gutter-y-xl">
        <div class="row">
          <div class="col">
            <q-card :bordered="$q.dark.isActive">
              <q-img
                :alt="emote.caption"
                contain
                :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
                :src="`statics/images/emotes/${emote.filename}`"
                :ratio="4 / 3"
                style="max-height: 400px"
              />
              <q-card-actions align="right">
                <add-to-favorites-btn
                  :id="emote.id"
                  flat
                  label="Add to Favorites"
                />
                <add-to-tweet-btn :id="emote.id" flat label="Add to Tweet" />
                <q-btn
                  :color="$q.dark.isActive ? 'cyan' : 'blue'"
                  flat
                  icon="fas fa-expand"
                  label="fullscreen"
                  @click="onToggle"
                />
                <edit-emote-btn :id="emote.id" flat label="Edit" />
              </q-card-actions>
              <q-card-section class="caption">
                <div class="text-h6">
                  {{ emote.caption }}
                </div>
                <div v-if="emote.createdAt" class="text-subtitle1 text-grey">
                  Uploaded on {{ formatCreatedAt }}
                </div>
              </q-card-section>
              <q-card-section>
                <q-chip
                  v-for="(tag, i) in emote.tags"
                  :key="i"
                  :label="tag"
                  :title="tag"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div
          v-if="isSeries"
          :class="[{ 'bg-white': !$q.dark.isActive }, 'row', 'q-py-xl']"
        >
          <div
            class="col-6 offset-3 col-sm-4 offset-sm-4 col-md-4 offset-md-4 col-lg-4 offset-lg-4 q-gutter-y-lg"
          >
            <div class="text-subtitle2">Koma manga</div>
            <div v-for="emote in emote.series" :key="emote.id">
              <router-link :to="`/emotes/${emote.id}`">
                <q-img
                  :src="`statics/images/emotes/${emote.filename}`"
                  :img-style="{ border: '3px solid black' }"
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 gt-sm col-md-3 col-lg-2 offset-lg-2">
        <twitter-timeline :key="timelineKey" />
      </div>
    </div>

    <fullscreen-emote
      id="fullscreen"
      ref="fullscreen"
      :filename="emote.filename"
    />
  </q-page>
</template>

<script>
import AddToFavoritesBtn from 'components/AddToFavoritesBtn';
import AddToTweetBtn from 'components/AddToTweetBtn';
import EditEmoteBtn from 'components/EditEmoteBtn';
import FullscreenEmote from 'components/FullscreenEmote';
import TwitterTimeline from 'components/TwitterTimeline';
import { timelineMixin } from 'mixins/timeline';
import { emoteMixin } from 'mixins/emote';
import { format } from 'date-fns';

export default {
  name: 'EmoteHome',
  components: {
    AddToFavoritesBtn,
    AddToTweetBtn,
    EditEmoteBtn,
    FullscreenEmote,
    TwitterTimeline,
  },
  mixins: [emoteMixin, timelineMixin],
  beforeRouteUpdate(to, from, next) {
    this.emote = {};
    this.fetchEmote(to.params.id);
    next();
  },
  computed: {
    formatCreatedAt() {
      if (this.emote.createdAt) {
        return format(new Date(this.emote.createdAt), 'PPP');
      }
      return null;
    },
  },
  methods: {
    onToggle() {
      this.$refs.fullscreen.toggle();
      const target = this.$el.querySelector('#fullscreen');

      this.$q.fullscreen.toggle(target);
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
}

.q-card--dark {
  background-color: $grey-10;
}

.q-card {
  & ::v-deep .caption {
    color: $grey-14;
  }
}

.q-card--dark {
  & ::v-deep .caption {
    color: $grey-1;
  }
}

.q-chip {
  background-color: $light-blue-1;
  color: $pink;
}

.q-chip--dark {
  background-color: $grey-10;
  border: 1px solid $pink-4;
  color: $light-blue-4;
}
</style>
