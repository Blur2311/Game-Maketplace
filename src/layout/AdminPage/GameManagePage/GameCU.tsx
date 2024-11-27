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
import {
  saveGame,
  fetchCategories,
  updateGame,
  convertFileToBase64,
  generateRandomString,
  validateForm,
} from "./service/GameCUService";

export const GameCU = () => {
  const [text, setText] = useState("");

  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id); // Xác định chế độ cập nhật hay tạo mới
  const navigate = useNavigate();

  const [sysIdGame, setSysIdGame] = useState<number | null>(null);
  const [gameName, setGameName] = useState("");
  const [price, setPrice] = useState<number | null>(0);
  const [discountPercent, setDiscountPercent] = useState<number | null>(0);
  const [quantity, setQuantity] = useState<number | null>(0);
  const [isActive, setIsActive] = useState(true);
  const options: any[] = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
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
  const [images, setImages] = useState<(File | string)[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [media, setMedia] = useState([]);
  const [slug, setSlug] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (isUpdateMode && id) {
      const storedGame = localStorage.getItem("selectedGame");
      if (storedGame) {
        try {
          const game = JSON.parse(storedGame);

          setSysIdGame(game.sysIdGame || null);
          setGameName(game.gameName || "");
          setPrice(game.price || null);
          setDiscountPercent(game.discountPercent || null);
          setQuantity(game.quantity || null);
          setIsActive(game.isActive);
          setSelectedCategories(
            (game.categoryDetails || []).map((cd: any) => cd.sysIdCategory),
          );
          setDescription(game.description || "");
          setThumbnailUrl(
            game.media?.find((m: any) => m.mediaName === "thumbnail")
              ?.mediaUrl || null,
          );
          setLogoUrl(
            game.media?.find((m: any) => m.mediaName === "logo")?.mediaUrl ||
              null,
          );
          setImageUrls(
            (game.media || [])
              .filter(
                (m: any) =>
                  m.mediaName !== "thumbnail" && m.mediaName !== "logo",
              )
              .map((m: any) => m.mediaUrl),
          );
          setMedia(game.media || []);
          setSlug(game.slug || "");
        } catch (error) {
          console.error("Invalid game data:", error);
        }
      }
    }
  }, [id, isUpdateMode]);

  const handleThumbnailUpload = (files: (File | string)[]) => {
    if (files.length > 0) {
      const file = files[0] as File;
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (files: (File | string)[]) => {
    if (files.length > 0) {
      const file = files[0] as File;
      setLogo(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesUpload = (files: (File | string)[]) => {
    setImages(files);
    const urls = files.map((file) => {
      if (typeof file === "string") {
        return Promise.resolve(file);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onload = (event) => {
            resolve(event.target?.result as string);
          };
        });
      }
    });
    Promise.all(urls).then((results) => setImageUrls(results));
  };

  const handleSave = async () => {
    const newErrors = validateForm(
      gameName,
      price,
      quantity,
      description,
      selectedCategories,
      thumbnail,
      logo,
      images,
      discountPercent,
      thumbnailUrl,
      logoUrl,
      imageUrls,
    );
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    setLoading(true);

    try {
      const base64Thumbnail = thumbnail
        ? await convertFileToBase64(thumbnail)
        : thumbnailUrl; // Giữ lại thumbnail hiện tại nếu không có thumbnail mới
      const base64Logo = logo ? await convertFileToBase64(logo) : logoUrl; // Giữ lại logo hiện tại nếu không có logo mới
      const base64Images = await Promise.all(
        images.map((image) => {
          if (typeof image === "string") {
            return Promise.resolve(image);
          } else {
            return convertFileToBase64(image);
          }
        }),
      );

      // Build DTO
      const gameDTO = {
        gameName,
        gameCode: "GAME-" + generateRandomString(5),
        price,
        discountPercent,
        quantity,
        isActive: isActive,
        categoryDetails: selectedCategories.map((id) => ({
          sysIdCategory: id,
        })),
        description,
        media: [
          ...(base64Thumbnail
            ? [{ mediaName: "thumbnail", mediaUrl: base64Thumbnail }]
            : thumbnailUrl
              ? [{ mediaName: "thumbnail", mediaUrl: thumbnailUrl }]
              : []),
          ...(base64Logo
            ? [{ mediaName: "logo", mediaUrl: base64Logo }]
            : logoUrl
              ? [{ mediaName: "logo", mediaUrl: logoUrl }]
              : []),
          ...base64Images.map((image, index) => ({
            mediaName: `p${index + 1}`,
            mediaUrl: image,
          })),
        ],
        slug:
          gameName.toLowerCase().replace(/ /g, "-") +
          "-" +
          generateRandomString(5),
        releaseDate: new Date().toLocaleDateString("en-CA"),
      };

      console.log("Game DTO:", gameDTO);

      let response;
      if (isUpdateMode && sysIdGame) {
        response = await updateGame(sysIdGame, gameDTO);
      } else {
        response = await saveGame(gameDTO);
      }

      console.log("Game saved:", response.data);
      navigate("/admin/game/list");
    } catch (error) {
      console.error("Error saving game:", error);
      setError({ general: "Failed to save the game. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-6 py-16">
        <div className="flex flex-col gap-6 mb-8">
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

        <div className="grid items-start grid-cols-12 gap-8">
          <div
            className={`${
              isUpdateMode ? "md:col-span-8" : "col-span-12"
            } order-2 col-span-12 rounded-[20px] shadow-adminBoxshadow md:order-1`}
          >
            <div className="px-6 pt-4">
              <div className="flex flex-col gap-8 pb-8">
                <h6 className="text-lg font-medium">Basic information</h6>
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                  <FloatLabel className="col-span-12 text-sm md:col-span-6">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      value={gameName || ""}
                      onChange={(e) => {
                        setGameName(e.target.value);
                        setError((prev) => ({ ...prev, gameName: "" }));
                      }}
                    />
                    <label>
                      Game name <span className="text-red-500">*</span>
                    </label>
                    {error.gameName && (
                      <p className="mt-1 text-xs text-red-500">
                        {error.gameName}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm md:col-span-6">
                    <Dropdown
                      value={isActive}
                      options={options}
                      onChange={(e) => setIsActive(e.value)}
                      className="custom-icon-color w-full min-w-36 rounded-lg border px-4 py-2 !font-inter text-sm shadow-adminInputShadow"
                      dropdownIcon="pi pi-chevron-down"
                      panelClassName="custom-dropdown-panel"
                      placeholder="Select status"
                    />
                    <label>
                      Status <span className="text-red-500">*</span>
                    </label>
                    {error.isActive && (
                      <p className="mt-1 text-xs text-red-500">
                        {error.isActive}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm md:col-span-6">
                    <MultiSelect
                      value={selectedCategories}
                      options={categories}
                      onChange={(e) => setSelectedCategories(e.value)}
                      className="w-full rounded-lg border px-4 py-2 !font-inter text-sm shadow-adminInputShadow"
                      itemClassName="!font-inter"
                      placeholder="Select categories"
                      display="chip"
                    />
                    <label>
                      Categories <span className="text-red-500">*</span>
                    </label>
                    {error.selectedCategories && (
                      <p className="mt-1 text-xs text-red-500">
                        {error.selectedCategories}
                      </p>
                    )}
                  </FloatLabel>

                  <div className="col-span-12 text-sm">
                    <Editor
                      value={description}
                      onTextChange={(e) => setDescription(e.htmlValue || "")}
                      className="rounded-lg custom-editor shadow-adminInputShadow"
                      style={{ height: 350 }}
                      placeholder="Description"
                    />
                    {error.description && (
                      <p className="mt-1 text-xs text-red-500">
                        {error.description}
                      </p>
                    )}
                  </div>
                </div>

                <hr />

                <h6 className="text-lg font-medium">Price & Stock</h6>
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                  <FloatLabel className="col-span-12 text-sm md:col-span-4">
                    <InputNumber
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      inputClassName="focus:ring-0"
                      min={0}
                      value={price || 0}
                      onChange={(e) => {
                        setPrice(e.value);
                        setError((prev) => ({ ...prev, price: "" }));
                      }}
                    />
                    <label>
                      Price <span className="text-red-500">*</span>
                    </label>
                    {error.price && (
                      <p className="mt-1 text-xs text-red-500">{error.price}</p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm md:col-span-4">
                    <InputNumber
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      inputClassName="focus:ring-0"
                      max={100}
                      min={0}
                      value={discountPercent || 0}
                      onChange={(e) => {
                        setDiscountPercent(e.value);
                        setError((prev) => ({ ...prev, discountPercent: "" }));
                      }}
                    />
                    <label>
                      Discount Percent <span className="text-red-500">*</span>
                    </label>
                    {error.discountPercent && (
                      <p className="mt-1 text-xs text-red-500">
                        {error.discountPercent}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm md:col-span-4">
                    <InputNumber
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      inputClassName="focus:ring-0"
                      min={0}
                      value={quantity || 0}
                      onChange={(e) => {
                        setQuantity(e.value);
                        setError((prev) => ({ ...prev, quantity: "" }));
                      }}
                    />
                    <label>
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    {error.quantity && (
                      <p className="mt-1 text-xs text-red-500">
                        {error.quantity}
                      </p>
                    )}
                  </FloatLabel>
                </div>

                <hr />

                <h6 className="text-lg font-medium">Images</h6>
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                  <div className="col-span-12">
                    <FileUploadComponent
                      onFilesChange={handleImagesUpload}
                      existingFiles={isUpdateMode ? imageUrls : []}
                      isUpdateMode={isUpdateMode}
                    />
                    {error.images && (
                      <p className="mt-1 text-xs text-red-500">
                        {error.images}
                      </p>
                    )}
                  </div>
                </div>

                <h6 className="text-lg font-medium">Thumbnail</h6>
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                  <div className="col-span-12">
                    <FileUploadComponent
                      single
                      onFilesChange={handleThumbnailUpload}
                      existingFiles={
                        isUpdateMode && thumbnailUrl ? [thumbnailUrl] : []
                      }
                      isUpdateMode={isUpdateMode}
                    />
                    {error.thumbnail && (
                      <p className="mt-1 text-xs text-red-500">
                        {error.thumbnail}
                      </p>
                    )}
                  </div>
                </div>

                <h6 className="text-lg font-medium">Logo</h6>
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                  <div className="col-span-12">
                    <FileUploadComponent
                      single
                      onFilesChange={handleLogoUpload}
                      existingFiles={isUpdateMode && logoUrl ? [logoUrl] : []}
                      isUpdateMode={isUpdateMode}
                    />
                    {error.logo && (
                      <p className="mt-1 text-xs text-red-500">{error.logo}</p>
                    )}
                  </div>
                </div>
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
                onClick={handleSave}
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
                {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt="Thumbnail"
                      className="w-[100px] rounded-lg"
                    />
                  ) : (
                    <p>No thumbnail available</p>
                  )}
                  <div className="">
                    <p className="text-sm text-textSecond">{gameName}</p>
                  </div>
                  {discountPercent ? (
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-mainCyan max-block-fit px-2 py-[2px] text-xs text-black">
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
                    to={`/product?game=${slug}`}
                    className="text-sm font-medium text-mainCyan"
                  >
                    View Product
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
