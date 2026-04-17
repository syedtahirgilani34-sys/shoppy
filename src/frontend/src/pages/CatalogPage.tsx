import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useCategories, useProducts } from "../hooks/useProducts";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types";

// ─── Product Card ────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Link
        to="/product/$id"
        params={{ id: String(product.id) }}
        data-ocid={`catalog.item.${index + 1}`}
        className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-product hover:shadow-product-hover transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
          <Badge
            data-ocid={`catalog.category_badge.${index + 1}`}
            className="absolute top-3 left-3 bg-card/90 text-foreground border border-border backdrop-blur-sm text-xs font-medium"
            variant="outline"
          >
            {product.category}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          <h2 className="font-display font-bold text-base text-foreground leading-tight line-clamp-1">
            {product.name}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="font-display font-bold text-lg text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              data-ocid={`catalog.add_button.${index + 1}`}
              onClick={handleAddToCart}
              className="gap-1.5 text-xs"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag size={14} />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Skeleton Card ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-card border border-border rounded-xl overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      data-ocid="catalog.empty_state"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="col-span-full flex flex-col items-center justify-center py-24 gap-5 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
        <ShoppingBag
          size={32}
          className="text-muted-foreground"
          strokeWidth={1.5}
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-bold text-xl text-foreground">
          No products found
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
      <Button
        variant="outline"
        onClick={onReset}
        data-ocid="catalog.reset_filters_button"
      >
        Clear filters
      </Button>
    </motion.div>
  );
}

// ─── CatalogPage ─────────────────────────────────────────────────────────────

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const allCategories = useMemo(() => ["All", ...categories], [categories]);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    return result;
  }, [products, activeCategory, search]);

  function handleReset() {
    setSearch("");
    setActiveCategory("All");
  }

  const isLoading = productsLoading || categoriesLoading;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="font-display font-bold text-3xl text-foreground">
          Shop All Products
        </h1>
        <p className="text-muted-foreground text-sm">
          {isLoading
            ? "Loading products…"
            : `${filtered.length} product${filtered.length !== 1 ? "s" : ""} available`}
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <Input
          data-ocid="catalog.search_input"
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 pr-9"
          aria-label="Search products"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            data-ocid="catalog.search_clear_button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category filters */}
      <fieldset className="border-0 p-0 m-0">
        <legend className="sr-only">Filter by category</legend>
        <div className="flex flex-wrap gap-2">
          {isLoading
            ? ["s1", "s2", "s3", "s4", "s5"].map((id) => (
                <Skeleton key={id} className="h-8 w-20 rounded-full" />
              ))
            : allCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  data-ocid={`catalog.category_filter.${cat.toLowerCase().replace(/\s+/g, "_")}`}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={[
                    "px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth",
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary hover:text-primary",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
        </div>
      </fieldset>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {isLoading ? (
          ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"].map((id) => (
            <SkeletonCard key={id} />
          ))
        ) : filtered.length === 0 ? (
          <EmptyState onReset={handleReset} />
        ) : (
          filtered.map((product: Product, index: number) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
