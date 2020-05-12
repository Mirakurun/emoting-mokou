<template>
  <q-drawer
    v-model="rightDrawerOpen"
    behavior="mobile"
    :no-swipe-open="$q.screen.gt.xs"
    side="right"
  >
    <q-list v-if="!$store.state.user.username">
      <q-item v-ripple clickable tag="a" :href="`${apiURI}/auth/twitter`">
        <q-item-section avatar>
          <q-icon name="fab fa-twitter fa-fw" left style="color: #1da1f2" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Login</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator inset />
      <agreements />
    </q-list>
    <profile-dropdown v-if="$store.state.user.username" />
  </q-drawer>
</template>

<script>
import Agreements from 'components/Agreements';
import ProfileDropdown from 'components/ProfileDropdown';

export default {
  name: 'RightDrawer',
  components: {
    Agreements,
    ProfileDropdown,
  },
  data() {
    return {
      rightDrawerOpen: false,
    };
  },
  computed: {
    apiURI() {
      return process.env.API;
    },
  },
  methods: {
    toggle() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.q-item {
  color: $blue;
}

.q-item--dark {
  color: $blue;
}
</style>
