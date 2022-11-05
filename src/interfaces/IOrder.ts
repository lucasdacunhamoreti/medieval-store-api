export interface IOrder {
  id: number;
  userId: number;
  productsIds: IProductsId;
}

export interface IProductsId {
  userId?: number;
  productsIds: number[];
}