<template>
  <v-layout
    column>
    <v-flex xs12>
      <section class="page-header mb-4">
        <h1
          v-if="error.statusCode === 404"
          class="title">
          404 error ページが見つかりません
        </h1>
        <h1
          v-else
          class="title">
          エラーが発生しました
        </h1>
      </section>
    </v-flex>
    <v-flex>
      <section class="search mb-4">
        <nuxt-link to="/">戻る</nuxt-link>
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    error: { type: Object, default: () => {} },
  },
}
</script>