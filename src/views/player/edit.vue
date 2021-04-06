<template>
  <player-detail :is-edit="true" />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PlayerDetail from './components/PlayerDetail.vue'
@Component({
  name: 'EditPlayer',
  components: {
    PlayerDetail
  }
})
export default class extends Vue {}
</script>
