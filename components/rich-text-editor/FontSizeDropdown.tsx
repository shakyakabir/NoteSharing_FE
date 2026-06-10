"use client";

import { Editor } from "@tiptap/react";

const FontSizeDropdown = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;
  const rawSize = editor.getAttributes("textStyle")?.fontSize;
  const currentSize = rawSize || "default";

  const setSize = (size: string) => {
    editor.chain().focus().setFontSize(size).run();
  };

  const unsetSize = () => {
    editor.chain().focus().unsetFontSize().run();
  };

  return (
    <div>
      <select
        value={currentSize}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "default") {
            unsetSize();
          } else {
            setSize(value);
          }
        }}
        className="px-2 py-1 border rounded text-sm bg-white hover:bg-gray-50"
      >
        <option value="default">Font size</option>
        <option value="8px">8</option>
        <option value="9px">9</option>
        <option value="10px">10</option>
        <option value="11px">11</option>
        <option value="12px">12</option>
        <option value="14px">14</option>
        <option value="16px">16</option>
        <option value="18px">18</option>
        <option value="20px">20</option>
        <option value="22px">22</option>
        <option value="24px">24</option>
        <option value="26px">26</option>
        <option value="28px">28</option>
        <option value="32px">32</option>
        <option value="36px">36</option>
        <option value="48px">48</option>
      </select>
    </div>
  );
};

export default FontSizeDropdown;
