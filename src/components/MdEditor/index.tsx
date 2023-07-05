import React, { useImperativeHandle, useRef } from "react";
import Editor from "react-markdown-editor-cm5";
// import "react-markdown-editor-cm5/lib/style.css";
import debounce from "lodash/debounce";
import { url } from "@/api/api";

interface MdEditor {
  value: string;
  id: string;
  onSave: (markdown?: string, toc?: string) => void;
  ref?: React.MutableRefObject<any>;
}

const MdEditor = (props: MdEditor, ref: any) => {
  const { value, onSave } = props;
  const editorRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    getValues: () => {
      return editorRef.current.getValues();
    },
  }));

  const uploadImageMethod = (
    file: string | Blob,
    insertImageCallback: (arg0: any, arg1: any) => void
  ) => {
    const uploadApi = url + "/api/upload/image";
    const formData = new FormData();
    formData.append("file", file);

    fetch(uploadApi, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const { imgName, imgUrl } = data;
        insertImageCallback(imgName, imgUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSave = debounce((markdown?: string, toc?: string) => {
    onSave(markdown, toc);
  }, 300);

  return (
    <Editor
      ref={editorRef}
      height={"1000px"}
      initialValue={value}
      onSave={handleSave}
      uploadImageMethod={uploadImageMethod}
      options={{
        scrollbarStyle: "overlay",
        placeholder: "写点什么...",
        languages: [
          "bash",
          "javascript",
          "typescript",
          "jsx",
          "tsx",
          "solidity",
          "go",
          "python",
          "sql",
          "markmap",
        ],
      }}
    />
  );
};

export default React.forwardRef(MdEditor);
