import { Item } from '../interfaces/item.interface';
import { ItemModel } from '../models/item';
import { UserModel } from '../models/user';
// Todo handle resposnes with status codes and messages

const getUser = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) return null;
  return user;
};

export const insertTodo = async (item: Item, userId: string) => {
  const user = await getUser(userId);
  const newItem: Item = new ItemModel({
    desc: item.desc,
    title: item.title,
    toDo: item.toDo,
  });
  if (!user || !user.tasks) return false;
  const tasks: Item[] = user?.tasks;
  const isOnDb = tasks.find(task => task.title === item.title) ? false : true;
  if (isOnDb) return false;
  tasks.push(newItem);
  await user.save();

  return true;
};

export const getTodos = async (userId: string) => {
  const user = await getUser(userId);
  if (!user) return null;
  return user.tasks;
};

export const getTodo = async (id: string, idUser: string) => {
  const user = await getUser(idUser);
  if (!user) return null;
  const tasks: Item[] = user.tasks;
  const task = tasks.find(task => task._id.toString() === id);
  console.log(task, 'task');
  if (!task) return null;
  return task;
};

export const updateTodo = async (id: string, item: Item, userId:string) => {
  console.log(userId, 'userId');
  const user = await getUser(userId);
  if (!user) return null;
  const newTaks = user.tasks.map(task => (task._id.toString() === id ? item : task));
  user.tasks = newTaks;
  await user.save();
  return { message: 'Item updated', data: item };
};

export const deleteTodo = async (id: string, userId: string) => {
  const user = await getUser(userId);
  if (!user?.tasks) return null;
  const existTask = user.tasks.find(task => task._id.toString() === id);
  if (!existTask) return null;
  const newTaks = user.tasks.filter(task => task._id.toString() !== id);
  user.tasks = newTaks;
  await user.save();
  return newTaks;
};
