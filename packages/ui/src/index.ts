// Tipos y utilidades
export type { Product, NavLink, MenuGroup } from "./types";
export { formatPrice } from "./format";

// Avisos temporales (toasts)
export { ToastProvider, useToast } from "./ToastContext";
// Aviso flotante de stock
export { StockNotice } from "./StockNotice";
export type { StockNoticeProps } from "./StockNotice";

// Panel administrativo
export { AdminShell } from "./admin/AdminShell";
export type { AdminShellProps, AdminNavItem } from "./admin/AdminShell";
export { StatCard } from "./admin/StatCard";
export type { StatCardProps } from "./admin/StatCard";
export { AdminBarChart } from "./admin/AdminBarChart";
export type { AdminBarChartProps, BarDatum } from "./admin/AdminBarChart";

// Instagram
export { InstagramEmbed } from "./InstagramEmbed";
export type { InstagramEmbedProps } from "./InstagramEmbed";
export { InstagramSection } from "./InstagramSection";
export type { InstagramSectionProps } from "./InstagramSection";

// Favoritos (Context + localStorage)
export { FavoritesProvider, useFavorites } from "./FavoritesContext";
export { FavoriteButton } from "./FavoriteButton";
export type { FavoriteButtonProps } from "./FavoriteButton";
export { FavoritesLink } from "./FavoritesLink";
export type { FavoritesLinkProps } from "./FavoritesLink";

// Carrito (Context + localStorage + panel lateral)
export { CartProvider, useCart } from "./CartContext";
export type { CartItem } from "./CartContext";
export { CartButton } from "./CartButton";
export { AddToCartButton } from "./AddToCartButton";
export type { AddToCartButtonProps } from "./AddToCartButton";
export { CheckoutForm } from "./CheckoutForm";
export type { CheckoutFormProps, CheckoutData } from "./CheckoutForm";

// Componentes base
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
export { Hero } from "./Hero";
export type { HeroProps } from "./Hero";

// Componentes de tienda
export { Navbar } from "./Navbar";
export type { NavbarProps } from "./Navbar";
export { SearchBox } from "./SearchBox";
export type { SearchBoxProps, SearchItem } from "./SearchBox";
export { Banner } from "./Banner";
export type { BannerProps } from "./Banner";
export { BannerCarousel } from "./BannerCarousel";
export type { BannerCarouselProps, CarouselSlide } from "./BannerCarousel";
export { CategoryBar } from "./CategoryBar";
export type { CategoryBarProps } from "./CategoryBar";
export { CategoryCircles } from "./CategoryCircles";
export type { CategoryCirclesProps, CategoryCircleItem } from "./CategoryCircles";
export { SectionHeading } from "./SectionHeading";
export type { SectionHeadingProps } from "./SectionHeading";
export { ProductCard } from "./ProductCard";
export type { ProductCardProps } from "./ProductCard";
export { ProductGrid } from "./ProductGrid";
export type { ProductGridProps } from "./ProductGrid";
export { Footer } from "./Footer";
export type { FooterProps, FooterColumn } from "./Footer";
