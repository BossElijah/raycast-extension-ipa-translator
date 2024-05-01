import { Form, ActionPanel, Action } from "@raycast/api";
import { useState } from "react";
import { getTranslation } from "./util";
import { Languages } from "./types";

// TODO: Persist language in local storage.
const Command = () => {
  const [text, setText] = useState("");
  const [includeAccents, setIncludeAccents] = useState(true);
  const [language, setLanguage] = useState<Languages>(Languages.English);

  const [translated, setTranslated] = useState("");

  const handleSubmit = (textToTranslate: string, lang: Languages, accents: boolean) => {
    setTranslated(getTranslation(textToTranslate, lang, accents));
  };

  const onTextChange = (newValue: string) => {
    setText(newValue);
    handleSubmit(newValue, language, includeAccents);
  };

  const onLanguageChange = (newValue: string) => {
    const value = newValue as Languages;
    setLanguage(value);
    handleSubmit(text, value, includeAccents);
  };

  const onAccentsChange = (newValue: boolean) => {
    setIncludeAccents(newValue);
    handleSubmit(text, language, newValue);
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Translated IPA" content={translated} />
          <Action.CopyToClipboard title="Copy Original Text" content={text} />
        </ActionPanel>
      }
    >
      <Form.Description text={`Write something in plain ${language} and watch it being converted to IPA.`} />
      <Form.TextArea
        id="textarea"
        title={`${language} input`}
        placeholder="Enter or paste text"
        onChange={onTextChange}
      />
      <Form.Dropdown id="dropdown" title="Choose Language" value={language} onChange={onLanguageChange}>
        {Object.values(Languages).map((item) => (
          <Form.Dropdown.Item value={item} title={item} key={item} />
        ))}
      </Form.Dropdown>
      {language === Languages.English && (
        <Form.Checkbox
          id="accents"
          label="Include accents"
          storeValue
          value={includeAccents}
          onChange={onAccentsChange}
        />
      )}
      <Form.Separator />
      <Form.Description title="Translated IPA" text={translated} />
    </Form>
  );
};

export default Command;
