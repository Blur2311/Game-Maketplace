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

  const [sysIdGame, setSysIdGame] = useState<number | null>(null);
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
  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [media, setMedia] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/categories");

        const formattedCategories = response.data.data.map((category: any) => ({
          label: category.categoryName,
          value: category.sysIdCategory,
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isUpdateMode && id) {
      const storedGame = localStorage.getItem("selectedGame");
      if (storedGame) {
        const game = JSON.parse(storedGame);
        setSysIdGame(game.sysIdGame);
        setGameName(game.gameName || "");
        setPrice(game.price || "");
        setDiscountPercent(game.discountPercent || "");
        setQuantity(game.quantity || "");
        setStatus(game.isActive ? "active" : "inactive");
        setSelectedCategories(
          game.categoryDetails.map((cd: any) => cd.sysIdCategory),
        );
        setDescription(game.description || "");
        setThumbnailUrl(
          game.media.find((m: any) => m.mediaName === "thumbnail")?.mediaUrl || null // Trả về null nếu không tìm thấy
        );
        setLogoUrl(
          game.media.find((m: any) => m.mediaName === "logo")?.mediaUrl || null // Trả về null nếu không tìm thấy
        );               
        setImageUrls(
          game.media
            .filter(
              (m: any) => m.mediaName !== "thumbnail" && m.mediaName !== "logo",
            )
            .map((m: any) => m.mediaUrl),
        );
        setMedia(game.media || []);
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

  const handleLogoUpload = (e: any) => {
    setLogo(e.files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoUrl(event.target?.result as string);
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

  const handleSave = async () => {
    if (!gameName || !price || !quantity) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Hàm chuyển đổi file sang base64
    const convertFileToBase64 = async (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };

    // Chuyển đổi các hình ảnh sang Base64
    const base64Thumbnail = thumbnail
      ? await convertFileToBase64(thumbnail)
      : null;
    const base64Logo = logo ? await convertFileToBase64(logo) : null;
    const base64Images = await Promise.all(
      images.map((image) => convertFileToBase64(image)),
    );

    // Tạo object gameDTO phù hợp với cấu trúc của GameDTO
    const gameDTO = {
      gameName,
      price: parseFloat(price),
      discountPercent: parseFloat(discountPercent),
      quantity: parseInt(quantity, 10),
      status: status === "active",
      categoryDetails: [
        ...selectedCategories.map((categoryId) => ({
          sysIdCategory: categoryId,
        })),
      ],
      description,
      media: [
        ...(base64Thumbnail
          ? [{ mediaName: "thumbnail", mediaUrl: base64Thumbnail }]
          : []),
        ...(base64Logo ? [{ mediaName: "logo", mediaUrl: base64Logo }] : []),
        ...base64Images.map((image, index) => ({
          mediaName: "p" + (index + 1),
          mediaUrl: image,
        })),
      ],
      slug: gameName.toLowerCase().replace(/ /g, "-"),
    };
    console.log("Game DTO:", gameDTO);
    // return;
    try {
      const response = await apiClient.post("/api/games", gameDTO, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Game saved:", response.data);
      navigate("/admin/game-list");
    } catch (error) {
      console.error("Error saving game:", error);
      // setError("Failed to save game.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdae = async () => {
    if (!gameName || !price || !quantity) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Hàm chuyển đổi file sang base64
    const convertFileToBase64 = async (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };

    // Chuyển đổi các hình ảnh sang Base64
    const base64Thumbnail = thumbnail
      ? await convertFileToBase64(thumbnail)
      : null;
    const base64Logo = logo ? await convertFileToBase64(logo) : null;
    const base64Images = await Promise.all(
      images.map((image) => convertFileToBase64(image)),
    );

    const gameDTO = {
      sysIdGame,
      gameName,
      price: parseFloat(price),
      discountPercent: parseFloat(discountPercent),
      quantity: parseInt(quantity, 10),
      status: status === "active",
      categoryDetails: [
        ...selectedCategories.map((categoryId) => ({
          sysIdCategory: categoryId,
        })),
      ],
      description,
      media: [
        ...(base64Thumbnail
          ? [{ mediaName: "thumbnail", mediaUrl: base64Thumbnail }]
          : []),
        ...(base64Logo ? [{ mediaName: "logo", mediaUrl: base64Logo }] : []),
        ...base64Images.map((image, index) => ({
          mediaName: "p" + (index + 1),
          mediaUrl: image,
        })),
      ],
      slug: gameName.toLowerCase().replace(/ /g, "-"),
    };
    console.log("Game DTO:", gameDTO);
    return;

    try {
      const response = await apiClient.post("/api/games", gameDTO, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Game updated:", response.data);
      // navigate("/admin/game-list");
    } catch (error) {
      console.error("Error updating game:", error);
      // setError("Failed to save game.");
    } finally {
      setLoading(false);
    }
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
            <p className="flex items-center gap-1 mt-3 text-sm text-textGray300">
              <FaAsterisk className="text-[6px] text-red-500" />
              Is a mandatory information field
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
                    className="object-cover w-24 h-24 rounded-full"
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
                Logo <span className="text-red-500">*</span>
              </label>
              {logoUrl && (
                <div className="mb-4">
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="object-cover w-24 h-24 rounded-full"
                  />
                </div>
              )}
              <FileUpload
                name="logo"
                customUpload
                uploadHandler={handleLogoUpload}
                accept="image/*"
                maxFileSize={1000000}
                className="w-full"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm">
                Images <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="object-cover w-24 h-24 rounded-full"
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
              className="px-5 py-3 text-xs font-bold uppercase rounded bg-gray250 hover:bg-gray350"
            >
              Cancel
            </Link>
            <Button
              loading={loading}
              size="large"
              className="px-5 py-3 text-xs font-bold text-white uppercase rounded bg-mainYellow hover:brightness-110"
              onClick={isUpdateMode ? handleUpdae : handleSave}
            >
              {isUpdateMode ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
