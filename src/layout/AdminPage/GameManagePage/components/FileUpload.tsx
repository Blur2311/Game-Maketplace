import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { LiaCloudUploadAltSolid } from "react-icons/lia";

const FileUploadComponent = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* File Preview List */}
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
                {files.map((file, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    </td>
                    <td className="p-4">{file.name}</td>
                    <td className="p-4">
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* File Upload Area */}
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-6 hover:bg-gray-100 md:p-12">
        <input
          type="file"
          accept="image/png, image/jpeg, image/svg+xml, image/gif"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="shadow-adminIconshadow flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <LiaCloudUploadAltSolid size={24} />
            </div>
          </div>
          <p className="text-lg font-medium">
            <span className="underline">Click to upload</span> or drag and drop{" "}
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
