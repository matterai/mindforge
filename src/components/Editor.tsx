import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

const theme = {
  // Theme styling goes here
  paragraph: "mb-1",
  rtl: "text-right",
  ltr: "text-left",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
};

function onChange(editorState: { read: (callback: () => void) => void }) {
  editorState.read(() => {
    // Read the contents of the EditorState here
  });
}

function onError(error: Error) {
  console.error(error);
}

const Editor: React.FC = () => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <div className="editor-container">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="editor-inner max-h-[300px] overflow-y-auto rounded-b-lg">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor-input p-4 focus:outline-none" />
            }
            placeholder={
              <div className="editor-placeholder text-gray-400 absolute top-[24px] left-[24px] pointer-events-none">
                Enter some text...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={onChange} />
        </div>
      </LexicalComposer>
    </div>
  );
};

export default Editor;
