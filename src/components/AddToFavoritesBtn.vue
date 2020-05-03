<template>
  <q-btn
    v-if="$store.state.user.username"
    :color="$q.dark.isActive ? 'cyan' : 'blue'"
    :flat="flat"
    :icon="
      $store.getters['user/isFavorite'](id)
        ? 'fas fa-bookmark'
        : 'far fa-bookmark'
    "
    :label="label"
    :loading="loading"
    :round="round"
    :unelevated="unelevated"
    @click.prevent="
      $store.getters['user/isFavorite'](id)
        ? onRemoveFromFavorites(id)
        : onAddToFavorites(id)
    "
  >
    <template #loading>
      <q-spinner-hourglass />
    </template>
    <q-tooltip
      v-if="!label"
      content-class="bg-light-blue"
      content-style="font-size: 12px"
      >{{
        $store.getters['user/isFavorite'](id)
          ? 'Remove from favorites'
          : 'Add to favorites'
      }}</q-tooltip
    >
  </q-btn>
</template>

<script>
export default {
  name: 'AddToFavoritesBtn',
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
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onAddToFavorites(id) {
      try {
        this.loading = true;
        const { status } = await this.$axios.post('user/favorites', { id });

        if (status === 204) {
          this.$store.dispatch('user/fetchFavorites');
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async onRemoveFromFavorites(id) {
      try {
        this.loading = true;
        const { status } = await this.$axios.delete(`user/favorites/${id}`);

        if (status === 204) {
          this.$store.dispatch('user/fetchFavorites');
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
