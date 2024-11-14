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
      <div className="text-white min-w-96">
        <div
          className="flex items-center gap-4 p-4 text-white rounded-lg cursor-pointer bg-gray300"
          onClick={() => onChange(value)}
        >
          <RadioButton
            inputId={value}
            value={value}
            onChange={(e) => onChange(e.value)}
            checked={selectedOption === value}
          />
          <div className="flex items-center justify-center h-10 p-2 bg-gray-300 rounded-lg w-14">
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
