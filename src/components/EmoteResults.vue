<template>
  <div class="row q-col-gutter-md">
    <div v-if="loading" class="col">
      <slot name="loading"></slot>
    </div>
    <div
      v-for="(emote, index) in emotes"
      :key="index"
      class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
    >
      <emote-card v-bind="emote" />
    </div>
  </div>
</template>

<script>
import EmoteCard from 'components/EmoteCard';

export default {
  name: 'EmoteResults',
  components: { EmoteCard },
  props: {
    emotes: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
    },
  },
};
</script>
