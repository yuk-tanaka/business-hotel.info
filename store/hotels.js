import format from '../utils/format'
import notifications from '../utils/notifications'
import sanitize from '../utils/sanitize'

export const state = () => ({
  hotels: [],
  pagingInfo: {},
})

export const getters = {
  formSpot: (state, getters, rootState) => {
    return rootState.form.spot
  },
  formValues: (state, getters, rootState) => {
    return rootState.form.values
  },
  //hotels
  sanitizedHotels: (state, getters) => {
    const sanitizer = new sanitize()
    sanitizer.setSmoking(getters.formValues.canSmoking)
    return sanitizer.sanitize(state.hotels)
  },
  isEmptyHotels: (state, getters) => getters.recordCount === 0,
  //hotelsInfo
  pageCount: state => state.pagingInfo.pageCount,
  recordCount: state => state.pagingInfo.recordCount || 0,
  pageNumber: state => state.pagingInfo.page,
  nextPageNumber: (state, getters) => getters.pageNumber + 1,
  isLastPage: (state, getters) => getters.pageCount === getters.pageNumber,
}

export const mutations = {
  setResult: (state, { hotels, pagingInfo, isReload }) => {
    isReload
      ? state.hotels = [...hotels]
      : state.hotels = [...state.hotels, ...hotels]

    state.pagingInfo = {
      ...state.pagingInfo,
      ...pagingInfo,
    }
  },
  truncateHotels: (state) => state.hotels = [],
}

export const actions = {
  async fetchHotels ({ commit, getters }, page = 1) {
    // 再検索の場合
    if (page === 1) {
      await commit('truncateHotels')
    }

    const url = process.env.RAKUTEN_API_URL
    const response = await this.$axios.get(url, {
      params: format.formatRakutenApiParams(getters.formValues,
        getters.formSpot, page),
    }).catch(error => {
      //海外座標など、座標エラー
      if (error.response.status === 400 &&
        error.response.data.error_description === 'specify valid longitude') {
        notifications.error('specify valid longitude', '座標データが検索範囲外です')
        return
      }
      if (error.response.status === 400 &&
        error.response.data.error_description === 'specify valid latitude') {
        notifications.error('specify valid latitude', '座標データが検索範囲外です')
        return
      }
      //データが存在しない
      if (error.response.status === 404 &&
        error.response.data.error_description === 'Data Not Found') {
        notifications.error('Data Not Found', 'ホテルが見つかりませんでした')
        return
      }
      notifications.error(error.response, '楽天トラベルAPIでエラーが発生しました')
    })

    if (response) {
      await commit('setResult',
        format.formatRakutenResultParams(response.data, page))
    }
  },

  async fetchNext ({ commit, dispatch, getters }) {
    await dispatch('fetchHotels', getters.nextPageNumber)
  },
}