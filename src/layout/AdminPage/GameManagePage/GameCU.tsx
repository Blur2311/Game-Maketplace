import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { MultiSelect } from "primereact/multiselect";
import { FileUpload } from "primereact/fileupload";
import { FaAsterisk } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../config/apiClient";

export const GameCU = () => {
  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id); // Xác định chế độ cập nhật hay tạo mới
  const navigate = useNavigate();

  const [gameName, setGameName] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("active");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<
    { label: string; value: number }[]
  >([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/categories");
        console.log("Categories:", response.data.data);

        const formattedCategories = response.data.data.map((category: any) => ({
          label: category.categoryName,
          value: category.sysIdCategory,
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isUpdateMode && id) {
      const storedGame = localStorage.getItem("selectedGame");
      if (storedGame) {
        const category = JSON.parse(storedGame);
        setGameName(category.gameName);
        setPrice(category.price);
        setDiscountPercent(category.discountPercent);
        setQuantity(category.quantity);
        setStatus(category.isActive ? "active" : "inactive");
        setSelectedCategories(
          category.categoryDetails.map((cd: any) => cd.sysIdCategory),
        );
        setDescription(category.description);
        setThumbnailUrl(category.thumbnail);
        setAvatarUrl(category.avatar);
        setImageUrls(category.images || []);
      }
    }
  }, [id, isUpdateMode]);

  const handleThumbnailUpload = (e: any) => {
    setThumbnail(e.files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setThumbnailUrl(event.target?.result as string);
    };
    reader.readAsDataURL(e.files[0]);
  };

  const handleAvatarUpload = (e: any) => {
    setAvatar(e.files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarUrl(event.target?.result as string);
    };
    reader.readAsDataURL(e.files[0]);
  };

  const handleImagesUpload = (e: any) => {
    const uploadedFiles = Array.from(e.files) as File[];
    setImages(uploadedFiles);
    const urls = uploadedFiles.map((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onload = (event) => {
          resolve(event.target?.result as string);
        };
      });
    });
    Promise.all(urls).then((results) => setImageUrls(results));
  };

  return (
    <>
      <div className="mr-6">
        <h3 className="text-[32px] font-semibold">Category Detail</h3>
        <div className="my-5 rounded-md border-2 border-[#F2F2F2] p-5 pt-7">
          <div className="border-b-2 border-[#F2F2F2] pb-3">
            <h6 className="text-lg text-gray100">
              The information can be edited
            </h6>
            <p className="text-textGray300 mt-3 flex items-center gap-1 text-sm">
              <FaAsterisk className="text-[6px] text-red-500" />
              Là trường thông tin bắt buộc
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-[35px] md:grid-cols-2">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm">
                Thumbnail <span className="text-red-500">*</span>
              </label>
              {thumbnailUrl && (
                <div className="mb-4">
                  <img
                    src={thumbnailUrl}
                    alt="Thumbnail"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                </div>
              )}
              <FileUpload
                name="thumbnail"
                customUpload
                uploadHandler={handleThumbnailUpload}
                accept="image/*"
                maxFileSize={1000000}
                className="w-full"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm">
                Avatar <span className="text-red-500">*</span>
              </label>
              {avatarUrl && (
                <div className="mb-4">
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                </div>
              )}
              <FileUpload
                name="avatar"
                customUpload
                uploadHandler={handleAvatarUpload}
                accept="image/*"
                maxFileSize={1000000}
                className="w-full"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm">
                Images <span className="text-red-500">*</span>
              </label>
              <div className="mb-4 flex flex-wrap gap-2">
                {imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ))}
              </div>
              <FileUpload
                name="images"
                customUpload
                multiple
                uploadHandler={handleImagesUpload}
                accept="image/*"
                maxFileSize={1000000}
                className="w-full"
              />
            </div>

            <div>
              <FloatLabel className="flex-1 text-sm">
                <InputText
                  className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                  value={gameName || ""}
                  onChange={(e) => {
                    setGameName(e.target.value);
                    setError("");
                  }}
                />
                <label>
                  Game Name <span className="text-red-500">*</span>
                </label>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </FloatLabel>
            </div>

            <div>
              <FloatLabel className="flex-1 text-sm">
                <InputText
                  className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                  value={price || ""}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setError("");
                  }}
                />
                <label>
                  Price <span className="text-red-500">*</span>
                </label>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </FloatLabel>
            </div>

            <div>
              <FloatLabel className="flex-1 text-sm">
                <InputText
                  className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                  value={discountPercent || ""}
                  onChange={(e) => {
                    setDiscountPercent(e.target.value);
                    setError("");
                  }}
                />
                <label>
                  Discount Percent <span className="text-red-500">*</span>
                </label>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </FloatLabel>
            </div>

            <div>
              <FloatLabel className="flex-1 text-sm">
                <InputText
                  className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                  value={quantity || ""}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setError("");
                  }}
                />
                <label>
                  Quantity <span className="text-red-500">*</span>
                </label>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </FloatLabel>
            </div>

            <div>
              <FloatLabel className="flex-1 text-sm">
                <MultiSelect
                  value={selectedCategories}
                  options={categories}
                  onChange={(e) => setSelectedCategories(e.value)}
                  className="h-[80px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                  placeholder="Select Categories"
                  display="chip"
                />
                <label>
                  Categories <span className="text-red-500">*</span>
                </label>
              </FloatLabel>
            </div>

            <div>
              <label className="block text-sm">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <RadioButton
                    inputId="statusActive"
                    name="status"
                    value="active"
                    onChange={(e) => setStatus(e.value)}
                    checked={status === "active"}
                  />
                  <label htmlFor="statusActive" className="ml-2">
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <RadioButton
                    inputId="statusInactive"
                    name="status"
                    value="inactive"
                    onChange={(e) => setStatus(e.value)}
                    checked={status === "inactive"}
                  />
                  <label htmlFor="statusInactive" className="ml-2">
                    Inactive
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <FloatLabel className="flex-1 text-sm">
                <InputTextarea
                  rows={5}
                  className="w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>
                  Description <span className="text-red-500">*</span>
                </label>
              </FloatLabel>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-8 border-t-2 border-[#F2F2F2] pt-3">
            <Link
              to={`/admin/category-list`}
              className="rounded bg-gray250 px-5 py-3 text-xs font-bold uppercase hover:bg-gray350"
            >
              Cancel
            </Link>
            <Button
              loading={loading}
              size="large"
              className="rounded bg-mainYellow px-5 py-3 text-xs font-bold uppercase text-white hover:brightness-110"
              // onClick={handleSave}
            >
              {isUpdateMode ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
