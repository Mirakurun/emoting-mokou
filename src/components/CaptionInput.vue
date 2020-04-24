<template>
  <q-input
    v-model="input"
    bottom-slots
    color="teal"
    :error="error"
    error-message="Required"
    label="Caption"
  >
    <template #prepend>
      <q-icon color="teal" name="fas fa-closed-captioning" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'CaptionInput',
  props: {
    caption: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
    },
  },
  computed: {
    input: {
      get() {
        return this.caption;
      },
      set(value) {
        this.$emit('update:caption', value);
      },
    },
  },
};
</script>
