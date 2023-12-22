import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['https://raw.githubusercontent.com/dzenebieri/shirt/gh-pages/react.png', 'https://raw.githubusercontent.com/dzenebieri/shirt/gh-pages/three2.png'],
  color: '#EFBD4E',
  decal: 'https://raw.githubusercontent.com/dzenebieri/shirt/gh-pages/three2.png'
})

export { state }
