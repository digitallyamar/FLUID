export type RadioOption = { label: string; value: string };

export type UseRadioGroupOptions = {
  name: string;
  options: RadioOption[];
};

export function useRadioGroup(options: UseRadioGroupOptions) {
  return options;
}
