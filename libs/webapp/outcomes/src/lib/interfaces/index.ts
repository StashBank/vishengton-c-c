import { BaseEntity, ILookup } from '@vcc/ui/core';

export interface IOutcome extends BaseEntity {
  contragent: ILookup;
  name: string;
  date: Date;
  amount: number;
}