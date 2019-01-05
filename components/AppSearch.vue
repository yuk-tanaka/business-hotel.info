<template>
  <v-form
    v-model="validate">
    <v-container>
      <v-layout
        row
        wrap>
        <v-flex
          xs8
          sm9>
          <AppSearchSpotCoordinate/>

        </v-flex>
        <v-flex
          xs4
          sm3>
          <v-text-field
            v-model="values.radius"
            :rules="rules.radius"
            label="半径"
            prepend-icon="place"
            suffix="m"
            type="number"
            required
          />
        </v-flex>
        <template v-if="!isSpotEmpty">
          <v-flex xs12>
            <v-subheader class="pl-0">
              宿泊日時
              <v-tooltip bottom>
                <v-icon
                  slot="activator"
                  class="ml-1"
                  small>
                  help
                </v-icon>
                <span>選択しない場合、当日一泊として検索します</span>
              </v-tooltip>
            </v-subheader>
          </v-flex>
          <v-flex xs12>
            <HotelDatePicker
              :max-nights="7"
              @check-in-changed="updateCheckIn"
              @check-out-changed="updateCheckOut"
            />
          </v-flex>
          <v-flex xs12>
            <v-subheader class="pl-0">
              一泊目の宿泊料金
              <v-tooltip bottom>
                <v-icon
                  slot="activator"
                  class="ml-1"
                  small>
                  help
                </v-icon>
                <span>楽天APIの仕様上、複数泊の宿泊料金を算出できません</span>
              </v-tooltip>
            </v-subheader>
            <v-range-slider
              v-model="values.chargeRange"
              :max="20000"
              :min="1000"
              :step="500"
              style="margin-top: 20px"
              thumb-label="always"
            />
          </v-flex>
          <v-flex xs12>
            <v-subheader class="pl-0">
              <button
                type="button"
                @click="showDetails = !showDetails">
                <v-icon small>expand_more</v-icon>
                より詳細な条件
              </button>
            </v-subheader>
            <v-layout
              v-if="showDetails"
              row
              wrap>
              <v-flex xs12>
                <v-subheader class="pl-0">
                  こだわり
                  <v-tooltip bottom>
                    <v-icon
                      slot="activator"
                      class="ml-1"
                      small>
                      help
                    </v-icon>
                    <span>そのうち追加する</span>
                  </v-tooltip>
                </v-subheader>
              </v-flex>
              <v-flex
                xs6
                sm4
                md3>
                <v-checkbox
                  v-model="values.hasBreakfast"
                  label="朝食"
                />
              </v-flex>
              <v-flex
                xs6
                sm4
                md3>
                <v-checkbox
                  v-model="values.hasSpa"
                  label="大浴場"
                />
              </v-flex>
              <v-flex xs12>
                <v-subheader class="pl-0">タバコ</v-subheader>
                <v-radio-group
                  v-model="values.canSmoking"
                  row>
                  <v-radio
                    :value="true"
                    label="喫煙"/>
                  <v-radio
                    :value="false"
                    label="禁煙"/>
                  <v-radio
                    value="either"
                    label="どちらでも"/>
                </v-radio-group>
              </v-flex>
            </v-layout>
          </v-flex>
        </template>
        <v-flex xs12>
          <v-btn
            :disabled="disableSubmit"
            color="primary"
            @click="search"
          >
            <v-icon>search</v-icon>
            探す
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import AppSearchSpotCoordinate from '../components/AppSearchSpotCoordinate'
import HotelDatePicker from 'vue-hotel-datepicker'

export default {
  components: {
    AppSearchSpotCoordinate,
    HotelDatePicker,
  },
  data: () => ({
    showDetails: false,
    validate: true,
    values: {
      radius: 500,
      checkin: null,
      checkout: null,
      chargeRange: [3000, 8000],
      hasBreakfast: false,
      hasSpa: false,
      canSmoking: 'either',
    },
    rules: {
      radius: [
        v => String(v).length > 0 || '入力されていません',
        v => v >= 100 || '100～3000m以内の範囲で入力してください',
        v => v <= 3000 || '100～3000m以内の範囲で入力してください',
      ],
    },
  }),
  computed: {
    ...mapGetters('form', ['isSpotEmpty']),
    disableSubmit () {
      return this.isSpotEmpty || !this.validate
    },
  },
  mounted () {
    this.values.checkin = this.$moment()
    this.values.checkout = this.$moment().add(1, 'day')
  },
  methods: {
    ...mapActions(['switchLoading']),
    ...mapActions('form', ['setFormValues']),
    ...mapActions('hotels', ['fetchHotels']),

    updateCheckIn (date) {
      if (date) {
        this.values.checkin = this.$moment(date)
      }
    },
    updateCheckOut (date) {
      if (date) {
        this.values.checkout = this.$moment(date)
      }
    },
    async search () {
      await this.setFormValues(this.values)
      await this.switchLoading()
      await this.fetchHotels(1)
      await this.switchLoading()
    },
  },
}
</script>
