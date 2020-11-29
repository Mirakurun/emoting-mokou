<template>
  <q-dialog v-model="dialog" :maximized="true" transition-show="fade">
    <div
      :class="[
        $q.dark.isActive ? 'bg-black' : 'bg-white',
        'flex',
        'flex-center',
      ]"
    >
      <q-btn
        class="absolute-top-right q-ma-sm-md"
        flat
        icon="fas fa-times"
        size="lg"
        round
        :text-color="$q.dark.isActive ? 'cyan' : 'grey-14'"
        @click="toggle"
      />
      <q-img
        basic
        contain
        :src="`images/emotes/${filename}`"
        :height="height"
        :width="width"
        @load="load"
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

      image.src = src;
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
