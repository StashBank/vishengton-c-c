import {
  BaseComponent,
  TextInputComponent,
  NumberInputComponent
} from './components';
import { DataType, ViewType } from './enums';
import { IBaseEntity } from './interfaces';

export const dataTypeToViewTypeMap = new Map<DataType, ViewType>([
    [DataType.string, ViewType.textInput],
    [DataType.number, ViewType.numberInput],
    [DataType.boolean, ViewType.checkbox],
    [DataType.date, ViewType.datePicker],
    [DataType.lookup, ViewType.lookup],
    [DataType.array, ViewType.listView],
  ]);
const textInputComponent = TextInputComponent as unknown as BaseComponent<IBaseEntity>;
const numberInputComponent = NumberInputComponent as unknown as BaseComponent<IBaseEntity>;
export const viewTypeToComponent = new Map<ViewType, BaseComponent<IBaseEntity>>([
  [ViewType.textInput, textInputComponent],
  [ViewType.numberInput, numberInputComponent],
])