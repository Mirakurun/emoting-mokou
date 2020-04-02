<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Emoting Mokou
        </q-toolbar-title>

        <q-btn
          v-if="!$store.state.user.username"
          :href="`${apiURI}/auth/twitter`"
          icon="fab fa-twitter"
          label="login"
          flat
          stretch
          style="color: #1da1f2"
          type="a"
        />

        <q-btn v-if="$store.state.user.username" flat round>
          <q-icon color="white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="htc-icon htc-icon--drafts"
            >
              <path opacity="0" d="M0 0h24v24H0z" />
              <path
                d="M7.3 11.8H1.5c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h5.9c.4 0 .8.3.8.8s-.4.8-.9.8zM5.5 15.7h-4c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h4c.4 0 .8.3.8.8s-.3.8-.8.8zM10 7.8H1.5c-.4 0-.8-.4-.8-.8s.3-.8.8-.8H10c.4 0 .8.3.8.8s-.4.8-.8.8zM23.8 2.3v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"
              />
            </svg>
          </q-icon>
        </q-btn>

        <q-btn-dropdown
          v-if="$store.state.user.username"
          content-class="shadow-10"
          stretch
          flat
        >
          <template #label>
            <div class="row items-center q-gutter-x-md">
              <q-avatar size="40px">
                <img :src="$store.state.user.profileImage" />
              </q-avatar>
              <div>{{ $store.state.user.displayName }}</div>
            </div>
          </template>
          <div class="column">
            <q-img :src="$store.state.user.profileBanner" style="width: 350px">
              <div class="row items-center q-gutter-x-md absolute-bottom">
                <q-avatar size="50px">
                  <img :src="$store.state.user.profileImage" />
                </q-avatar>
                <div>
                  <div class="text-h6">
                    {{ $store.state.user.displayName }}
                  </div>
                  <div class="text-subtitle2">
                    @{{ $store.state.user.username }}
                  </div>
                </div>
              </div>
            </q-img>
            <q-list>
              <!-- Upload -->
              <q-item style="color: #1da1f2" to="/upload" clickable>
                <q-item-section avatar>
                  <q-icon name="fas fa-upload fa-fw" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Upload</q-item-label>
                </q-item-section>
              </q-item>
              <!-- Favorites -->
              <q-item style="color: #1da1f2" to="/favorites" clickable>
                <q-item-section avatar>
                  <q-icon name="fas fa-star fa-fw" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Favorites</q-item-label>
                </q-item-section>
              </q-item>
              <!-- Dark mode -->
              <q-item v-ripple tag="label" style="color: #1da1f2">
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

              <q-separator />

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
        </q-btn-dropdown>

        <q-btn
          class="lt-sm"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      behavior="mobile"
      bordered
      side="right"
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink';

export default {
  name: 'MainLayout',
  components: {
    EssentialLink,
  },
  data() {
    return {
      rightDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Docs',
          caption: 'quasar.dev',
          icon: 'school',
          link: 'https://quasar.dev',
        },
        {
          title: 'Github',
          caption: 'github.com/quasarframework',
          icon: 'code',
          link: 'https://github.com/quasarframework',
        },
        {
          title: 'Discord Chat Channel',
          caption: 'chat.quasar.dev',
          icon: 'chat',
          link: 'https://chat.quasar.dev',
        },
        {
          title: 'Forum',
          caption: 'forum.quasar.dev',
          icon: 'record_voice_over',
          link: 'https://forum.quasar.dev',
        },
        {
          title: 'Twitter',
          caption: '@quasarframework',
          icon: 'rss_feed',
          link: 'https://twitter.quasar.dev',
        },
        {
          title: 'Facebook',
          caption: '@QuasarFramework',
          icon: 'public',
          link: 'https://facebook.quasar.dev',
        },
      ],
      search: '',
    };
  },
  computed: {
    apiURI() {
      return process.env.API;
    },
    toggleDarkMode: {
      get() {
        return this.$store.state.user.darkMode;
      },
      set(value) {
        this.$store.dispatch('user/setDarkMode', value);
      },
    },
  },
  created() {
    this.$store.dispatch('user/fetchUser');
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
