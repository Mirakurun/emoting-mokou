<template>
  <q-page class="flex flex-center" padding>
    <q-form ref="form" style="width: 100%; max-width: 500px" @reset="onReset">
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
              :error="$v.form.file.$error"
              error-message="Required"
              label="Select image..."
              name="image"
              @input="onPreviewFile"
            >
              <template #prepend>
                <q-icon name="fas fa-file-image" />
              </template>
            </q-file>
            <!-- Image preview -->
            <q-img :src="thumbnail || 'blank'" contain style="height: 300px">
              <template #error>
                <div class="absolute-full flex flex-center bg-grey-1">
                  <q-icon color="grey-4" name="fas fa-image" size="200px" />
                </div>
              </template>
            </q-img>
            <!-- Caption -->
            <q-input
              v-model="form.caption"
              bottom-slots
              :error="$v.form.caption.$error"
              error-message="Required"
              label="Caption"
            >
              <template #prepend>
                <q-icon name="fas fa-closed-captioning" />
              </template>
            </q-input>
            <!-- Tag -->
            <q-input v-model="tag" label="Tag" @keyup.enter="onAddTag">
              <template #prepend>
                <q-icon name="fas fa-tag" />
              </template>
              <template #append>
                <q-btn
                  v-if="tag"
                  round
                  dense
                  flat
                  icon="add"
                  @click="onAddTag"
                />
              </template>
            </q-input>
            <!-- Tags -->
            <div class="q-gutter-xs">
              <q-chip
                v-for="item in form.tags"
                :key="item"
                removable
                @remove="onRemove(item)"
              >
                {{ item }}
              </q-chip>
            </div>
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
            :disable="isDisabled"
            icon="fas fa-upload"
            label="Upload"
            :loading="isLoading"
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

Vue.use(Vuelidate);

export default {
  name: 'PageUpload',
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
      caption: {
        required,
      },
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
    onAddTag() {
      if (!this.form.tags.includes(this.tag)) {
        this.form.tags.push(this.tag);
        this.tag = '';
      }
    },
    onPreviewFile() {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.thumbnail = reader.result;
      });

      if (this.form.file) {
        reader.readAsDataURL(this.form.file);
      }
    },
    onRemove(tag) {
      const index = this.form.tags.indexOf(tag);

      this.form.tags.splice(index, 1);
    },
    onReset() {
      this.form.caption = '';
      this.form.file = '';
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
          this.isInvisible = true;
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
        this.isDisabled = false;
        this.isLoading = false;
        this.label = '';
        this.$refs.form.reset();
        this.$v.form.$reset();
      }
    },
  },
};
</script>
