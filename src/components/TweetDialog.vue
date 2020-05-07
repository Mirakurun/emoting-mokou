<template>
  <q-dialog
    :key="key"
    v-model="dialog"
    :maximized="$q.screen.lt.sm"
    :position="$q.screen.lt.sm ? 'standard' : 'top'"
    :transition-show="null"
    :transition-hide="null"
    @show="onShow"
  >
    <q-card style="width: 600px;">
      <q-card-section class="row items-center">
        <div class="text-h6">Compose tweet</div>
        <q-space />
        <q-btn
          v-close-popup
          color="grey"
          icon="close"
          flat
          round
          dense
          @click="toggle"
        />
      </q-card-section>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section avatar class="q-pr-none q-pb-none">
          <q-avatar size="50px">
            <q-img basic :src="$store.state.user.profileImage" />
          </q-avatar>
        </q-card-section>
        <q-card-section class="col q-px-xs q-pb-none">
          <!-- Editor -->
          <q-editor
            ref="editor"
            v-model="tweet"
            :content-style="{ 'font-size': '18px' }"
            flat
            :toolbar="[]"
            @keydown.delete="onKeydown"
            @keyup.delete="onKeyup"
          />
        </q-card-section>
      </q-card-section>
      <q-banner v-if="$store.getters['user/isEmptyMedia']">
        <template #avatar>
          <q-img src="statics/images/comfy.png" style="width: 100px;" />
        </template>
        Add at least 1 emote before you can tweet.
      </q-banner>
      <q-card-section v-else class="q-gutter-xs">
        <q-img
          v-for="(filename, i) in $store.state.user.media"
          :key="i"
          :src="`statics/images/emotes/${filename}`"
          basic
          class="bg-grey-8"
          contain
          style="height: 128px; width: 128px;"
        >
          <div
            class="absolute-top-right"
            style="
              padding: 0 !important;
              margin: 4px 4px 0 0;
              border-radius: 50%;
            "
          >
            <q-btn
              :disable="isDisabled"
              flat
              icon="close"
              :loading="isLoading(i)"
              round
              size="sm"
              @click="onRemoveFromTweet(i)"
            />
          </div>
        </q-img>
      </q-card-section>
      <q-card-actions class="q-pa-md" align="between">
        <q-btn color="blue" flat round>
          <q-icon><emoji-icon /></q-icon>
          <q-popup-proxy :transition-show="null" :transition-hide="null">
            <static-picker
              :data="index"
              emoji="smile"
              set="twitter"
              theme="dark"
              title="Choose your emoji..."
              @select="onSelect"
            />
          </q-popup-proxy>
        </q-btn>
        <div>
          <q-circular-progress
            :class="[{ invisible: !tweet }, 'on-left']"
            color="grey-9"
            font-size="0.41em"
            :track-color="progressColor"
            reverse
            :show-value="charLimit - parseText.weightedLength <= 20"
            size="md"
            :min="0"
            :max="charLimit"
            :value="Math.max(charLimit - parseText.weightedLength, 0)"
          >
            <template>
              {{ charLimit - parseText.weightedLength }}
            </template>
          </q-circular-progress>
          <q-btn
            color="blue"
            label="Tweet"
            :disable="
              isDisabled ||
                $store.getters['user/isEmptyMedia'] ||
                !parseText.valid
            "
            :loading="isTweeting"
            no-caps
            :percentage="percentage"
            rounded
            unelevated
            @click="onTweet"
          >
            <template #loading>
              <q-spinner-hourglass />
            </template>
          </q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import twitter from 'twitter-text';
import { openURL } from 'quasar';
import EmojiIcon from 'components/EmojiIcon';
import dataset from 'emoji-mart-vue-fast/data/twitter.json';
import { StaticPicker, EmojiIndex } from 'emoji-mart-vue-fast';
import 'emoji-mart-vue-fast/css/emoji-mart.css';
import { parse } from 'twemoji-parser';

