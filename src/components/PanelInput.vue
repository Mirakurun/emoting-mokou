<template>
  <div class="q-gutter-y-md">
    <!-- Panel -->
    <q-input
      v-model="input"
      color="teal"
      label="Panel"
      @keyup.enter="onAddPanel"
    >
      <template #prepend>
        <q-icon color="teal" name="fas fa-images" />
      </template>
      <template #append>
        <q-btn
          v-if="panel"
          color="teal"
          round
          dense
          flat
          icon="add"
          @click="onAddPanel"
        />
      </template>
    </q-input>
    <!-- Series -->
    <div class="q-gutter-xs">
      <q-chip
        v-for="item in series"
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
  name: 'PanelInput',
  props: {
    panel: {
      type: String,
      default: '',
    },
    series: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    input: {
      get() {
        return this.panel;
      },
      set(value) {
        this.$emit('update:panel', value);
      },
    },
    comic: {
      get() {
        return this.series;
      },
      set(value) {
        this.$emit('update:series', value);
      },
    },
  },
  methods: {
    onAddPanel() {
      if (!this.series.includes(this.panel)) {
        this.comic.push(this.panel);
        this.input = '';
      }
    },
    onRemove(panel) {
      const index = this.series.indexOf(panel);

      this.comic.splice(index, 1);
    },
  },
};
</script>
