<template>
  <div>
    <!-- Terms of service -->
    <q-item
      v-ripple
      class="lt-sm"
      :active-class="
        $q.dark.isActive
          ? 'text-blue-3 bg-blue-grey-10'
          : 'text-blue-10 bg-blue-1'
      "
      to="/terms-of-service"
      clickable
      exact
    >
      <q-item-section avatar>
        <q-icon name="fas fa-file-contract fa-fw" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Terms of service</q-item-label>
      </q-item-section>
    </q-item>
    <!-- Privacy policy -->
    <q-item
      v-ripple
      class="lt-sm"
      :active-class="
        $q.dark.isActive
          ? 'text-blue-3 bg-blue-grey-10'
          : 'text-blue-10 bg-blue-1'
      "
      to="/privacy-policy"
      clickable
      exact
    >
      <q-item-section avatar>
        <q-icon name="fas fa-user-lock fa-fw" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Privacy policy</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'Agreements',
};
</script>

<style lang="scss" scoped>
.q-item {
  color: $blue;
}

.q-item--dark {
  color: $blue;
}
</style>
