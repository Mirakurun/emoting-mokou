<template>
  <q-btn
    v-if="$store.state.user.username"
    :color="$q.dark.isActive ? 'cyan' : 'blue'"
    :flat="flat"
    :round="round"
    :unelevated="unelevated"
    @click.prevent="onAddToTweet(id)"
  >
    <q-icon class="on-left">
      <add-tweet-icon />
    </q-icon>
    <div>{{ label }}</div>
    <q-tooltip
      v-if="!label"
      content-class="bg-light-blue"
      content-style="font-size: 12px"
      >Add to tweet</q-tooltip
    >
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
  methods: {
    onAddToTweet(id) {
      console.log(id);
    },
  },
};
</script>
