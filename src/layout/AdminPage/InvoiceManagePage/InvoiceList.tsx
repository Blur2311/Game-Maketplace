import { MdAddBox } from "react-icons/md";
import { RightSideButton } from "../../../components/RightSideButton";

export const InvoiceList = () => {
  return (
    <>
      <div className="">
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-[32px] font-medium">Invoices</h3>
          <RightSideButton Icon={MdAddBox} link={"/admin/customer/create"} />
        </div>
      </div>
    </>
  );
};
