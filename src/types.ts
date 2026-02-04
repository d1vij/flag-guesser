import type { LabColorArray } from "delta-e-ts";
export type StateSetterFunction<T> = React.Dispatch<React.SetStateAction<T>>;
export type PropsWithChildren = {
    children: React.ReactNode;
};

export type ColorGridColorType = string;
// hex
export type CellGrid = ColorGridColorType[];

export type FlagRecords = Record<string, LabColorArray[]>;
