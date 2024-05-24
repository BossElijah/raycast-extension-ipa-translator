export interface DictionaryItem {
  // Short for original.
  o: string;
  // Short for IPA.
  i: string;
}

export interface Dictionary {
  dict: DictionaryItem[];
}

export enum Languages {
  English = "English",
  Danish = "Danish",
  German = "German",
  Swedish = "Swedish",
  Czech = "Czech",
}
