'use client'
import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false, loading: () => <div className="flex gap-2 items-center"><Spinner size="sm" /><p>Loading...</p></div>,
});

const editorOptions = {
  height: 200,
  buttonList: [
    ["undo", "redo"],
    ["removeFormat"],
    ["bold", "underline", "italic", "fontSize"],
    ["fontColor", "hiliteColor"],
    ["align", "horizontalRule", "list"],
    ["table", "link", "image", "imageGallery"],
    ["showBlocks", "codeView"]
  ],
  imageRotation: false,
  fontSize: [12, 14, 16, 18, 20, 24, 36, 48, 72],
  colorList: [
    [
      "#3F51b5",
      "#828282",
      "#FF5400",
      "#676464",
      "#F1F2F4",
      "#FF9B00",
      "#F00",
      "#fa6e30",
      "#000",
      "rgba(255, 153, 0, 0.1)",
      "#FF6600",
      "#0099FF",
      "#74CC6D",
      "#FF9900",
      "#CCCCCC"
    ]
  ],
  imageUploadUrl: "http://localhost:3000/asset",
  imageGalleryUrl: "http://localhost:3000/asset"
};

export const Editor = ({ value, onChange }) => {
  const editorRef = useRef();

  const getSunEditorInstance = (sunEditor) => {
    editorRef.current = sunEditor;
  };

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    // uploadHandler is a function
    console.log(files, info)
  }

  const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
    console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
  }

  const handleImageUploadError = (errorMessage, result) => {
    console.log(errorMessage, result)
  }

  const imageUploadHandler = (xmlHttpRequest, info, core) => {
    console.log(xmlHttpRequest, info, core)
  }
  // const contentRef = useRef();
  // const [content, setContent] = useState(value);

  // const onImageUploadError = (errorMessage, result, core) => {
  //   alert(errorMessage);
  // core.noticeOpen(errorMessage);
  // return false;
  // console.log('error!')
  // return true;
  // }

  return (
    <div>
      <SunEditor
        // ref={editorRef}
        getSunEditorInstance={getSunEditorInstance}
        onImageUploadBefore={handleImageUploadBefore}
        onImageUpload={handleImageUpload}
        onImageUploadError={handleImageUploadError}
        imageUploadHandler={imageUploadHandler}
        setOptions={editorOptions}
        lang="en"
        // onImageUploadError={onImageUploadError}
        setDefaultStyle="font-family: arial; font-size: 16px;"
        setContents={value}
        onChange={onChange}
      />
    </div>
  );
};
