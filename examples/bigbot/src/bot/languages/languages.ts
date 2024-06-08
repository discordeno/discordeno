import english from './english.js'
// import french from './french'
// import german from './german'
// import portuguese from './portuguese'
// import russian from './russian'
// import spanish from './spanish'

const languages: Record<LanguageNames, Language> & Record<string, Language> = {
  english,
  //   french,
  //   german,
  //   portuguese,
  //   russian,
  //   spanish,
}

export default languages

export type Language = Record<string, string | string[] | ((...args: any[]) => string)>
export type LanguageNames = 'english'
