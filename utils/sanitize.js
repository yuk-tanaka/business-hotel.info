import _ from 'lodash'

export default class {
  constructor () {
    this.commonNgKeywords = [
      'エコキューブ',
      'カプセル',
      'キャビン',
      'ゲストハウス',
      'ドミトリー',
      'ホステル',
    ]

    this.roomNgKeywords = [
      '和室',
      '相部屋',
      '混合',
      'シェア',
    ]

    this.planNgKeywords = [
      '誕生日',
      'バースデー',
      '歳以上',
      '学生',
      '受験生',
    ]

    this.planContentsNgKeywords = [
      '門限',
    ]
  }

  setSmoking (isSmokingRoom) {
    if (isSmokingRoom) {
      this.roomNgKeywords.push('禁煙')
    }
    if (isSmokingRoom === false) {
      this.roomNgKeywords.push('喫煙')
    }
  }

  sanitize (hotels) {
    return _.filter(hotels, hotel => {
      //ホテル名
      const hotelName = hotel.hotel[0].hotelBasicInfo.hotelName
      for (const pattern of this.commonNgKeywords) {
        if (hotelName.indexOf(pattern) !== -1) {
          return false
        }
      }
      //部屋名
      const roomName = hotel.hotel[3].roomInfo[0].roomBasicInfo.roomName
      if (!roomName) {
        return false
      }
      for (const pattern of this.commonNgKeywords.concat(this.roomNgKeywords)) {
        if (roomName.indexOf(pattern) !== -1) {
          return false
        }
      }
      //プラン名
      const planName = hotel.hotel[3].roomInfo[0].roomBasicInfo.planName
      if (!planName) {
        return false
      }
      for (const pattern of this.commonNgKeywords.concat(this.planNgKeywords)) {
        if (planName.indexOf(pattern) !== -1) {
          return false
        }
      }
      //詳細
      const planContents = hotel.hotel[3].roomInfo[0].roomBasicInfo.planContents
      for (const pattern of this.planContentsNgKeywords) {
        if (planContents.indexOf(pattern) !== -1) {
          return false
        }
      }

      return true
    })
  }
}