import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ProductId = bigint;
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    stock: bigint;
    imageUrl: string;
    category: string;
    price: number;
}
export interface backendInterface {
    getCategories(): Promise<Array<string>>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
}
