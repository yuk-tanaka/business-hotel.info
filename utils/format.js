export default class {
  static geoLocationApiParams (spotName) {
    return {
      address: spotName,
      key: process.env.GOOGLE_API_KEY,
    }
  }

  static spotResultParams (responseData) {
    return {
      name: responseData.formatted_address,
      latitude: responseData.geometry.location.lat,
      longitude: responseData.geometry.location.lng,
    }
  }

  static formatRakutenApiParams (values, spot, page = 1) {
    let conditions = ['internet']

    if (values.hasBreakfast) {
      conditions.push('breakfast')
    }
    if (values.hasSpa) {
      conditions.push('daiyoku')
    }
    if (!values.canSmoking) {
      conditions.push('kinen')
    }

    return {
      applicationId: process.env.RAKUTEN_API_KEY,
      checkinDate: values.checkin.format('YYYY-MM-DD'),
      checkoutDate: values.checkout.format('YYYY-MM-DD'),
      maxCharge: values.chargeRange[1],
      minCharge: values.chargeRange[0],
      latitude: spot.latitude,
      longitude: spot.longitude,
      //小数1位で四捨五入
      searchRadius: Math.round(values.radius / 100) / 10,
      squeezeCondition: conditions.join(','),
      datumType: 1,
      page: page,
      searchPattern: 1,
      responseType: 'large',
      sort: '+roomCharge',
    }
  }

  static formatRakutenResultParams (responseData, page) {
    return {
      hotels: responseData.hotels,
      pagingInfo: responseData.pagingInfo,
      isReload: page === 1,
    }
  }
}