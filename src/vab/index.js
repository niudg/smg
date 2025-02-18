import Vue from 'vue'

// ロードスピリット
import '@/icon'
// グローバルスタイルを読み込む
import './styles/vabNew.scss'
import './styles/show.scss'
import './styles/vabNewClass.scss'
import './styles/vabSbwClass.scss'
// import './styles/vabPhase2.scss'

// rc 样式
// import './styles/all.scss'
// import './styles/vabNewCss.scss'
// import './styles/vab_sbw.scss'

// 加载VabIcon
// VabIcon
import VabIcon from './vab-icons/index'
import './vab-icons/vab-icons.css'

Vue.component('VabIcon', VabIcon)

// テーマを読み込む
const Themes = require.context('./styles/themes', false, /\.scss$/)
Themes.keys().map(Themes)

//プラグインをロード
const Plugins = require.context('./plugins', true, /\.js$/)
Plugins.keys().map(Plugins)

// コンポーネントをロード
const Components = require.context('.', true, /\.vue$/)
Components.keys()
  .map(Components)
  .forEach((item) => {
    if (item.default.name && item.default.name !== 'Layouts')
      Vue.component(item.default.name, item.default)
  })
