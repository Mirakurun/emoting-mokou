<template>
  <div class="q-gutter-y-md">
    <!-- Tag -->
    <q-input v-model="input" color="teal" label="Tag" @keyup.enter="onAddTag">
      <template #prepend>
        <q-icon color="teal" name="fas fa-tag" />
      </template>
      <template #append>
        <q-btn
          v-if="tag"
          color="teal"
          round
          dense
          flat
          icon="add"
          @click="onAddTag"
        />
      </template>
    </q-input>
    <!-- Tags -->
    <div class="q-gutter-xs">
      <q-chip
        v-for="item in tags"
        :key="item"
        color="pink"
        text-color="white"
        removable
        @remove="onRemove(item)"
      >
        {{ item }}
      </q-chip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagInput',
  props: {
    tag: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    input: {
      get() {
        return this.tag;
      },
      set(value) {
        this.$emit('update:tag', value);
      },
    },
    tagList: {
      get() {
        return this.tags;
      },
      set(value) {
        this.$emit('update:tags', value);
      },
    },
  },
  methods: {
    onAddTag() {
      if (!this.tags.includes(this.tag)) {
        this.tagList.push(this.tag);
        this.input = '';
      }
    },
    onRemove(tag) {
      const index = this.tags.indexOf(tag);

      this.tagList.splice(index, 1);
    },
  },
};
</script>
