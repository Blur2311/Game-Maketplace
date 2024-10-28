import { formatCurrency } from "../../utils/OtherUtils";

export const QRscan = () => {
  return (
    <>
      <div className="flex flex-col rounded-lg bg-gray-100 p-10 shadow-md">
        <div className="flex items-center gap-4">
          <img src="/momo.png" alt="" className="w-10" />
          <p className="text-lg font-semibold">
            Direct payment via MoMo Payment.
          </p>
        </div>
        <hr className="my-2" />
        <div className="my-5 flex items-center justify-center gap-10 font-semibold">
          <p>Amount: {formatCurrency(190000)}</p>
          <p>Taxes: 1%</p>
          <p>Total: {formatCurrency(190000)}</p>
        </div>
        <hr className="my-2" />
        <div className="mt-5 flex items-center justify-center gap-5">
          <img src="/qrscan.png" alt="" />
          <div className="flex max-w-md flex-col gap-2 text-xs">
            <p className="mb-2 text-sm font-semibold">
              Please follow the instructions below to make the payment:
            </p>
            <p className="">Step 1: Open the MoMo app to make a payment.</p>
            <p>
              Step 2: Select "Payment" and scan the QR code provided in this
              guide.
            </p>
            <p>
              Step 3: Complete the payment steps as instructed and wait for
              Divine Shop to process it in a moment.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
