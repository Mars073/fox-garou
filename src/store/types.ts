import World from '@/world/World'
import { Euler } from 'three'

export interface RootState {
  version: string;
}

export interface ProfileStateSettings {
  resolutionH: number;
  resolutionV: number;
  antialias: boolean;
  volume: number;
  webGL: 'webgl' | 'webgl2' | 'unavailable';
}

export interface ProfileStateGame {
  world: World | null;
  connected: boolean;
  uuid: string;
  username: string;
  token: string;
  state: 'register' | 'pending' | 'loading' | 'in_game';
  latency: number[];
  chat: ChatMessage[];
}

export interface PlayerInfo {
  name: string;
  uuid: string;
  rotation: Euler;
}

export interface ChatMessage {
  player: PlayerInfo;
  message: string;
  hash: string;
}

export interface Resolution {
  width: number;
  height: number;
}
