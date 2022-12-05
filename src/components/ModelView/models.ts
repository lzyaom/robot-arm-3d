type AxisType = 'x' | 'y' | 'z'

export type ModelType = {
  url: string
  name: string
  postion: Array<number>
  children: Array<number>
  center?: Record<AxisType, number>
  rotate?: Record<AxisType, number>
}

export const models: Record<string, Array<ModelType>> = {
  s15: [
    {
      url: '/public/model/s15/S15 - S15-BASE.STL',
      name: 'base',
      postion: [0, 0, 1],
      children: [1],
    },
    {
      url: '/public/model/s15/S15 - S15_MODULE_40.STL',
      name: 'J1',
      postion: [0, 0, 80],
      children: [2],
      center: { x: 0, y: 54, z: 0 },
      rotate: { x: 0, y: 1, z: 0 },
    },
    {
      url: '/public/model/s15/S15 - S15_MK2_DOWN.STL',
      name: 'J2',
      postion: [0, 0, 100],
      children: [3],
      center: { x: 0, y: 30, z: 0 },
      rotate: { x: 0, y: 0, z: -1 },
    },
    {
      url: '/public/model/s15/S15 - S15_MODULE_20-1.STL',
      name: 'J3',
      postion: [0, 100, 50],
      children: [4],
      center: { x: 0, y: 900, z: 0 },
      rotate: { x: 0, y: 0, z: 1 },
    },
    {
      url: '/public/model/s15/S15 - S15_MK2_UP.STL',
      name: 'J4',
      postion: [0, 50, 100],
      children: [5],
      center: { x: 0, y: 74, z: 0 },
      rotate: { x: 0, y: 1, z: 0 },
    },
    {
      url: '/public/model/s15/S15 - S15_MODULE_20.STL',
      name: 'J5',
      postion: [0, 0, 150],
      children: [6],
      center: { x: 0, y: 1174, z: 0 },
      rotate: { x: 1, y: 0, z: 0 },
    },
    {
      url: '/public/model/s15/S15 - S15_IO.STL',
      name: 'J6',
      postion: [0, 0, 200],
      children: [],
      center: { x: 0, y: 1194, z: 0 },
      rotate: { x: 1, y: 0, z: 0 },
    },
  ],
  common: [
    {
      url: '/public/model/common/Elfin_BASE_n.STL',
      name: 'base',
      postion: [0, 0, 1],
      children: [1],
    },
    {
      url: '/public/model/common/Elfin_MODULE_25_n.STL',
      name: 'J1',
      postion: [0, 0, 80],
      children: [2],
      center: { x: 0, y: 74, z: 0 },
      rotate: { x: 0, y: 1, z: 0 },
    },
    {
      url: '/public/model/common/Elfin_MK2_DOWN_n.STL',
      name: 'J2',
      postion: [0, 0, 100],
      children: [3],
      center: { x: 0, y: 220, z: 0 },
      rotate: { x: 0, y: 0, z: -1 },
    },
    {
      url: '/public/model/common/Elfin_MODULE_20_n.STL',
      name: 'J3',
      postion: [0, 100, 50],
      children: [4],
      center: { x: 0, y: 600, z: 0 },
      rotate: { x: 0, y: 0, z: 1 },
    },
    {
      url: '/public/model/common/Elfin_UP_n.STL',
      name: 'J4',
      postion: [0, 50, 100],
      children: [5],
      center: { x: 0, y: 724, z: 0 },
      rotate: { x: 0, y: 1, z: 0 },
    },
    {
      url: '/public/model/common/Elfin_MODULE_14_n.STL',
      name: 'J5',
      postion: [0, 0, 150],
      children: [6],
      center: { x: 0, y: 1020, z: 0 },
      rotate: { x: 0, y: 0, z: 1 },
    },
    {
      url: '/public/model/common/Elfin_IO_n.STL',
      name: 'J6',
      postion: [0, 0, 200],
      children: [],
      center: { x: 0, y: 1126, z: 0 },
      rotate: { x: 0, y: 1, z: 0 },
    },
  ],
}
