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
                :src="`images/emotes/${emote.filename}`"
                :ratio="4 / 3"
                style="max-height: 400px"
              />
              <q-card-actions align="right">
                <add-to-clipboard-btn
                  ref="clipboard"
                  class="gt-xs"
                  :filename="emote.filename"
                  flat
                  label="Add to clipboard"
                />
                <add-to-favorites-btn
                  :id="emote.id"
                  ref="favorite"
                  class="gt-xs"
                  flat
                  :label="
                    this.$store.getters['user/isFavorite'](emote.id)
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                  "
                />
                <add-to-tweet-btn
                  :id="emote.id"
                  ref="tweet"
                  :filename="emote.filename"
                  class="gt-xs"
                  flat
                  label="Add to Tweet"
                />
                <q-btn
                  :class="[{ 'gt-xs': this.$store.state.user.username }]"
                  :color="$q.dark.isActive ? 'cyan' : 'blue'"
                  flat
                  icon="fas fa-expand"
                  :label="$q.screen.gt.xs ? 'fullscreen' : ''"
                  :round="$q.screen.lt.sm"
                  @click="onToggle"
                />
                <edit-emote-btn
                  :id="emote.id"
                  ref="edit"
                  class="gt-xs"
                  flat
                  label="Edit"
                />
                <q-btn
                  v-if="this.$store.state.user.username"
                  :class="[{ 'lt-sm': this.$store.state.user.username }]"
                  :color="$q.dark.isActive ? 'cyan' : 'blue'"
                  icon="more_vert"
                  flat
                  round
                  @click="onShowMore"
                />
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
                  :src="`images/emotes/${emote.filename}`"
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
import AddToClipboardBtn from 'components/AddToClipboardBtn';
import AddToFavoritesBtn from 'components/AddToFavoritesBtn';
import AddToTweetBtn from 'components/AddToTweetBtn';
import EditEmoteBtn from 'components/EditEmoteBtn';
import FullscreenEmote from 'components/FullscreenEmote';
import TwitterTimeline from 'components/TwitterTimeline';
import { timelineMixin } from 'mixins/timeline';
import { emoteMixin } from 'mixins/emote';
import { format } from 'date-fns';
import { axiosInstance } from 'boot/axios';

export default {
  name: 'EmoteHome',
  metaInfo() {
    return {
      title: 'Emoting Mokou',
      titleTemplate: `%s - ${this.emote.caption}`,
      meta: [
        {
          name: 'description',
          content: `${this.emote.caption}`,
        },
      ],
    };
  },
  components: {
    AddToClipboardBtn,
    AddToFavoritesBtn,
    AddToTweetBtn,
    EditEmoteBtn,
    FullscreenEmote,
    TwitterTimeline,
  },
  mixins: [emoteMixin, timelineMixin],
  async beforeRouteEnter(to, from, next) {
    try {
      const { data, status } = await axiosInstance.get(
        `/emote/${to.params.id}`
      );

      if (status === 200) {
        next(vm => {
          vm.emote = data;
        });
      }
    } catch (error) {
      console.error(error);
      next('*');
    }
  },
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
    async fetchEmote(id) {
      try {
        const { data, status } = await this.$axios.get(`/emote/${id}`);

        if (status === 200) {
          this.emote = data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    onShowMore() {
      this.$q
        .bottomSheet({
          actions: [
            {
              color: this.$q.dark.isActive ? 'cyan' : 'blue',
              label: 'Add to clipboard',
              icon: 'far fa-clipboard fa-fw',
              id: 'clipboard',
            },
            {
              classes: [{ hidden: !this.$store.state.user.username }],
              color: this.$q.dark.isActive ? 'cyan' : 'blue',
              label: this.$store.getters['user/isFavorite'](this.emote.id)
                ? 'Remove from favorites'
                : 'Add to favorites',
              icon: this.$store.getters['user/isFavorite'](this.emote.id)
                ? 'fas fa-bookmark fa-fw'
                : 'far fa-bookmark fa-fw',
              id: 'favorite',
            },
            {
              classes: [
                { hidden: !this.$store.state.user.username },
                { disabled: this.$store.state.user.media.length >= 4 },
                'img-fw',
                'svg-color',
              ],
              label: 'Add to tweet',
              img: 'icons/add-tweet.svg',
              id: 'tweet',
            },
            {
              color: this.$q.dark.isActive ? 'cyan' : 'blue',
              label: 'Fullscreen',
              icon: 'fas fa-expand fa-fw',
              id: 'fullscreen',
            },
            {
              classes: [{ hidden: this.$store.state.user.role !== 'admin' }],
              color: this.$q.dark.isActive ? 'cyan' : 'blue',
              label: 'Edit',
              icon: 'fas fa-pencil-alt fa-fw',
              id: 'edit',
            },
          ],
        })
        .onOk(action => {
          switch (action.id) {
            case 'clipboard':
              this.$refs.clipboard.onAddToClipboard(this.emote.filename);
              break;
            case 'favorite':
              if (this.$store.getters['user/isFavorite'](this.emote.id)) {
                this.$refs.favorite.onRemoveFromFavorites(this.emote.id);
              } else {
                this.$refs.favorite.onAddToFavorites(this.emote.id);
              }
              break;
            case 'tweet':
              this.$refs.tweet.onAddToTweet(this.emote.id);
              break;
            case 'fullscreen':
              this.onToggle();
              break;
            default:
              this.$router.push({
                name: 'edit',
                params: { id: this.emote.id },
              });
          }
        });
    },
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
