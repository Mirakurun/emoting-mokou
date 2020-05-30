<template>
  <q-input
    v-model="input"
    placeholder="Search emotes..."
    clearable
    clear-icon="close"
    color="teal"
    dense
    :outlined="!$q.dark.isActive"
    :filled="$q.dark.isActive"
    @keyup.enter="onSearch(search)"
  >
    <template #after>
      <q-btn
        class="full-height"
        color="teal"
        icon="fas fa-search"
        size="sm"
        unelevated
        @click="onSearch(search)"
      />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'Searchbar',
  props: {
    searchFn: {
      type: Function,
      required: true,
    },
    search: {
      type: String,
      default: '',
    },
  },
  computed: {
    input: {
      get() {
        return this.search;
      },
      set(value) {
        this.$emit('update:search', value);
      },
    },
  },
  methods: {
    onSearch(search) {
      if (search && search !== this.$route.query.query) {
        this.searchFn(search);
      }
    },
  },
};
</script>
