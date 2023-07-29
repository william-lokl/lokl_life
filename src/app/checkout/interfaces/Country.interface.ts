export interface Country {
  name:         Name;
  tld:          string[];
  cca2:         string;
  ccn3:         string;
  cca3:         string;
  independent:  boolean;
  status:       string;
  unMember:     boolean;
  currencies:   Currencies;
  idd:          Idd;
  capital:      string[];
  altSpellings: string[];
  region:       string;
  languages:    Languages;
  translations: { [key: string]: Translation };
  latlng:       number[];
  landlocked:   boolean;
  area:         number;
  demonyms:     Demonyms;
  flag:         string;
  maps:         Maps;
  population:   number;
  car:          Car;
  timezones:    string[];
  continents:   string[];
  flags:        Flags;
  coatOfArms:   CoatOfArms;
  startOfWeek:  string;
  capitalInfo:  CapitalInfo;
  subregion?:   string;
  cioc?:        string;
  borders?:     string[];
  fifa?:        string;
  postalCode?:  PostalCode;
  gini?:        Gini;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Car {
  signs: string[];
  side:  string;
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface Currencies {
  SHP?: Aud;
  USD?: Aud;
  EUR?: Aud;
  AUD?: Aud;
}

export interface Aud {
  name:   string;
  symbol: string;
}

export interface Demonyms {
  eng:  Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png:  string;
  svg:  string;
  alt?: string;
}

export interface Gini {
  "2012": number;
}

export interface Idd {
  root:     string;
  suffixes: string[];
}

export interface Languages {
  eng?: string;
  cal?: string;
  cha?: string;
  ita?: string;
  nau?: string;
}

export interface Maps {
  googleMaps:     string;
  openStreetMaps: string;
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  eng?: Translation;
  cal?: Translation;
  cha?: Translation;
  ita?: Translation;
  nau?: Translation;
  spa?: Translation;
}

export interface Translation {
  official: string;
  common:   string;
}

export interface PostalCode {
  format: string;
  regex:  string;
}
