<template>
  <div>
    <q-img contain :src="$store.state.user.profileBanner">
      <div class="row items-center absolute-bottom">
        <q-avatar class="on-left" size="50px">
          <q-img :src="$store.state.user.profileImage" />
        </q-avatar>
        <div>
          <div class="text-h6">
            {{ $store.state.user.displayName }}
          </div>
          <div class="text-subtitle2">@{{ $store.state.user.username }}</div>
        </div>
      </div>
    </q-img>
    <q-list>
      <!-- Upload -->
      <q-item
        v-if="$store.state.user.role === 'admin'"
        class="text-blue"
        to="/upload"
        clickable
      >
        <q-item-section avatar>
          <q-icon name="fas fa-upload fa-fw" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Upload</q-item-label>
        </q-item-section>
      </q-item>
      <!-- Favorites -->
      <q-item class="text-blue" to="/favorites" clickable>
        <q-item-section avatar>
          <q-icon name="fas fa-bookmark fa-fw" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Favorites</q-item-label>
        </q-item-section>
      </q-item>
      <!-- Dark mode -->
      <q-item v-ripple tag="label" class="text-blue">
        <q-item-section avatar>
          <q-icon name="fas fa-adjust fa-fw fa-flip-horizontal" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dark mode</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            v-model="toggleDarkMode"
            color="positive"
            icon="fas fa-moon"
          />
        </q-item-section>
      </q-item>

      <q-separator inset />

      <!-- Logout -->
      <q-item class="text-grey" clickable @click="onLogout">
        <q-item-section avatar>
          <q-icon name="fas fa-sign-out-alt fa-fw" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'ProfileDropdown',
  computed: {
    toggleDarkMode: {
      get() {
        return this.$store.state.user.darkMode;
      },
      async set(value) {
        try {
          const darkMode = await this.$store.dispatch(
            'user/setDarkMode',
            value
          );

          this.$q.dark.set(darkMode);
        } catch (error) {
          console.error(error);
        }
      },
    },
  },
  methods: {
    async onLogout() {
      const { status } = await this.$axios.get('auth/logout');

      if (status === 204) {
        this.$store.commit('user/clearUser');
        this.$router.replace('/').catch(err => err);
      }
    },
  },
};
</script>
