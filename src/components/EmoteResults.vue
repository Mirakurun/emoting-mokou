<template>
  <div>
    <div class="row q-col-gutter-md">
      <div v-if="emotes.length === 0 && status === 200" class="col text-center">
        <q-img contain src="images/nothing.jpg" style="max-width: 355px" />
        <div class="text-subtitle1 q-mt-md">Nothing found...</div>
      </div>
      <div v-else class="col">
        <transition-group
          appear
          :enter-active-class="
            index > 1 ? 'animated fadeInUp' : 'animated fadeIn'
          "
          tag="div"
          class="row q-col-gutter-md"
        >
          <div
            v-for="emote in emotes"
            :key="emote.id"
            class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
          >
            <emote-card v-bind="emote" />
          </div>
        </transition-group>
      </div>
    </div>
    <div v-if="loading" class="row q-col-gutter-md">
      <div class="col">
        <slot name="loading"></slot>
      </div>
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
    index: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
    },
    status: {
      type: Number,
      required: true,
    },
  },
};
</script>