export default {
  name: 'TweetDialog',
  components: {
    EmojiIcon,
    StaticPicker,
  },
  data() {
    return {
      key: 0,
      charLimit: 280,
      currentLoading: null,
      dialog: false,
      index: null,
      isDisabled: false,
      isTweeting: false,
      percentage: 0,
      tweet: '',
    };
  },
  computed: {
    parseText() {
      return twitter.parseTweet(this.text);
    },
    progressColor() {
      if (280 - this.parseText.weightedLength <= 0) {
        return 'pink';
      }
      if (280 - this.parseText.weightedLength <= 20) {
        return 'orange';
      }
      return 'blue';
    },
    text() {
      return new DOMParser().parseFromString(this.special, 'text/html').body
        .textContent;
    },
    special() {
      if (this.tweet.length > 0) {
        let string = new DOMParser().parseFromString(this.tweet, 'text/html')
          .body.innerHTML;

        const elements = string.match(/<[^>]*>/g);

        if (elements.length > 0) {
          elements.forEach(html => {
            const entities = parse(html);
            if (entities.length > 0) {
              string = string.replace(html, entities[0].text);
            }
          });
          return string;
        }
        return '';
      }
      return '';
    },
  },
  mounted() {
    this.index = new EmojiIndex(dataset);
  },
  methods: {
    isLoading(i) {
      return this.currentLoading === i;
    },
    fetchBlob(filename) {
      return this.$axios.get(`/statics/images/emotes/${filename}`, {
        baseURL: '/',
        responseType: 'blob',
      });
    },
    async onRemoveFromTweet(index) {
      try {
        this.isDisabled = true;
        this.currentLoading = index;
        const { status } = await this.$axios.delete(`user/media/${index}`);

        if (status === 204) {
          this.$store.commit('user/deleteMedia', index);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.currentLoading = null;
      }
    },
    onSelect(emoji) {
      // /<[^>]*>/g
      const entities = parse(emoji.native);
      const { url } = entities[0];
      // const html = `<span contenteditable="false" style="background-image: url(${url});
      //               background-size: 1em 1em; padding: 0.20em; background-position: center center;
      //               background-repeat: no-repeat; -webkit-text-fill-color: transparent;">${emoji.native}</span>`;
      // const html = `<q-icon name="img:${url}" size="1em"></q-icon>`;
      const html = `<img src="${url}" alt="${emoji.native}" style="width: 1em; height: 1em;">`;
      this.$refs.editor.runCmd('insertHTML', html, false);
    },
    onShow() {
      this.$refs.editor.runCmd('insertHTML', '<div><br></div>', false);
    },
    async onTweet() {
      try {
        this.isDisabled = true;
        this.isTweeting = true;

        const promises = this.$store.state.user.media.map(filename => {
          return this.fetchBlob(filename);
        });

        const responses = await Promise.all(promises);

        const blobs = responses.map(response => {
          return response.data;
        });

        const formData = new FormData();

        formData.append('text', this.text);

        blobs.forEach(blob => {
          formData.append('images', blob);
        });

        const { data, status } = await this.$axios.post(
          '/twitter/tweet',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: progressEvent => {
              this.percentage = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            },
          }
        );

        if (status === 200) {
          const dismiss = this.$q.notify({
            group: false,
            message: 'Your tweet was sent.',
            multiLine: false,
            position: 'top',
            timeout: 0,
            type: 'positive',
            actions: [
              {
                color: 'white',
                'icon-right': 'open_in_new',
                label: 'View',
                handler: () => openURL(data),
              },
              {
                color: 'white',
                icon: 'close',
                round: true,
                handler: () => dismiss(),
              },
            ],
          });

          this.tweet = '';
          this.$store.commit('user/clearMedia');
          this.toggle();
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isDisabled = false;
        this.isTweeting = false;
      }
    },
    toggle() {
      this.dialog = !this.dialog;
    },
    onKeydown(e) {
      if (e.which === 8 && this.text.length === 0) {
        e.preventDefault();
      }
    },
    onKeyup(e) {
      if (e.which === 8 && this.text.length === 0 && this.tweet === '<br>') {
        this.$refs.editor.runCmd('insertHTML', '<div><br></div>', false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.q-editor {
  color: $grey-10;
}

.q-editor.q-dark {
  color: $grey-4;
}

.q-editor {
  & ::v-deep img {
    width: 1em;
    height: 1em;
  }
}

.body--dark .emoji-mart {
  color: #fff;
  border: 1px solid #d9d9d9;
  border-color: #555453;
  background: #222;
}
</style>