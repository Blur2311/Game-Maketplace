import { RadioButton } from "primereact/radiobutton";
import { formatCurrency } from "../../../utils/OtherUtils";

interface PaymentOptionProps {
  label: string;
  IconComponent: React.ElementType | string;
  amount?: number;
  value: string;
  selectedOption: string;
  onChange: (value: string) => void;
}

export const PaymentOption: React.FC<PaymentOptionProps> = ({
  label,
  IconComponent,
  amount,
  value,
  selectedOption,
  onChange,
}) => {
  return (
    <>
      <div className="min-w-96 text-white">
        <div
          className="flex cursor-pointer items-center gap-4 rounded-lg bg-gray300 p-4 text-white"
          onClick={() => onChange(value)}
        >
          <RadioButton
            inputId={value}
            value={value}
            onChange={(e) => onChange(e.value)}
            checked={selectedOption === value}
          />
          <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-gray-300 p-2">
            {typeof IconComponent === "string" ? (
              <img src={IconComponent} alt="" className="w-3/4" />
            ) : (
              <IconComponent className="text-gray-800" />
            )}
          </div>

          <span>
            <span className="text-sm">{label}</span>
            {amount && (
              <span className="ml-2 text-sm font-bold">
                {formatCurrency(amount)}
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  );
};
