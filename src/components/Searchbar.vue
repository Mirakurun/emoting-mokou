<template>
  <q-input
    v-model="input"
    placeholder="Search emotes..."
    color="teal"
    dense
    :outlined="!$q.dark.isActive"
    :filled="$q.dark.isActive"
    @keyup.enter="onSearch(search)"
  >
    <template #append>
      <q-icon
        class="cursor-pointer"
        color="teal"
        name="fas fa-search"
        size="xs"
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
      required: true,
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
      if (search === '') {
        return;
      }

      this.searchFn(search);
    },
  },
};
</script>
