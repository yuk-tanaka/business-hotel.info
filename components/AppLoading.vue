<template>
  <v-progress-circular
    v-if="isLoading"
    indeterminate
    color="primary"/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoading']),
  },
}
</script>
