import { BaseEntity } from '@vcc/ui/core';

export interface IClient extends BaseEntity {
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
