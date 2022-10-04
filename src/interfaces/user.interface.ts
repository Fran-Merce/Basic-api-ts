import { Auth } from './auth';
import { Item } from './item.interface';

export interface User extends Auth {
  name: string;
  description: string;
  age: number;
  tasks: Item[] | [];
}
