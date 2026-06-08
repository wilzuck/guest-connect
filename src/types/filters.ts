export type FilterOption = {
  value: string;
  label: string;
  description?: string;
};

export type FilterControl =
  | {
      type: "multi-select";
      name: string;
      label: string;
      options: FilterOption[];
      value?: string;
    }
  | {
      type: "range";
      minName: string;
      maxName: string;
      label: string;
      min: number;
      max: number;
      step?: number;
      minValue?: string;
      maxValue?: string;
      suffix?: string;
    }
  | {
      type: "select";
      name: string;
      label: string;
      options: FilterOption[];
      value?: string;
    };
