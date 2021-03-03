import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'

export const translationGetters = {
  // en: () => require('../locales/en.json'),
  // fr: () => require('../locales/fr.json')
}

const t = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)

export const translate = t

export const setI18nConfig = (locale = null) => {
  const fallback = { languageTag: 'en' }
  const lang = locale ? { languageTag: locale } : null
  const { languageTag } = lang ? lang :
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback
  translate.cache.clear()
  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag

  return languageTag;
}