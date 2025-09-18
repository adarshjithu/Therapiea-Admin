export const Switch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <label className="inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      className="peer sr-only"
      checked={checked}
      onChange={onChange}
    />
    <div className="peer relative h-6 w-11 rounded-full bg-gray-200 transition peer-checked:bg-green-500">
      <div className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-full" />
    </div>
  </label>
);
