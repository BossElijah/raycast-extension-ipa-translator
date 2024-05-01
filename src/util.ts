import enDictionary from "./data/EN_dictionary.json";
import enDictionaryNoAccents from "./data/EN_dictionary-no-accents.json";
import { Dictionary, DictionaryItem, Languages } from "./types";

export const getTranslation = (text: string, language: Languages, includeAccents: boolean) => {
  const result: string[] = [];
  // Remove all punctuation.
  const regex = /[.,/#!$%^&*;:{}=\-_`~()]/g;
  const words = text.toLowerCase().replace(regex, "").split(" ");

  console.log(language);

  let dictionary: DictionaryItem[];

  switch (language) {
    case Languages.English:
      dictionary = includeAccents ? (enDictionary as Dictionary).dict : (enDictionaryNoAccents as Dictionary).dict;
      break;
    case Languages.Danish:
      // TODO: Use Danish.
      dictionary = enDictionary.dict;
      break;
    case Languages.German:
      // TODO: Use German.
      dictionary = enDictionary.dict;
      break;
    // TODO: Add more languages.
    default:
      break;
  }

  words.forEach((item) => {
    const word = dictionary.find(({ original }) => original == item);
    if (!word) {
      if (item) {
        result.push(item);
      }
    } else {
      result.push(word.ipa);
    }
  });

  return result.join(" ");
};
