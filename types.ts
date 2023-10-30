// Tipo 'Products' representa un producto.
export type Products = {
    name: string;           // Nombre del producto (obligatorio).
    stock?: number;         // Cantidad en inventario (opcional).
    description?: string;   // Descripción del producto (opcional).
    price: number;          // Precio del producto (obligatorio).
};

// Tipo 'Client' representa un cliente.
export type Client = {
    name: string;   // Nombre del cliente (obligatorio).
    cif: string;    // Número de identificación fiscal del cliente (obligatorio).
};

// Tipo 'Invoice' representa una factura.
export type Invoice = {
    client: string;     // Id del cliente asociado a la factura (obligatorio).
    products: string[]; // Lista de productos asociados a la factura (obligatorio).
    total: number;      // Total de la factura (obligatorio).
};
