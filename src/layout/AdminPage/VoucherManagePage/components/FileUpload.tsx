import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { LiaCloudUploadAltSolid } from "react-icons/lia";

interface FileUploadComponentProps {
  onFilesChange: (files: (File | string)[]) => void;
  single?: boolean;
  existingFiles?: (File | string)[];
  isUpdateMode?: boolean;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  onFilesChange,
  single = true, // Default to single file upload
  existingFiles = [],
  isUpdateMode = false,
}) => {
  const [files, setFiles] = useState<(File | string)[]>(existingFiles);

  useEffect(() => {
    setFiles(existingFiles);
  }, [existingFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (single) {
      const newFile = selectedFiles[0];
      setFiles([newFile]);
      onFilesChange([newFile]);
    } else {
      const newFiles = [...files, ...selectedFiles];
      setFiles(newFiles);
      onFilesChange(newFiles);
    }
  };

  const removeFile = () => {
    setFiles([]);
    onFilesChange([]);
  };

  const getFileName = (file: File | string) => {
    if (typeof file === "string") {
      // Extract file name from URL if possible, otherwise use a default name
      const urlParts = file.split("/");
      return urlParts[urlParts.length - 1] || `File`;
    } else {
      return file.name;
    }
  };

  return (
    <div className="space-y-6">
      {/* Display selected files */}
      {files.length > 0 && (
        <div className="rounded-lg border">
          <div className="overflow-x-scroll">
            <table className="w-full text-left">
              <thead className="bg-[#f9fafb] text-sm text-[#667085]">
                <tr>
                  <th className="p-4 font-medium">Image</th>
                  <th className="p-4 font-medium">File Name</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => {
                  const fileName = getFileName(file);
                  const fileUrl =
                    typeof file === "string" ? file : URL.createObjectURL(file);
                  return (
                    <tr key={index} className="border-t">
                      <td className="p-4">
                        <img
                          src={fileUrl}
                          alt={`Selected file`}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="p-4">{fileName}</td>
                      <td className="p-4">
                        <button
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* File upload button */}
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-6 hover:bg-gray-100 md:p-12">
        <input
          type="file"
          accept="image/png, image/jpeg, image/svg+xml, image/gif"
          className="hidden"
          multiple={false} // Only allow single file upload
          onChange={handleFileChange}
        />
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-adminIconshadow">
            <LiaCloudUploadAltSolid size={24} />
          </div>
          <p className="text-lg font-medium">
            <span className="underline">Click to upload</span> or drag and drop
            <br />
            <span className="text-sm text-textSecond">
              (SVG, JPG, PNG, or GIF, max size 900x400)
            </span>
          </p>
        </div>
      </label>
    </div>
  );
};

export default FileUploadComponent;