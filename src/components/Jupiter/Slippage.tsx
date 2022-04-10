import { useState, useRef } from "react";
import { ButtonModal, ButtonBorderGradient } from "../Buttons";
import { AdjustmentsIcon, InformationCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { nanoid } from "nanoid";

const OPTIONS = [1, 5, 10];

export const Slippage = ({
  slippage,
  setSlippage,
}: {
  slippage: number;
  setSlippage: (arg: number) => void;
}) => {
  const id = useRef(nanoid());
  const [input, setInput] = useState<number | null>(null);

  const custom = !OPTIONS.includes(input || -1);

  const canSubmit = !custom || (custom && input && input > 0 && input < 500);

  const handleSave = () => {
    input && setSlippage(input);
  };

  return (
    <ButtonModal
      id={`settings-slippage-${id.current}`}
      buttonClass="bg-gray-200 bg-opacity-20 hover:bg-gray-200 hover:bg-opacity-20 btn-sm"
      buttonText={
        <div className="flex flex-row items-center">
          <AdjustmentsIcon className="rotate-90 w-3 mr-2" />
          <span className="text-xs"> {slippage / 10} %</span>
        </div>
      }
    >
      <div>
        <h2 className="font-bold text-lg text-white mb-2">Slippage settings</h2>
        <div className="flex flex-row justify-between mt-5">
          {OPTIONS.map((e) => {
            return (
              <ButtonBorderGradient
                key={`slippage-option-${e}`}
                onClick={() => setInput(e)}
                buttonClass="bg-black p-2 uppercase font-bold h-[50px] w-full"
                fromColor={input === e ? "green-400" : "none"}
                toColor="blue-500"
                containerClass="w-1/3 mx-2"
              >
                {e / 10}%
              </ButtonBorderGradient>
            );
          })}
        </div>
        <div className="mt-5">
          <div
            className={clsx(
              "relative",
              custom && "bg-gradient-to-r from-green-400 to-blue-500",
              "p-[1.5px] rounded-lg h-[50px]"
            )}
          >
            <input
              onChange={(e) => setInput(10 * parseFloat(e.target.value.trim()))}
              placeholder="0.00 %"
              value={(input || 0) / 10}
              type="number"
              max={100}
              min={0}
              className="w-full h-full rounded-md bg-neutral focus:outline-none text-right pr-10 text-lg font-bold"
            />
            <span className="text-lg font-bold absolute top-3 right-5">%</span>
          </div>
        </div>
        {!canSubmit && (
          <div className="flex flex-col items-center mt-5">
            <div className="flex flex-row items-center">
              <InformationCircleIcon className="h-[15px] text-orange-300 mr-2" />
              <span className="text-white text-sm">
                Slippage must be between 0 and 50
              </span>
            </div>
          </div>
        )}
      </div>
      <label
        htmlFor={`modal-settings-slippage-${
          canSubmit ? id.current : undefined
        }`}
        onClick={handleSave}
        className={clsx(
          "btn w-full mt-5",
          canSubmit ? undefined : "btn-disabled"
        )}
      >
        Save settings
      </label>
    </ButtonModal>
  );
};