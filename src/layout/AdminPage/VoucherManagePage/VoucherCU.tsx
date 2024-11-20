import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { useState } from "react";
import { TiArrowLeft } from "react-icons/ti";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import FileUploadComponent from "./components/FileUpload";
import {
  createVoucher,
  generateRandomString,
} from "./service/VoucherCUService";

export const VoucherCU = () => {
  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id);
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [active, setActive] = useState<boolean>(true);
  const [maxDiscount, setMaxDiscount] = useState<number | null>(null);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [discountName, setDiscountName] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFromDateChange = (e: { value: Date | null | undefined }) => {
    setFromDate(e.value || null); // Sets to null if value is undefined
  };

  const handleToDateChange = (e: { value: Date | null | undefined }) => {
    setToDate(e.value || null); // Sets to null if value is undefined
  };

  const handleActiveChange = (e: CheckboxChangeEvent) => {
    setActive(e.checked ?? false); // Ensure checked is not undefined
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

  const handleShortDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setShortDescription(e.target.value);
  };

  const handleDiscountPercentChange = (e: { value: number | null }) => {
    setDiscountPercent(e.value);
  };

  const handleQuantityChange = (e: { value: number | null }) => {
    setQuantity(e.value);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!discountName) newErrors.discountName = "Name is required";
    if (!shortDescription)
      newErrors.shortDescription = "Short description is required";
    if (
      discountPercent === null ||
      discountPercent <= 0 ||
      discountPercent >= 100
    )
      newErrors.discountPercent = "Discount percent must be between 0 and 100";
    if (quantity === null || quantity <= 0)
      newErrors.quantity = "Quantity must be greater than 0";
    if (maxDiscount === null || maxDiscount < 0)
      newErrors.maxDiscount = "Max discount must be greater than or equal to 0";
    if (!fromDate) newErrors.fromDate = "Start date is required";
    if (!toDate) newErrors.toDate = "End date is required";
    if (fromDate && toDate && fromDate > toDate)
      newErrors.toDate = "End date must be greater than or equal to start date";
    if (files.length === 0) newErrors.files = "At least one file is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    let base64Files: string[] = [];
    if (files.length > 0 && files[0] instanceof File) {
      base64Files = [await convertFileToBase64(files[0] as File)];
    }

    const voucherDTO = {
      codeVoucher: "VOU-" + generateRandomString(5),
      discountName,
      shortDescription,
      discountPercent,
      quantity,
      maxDiscount,
      fromDate: fromDate ? fromDate.toISOString().split("T")[0] : null,
      toDate: toDate ? toDate.toISOString().split("T")[0] : null,
      active,
      files: base64Files,
    };
    console.log("Voucher DTO:", voucherDTO);

    try {
      await createVoucher(voucherDTO);
      navigate("/admin/voucher/list");
    } catch (error) {
      console.error("Error creating voucher:", error);
    }
  };

  return (
    <>
      <div className="px-6 py-16">
        <div className="mb-8 flex flex-col gap-6">
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
                      value={shortDescription}
                      onChange={handleShortDescriptionChange}
                    />
                    <label>
                      Short description <span className="text-red-500">*</span>
                    </label>
                    {errors.shortDescription && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.shortDescription}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm">
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

                  <FloatLabel className="col-span-12 text-sm">
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

                  <FloatLabel className="col-span-12 text-sm">
                    <InputNumber
                      className="w-full rounded-lg border bg-transparent p-4 ps-[10px] shadow-adminInputShadow hover:border-black"
                      inputClassName="focus:ring-0"
                      min={0}
                      value={maxDiscount}
                      onChange={handleMaxDiscountChange}
                    />
                    <label>
                      Max Discount <span className="text-red-500">*</span>
                    </label>
                    {errors.maxDiscount && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.maxDiscount}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm">
                    <Calendar
                      value={fromDate}
                      onChange={handleFromDateChange}
                      dateFormat="yy-mm-dd"
                      showIcon
                      className="custom-calendar-admin h-[54px] w-full rounded-lg border px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                      inputClassName="shadow-none"
                    />
                    <label>
                      Start date <span className="text-red-500">*</span>
                    </label>
                    {errors.fromDate && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.fromDate}
                      </p>
                    )}
                  </FloatLabel>

                  <FloatLabel className="col-span-12 text-sm">
                    <Calendar
                      value={toDate}
                      onChange={handleToDateChange}
                      dateFormat="yy-mm-dd"
                      showIcon
                      className="custom-calendar-admin h-[54px] w-full rounded-lg border px-4 py-2 font-inter text-sm shadow-adminInputShadow"
                      inputClassName="shadow-none"
                    />
                    <label>
                      End date <span className="text-red-500">*</span>
                    </label>
                    {errors.toDate && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.toDate}
                      </p>
                    )}
                  </FloatLabel>

                  <div className="col-span-12 text-sm">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        inputId="active"
                        checked={active}
                        onChange={handleActiveChange}
                      />
                      <label htmlFor="active" className="p-checkbox-label">
                        Active
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] px-6 pb-8 pt-4 shadow-adminBoxshadow">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-4">
                <h6 className="text-lg font-medium">Discount cover</h6>
              </div>
              <div className="col-span-12 sm:col-span-8">
                <FileUploadComponent
                  onFilesChange={handleFilesChange}
                  existingFiles={files}
                  isUpdateMode={isUpdateMode}
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
              className="rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
            >
              {isUpdateMode ? "Update" : "Create"} Voucher
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
