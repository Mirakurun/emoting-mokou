<template>
  <div class="q-pl-md">
    <a
      class="twitter-timeline"
      data-height="100vh"
      :data-theme="$store.state.user.darkMode ? 'dark' : 'light'"
      href="https://twitter.com/jokanhiyou?ref_src=twsrc%5Etfw"
      >Tweets by jokanhiyou</a
    >
    <div ref="timeline"></div>
  </div>
</template>

<script>
let tweets = null;

export default {
  name: 'TwitterTimeline',
  created() {
    this.createScriptTag();
  },
  mounted() {
    this.$refs.timeline.appendChild(tweets);
  },
  methods: {
    createScriptTag() {
      tweets = document.createElement('script');
      tweets.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      tweets.setAttribute('charset', 'utf-8');
      tweets.setAttribute('async', true);
    },
  },
};
</script>
