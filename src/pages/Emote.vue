<template>
  <keep-alive include="EmoteHome">
    <router-view :key="$route.path" />
  </keep-alive>
</template>

<script>
export default {
  name: 'Emote',
};
</script>
