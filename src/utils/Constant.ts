export const DOMAIN = process.env.NODE_ENV === 'production' ? 'fox.m-leroy.pro' : 'localhost'

export const LATENCY_AVG_SIZE = 5
export const CHAT_SIZE = 32

export const BASIC_RESOURCES = [
  'town/bannerGreen',
  'town/cartHigh',
  'town/fence',
  'town/fenceBroken',
  'town/fountainRound',
  'town/overhang',
  'town/pillarWood',
  'town/planks',
  'town/planksHalf',
  'town/roadBend',
  'town/rockSmall',
  'town/roofHighCornerRound',
  'town/roofHighGableTop',
  'town/roofHighRight',
  'town/stairsWood',
  'town/stallBench',
  'town/stallGreen',
  'town/stallRed',
  'town/stallStool',
  'town/wall',
  'town/wallArch',
  'town/wallArchTopDetail',
  'town/wallDetailCross',
  'town/wallDetailHorizontal',
  'town/wallDiagonal',
  'town/wallDoorwayRound',
  'town/wallDoorwaySquareWideCurved',
  'town/wallWindowStone',
  'town/wallWood',
  'town/wallWoodDetailHorizontal',
  'town/wallWoodDiagonal',
  'town/wallWoodDoor',
  'town/wallWoodWindowStone',
  'town/windmill'
]

interface Resolution {
  width: number;
  height: number;
}

export const RESOLUTIONS = [
  { width: 640, height: 360 },
  { width: 720, height: 576 },
  { width: 800, height: 600 },
  { width: 1176, height: 664 },
  { width: 1024, height: 768 },
  { width: 1280, height: 720 },
  { width: 1280, height: 768 },
  { width: 1152, height: 864 },
  { width: 1280, height: 800 },
  { width: 1360, height: 768 },
  { width: 1366, height: 768 },
  { width: 1280, height: 960 },
  { width: 1440, height: 900 },
  { width: 1280, height: 1024 },
  { width: 1600, height: 900 },
  { width: 1600, height: 1024 },
  { width: 1768, height: 992 },
  { width: 1680, height: 1050 },
  { width: 1920, height: 1080 }
] as Resolution[]
