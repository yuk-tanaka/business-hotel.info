<template>
  <v-layout column>
    <template v-if="isEmptyHotels">
      <!--検索前-->
    </template>
    <template v-else>
      <div class="mb-3">
        楽天トラベルから<strong>{{ recordCount }}</strong>件の結果
        <small>※すべての結果が表示されるわけではありません</small>
      </div>
      <div
        v-for="(hotel, index) in sanitizedHotels"
        :key="index"
        class="grid-list-lg">
        <AppHotel
          :basic="hotel.hotel[0].hotelBasicInfo"
          :detail="hotel.hotel[1].hotelDetailInfo"
          :room="hotel.hotel[3].roomInfo[0].roomBasicInfo"
          :charge="hotel.hotel[3].roomInfo[1].dailyCharge"/>
      </div>
      <mugen-scroll
        :handler="next"
        :should-handle="canScroll">
        <template v-if="isLastPage">
          <p>これ以上の結果はありません</p>
        </template>
      </mugen-scroll>
    </template>
    <!--loading-->
    <template v-if="isLoading">
      <v-progress-circular
        indeterminate
        color="primary"/>
    </template>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppHotel from './AppHotel'
import MugenScroll from 'vue-mugen-scroll'

export default {
  components: {
    AppHotel,
    MugenScroll,
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('hotels', ['sanitizedHotels', 'isEmptyHotels', 'isLastPage', 'recordCount']),

    canScroll () {
      return !this.isLoading && !this.isLastPage
    },
  },
  methods: {
    ...mapActions('hotels', ['hotels', 'fetchNext']),
    ...mapActions(['switchLoading']),

    async next () {
      await this.switchLoading()
      await this.fetchNext()
      await this.switchLoading()
    },
  },
}
</script>
