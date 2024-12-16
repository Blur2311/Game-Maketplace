import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";
import { TiArrowLeft } from "react-icons/ti";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import FileUploadComponent from "./components/FileUpload";
import {
  createVoucher,
  updateVoucher,
  generateRandomString,
  convertFileToBase64,
  validateForm,
} from "./service/VoucherCUService";
import { InputSwitch } from "primereact/inputswitch";
import { useAuthCheck } from "../../../utils/AuthUtils";

export const VoucherCU = () => {
  useAuthCheck(['ADMIN']);
  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id);
  const navigate = useNavigate();
  const [codeVoucher, setCodeVoucher] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [active, setActive] = useState<boolean>(true);
  const [maxDiscount, setMaxDiscount] = useState<number | null>(null);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [voucherBanner, setVoucherBanner] = useState<string | null>(null);
  const [discountName, setDiscountName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isUpdateMode && id) {
      const storedVoucher = localStorage.getItem("selectedVoucher");
      if (storedVoucher) {
        try {
          const voucher = JSON.parse(storedVoucher);

          setCodeVoucher(voucher.codeVoucher);
          setDiscountName(voucher.discountName);
          setDescription(voucher.description);
          setDiscountPercent(voucher.discountPercent);
          setQuantity(voucher.quantity);
          setMaxDiscount(voucher.maxDiscount);
          setStartDate(new Date(voucher.startDate));
          setEndDate(new Date(voucher.endDate));
          setActive(voucher.active);
          setFiles(voucher.voucherBanner ? [voucher.voucherBanner] : []);
          setVoucherBanner(voucher.voucherBanner || null);
        } catch (error) {
          console.error("Invalid voucher data:", error);
        }
      }
    }
  }, [id, isUpdateMode]);

  const handleStartDateChange = (e: { value: Date | null | undefined }) => {
    setStartDate(e.value || null); // Sets to null if value is undefined
  };

  const handleEndDateChange = (e: { value: Date | null | undefined }) => {
    setEndDate(e.value || null); // Sets to null if value is undefined
  };

  const handleActiveChange = (e: { value: boolean }) => {
    setActive(e.value);
  };

  const handleMaxDiscountChange = (e: { value: number | null }) => {
    setMaxDiscount(e.value);
  };

  const handleFilesChange = (newFiles: (File | string)[]) => {
    setFiles(newFiles);
  };

  const handleDiscountNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleDiscountPercentChange = (e: { value: number | null }) => {
    setDiscountPercent(e.value);
  };

  const handleQuantityChange = (e: { value: number | null }) => {
    setQuantity(e.value);
  };

  const handleSubmit = async () => {
    const voucherData = {
      discountName,
      description,
      discountPercent,
      quantity,
      maxDiscount,
      startDate,
      endDate,
      files,
    };

    const newErrors = validateForm(voucherData, isUpdateMode);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    let base64Files: string[] = [];
    let fileName: string | undefined;
    if (files.length > 0 && files[0] instanceof File) {
      base64Files = [await convertFileToBase64(files[0] as File)];
      fileName = (files[0] as File).name;
    }

    const voucherDTO = {
      codeVoucher: isUpdateMode ? codeVoucher : "V-" + generateRandomString(6),
      discountName,
      description,
      discountPercent,
      quantity,
      maxDiscount,
      startDate: startDate
        ? new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0]
        : null,
      endDate: endDate
        ? new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0]
        : null,
      active,
      files: base64Files.length > 0 ? base64Files : undefined, // Only include files if there are new files
      fileName: fileName,
    };

    try {
      if (isUpdateMode && id) {
        await updateVoucher(parseInt(id), voucherDTO);
      } else {
        await createVoucher(voucherDTO);
      }
      navigate("/admin/voucher/list");
    } catch (error) {
      console.error("Error creating/updating voucher:", error);
    }
  };

  return (
    <>
      <div className="px-6 py-16">
        <div className="flex flex-col gap-6 mb-8">
          <NavLink
            to={"/admin/customer/list"}
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <TiArrowLeft className="text-xl" />
            Vouchers
          </NavLink>
          <h3 className="text-[32px] font-medium">
            {isUpdateMode ? "Detail" : "Create"} Voucher
          </h3>
        </div>

        <div className="flex flex-col gap-8">
          <div className="rounded-[20px] px-6 pb-8 pt-4 shadow-adminBoxshadow">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-4">
                <h6 className="text-lg font-medium">Basic information</h6>
              </div>
              <div className="col-span-12 sm:col-span-8">
                <div className="grid grid-cols-12 gap-x-6 gap-y-8 sm:mt-4">
                  <FloatLabel className="col-span-12 text-sm">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      value={discountName}
                      onChange={handleDiscountNameChange}
                    />
                    <label>
                      Name <span className="text-red-500">*</span>
                    </label>
                    {errors.discountName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.discountName}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm">
                    <InputText
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                    <label>
                      Description <span className="text-red-500">*</span>
                    </label>
                    {errors.description && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <Calendar
                      value={startDate}
                      onChange={handleStartDateChange}
                      dateFormat="dd-mm-yy"
                      showIcon
                      className="custom-calendar-admin h-[54px] w-full rounded-lg border px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                      inputClassName="shadow-none"
                    />
                    <label>
                      Start date <span className="text-red-500">*</span>
                    </label>
                    {errors.startDate && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.startDate}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <Calendar
                      value={endDate}
                      onChange={handleEndDateChange}
                      dateFormat="dd-mm-yy"
                      showIcon
                      className="custom-calendar-admin h-[54px] w-full rounded-lg border px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                      inputClassName="shadow-none"
                    />
                    <label>
                      End date <span className="text-red-500">*</span>
                    </label>
                    {errors.endDate && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.endDate}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputNumber
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      inputClassName="focus:ring-0"
                      min={0}
                      max={100}
                      value={discountPercent}
                      onChange={handleDiscountPercentChange}
                    />
                    <label>
                      Discount percent <span className="text-red-500">*</span>
                    </label>
                    {errors.discountPercent && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.discountPercent}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputNumber
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      inputClassName="focus:ring-0"
                      min={0}
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                    <label>
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    {errors.quantity && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.quantity}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm sm:col-span-6">
                    <InputNumber
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      inputClassName="focus:ring-0"
                      min={0}
                      value={maxDiscount}
                      onChange={handleMaxDiscountChange}
                    />
                    <label>
                      Maximum amount <span className="text-red-500">*</span>
                    </label>
                    {errors.maxDiscount && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.maxDiscount}
                      </p>
                    )}
                  </FloatLabel>

                  <div className="col-span-12 text-sm sm:col-span-6">
                    <div className="flex items-center h-full gap-2">
                      <label htmlFor="active" className="p-checkbox-label">
                        State
                      </label>
                      <InputSwitch
                        checked={active}
                        onChange={handleActiveChange}
                      />
                      {active ? (
                        <>
                          <span className="text-green-500">Active</span>
                        </>
                      ) : (
                        <>
                          <span className="text-red-500">Inactive</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] px-6 pb-8 pt-4 shadow-adminBoxshadow">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-4">
                <h6 className="text-lg font-medium">Voucher cover</h6>
              </div>
              <div className="col-span-12 sm:col-span-8">
                <FileUploadComponent
                  onFilesChange={handleFilesChange}
                  existingFiles={files}
                  isUpdateMode={isUpdateMode}
                  voucherBanner={voucherBanner}
                />
                {errors.files && (
                  <p className="mt-1 text-xs text-red-500">{errors.files}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              {isUpdateMode ? "Update" : "Create"} Voucher
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
