import { readFileSync } from "fs-extra";
import { Dictionary, Languages } from "./types";

const readFileFS = (path: string) => {
  return readFileSync(__dirname + "/assets/data/" + path, "utf8");
};

export const getTranslation = (text: string, language: Languages, includeAccents: boolean) => {
  let dictionaryPlaceholder: string;

  switch (language) {
    case Languages.English:
      if (includeAccents) {
        dictionaryPlaceholder = readFileFS("EN_dictionary.json");
      } else {
        dictionaryPlaceholder = readFileFS("EN_dictionary-no-accents.json");
      }
      break;
    case Languages.Danish:
      dictionaryPlaceholder = readFileFS("DA_dictionary.json");
      break;
    case Languages.German:
      dictionaryPlaceholder = readFileFS("DE_dictionary.json");
      break;
    case Languages.Swedish:
      dictionaryPlaceholder = readFileFS("SV_dictionary.json");
      break;
    case Languages.Czech:
      dictionaryPlaceholder = readFileFS("CZ_dictionary.json");
      break;
    default:
      return "This language is not supported yet!";
  }

  if (!dictionaryPlaceholder) {
    return "There were problems receiving the dictionary data.";
  }

  const dictionary: Dictionary = JSON.parse(dictionaryPlaceholder);

  const result: string[] = [];
  // Remove all punctuation.
  const regex = /[.,/#!$%^&*;?+:{}=\-_`~()]/g;
  const words = text.toLowerCase().replace(regex, " ").split(" ");

  words.forEach((item) => {
    const word = dictionary.dict.find(({ original }) => original == item);
    if (!word) {
      if (item) {
        // If a word doesn't match a word in the dictionary, check if any of the
        // letters match something, otherwise return the letter as input.
        const letterArray = item.split("");
        letterArray.forEach((nestedItem) => {
          const letter = dictionary.dict.find(({ original }) => original == nestedItem);
          if (letter) {
            result.push(letter.ipa);
          } else {
            result.push(nestedItem);
          }
        });
      }
    } else {
      result.push(word.ipa);
    }
  });

  return result.join(" ");
};
