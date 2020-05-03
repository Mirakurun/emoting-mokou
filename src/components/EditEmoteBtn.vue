<template>
  <q-btn
    v-if="$store.state.user.role === 'admin'"
    :color="$q.dark.isActive ? 'cyan' : 'blue'"
    :flat="flat"
    icon="fas fa-pencil-alt"
    :label="label"
    :round="round"
    :unelevated="unelevated"
    :to="`/emotes/${id}/edit`"
  >
    <q-tooltip
      v-if="!label"
      content-class="bg-light-blue"
      content-style="font-size: 12px"
      >Edit</q-tooltip
    >
  </q-btn>
</template>

<script>
export default {
  name: 'EditEmoteBtn',
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
};
</script>
