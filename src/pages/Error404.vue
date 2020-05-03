<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div style="width: 355px">
          <q-img
            contain
            src="statics/images/nothing.png"
            style="max-width: 355px"
          />
          <div class="text-h4 text-center q-mt-md q-mb-xl">
            404 Page not found
          </div>
          <q-btn
            class="full-width"
            color="teal"
            unelevated
            @click="$router.push('/')"
            >Go home</q-btn
          >
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Error404',
};
</script>
