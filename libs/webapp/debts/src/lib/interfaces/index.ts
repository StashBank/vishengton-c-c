import { BaseEntity } from '@vcc/ui/core';

export interface IDebt extends BaseEntity {
  name: string;
  date: Date;
  amount: number;
}