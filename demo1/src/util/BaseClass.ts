import {} from 'class-validator'

export abstract class BaseClass {

  id: number;
  createdAt: Date;
  updatedAt: Date;
}