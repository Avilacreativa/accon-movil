interface RespuestaProductos {
  ok: boolean;
  pagina: number;
  producto: Producto[];
}
interface RespuestaCategorias {
  ok: boolean;
  pagina: number;
  categorias: Categorias[];
}
interface RespuestaCategoriasByProducto {
  ok: boolean;
  pagina: number;
  productosByCategoria: Producto[];
}
interface Producto {
  imagen?: string[];
  _id?: string;
  titulo?: string;
  descripcion?: string;
  categoria?: string;
  subCategoria?: string;
  sku?: string;
  usuario?: Usuario;
  created?: string;
  __v?: number;
}
interface CotizarProducto {
  _id?: string;
  titulo?: string;
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
  observaciones?: string;
  tipo?: string;
  direccion?: string;
  estado?: string;
  usuario?: Usuario;
  productos?: string[];
  created?: string;
  __v?: number;
}


interface Usuario {
  _id?: string;
  nombre?: string;
  email?: string;
  empresa?: string;
  password?: string;
  rol?: string;
  __v?: number;
}

interface Categorias {
  _id?: string;
  titulo?: string;
  subcategoria?: string;
  __v?: number;
}


