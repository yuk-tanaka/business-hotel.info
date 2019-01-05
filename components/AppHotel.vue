<template>
  <v-card class="mb-3">
    <v-flex>
      <v-card-title>
        <div>
          <h3>
            <a
              :href="room.reserveUrl"
              target="_blank">
              {{ basic.hotelName }}
            </a>
          </h3>
          <h4>
            <span class="red--text ml-1">
              {{ charge.total | price }}
            </span>
            <span class="yellow--text text--darken-4 ml-1">
              <v-icon
                small
                class="yellow--text text--darken-4">card_giftcard</v-icon>
              {{ point }}pt
            </span>
            <span class="ml-1">
              <v-icon small>schedule</v-icon>
              {{ detail.checkinTime }}-翌{{ detail.checkoutTime }}
            </span>
            <span class="yellow--text text--darken-4 ml-1">
              <v-icon
                small
                class="yellow--text text--darken-4">
                stars
              </v-icon>
              {{ basic.reviewAverage }}
            </span>
            <span
              v-if="room.withBreakfastFlag"
              class="ml-1">
              <v-icon small>restaurant</v-icon>
              朝食付
            </span>
          </h4>
          <div class="mb-1">{{ basic.hotelSpecial }}</div>
          <div class="mb-0">
            <v-icon small>train</v-icon>
            <strong>{{ basic.access }}</strong>
          </div>
        </div>
      </v-card-title>
      <v-card-text class="pt-0">
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm12
            md6>
            <h5 class="subheading">
              {{ room.roomName }}
            </h5>
            <p>
              {{ room.planName }}
            </p>
            <p>
              {{ room.planContents | truncate(200) }}
            </p>
          </v-flex>
          <v-flex
            xs12
            sm8
            md6>
            <v-img
              :alt="basic.hotelName"
              :max-height="400"
              :max-width="400"
              :src="basic.hotelMapImageUrl"
            />
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-flex>
  </v-card>
</template>

<script>
export default {
  props: {
    basic: { required: true, type: Object },
    detail: { required: true, type: Object },
    room: { required: true, type: Object },
    charge: { required: true, type: Object },
  },
  computed: {
    point () {
      return Math.floor(this.charge.total * this.room.pointRate / 100)
    },
  },
}
</script>
