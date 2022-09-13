import { ItemModel } from "../models/item"

const getOrdersAdmin = async ()=>{
  const responseItem = await ItemModel.find({})
  return responseItem
}