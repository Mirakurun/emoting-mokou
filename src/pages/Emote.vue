<template>
  <keep-alive :include="'EmoteHome'">
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  name: 'Emote',
};
</script>
