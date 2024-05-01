import { Dictionary, Languages } from "./types";

export const getTranslation = (text: string, language: Languages, includeAccents: boolean) => {
  let dictionary: Dictionary;

  switch (language) {
    case Languages.English:
      if (includeAccents) {
        dictionary = require("./data/EN_dictionary.json");
      } else {
        dictionary = require("./data/EN_dictionary-no-accents.json");
      }
      break;
    case Languages.Danish:
      dictionary = require("./data/DA_dictionary.json");
      break;
    case Languages.German:
      dictionary = require("./data/DE_dictionary.json");
      break;
    case Languages.Swedish:
      dictionary = require("./data/SV_dictionary.json");
      break;
    case Languages.Czech:
      dictionary = require("./data/CZ_dictionary.json");
      break;
    default:
      return "This language is not supported yet!";
  }

  const result: string[] = [];
  // Remove all punctuation.
  const regex = /[.,/#!$%^&*;?:{}=\-_`~()]/g;
  const words = text.toLowerCase().replace(regex, " ").split(" ");

  words.forEach((item) => {
    const word = dictionary.dict.find(({ original }) => original == item);
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
