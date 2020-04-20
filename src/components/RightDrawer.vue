<template>
  <q-drawer v-model="rightDrawerOpen" behavior="mobile" side="right">
    <profile-dropdown />
  </q-drawer>
</template>

<script>
import ProfileDropdown from 'components/ProfileDropdown';

export default {
  name: 'RightDrawer',
  components: {
    ProfileDropdown,
  },
  data() {
    return {
      rightDrawerOpen: false,
    };
  },
  methods: {
    open() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
  },
};
</script>
