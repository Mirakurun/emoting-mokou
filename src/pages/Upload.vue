<template>
  <q-page class="flex flex-center" padding>
    <q-form ref="form" style="width: 100%; max-width: 500px;" @reset="onReset">
      <q-card bordered flat>
        <q-card-section>
          <div class="text-h6">Upload</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-y-md">
            <!-- Select image -->
            <q-file
              v-model="form.file"
              bottom-slots
              color="teal"
              :error="$v.form.file.$error"
              error-message="Required"
              label="Select image..."
              name="image"
              @input="onPreviewFile"
            >
              <template #prepend>
                <q-icon color="teal" name="fas fa-file-image" />
              </template>
            </q-file>
            <!-- Image preview -->
            <q-img :src="thumbnail || 'blank'" contain style="height: 300px;">
              <template #error>
                <div
                  :class="[
                    'absolute-full',
                    'flex',
                    'flex-center',
                    $q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1',
                  ]"
                >
                  <q-icon
                    :color="$q.dark.isActive ? 'grey-10' : 'grey-4'"
                    name="fas fa-image"
                    size="200px"
                  />
                </div>
              </template>
            </q-img>
            <!-- Caption input -->
            <caption-input :caption.sync="form.caption" />
            <!-- Tag input -->
            <tag-input :tag.sync="tag" :tags.sync="form.tags" />
          </div>
        </q-card-section>
        <!-- Upload -->
        <q-card-actions class="q-pa-md q-gutter-y-sm">
          <div :class="[{ invisible: isInvisible }, 'text-subtitle1']">
            {{ progress }}% uploaded...
          </div>
          <q-linear-progress
            :class="{ invisible: isInvisible }"
            color="light-blue"
            stripe
            size="10px"
            :value="progress / 100"
          />
          <q-btn
            class="full-width"
            color="blue"
            :disable="isDisabled"
            icon="fas fa-upload"
            label="Upload"
            :loading="isLoading"
            unelevated
            @click="onUpload"
          >
            <template #loading>
              <q-spinner-hourglass class="on-left" />
              {{ label }}
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import Vue from 'vue';
import { axiosInstance } from 'boot/axios';
import Vuelidate from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import CaptionInput from 'components/CaptionInput';
import TagInput from 'components/TagInput';

Vue.use(Vuelidate);

export default {
  name: 'PageUpload',
  components: {
    CaptionInput,
    TagInput,
  },
  data() {
    return {
      form: {
        caption: '',
        file: null,
        tags: [],
      },
      isDisabled: false,
      isInvisible: true,
      isLoading: false,
      label: '',
      progress: 0,
      tag: '',
      thumbnail: '',
    };
  },
  validations: {
    form: {
      file: {
        required,
      },
    },
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const { status } = await axiosInstance.get('/admin/profile');

      if (status === 200) {
        next();
      }
    } catch (error) {
      console.error(error);
      next('*');
    }
  },
  methods: {
    onPreviewFile() {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.thumbnail = reader.result;
      });

      if (this.form.file) {
        reader.readAsDataURL(this.form.file);
      }
    },
    onReset() {
      this.form.caption = '';
      this.form.file = null;
      this.form.tags = [];
      this.tag = '';
      this.thumbnail = '';
    },
    async onUpload() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        return;
      }

      try {
        this.isDisabled = true;
        this.isLoading = true;
        this.label = 'Creating presigned post...';

        const { data: presignedPostData } = await this.$axios.post(
          '/admin/createpresignedpost',
          {
            filename: this.form.file.name,
          }
        );

        const formData = new FormData();

        Object.keys(presignedPostData.fields).forEach(key => {
          formData.append(key, presignedPostData.fields[key]);
        });

        formData.append('file', this.form.file);

        this.isInvisible = false;
        this.label = 'Uploading...';

        const { status } = await this.$axios.post(
          presignedPostData.url,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: progressEvent => {
              this.progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            },
            withCredentials: false,
          }
        );

        if (status === 204) {
          this.label = 'Saving emote...';

          const emote = {
            caption: this.form.caption,
            filename: this.form.file.name,
            tags: this.form.tags,
          };

          await this.$axios.post('/admin/emote', emote);

          console.log('Success');
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isInvisible = true;
        this.isDisabled = false;
        this.isLoading = false;
        this.label = '';
        this.progress = 0;
        this.$refs.form.reset();
        this.$v.form.$reset();
      }
    },
  },
};
</script>
