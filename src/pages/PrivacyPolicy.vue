<template>
  <q-page padding>
    <div class="row">
      <div
        :class="[
          $q.dark.isActive ? 'white' : 'text-grey-14',
          'col-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-md-3 q-gutter-y-md',
        ]"
      >
        <div
          :class="[
            $q.dark.isActive ? 'text-deep-purple-4' : 'text-deep-purple',
            'text-h3 text-weight-medium q-mt-lg',
          ]"
        >
          Privacy policy
        </div>
        <q-separator />
        <div class="text-subtitle1">
          You agree to this privacy policy by authorizing this app to access
          your Twitter account. If you do not accept this agreement, then you
          are not allow to use any material created by the copyright holder of
          this app.
        </div>
        <div
          :class="[
            $q.dark.isActive ? 'text-deep-purple-4' : 'text-deep-purple',
            'text-subtitle2 q-mt-lg',
          ]"
        >
          Profile
        </div>
        <div class="text-body1">
          Once you authorize this app to have access to your Twitter account,
          your Twitter profile is stored on a secured online database for this
          app. We do not store any email, password, personal name, or phone
          number on this app.
        </div>
        <div
          :class="[
            $q.dark.isActive ? 'text-deep-purple-4' : 'text-deep-purple',
            'text-subtitle2 q-mt-lg',
          ]"
        >
          Confidentiality
        </div>
        <div class="text-body1">
          Your data is kept secret. We do not provide anyone with your data
          stored on this app. Your data is only used for the sole purpose of
          this app.
        </div>
        <div
          :class="[
            $q.dark.isActive ? 'text-deep-purple-4' : 'text-deep-purple',
            'text-subtitle2 q-mt-lg',
          ]"
        >
          Cookies
        </div>
        <div class="text-body1">
          Cookies stored on your browser does not hold any sensitive
          information. It only stores data meant for login sessions.
        </div>
        <div
          :class="[
            $q.dark.isActive ? 'text-deep-purple-4' : 'text-deep-purple',
            'text-subtitle2 q-mt-lg',
          ]"
        >
          Activity
        </div>
        <div class="text-body1">
          We do not store any information regarding your activity on this app.
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  metaInfo() {
    return {
      title: 'Emoting Mokou',
      titleTemplate: '%s - Privacy Policy',
      meta: [
        {
          name: 'description',
          content: 'Privacy Policy',
        },
      ],
    };
  },
};
</script>
