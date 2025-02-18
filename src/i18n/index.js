import Vue from 'vue'
import store from '@/store'
import VueI18n from 'vue-i18n'
import elJa from 'element-ui/lib/locale/lang/ja'
import ja from './ja'

Vue.use(VueI18n)

const messages = {
  ja: {
    ...ja,
    ...elJa,
  },
}

function getLanguage() {
  return store.getters['settings/language'] || 'ja'
}

const i18n = new VueI18n({
  locale: getLanguage(),
  messages,
  silentTranslationWarn: true,
})

export default i18n
