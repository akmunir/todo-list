// `see date-fns/src/locale` for available locales
const supportedLocales = ['en', 'fr', 'es'];
module.exports = {
  supportedLocales,
};


const getLocale = (locale) => import(`date-fns/locale/${locale}/index.js`); 
const formatDate = (date, formatStyle, locale) => {
  return format(date, formatStyle, {
    locale: getLocale(locale),
  });
};