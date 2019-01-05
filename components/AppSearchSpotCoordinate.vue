<template>
  <v-text-field
    :hint="spotNameFull"
    :persistent-hint="true"
    :rules="spotRules"
    v-model="spot"
    label="駅・住所・スポットから座標を取得"
    @change="fetchGeoLocation"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    spot: null,
    spotRules: [
      v => (v || '').length > 0 || '入力されていません',
      v => (v || '').length < 100 || '文字数が多すぎます',
    ],
    valid: false,
  }),
  computed: {
    ...mapGetters('form', ['spotNameFull']),
  },
  methods: {
    ...mapActions('form', ['fetchGeoLocation']),
  },
}
</script>
