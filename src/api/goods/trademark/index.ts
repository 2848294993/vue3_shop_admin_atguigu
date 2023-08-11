import request from "@/utils/request";

import { trademarkResponseType, trademarkFormType, getOneTrademarkResponseType } from "./type"

export const getTrademarkData = (pageNo: number, pageSize: number) => {
  return request.get<any, trademarkResponseType>(`/admin/product/baseTrademark/${pageNo}/${pageSize}`);
}

export const addTrademark = (trademarkForm: trademarkFormType) => {
  return request.post<any, any>("/admin/product/baseTrademark/save", trademarkForm);
}

export const getOneTrademarkData = (id: number) => {
  return request.get<any, getOneTrademarkResponseType>(`/admin/product/baseTrademark/get/${id}`);
}

export const editTrademarkApi = (trademarkForm: trademarkFormType) => {
  return request.put<any, any>("/admin/product/baseTrademark/update", trademarkForm);
}

export const deleteTrademarkApi = (id: number) => {
  return request.delete<any, any>(`/admin/product/baseTrademark/remove/${id}`);
}
