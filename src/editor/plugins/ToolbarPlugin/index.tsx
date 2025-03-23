import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Outdent,
  Indent,
  RemoveFormatting,
} from "lucide-react";
import "./index.css";
import DropDown, { DropDownItem } from "@/editor/ui/Dropdown";
import { SHORTCUTS } from "../ShortcutsPlugin/shortcuts";
import { clearFormatting } from "./utils";

const LowPriority = 1;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <Undo className="w-5 h-5" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <Redo className="w-5 h-5" />
      </button>
      <div className="divider" />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <Bold className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <Italic className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <Underline className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        <Strikethrough className="w-5 h-5" />
      </button>
      <div className="divider" />
      <DropDown
        buttonClassName="toolbar-item gap-2"
        buttonLucideIconName="align-left"
        buttonAriaLabel="Formatting options for text alignment"
      >
        <DropDownItem
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
          className="item wide"
        >
          <div className="icon-text-container">
            <AlignLeft className="w-5 h-5" />
            <span className="text">Left Align</span>
          </div>
          <span className="shortcut">{SHORTCUTS.LEFT_ALIGN}</span>
        </DropDownItem>
        <DropDownItem
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
          }
          className="item wide"
        >
          <div className="icon-text-container">
            <AlignCenter className="w-5 h-5" />
            <span className="text">Center Align</span>
          </div>
          <span className="shortcut">{SHORTCUTS.CENTER_ALIGN}</span>
        </DropDownItem>
        <DropDownItem
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
          }
          className="item wide"
        >
          <div className="icon-text-container">
            <AlignRight className="w-5 h-5" />
            <span className="text">Right Align</span>
          </div>
          <span className="shortcut">{SHORTCUTS.RIGHT_ALIGN}</span>
        </DropDownItem>
        <DropDownItem
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
          }
          className="item wide"
        >
          <div className="flex gap-2">
            <AlignJustify className="w-5 h-5" />
            <span className="text">Justify Align</span>
          </div>
          <span className="shortcut">{SHORTCUTS.JUSTIFY_ALIGN}</span>
        </DropDownItem>
      </DropDown>
      <div className="divider" />
      <button
        onClick={() =>
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
        }
        className="toolbar-item spaced"
        aria-label="Outdent"
      >
        <Outdent className="w-5 h-5" />
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
        }
        className="toolbar-item spaced"
        aria-label="Indent"
      >
        <Indent className="w-5 h-5" />
      </button>
      <button
        onClick={() => clearFormatting(editor)}
        className="toolbar-item spaced"
        aria-label="Clear all text formatting"
      >
        <RemoveFormatting className="w-5 h-5" />
      </button>
    </div>
  );
}
