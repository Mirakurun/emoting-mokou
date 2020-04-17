<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-deep-purple">
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
            <draft-tweet-icon />
          </q-icon>
        </q-btn>

        <q-btn-dropdown
          v-if="$store.state.user.username"
          content-class="shadow-10"
          no-caps
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
              <q-item
                v-if="$store.state.user.role === 'admin'"
                style="color: #1da1f2"
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
              <q-item style="color: #1da1f2" to="/favorites" clickable>
                <q-item-section avatar>
                  <q-icon name="fas fa-bookmark fa-fw" />
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
import DraftTweetIcon from 'components/DraftTweetIcon';
import { axiosInstance } from 'boot/axios';

export default {
  name: 'MainLayout',
  components: {
    DraftTweetIcon,
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
  async beforeRouteEnter(to, from, next) {
    try {
      const { data, status } = await axiosInstance.get('/user/profile');

      next(vm => {
        if (status === 200) {
          vm.$store.commit('user/setUser', data);
          vm.$q.dark.set(data.darkMode);
        }
      });
    } catch (error) {
      console.error(error);
      next(vm => {
        vm.$store.commit('user/clearUser');
      });
    }
  },
  computed: {
    apiURI() {
      return process.env.API;
    },
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
