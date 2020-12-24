<template>
  <q-btn
    :color="$q.dark.isActive ? 'cyan' : 'blue'"
    :flat="flat"
    icon="far fa-clipboard"
    :label="label"
    :round="round"
    :unelevated="unelevated"
    @click.prevent="onAddToClipboard(filename)"
  >
    <q-tooltip
      v-if="!label"
      content-class="bg-light-blue"
      content-style="font-size: 12px"
      >Add to clipboard</q-tooltip
    >
  </q-btn>
</template>

<script>
export default {
  name: 'AddToClipboardBtn',
  props: {
    filename: {
      type: String,
      default: '',
    },
    flat: {
      type: Boolean,
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
  methods: {
    fetchBlob(filename) {
      return this.$axios.get(
        `/images/emotes/${filename.split('.jpg')[0]}.png`,
        {
          baseURL: '/',
          responseType: 'blob',
        }
      );
    },
    async onAddToClipboard(filename) {
      try {
        const { data: blob } = await this.fetchBlob(filename);
        const image = [new ClipboardItem({ [blob.type]: blob })];
        await navigator.clipboard.write(image);

        const dismiss = this.$q.notify({
          classes: 'notify-icon',
          group: false,
          icon: `img:images/emotes/${this.filename}`,
          message: 'Added to clipboard.',
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
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
