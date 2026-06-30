export interface Product {
  id: string;
  name: string;
  /** Precio en pesos (numero, sin formato) */
  price: number;
  /** Precio anterior, para mostrar descuento */
  oldPrice?: number;
  /** URL de imagen. Si no hay, se usa un placeholder con emoji. */
  image?: string;
  /** Emoji de respaldo cuando no hay imagen */
  emoji?: string;
  /** Etiqueta opcional: "Nuevo", "Oferta", etc. */
  badge?: string;
  category?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
