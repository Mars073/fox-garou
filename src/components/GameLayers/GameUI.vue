<template>
  <div class="ui">
    <template v-if="gameIsRunning">
      <chat />
    </template>
    <portal v-else />
    <controllers />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Controllers from '../Controllers.vue'
import Portal from '../Portal.vue'
import Chat from '../Chat.vue'

@Component({
  components: { Controllers, Portal, Chat }
})
export default class GameUI extends Vue {
  get gameIsRunning () {
    return this.$store.getters.isRunning
  }
}
</script>
