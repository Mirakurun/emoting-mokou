<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-deep-purple">
        <q-btn
          flat
          no-caps
          :round="$route.name !== 'home'"
          :stretch="$route.name === 'home'"
          @click="$router.go(-1)"
        >
          <q-avatar v-if="$route.name === 'home'" rounded>
            <q-img
              class="bg-white"
              contain
              src="statics/images/padoru.jpg"
              height="38px"
            />
          </q-avatar>
          <q-icon v-else name="fas fa-arrow-left" />
          <q-toolbar-title v-if="$route.name === 'home'" class="gt-xs">
            Emoting Mokou
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <q-btn
          v-if="!$store.state.user.username"
          :href="`${apiURI}/auth/twitter`"
          class="gt-xs"
          flat
          no-wrap
          stretch
          type="a"
        >
          <q-icon name="fab fa-twitter" left style="color: #1da1f2" />
          <div class="text-white">Login</div>
        </q-btn>

        <q-btn
          v-if="$store.state.user.username"
          class="on-left"
          flat
          round
          @click="$refs['tweet-dialog'].toggle()"
        >
          <q-badge
            v-if="$store.state.user.media.length"
            color="red"
            floating
            :label="$store.state.user.media.length"
            transparent
          />
          <q-icon color="white">
            <draft-tweet-icon />
          </q-icon>
          <q-tooltip
            content-class="bg-light-blue"
            content-style="font-size: 12px"
            >Compose tweet</q-tooltip
          >
        </q-btn>

        <q-btn-dropdown
          v-if="$store.state.user.username"
          class="gt-xs"
          content-class="shadow-10"
          content-style="width: 350px"
          no-caps
          stretch
          flat
        >
          <template #label>
            <div class="row items-center q-gutter-x-md">
              <q-avatar size="38px">
                <q-img :src="$store.state.user.profileImage" />
              </q-avatar>
              <div>{{ $store.state.user.displayName }}</div>
            </div>
          </template>
          <profile-dropdown class="column" />
        </q-btn-dropdown>

        <q-btn
          class="lt-sm"
          flat
          dense
          round
          @click="$refs['right-drawer'].open()"
        >
          <q-avatar size="38px">
            <q-img :src="$store.state.user.profileImage" />
          </q-avatar>
          <q-tooltip
            content-class="bg-light-blue"
            content-style="font-size: 12px"
            >Profile</q-tooltip
          >
        </q-btn>
      </q-toolbar>
    </q-header>

    <right-drawer ref="right-drawer" />

    <tweet-dialog ref="tweet-dialog" />

    <q-page-container>
      <keep-alive include="Index">
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import DraftTweetIcon from 'components/DraftTweetIcon';
import RightDrawer from 'components/RightDrawer';
import ProfileDropdown from 'components/ProfileDropdown';
import TweetDialog from 'components/TweetDialog';
import { axiosInstance } from 'boot/axios';

export default {
  name: 'MainLayout',
  components: {
    DraftTweetIcon,
    ProfileDropdown,
    RightDrawer,
    TweetDialog,
  },
  data() {
    return {
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
  },
};
</script>
