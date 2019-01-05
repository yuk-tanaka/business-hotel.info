<template>
  <v-layout
    column>
    <v-flex xs12>
      <section class="page-header mb-4">
        <h1 class="headline">楽天トラベルからいい感じにビジネスホテルを探す</h1>
      </section>
    </v-flex>
    <v-flex>
      <section class="search mb-4">
        <v-card>
          <v-card-title>
            <h2 class="title">ホテルを探す</h2>
          </v-card-title>
          <AppSearch/>
        </v-card>
      </section>
    </v-flex>
    <v-flex>
      <section class="list">
        <AppHotelList/>
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import AppHotelList from '../components/AppHotelList'
import AppSearch from '~/components/AppSearch'

export default {
  components: {
    AppHotelList,
    AppSearch,
  },
}
</script>
