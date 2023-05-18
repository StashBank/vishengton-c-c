import { BaseEntity, ILookup } from '@vcc/ui/core';

export interface IIncome extends BaseEntity {
  contragent: ILookup;
  name: string;
  date: Date;
  amount: number;
}