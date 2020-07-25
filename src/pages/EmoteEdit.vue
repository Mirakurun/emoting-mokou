<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-9 col-lg-6 offset-lg-2">
        <q-card :bordered="$q.dark.isActive">
          <q-img
            :alt="emote.caption"
            contain
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
            :src="`images/emotes/${emote.filename}`"
            :ratio="4 / 3"
            style="max-height: 400px"
          />
          <q-card-section>
            <div class="q-gutter-md">
              <!-- Caption input -->
              <caption-input
                :caption.sync="emote.caption"
                :error="$v.emote.caption.$error"
              />
              <!-- Tag input -->
              <tag-input :tag.sync="tag" :tags.sync="emote.tags" />
              <!-- Panel input -->
              <panel-input :panel.sync="panel" :series.sync="series" />
            </div>
          </q-card-section>
          <q-card-actions class="q-pa-md">
            <!-- Save -->
            <q-btn
              class="full-width"
              color="blue"
              :disable="isDisabled"
              icon="fas fa-save"
              label="save"
              :loading="isLoading"
              unelevated
              @click="onSave"
            >
              <template #loading>
                <q-spinner-hourglass class="on-left" />
                {{ label }}
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12 gt-sm col-md-3 col-lg-2 offset-lg-2">
        <twitter-timeline :key="timelineKey" />
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue from 'vue';
import { axiosInstance } from 'boot/axios';
import TwitterTimeline from 'components/TwitterTimeline';
import CaptionInput from 'components/CaptionInput';
import PanelInput from 'components/PanelInput';
import TagInput from 'components/TagInput';
import { timelineMixin } from 'mixins/timeline';
import { emoteMixin } from 'mixins/emote';
import Vuelidate from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

Vue.use(Vuelidate);

export default {
  name: 'EmoteEdit',
  components: {
    CaptionInput,
    PanelInput,
    TagInput,
    TwitterTimeline,
  },
  mixins: [emoteMixin, timelineMixin],
  data() {
    return {
      isDisabled: false,
      isLoading: false,
      label: '',
      panel: '',
      tag: '',
    };
  },
  validations: {
    emote: {
      caption: {
        required,
      },
    },
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const fetchProfile = axiosInstance.get('/admin/profile');
      const fetchEmote = axiosInstance.get(`/emote/${to.params.id}`);

      const responses = await Promise.all([fetchProfile, fetchEmote]);

      next(vm => {
        vm.emote = responses[1].data;
      });
    } catch (error) {
      console.error(error);
      next('*');
    }
  },
  methods: {
    async onSave() {
      this.$v.emote.$touch();

      if (this.$v.emote.$error) {
        return;
      }

      try {
        this.isDisabled = true;
        this.isLoading = true;
        this.label = 'Saving...';

        const data = {};
        data.caption = this.emote.caption;
        data.series = this.series;
        data.tags = this.emote.tags;

        const { status } = await this.$axios.put(
          `/admin/emote/${this.$route.params.id}`,
          data
        );

        if (status === 200) {
          this.$q.notify({
            type: 'positive',
            message: 'Emote saved.',
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isDisabled = false;
        this.isLoading = false;
        this.label = '';
        this.$v.emote.$reset();
      }
    },
  },
};
</script>
