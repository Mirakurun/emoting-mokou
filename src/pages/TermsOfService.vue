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
          Terms of service
        </div>
        <q-separator />
        <div class="text-subtitle1">
          You agree to this terms of service by authorizing this app to access
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
          App permissions
        </div>
        <ul class="text-body1">
          <li>
            See Tweets from your timeline (including protected Tweets) as well
            as your Lists and collections.
          </li>
          <li>
            See your Twitter profile information and account settings.
          </li>
          <li>
            See accounts you follow, mute, and block.
          </li>
          <li>
            Follow and unfollow accounts for you.
          </li>
          <li>
            Update your profile and account settings.
          </li>
          <li>
            Post and delete Tweets for you, and engage with Tweets posted by
            others (Like, un-Like, or reply to a Tweet, Retweet, etc.) for you.
          </li>
          <li>
            Create, manage, and delete Lists and collections for you.
          </li>
          <li>
            Mute, block, and report accounts for you.
          </li>
        </ul>
        <div
          :class="[
            $q.dark.isActive ? 'text-deep-purple-4' : 'text-deep-purple',
            'text-subtitle2 q-mt-lg',
          ]"
        >
          Consent
        </div>
        <div class="text-body1">
          We take any action on behalf of your account only with your consent.
          We obtain consent to publish content based on your actions on this
          app. Authorizing your account to this app does not constitute consent.
        </div>
        <div
          :class="[
            $q.dark.isActive ? 'text-deep-purple-4' : 'text-deep-purple',
            'text-subtitle2 q-mt-lg',
          ]"
        >
          Purpose
        </div>
        <div class="text-body1">
          The sole purpose of this app is to tweet "Emoting Mokou" memes from
          your Twitter account. We also display your display name, username,
          profile image, and banner within this app. Lastly, your account is
          also used for login sessions. We do not take any other actions
          provided by app permissions.
        </div>
        <div
          :class="[
            $q.dark.isActive ? 'text-deep-purple-4' : 'text-deep-purple',
            'text-subtitle2 q-mt-lg',
          ]"
        >
          Ownership
        </div>
        <div class="text-body1">
          The "Emoting Mokou" images are created by
          <a href="https://twitter.com/jokanhiyou" target="_blank"
            >上官绯樱 (aka MiLk @jokanihyou)
            <q-icon name="fas fa-external-link-alt"/></a
          >. Copyright of those images belongs to that artist. This website and
          including its code is under exclusive copyright by Kevin Chhay. You do
          not have permission to copy, distribute, or modify this work.
        </div>
        <div
          :class="[
            $q.dark.isActive ? 'text-deep-purple-4' : 'text-deep-purple',
            'text-subtitle2 q-mt-lg',
          ]"
        >
          Twitter API
        </div>
        <div class="text-body1">
          This app uses the Twitter API. You accept whatever agreement provided
          by Twitter. You are not allow to abuse this API.
        </div>
        <div
          :class="[
            $q.dark.isActive ? 'text-deep-purple-4' : 'text-deep-purple',
            'text-subtitle2 q-mt-lg',
          ]"
        >
          Suspension
        </div>
        <div class="text-body1">
          We reserve the right to deauthorize your Twitter account with this app
          and delete your account information stored on this app at any time
          without notice. Users found abusing this app in anyway will be
          suspended. You reserve the right to deauthorize your Twitter account
          with this app and have your information deleted stored on this app at
          anytime you wish.
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'TermsOfService',
};
</script>
