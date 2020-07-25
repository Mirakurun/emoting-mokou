<template>
  <q-btn
    v-if="$store.state.user.username"
    :color="$q.dark.isActive ? 'cyan' : 'blue'"
    :disable="$store.state.user.media.length >= 4"
    :flat="flat"
    :loading="loading"
    :round="round"
    :unelevated="unelevated"
    @click.prevent="onAddToTweet(id)"
  >
    <q-icon :class="{ 'on-left': label }">
      <add-tweet-icon />
    </q-icon>
    <div>{{ label }}</div>
    <q-tooltip
      v-if="!label"
      content-class="bg-light-blue"
      content-style="font-size: 12px"
      >Add to tweet</q-tooltip
    >
    <template #loading>
      <q-spinner-hourglass />
    </template>
  </q-btn>
</template>

<script>
import AddTweetIcon from 'components/AddTweetIcon';

export default {
  name: 'AddToTweetBtn',
  components: {
    AddTweetIcon,
  },
  props: {
    filename: {
      type: String,
      default: '',
    },
    flat: {
      type: Boolean,
    },
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    round: {
      type: Boolean,
    },
    unelevated: {
      type: Boolean,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onAddToTweet(id) {
      try {
        this.loading = true;
        const { data, status } = await this.$axios.post('/user/media', { id });

        if (status === 201) {
          this.$store.commit('user/addMedia', data);

          const dismiss = this.$q.notify({
            classes: 'notify-icon',
            group: false,
            icon: `img:images/emotes/${this.filename}`,
            message: 'Added to tweet.',
            position: 'top',
            type: 'info',
            actions: [
              {
                icon: 'close',
                color: 'white',
                round: true,
                handler: () => dismiss(),
              },
            ],
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
