import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
// import DruggableBlockPlugin from "./plugins/DruggableBlockPlugin";
import "./index.css";

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

export const Editor = () => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  const editorRef = React.useRef<HTMLDivElement>(null);
  // const [editorElement, setEditorElement] = React.useState<
  //   HTMLElement | undefined
  // >(undefined);

  // Update editorElement ref after component mounts
  // React.useEffect(() => {
  //   if (editorRef.current) {
  //     setEditorElement(editorRef.current);
  //   }
  // }, []);

  return (
    <div className="editor-container w-[600px]">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div ref={editorRef} className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={
              <div className="editor-placeholder">Enter some text...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={onChange} />
        </div>
        {/* <DruggableBlockPlugin anchorElem={editorElement} /> */}
      </LexicalComposer>
    </div>
  );
};

// export default Editor;
