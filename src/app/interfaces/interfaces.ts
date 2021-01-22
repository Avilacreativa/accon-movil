interface RespuestaProductos {
  ok: boolean;
  pagina: number;
  producto: Producto[];
}

interface Producto {
  imagen?: string[];
  _id?: string;
  titulo?: string;
  descripcion?: string;
  precio?: number;
  precioOferta?: number;
  stock?: number;
  sku?: string;
  usuario?: Usuario;
  created?: string;
  __v?: number;
}

interface Cotizar {
  _id?: string;
  nombre?: string;
  email?: string;
  telefono?: number;
  empresa?: string;
  rut?: number;
  direccion?: string;
  usuario?: Usuario;
  productos?: string[];
  created?: string;
  __v?: number;
}


interface Usuario {
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
  rol?: string;
  __v?: number;
}

