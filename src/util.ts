import dictionaryWithAccents from "./data/EN_dictionary.json";
import dictionaryWithoutAccents from "./data/EN_dictionary-no-accents.json";

interface DictionaryItem {
  original: string;
  ipa: string;
}

interface Dictionary {
  dict: DictionaryItem[];
}

export const getTranslation = (text: string, includeAccents: boolean) => {
  const result: string[] = [];
  // Remove all punctuation.
  const regex = /[.,/#!$%^&*;:{}=\-_`~()]/g;
  const words = text.toLowerCase().replace(regex, "").split(" ");
  const dictionary: DictionaryItem[] = includeAccents
    ? (dictionaryWithAccents as Dictionary).dict
    : (dictionaryWithoutAccents as Dictionary).dict;

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
