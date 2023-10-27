export type Products = {
    name: string;
    stock?: number;
    description?: string;
    price: number;
};

export type Client = {
    name: string;
    cif: string;
};

export type Invoice = {
    client: string;
    products: Products[];
    total: number;
};
