import { BaseEntity } from '@vcc/ui/core';

export interface IContragent extends BaseEntity {
  name: string;
  email?: string;
  phoneNumber?: string;
  phones?: {
    type: 'home' | 'work' | 'mobile',
    number: string
  }[];
  description?: string;
  notes?: string;
}