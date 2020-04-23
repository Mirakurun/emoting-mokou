<template>
  <q-dialog v-model="dialog" :maximized="true">
    <div
      :class="[
        $q.dark.isActive ? 'bg-black' : 'bg-white',
        'flex',
        'flex-center',
      ]"
    >
      <q-img
        contain
        :src="`statics/images/emotes/${filename}`"
        :height="height"
        :width="width"
        @load="load"
      />
      <q-btn
        class="absolute-bottom-right"
        flat
        icon="fas fa-compress"
        size="lg"
        :text-color="$q.dark.isActive ? 'cyan' : 'grey-14'"
        @click="toggle"
      />
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'FullscreenEmote',
  props: {
    filename: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
      height: null,
      width: null,
    };
  },
  methods: {
    load(src) {
      const image = new Image();
      const res = src.split('statics');

      image.src = `statics${res[1]}`;
      image.onload = () => {
        this.height = `${image.naturalHeight}px`;
        this.width = `${image.naturalWidth}px`;
      };
    },
    toggle() {
      this.dialog = !this.dialog;
      this.$q.fullscreen.exit();
    },
  },
};
</script>
