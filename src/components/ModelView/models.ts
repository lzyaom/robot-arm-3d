type AxisType = 'x' | 'y' | 'z'

export type ModelType = {
  path: string
  name: string
  children: Array<number>
  center?: Array<number>
  rotate?: Record<AxisType, number>
}

export const models: Record<string, Array<ModelType>> = {
  s15: [
    {
      path: '/public/model/s15/S15 - S15-BASE.STL',
      name: 'base',
      children: [1],
    },
    {
      path: '/public/model/s15/S15 - S15_MODULE_40.STL',
      name: 'J1',
      children: [2],
      center: [0, 54, 0],
      rotate: { x: 0, y: 1, z: 0 },
    },
    {
      path: '/public/model/s15/S15 - S15_MK2_DOWN.STL',
      name: 'J2',
      children: [3],
      center: [0, 30, 0],
      rotate: { x: 0, y: 0, z: -1 },
    },
    {
      path: '/public/model/s15/S15 - S15_MODULE_20-1.STL',
      name: 'J3',
      children: [4],
      center: [0, 900, 0],
      rotate: { x: 0, y: 0, z: 1 },
    },
    {
      path: '/public/model/s15/S15 - S15_MK2_UP.STL',
      name: 'J4',
      children: [5],
      center: [0, 74, 0],
      rotate: { x: 0, y: 1, z: 0 },
    },
    {
      path: '/public/model/s15/S15 - S15_MODULE_20.STL',
      name: 'J5',
      children: [6],
      center: [0, 1174, 0],
      rotate: { x: 1, y: 0, z: 0 },
    },
    {
      path: '/public/model/s15/S15 - S15_IO.STL',
      name: 'J6',
      children: [],
      center: [0, 1194, 0],
      rotate: { x: 1, y: 0, z: 0 },
    },
  ],
  common: [
    {
      path: '/public/model/common/Elfin_BASE_n.STL',
      name: 'base',
      children: [1],
    },
    {
      path: '/public/model/common/Elfin_MODULE_25_n.STL',
      name: 'J1',
      children: [2],
      center: [0, 74, 0],
      rotate: { x: 0, y: 1, z: 0 },
    },
    {
      path: '/public/model/common/Elfin_MK2_DOWN_n.STL',
      name: 'J2',
      children: [3],
      center: [0, 220, 0],
      rotate: { x: 0, y: 0, z: -1 },
    },
    {
      path: '/public/model/common/Elfin_MODULE_20_n.STL',
      name: 'J3',
      children: [4],
      center: [0, 600, 0],
      rotate: { x: 0, y: 0, z: 1 },
    },
    {
      path: '/public/model/common/Elfin_UP_n.STL',
      name: 'J4',
      children: [5],
      center: [0, 724, 0],
      rotate: { x: 0, y: 1, z: 0 },
    },
    {
      path: '/public/model/common/Elfin_MODULE_14_n.STL',
      name: 'J5',
      children: [6],
      center: [0, 1020, 0],
      rotate: { x: 0, y: 0, z: 1 },
    },
    {
      path: '/public/model/common/Elfin_IO_n.STL',
      name: 'J6',
      children: [],
      center: [0, 1126, 0],
      rotate: { x: 0, y: 1, z: 0 },
    },
  ],
}
