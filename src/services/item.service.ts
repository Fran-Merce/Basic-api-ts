import { Item } from '../interfaces/item.interface';
import { ItemModel } from '../models/item';

export const insertTodo = async (item: Item) => await ItemModel.create(item);

export const getTodos = async () => await ItemModel.find({});

export const getTodo = async (id: string) => await ItemModel.findOne({ _id: id });

export const updateTodo = async (id: string, item: Item) =>
  await ItemModel.findByIdAndUpdate({ _id: id }, item, { new: true });

export const deleteTodo = async (id: string) =>
  await ItemModel.findByIdAndDelete(id);
