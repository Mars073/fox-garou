import Vue, { ComponentOptions } from 'vue'
import { Socket } from './index'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    socket?: Socket;
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    $socket: Socket;
  }
}
