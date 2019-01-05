import format from '../utils/format'
import notifications from '../utils/notifications'

export const state = () => ({
  spot: {
    name: '',
    latitude: null,
    longitude: null,
  },
  values: {},
})

export const getters = {
  spotNameFull: (state, getters) => getters.isSpotEmpty ?
    '座標を取得していません' : getters.spotFormattedName + getters.spotDegree,
  spotDegree: state =>
    '(' + state.spot.latitude + ',' + '&nbsp;' + state.spot.longitude + ')',
  spotFormattedName: state => state.spot.name.replace('日本、', ''),
  isSpotEmpty: state =>
    !state.spot.latitude || !state.spot.latitude,
  //hotels.jsから呼び出す
  values: state => state.values,
}

export const mutations = {
  setSpot: (state, payload) => state.spot = payload,
  setValues: (state, payload) =>
    state.values = { ...state.values, ...payload },
}

export const actions = {
  //GoogleGeoLocationから座標取得
  async fetchGeoLocation ({ commit }, spotName) {
    const url = process.env.GOOGLE_API_URL
    const response = await this.$axios.get(url, {
      params: format.geoLocationApiParams(spotName),
    }).catch(error => {
      console.log(error)
    })

    if (response.data.status === 'OK') {
      commit('setSpot', format.spotResultParams(response.data.results[0]))
      return
    }

    // エラー処理
    if (response.data.status === 'ZERO_RESULTS') {
      notifications.error('ZERO_RESULTS', 'スポットが見つかりませんでした')
      return
    }
    notifications.error(response.data, 'Google Maps APIでエラーが発生しました')
  },

  async setFormValues ({ commit }, values) {
    await commit('setValues', values)
  },
}