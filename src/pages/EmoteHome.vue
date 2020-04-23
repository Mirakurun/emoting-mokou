<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-9 col-lg-6 offset-lg-2">
        <q-card :bordered="$q.dark.isActive">
          <q-img
            :alt="data.caption"
            contain
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
            :src="`statics/images/emotes/${data.filename}`"
            :ratio="4 / 3"
            style="max-height: 400px"
          />
          <q-card-actions align="right">
            <add-to-favorites-btn :id="data.id" flat label="Add to Favorites" />
            <add-to-tweet-btn :id="data.id" flat label="Add to Tweet" />
            <q-btn
              :color="$q.dark.isActive ? 'cyan' : 'blue'"
              flat
              icon="fas fa-expand"
              label="fullscreen"
              @click="onToggle"
            />
            <edit-emote-btn :id="data.id" flat label="Edit" />
          </q-card-actions>
          <q-card-section class="text-h6 caption">
            <div>{{ data.caption }}</div>
            <div class="text-subtitle2 text-grey">
              Uploaded on {{ formatCreatedAt }}
            </div>
          </q-card-section>
          <q-card-section>
            <q-chip
              v-for="(tag, i) in data.tags"
              :key="i"
              :label="tag"
              :title="tag"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 gt-sm col-md-3 col-lg-2 offset-lg-2">
        <twitter-timeline :key="timelineKey" />
      </div>
    </div>

    <fullscreen-emote
      id="fullscreen"
      ref="fullscreen"
      :filename="data.filename"
    />
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios';
import AddToFavoritesBtn from 'components/AddToFavoritesBtn';
import AddToTweetBtn from 'components/AddToTweetBtn';
import EditEmoteBtn from 'components/EditEmoteBtn';
import FullscreenEmote from 'components/FullscreenEmote';
import TwitterTimeline from 'components/TwitterTimeline';
import { timelineMixin } from 'mixins/timeline';
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
  mixins: [timelineMixin],
  data() {
    return {
      data: {},
    };
  },
  computed: {
    formatCreatedAt() {
      if (this.data.createdAt) {
        return format(new Date(this.data.createdAt), 'PPP');
      }
      return null;
    },
  },
  created() {
    this.fetchEmote();
  },
  methods: {
    async fetchEmote() {
      try {
        const { data, status } = await axiosInstance.get(
          `/emote/${this.$route.params.id}`
        );

        if (status === 200) {
          this.data = data;
        }
      } catch (error) {
        console.error(error);
      }
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
