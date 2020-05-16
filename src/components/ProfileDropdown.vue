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
        v-ripple
        :active-class="
          $q.dark.isActive
            ? 'text-blue-2 bg-blue-grey-10'
            : 'text-blue-10 bg-blue-1'
        "
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
      <q-item
        v-ripple
        :active-class="
          $q.dark.isActive
            ? 'text-blue-3 bg-blue-grey-10'
            : 'text-blue-10 bg-blue-1'
        "
        to="/favorites"
        clickable
        exact
      >
        <q-item-section avatar>
          <q-icon name="fas fa-bookmark fa-fw" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Favorites</q-item-label>
        </q-item-section>
      </q-item>
      <!-- Dark mode -->
      <q-item v-ripple tag="label">
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

      <q-separator class="lt-sm" inset />

      <agreements />

      <q-separator inset />

      <!-- Delete account -->
      <q-item v-ripple class="text-red" clickable @click="onOpenDialog">
        <q-item-section avatar>
          <q-icon name="fas fa-trash-alt fa-fw" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Delete account</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator inset />

      <!-- Logout -->
      <q-item v-ripple class="text-grey" clickable @click="onLogout">
        <q-item-section avatar>
          <q-icon name="fas fa-sign-out-alt fa-fw" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="dialog" :maximized="$q.screen.lt.sm">
      <q-card style="width: 600px;">
        <q-card-section class="row items-center">
          <q-icon
            class="on-left text-red"
            name="fas fa-exclamation-triangle"
            size="md"
          />
          <div class="text-h6 text-red">Delete account</div>
          <q-space />
          <q-btn
            v-close-popup
            color="grey"
            icon="close"
            flat
            round
            dense
            @click="dialog = false"
          />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div
            :class="[$q.dark.isActive ? 'white' : 'text-grey-14', 'text-body1']"
          >
            Are you sure you want to delete your account from this app?
          </div>
        </q-card-section>

        <q-card-actions class="q-pa-md" align="right">
          <q-btn color="grey" flat label="cancel" @click="dialog = false" />
          <q-btn color="red" label="delete" unelevated @click="onDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Agreements from 'components/Agreements';

export default {
  name: 'ProfileDropdown',
  components: {
    Agreements,
  },
  data() {
    return {
      dialog: false,
      input: '',
    };
  },
  computed: {
    toggleDarkMode: {
      get() {
        return this.$store.state.user.darkMode;
      },
      set(value) {
        this.$store.dispatch('user/setDarkMode', value);
      },
    },
  },
  methods: {
    async onDelete() {
      try {
        this.$q.loading.show({ message: 'Deleting account...' });
        const { status } = await this.$axios.delete('/user/account');

        if (status === 204) {
          this.$store.commit('user/clearUser');
          this.$q.dark.set(false);
          if (this.$route.path === '/') {
            this.$q.notify({
              type: 'positive',
              message: 'Deleted account.',
            });
          } else {
            this.$router.push('/', () => {
              this.$q.notify({
                type: 'positive',
                message: 'Deleted account.',
              });
            });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.$q.loading.hide();
        this.dialog = false;
      }
    },
    onOpenDialog() {
      this.dialog = true;
    },
    async onLogout() {
      try {
        this.$q.loading.show({ message: 'Logging out...' });
        const { status } = await this.$axios.get('/auth/logout');

        if (status === 204) {
          this.$store.commit('user/clearUser');
          this.$q.dark.set(false);
          if (this.$route.path === '/') {
            this.$q.notify({
              type: 'info',
              message: 'Logged out.',
            });
          } else {
            this.$router.push('/', () => {
              this.$q.notify({
                type: 'info',
                message: 'Logged out.',
              });
            });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.$q.loading.hide();
      }
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
