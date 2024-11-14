import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { MultiSelect } from "primereact/multiselect";
import { FileUpload } from "primereact/fileupload";
import { Link, useParams, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../config/apiClient";
import { TiArrowLeft } from "react-icons/ti";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { InputNumber } from "primereact/inputnumber";
import FileUploadComponent from "./components/FileUpload";
import { formatCurrency, calculateSalePrice } from "../../../utils/OtherUtils";

export const GameCU = () => {
  const [text, setText] = useState("");
  const handleTextChange = (e: any) => {
    setText(e.htmlValue ?? ""); // Nếu e.htmlValue là null thì gán ''
  };

  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id); // Xác định chế độ cập nhật hay tạo mới
  const navigate = useNavigate();

  const [sysIdGame, setSysIdGame] = useState<number | null>(null);
  const [gameName, setGameName] = useState("");
  const [price, setPrice] = useState<number | null>();
  const [discountPercent, setDiscountPercent] = useState<number | null>();
  const [quantity, setQuantity] = useState<number | null>();
  const [status, setStatus] = useState("");
  const options: any[] = [
    { label: "Published", value: "active" },
    { label: "Draft", value: "unactive" },
  ];
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
          game.media.find((m: any) => m.mediaName === "thumbnail")?.mediaUrl ||
            null, // Trả về null nếu không tìm thấy
        );
        setLogoUrl(
          game.media.find((m: any) => m.mediaName === "logo")?.mediaUrl || null, // Trả về null nếu không tìm thấy
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

  // const handleSave = async () => {
  //   if (!gameName || !price || !quantity) {
  //     setError("Please fill in all required fields.");
  //     return;
  //   }

  //   setLoading(true);

  //   // Hàm chuyển đổi file sang base64
  //   const convertFileToBase64 = async (file: File) => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = (error) => reject(error);
  //       reader.readAsDataURL(file);
  //     });
  //   };

  //   // Chuyển đổi các hình ảnh sang Base64
  //   const base64Thumbnail = thumbnail
  //     ? await convertFileToBase64(thumbnail)
  //     : null;
  //   const base64Logo = logo ? await convertFileToBase64(logo) : null;
  //   const base64Images = await Promise.all(
  //     images.map((image) => convertFileToBase64(image)),
  //   );

  //   // Tạo object gameDTO phù hợp với cấu trúc của GameDTO
  //   const gameDTO = {
  //     gameName,
  //     price: parseFloat(price),
  //     discountPercent: parseFloat(discountPercent),
  //     quantity: parseInt(quantity, 10),
  //     status: status === "active",
  //     categoryDetails: [
  //       ...selectedCategories.map((categoryId) => ({
  //         sysIdCategory: categoryId,
  //       })),
  //     ],
  //     description,
  //     media: [
  //       ...(base64Thumbnail
  //         ? [{ mediaName: "thumbnail", mediaUrl: base64Thumbnail }]
  //         : []),
  //       ...(base64Logo ? [{ mediaName: "logo", mediaUrl: base64Logo }] : []),
  //       ...base64Images.map((image, index) => ({
  //         mediaName: "p" + (index + 1),
  //         mediaUrl: image,
  //       })),
  //     ],
  //     slug: gameName.toLowerCase().replace(/ /g, "-"),
  //   };
  //   console.log("Game DTO:", gameDTO);
  //   // return;
  //   try {
  //     const response = await apiClient.post("/api/games", gameDTO, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("Game saved:", response.data);
  //     // navigate("/admin/game-list");
  //   } catch (error) {
  //     console.error("Error saving game:", error);
  //     // setError("Failed to save game.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleUpdae = async () => {
  //   if (!gameName || !price || !quantity) {
  //     setError("Please fill in all required fields.");
  //     return;
  //   }

  //   setLoading(true);

  //   // Hàm chuyển đổi file sang base64
  //   const convertFileToBase64 = async (file: File) => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = (error) => reject(error);
  //       reader.readAsDataURL(file);
  //     });
  //   };

  //   // Chuyển đổi các hình ảnh sang Base64
  //   const base64Thumbnail = thumbnail
  //     ? await convertFileToBase64(thumbnail)
  //     : null;
  //   const base64Logo = logo ? await convertFileToBase64(logo) : null;
  //   const base64Images = await Promise.all(
  //     images.map((image) => convertFileToBase64(image)),
  //   );

  //   const gameDTO = {
  //     sysIdGame,
  //     gameName,
  //     price: parseFloat(price),
  //     discountPercent: parseFloat(discountPercent),
  //     quantity: parseInt(quantity, 10),
  //     status: status === "active",
  //     categoryDetails: [
  //       ...selectedCategories.map((categoryId) => ({
  //         sysIdCategory: categoryId,
  //       })),
  //     ],
  //     description,
  //     media: [
  //       ...(base64Thumbnail
  //         ? [{ mediaName: "thumbnail", mediaUrl: base64Thumbnail }]
  //         : []),
  //       ...(base64Logo ? [{ mediaName: "logo", mediaUrl: base64Logo }] : []),
  //       ...base64Images.map((image, index) => ({
  //         mediaName: "p" + (index + 1),
  //         mediaUrl: image,
  //       })),
  //     ],
  //     slug: gameName.toLowerCase().replace(/ /g, "-"),
  //   };
  //   console.log("Game DTO:", gameDTO);
  //   return;

  //   try {
  //     const response = await apiClient.post("/api/games", gameDTO, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("Game updated:", response.data);
  //     // navigate("/admin/game-list");
  //   } catch (error) {
  //     console.error("Error updating game:", error);
  //     // setError("Failed to save game.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <div className="">
        <div className="mb-8 flex flex-col gap-6">
          <NavLink
            to={"/admin/game/list"}
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <TiArrowLeft className="text-xl" />
            Games
          </NavLink>
          <h3 className="text-[32px] font-medium">
            {isUpdateMode ? "Detail" : "Create"} game
          </h3>
        </div>

        <div className="grid grid-cols-12 items-start gap-8">
          <div
            className={`${isUpdateMode ? "md:col-span-8" : "col-span-12"} order-2 col-span-12 rounded-[20px] shadow-adminBoxshadow md:order-1`}
          >
            <div className="px-6 pt-4">
              <div className="flex flex-col gap-8 pb-8">
                <h6 className="text-lg font-medium">Basic information</h6>
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                  <FloatLabel className="col-span-12 text-sm md:col-span-6">
                    <InputText
                      className="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black"
                      value={gameName || ""}
                      onChange={(e) => {
                        setGameName(e.target.value);
                        setError("");
                      }}
                    />
                    <label>
                      Game name <span className="text-red-500">*</span>
                    </label>
                    {error && (
                      <p className="mt-1 text-xs text-red-500">{error}</p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm md:col-span-6">
                    <Dropdown
                      value={status}
                      options={options}
                      onChange={(e) => setStatus(e.value)}
                      className="custom-icon-color shadow-adminInputShadow w-full min-w-36 rounded-lg border px-4 py-2 !font-inter text-sm"
                      dropdownIcon="pi pi-chevron-down"
                      panelClassName="custom-dropdown-panel"
                      placeholder="Select status"
                    />
                    <label>
                      Status <span className="text-red-500">*</span>
                    </label>
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm md:col-span-6">
                    <MultiSelect
                      value={selectedCategories}
                      options={categories}
                      onChange={(e) => setSelectedCategories(e.value)}
                      className="shadow-adminInputShadow w-full rounded-lg border px-4 py-2 !font-inter text-sm"
                      itemClassName="!font-inter"
                      placeholder="Select categories"
                      display="chip"
                    />
                    <label>
                      Categories <span className="text-red-500">*</span>
                    </label>
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm md:col-span-6">
                    <MultiSelect
                      // value={selectedCategories}
                      // options={categories}
                      // onChange={(e) => setSelectedCategories(e.value)}
                      className="shadow-adminInputShadow w-full rounded-lg border px-4 py-2 !font-inter text-sm"
                      itemClassName="!font-inter"
                      placeholder="Select feature"
                      display="chip"
                    />
                    <label>
                      Feature <span className="text-red-500">*</span>
                    </label>
                  </FloatLabel>

                  <div className="col-span-12 text-sm">
                    <Editor
                      value={text}
                      onTextChange={handleTextChange}
                      className="shadow-adminInputShadow custom-editor rounded-lg"
                      style={{ height: 350 }}
                      placeholder="Description"
                    />
                  </div>
                </div>

                <hr />

                <h6 className="text-lg font-medium">Price & Stock</h6>
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                  <FloatLabel className="col-span-12 text-sm md:col-span-4">
                    <InputNumber
                      className="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black"
                      inputClassName="focus:ring-0"
                      min={0}
                      value={price || 0}
                      onChange={(e) => {
                        setPrice(e.value);
                        setError("");
                      }}
                    />
                    <label>
                      Price <span className="text-red-500">*</span>
                    </label>
                    {error && (
                      <p className="mt-1 text-xs text-red-500">{error}</p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm md:col-span-4">
                    <InputNumber
                      className="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black"
                      inputClassName="focus:ring-0"
                      max={100}
                      min={0}
                      value={discountPercent || 0}
                      onChange={(e) => {
                        setDiscountPercent(e.value);
                        setError("");
                      }}
                    />
                    <label>
                      Discount Percent <span className="text-red-500">*</span>
                    </label>
                    {error && (
                      <p className="mt-1 text-xs text-red-500">{error}</p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm md:col-span-4">
                    <InputNumber
                      className="shadow-adminInputShadow w-full rounded-lg border bg-transparent p-4 ps-[10px] hover:border-black"
                      inputClassName="focus:ring-0"
                      min={0}
                      value={quantity || 0}
                      onChange={(e) => {
                        setQuantity(e.value);
                        setError("");
                      }}
                    />
                    <label>
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    {error && (
                      <p className="mt-1 text-xs text-red-500">{error}</p>
                    )}
                  </FloatLabel>
                </div>

                <hr />

                <h6 className="text-lg font-medium">Images</h6>
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                  <div className="col-span-12">
                    <FileUploadComponent />
                  </div>
                </div>

                <h6 className="text-lg font-medium">Thumbnail</h6>
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                  <div className="col-span-12">
                    <FileUploadComponent />
                  </div>
                </div>

                <h6 className="text-lg font-medium">Logo</h6>
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                  <div className="col-span-12">
                    <FileUploadComponent />
                  </div>
                </div>

                {/* <div className="grid grid-cols-12 gap-x-6 gap-y-8">
              <div className="col-span-12">
                <label className="mb-2 block text-sm">
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
                  className="shadow-adminInputShadow w-full bg-transparent"
                />
              </div>

              <div className="col-span-12">
                <label className="block text-sm">
                  Logo <span className="text-red-500">*</span>
                </label>
                {logoUrl && (
                  <div className="mb-4">
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="h-24 w-24 rounded-full object-cover"
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

              <div className="col-span-12">
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
            </div> */}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-4 pt-2">
              <Link
                to={`/admin/game/list`}
                className="rounded-lg px-2 py-[10px] text-sm font-medium hover:bg-black hover:bg-opacity-5"
              >
                Cancel
              </Link>
              <Button
                loading={loading}
                label={isUpdateMode ? "Update" : "Create"}
                // onClick={handleSave}
                className="rounded-lg bg-mainYellow px-4 py-[10px] text-sm font-medium text-white hover:brightness-105"
              />
            </div>
          </div>

          {isUpdateMode && (
            <div className="order-1 col-span-12 rounded-[20px] shadow-adminBoxshadow md:order-2 md:col-span-4">
              <div className="px-6 pt-4">
                <div className="flex flex-col gap-8 pb-8">
                  <h6 className="text-lg font-medium">Preview</h6>
                </div>
                <div className="flex flex-col gap-4 pb-8">
                  <img
                    src="/cat.jpeg"
                    alt=""
                    className="w-[100px] rounded-lg"
                  />
                  <div className="">
                    <p className="text-sm text-textSecond">Steam Game</p>
                    <h6 className="font-medium">Stray</h6>
                  </div>

                  {discountPercent ? (
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-mainCyan px-2 py-[2px] text-xs text-black">
                        -{discountPercent}%
                      </div>
                      <p className="text-sm line-through">
                        {formatCurrency(price || 0)}
                      </p>
                      <p className="text-sm">
                        {formatCurrency(
                          Math.round(
                            calculateSalePrice(price || 0, discountPercent),
                          ),
                        )}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm">{formatCurrency(price || 0)}</p>
                  )}

                  <Link
                    to={"/product"}
                    className="text-sm font-medium text-mainCyan"
                  >
                    http://localhost:5173/product
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
