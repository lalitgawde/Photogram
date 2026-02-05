// import {
//   FileUploaderRegular,
//   type UploadCtxProvider,
// } from "@uploadcare/react-uploader";
// import "@uploadcare/react-uploader/core.css";
// // import cs from "classnames";
// import { type OutputFileEntry } from "@uploadcare/file-uploader";

// import { useCallback, useRef, useState } from "react";

// // type FileUploaderProps = {
// //   uploaderClassName: string;
// //   files: OutputFileEntry[];
// //   onChange: (files: OutputFileEntry[]) => void;
// //   theme: "light" | "dark";
// // };

// export interface FileEntry {
//   files: OutputFileEntry[];
// }

// const localeDefinitionOverride = {
//   en: {
//     "upload-file": "Upload photo",
//     "upload-files": "Upload photos",
//     "choose-file": "Choose photo",
//     "choose-files": "Choose photos",
//     "drop-files-here": "Drop photos here",
//     "select-file-source": "Select photo source",
//     "edit-image": "Edit photo",
//     "no-files": "No photos selected",
//     "caption-edit-file": "Edit photo",
//     "files-count-allowed": "Only {{count}} {{plural:photo(count)}} allowed",
//     "files-max-size-limit-error":
//       "Photo is too big. Max photo size is {{maxFileSize}}.",
//     "header-uploading": "Uploading {{count}} {{plural:photo(count)}}",
//     "header-succeed": "{{count}} {{plural:photo(count)}} uploaded",
//     "header-total": "{{count}} {{plural:photo(count)}} selected",
//     photo__one: "photo",
//     photo__many: "photos",
//     photo__other: "photos",
//   },
// };

// interface IFileUploaderProps {
//   fileEntry: FileEntry;
//   onChange: (fileEntry: FileEntry) => void;
// }

// const FileUploader = ({ fileEntry, onChange }: IFileUploaderProps) => {
//   const [uploadedFiles, setUploadedFiles] = useState<
//     OutputFileEntry<"success">[]
//   >([]);
//   const ctxProviderRef = useRef<UploadCtxProvider | null>(null);

//   const handleRemoveClick = useCallback(
//     (uuid: OutputFileEntry["uuid"]) =>
//       onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),
//     [fileEntry.files, onChange],
//   );

//   const resetUploaderState = () =>
//     ctxProviderRef.current?.uploadCollection.clearAll();

//   const handleModalCloseEvent = () => {
//     resetUploaderState();

//     onChange({ files: [...fileEntry.files, ...uploadedFiles] });

//     setUploadedFiles([]);
//   };

//   const handleChangeEvent = (files) => {
//     setUploadedFiles([
//       ...files.allEntries.filter((f) => f.status === "success"),
//     ] as OutputFileEntry<"success">[]);
//   };

//   return (
//     <div>
//       <FileUploaderRegular
//         imgOnly
//         multiple
//         removeCopyright
//         confirmUpload={false}
//         localeDefinitionOverride={localeDefinitionOverride}
//         apiRef={ctxProviderRef}
//         onModalClose={handleModalCloseEvent}
//         onChange={handleChangeEvent}
//         pubkey="a6ca334c3520777c0045"
//         // className={cs(uploaderClassName)}
//         // classNameUploader={cs(cssOverrides.fileUploader, {
//         //   [st.darkModeEnabled]: theme === "dark",
//         // })}
//       />
//       <div className="flex flex-wrap gap-2 w-full mt-3">
//         {fileEntry.files.map((file) => (
//           <div key={file.uuid} className="relative">
//             <img
//               className="w-[100px] h-[100px] rounded-lg object-cover"
//               key={file.uuid}
//               src={`${file.cdnUrl}/-/preview/-/resize/x200/`}
//               width="100"
//               alt={file.fileInfo?.originalFilename || ""}
//               title={file.fileInfo?.originalFilename || ""}
//             />

//             <button
//               className="
//                 absolute -right-2 -top-2
//                 w-[18px] h-[18px] p-0
//                 text-[16px] leading-none font-mono
//                 border border-(--ui-control-border-color-default)
//                 rounded-lg
//                 bg-(--ui-control-background-color)
//                 shadow-[0_0_16px_0_var(--ui-control-box-shadow-color)]
//                 text-(--ui-control-text-color)
//                 cursor-pointer
//               "
//               type="button"
//               onClick={() => handleRemoveClick(file.uuid)}
//             >
//               ×
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FileUploader;
import {
  FileUploaderRegular,
  type UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

import { useCallback, useRef, useState } from "react";
import { type OutputFileEntry } from "@uploadcare/file-uploader";

export interface FileEntry {
  files: OutputFileEntry[];
}

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
}

const FileUploader = ({ fileEntry, onChange }: IFileUploaderProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<
    OutputFileEntry<"success">[]
  >([]);

  const ctxProviderRef = useRef<UploadCtxProvider | null>(null);

  const handleRemoveClick = useCallback(
    (uuid: OutputFileEntry["uuid"]) => {
      onChange({
        files: fileEntry.files.filter((f) => f.uuid !== uuid),
      });
    },
    [fileEntry.files, onChange],
  );

  const resetUploaderState = () => {
    ctxProviderRef.current?.uploadCollection.clearAll();
  };

  const handleModalClose = () => {
    if (!uploadedFiles.length) return;
    onChange({
      files: [...fileEntry.files, ...uploadedFiles],
    });
    setUploadedFiles([]);
    resetUploaderState();
  };

  const handleChange = (files: { allEntries: OutputFileEntry[] }) => {
    const successFiles = files.allEntries.filter(
      (f) => f.status === "success",
    ) as OutputFileEntry<"success">[];

    setUploadedFiles(successFiles);
  };

  return (
    <div>
      <FileUploaderRegular
        imgOnly
        multiple
        confirmUpload={false}
        removeCopyright
        apiRef={ctxProviderRef}
        pubkey="627802f8f60c6aaa383d"
        onChange={handleChange}
        onModalClose={handleModalClose}
      />
      <div className="flex flex-wrap gap-2 w-full mt-3">
        {fileEntry.files.map((file) => (
          <div key={file.uuid} className="relative">
            <img
              className="w-[100px] h-[100px] rounded-lg object-cover"
              src={`${file.cdnUrl}/-/preview/-/resize/x200/`}
              alt={file.fileInfo?.originalFilename || ""}
            />
            <button
              type="button"
              onClick={() => handleRemoveClick(file.uuid)}
              className="
                absolute -right-2 -top-2
                w-[18px] h-[18px]
                flex items-center justify-center
                text-[16px] leading-none font-mono
                rounded-lg
                border border-[#CBCDD7]
                bg-[#fcfcfe]
                shadow-[0_0_16px_0_rgba(199, 215, 255, .5)]
                text-[#323236]
                hover:outline 
                hover:outline-[#98cbff]
              "
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
