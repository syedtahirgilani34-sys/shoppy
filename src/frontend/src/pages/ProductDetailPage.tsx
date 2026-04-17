import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useProduct } from "../hooks/useProduct";
import { useCartStore } from "../store/cartStore";

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const productId = Number.parseInt(id, 10);

  const { data: product, isLoading } = useProduct(productId);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const inStock = product ? product.stock > 0 : false;
  const maxQty = product ? product.stock : 1;

  function handleDecrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function handleIncrement() {
    setQuantity((q) => Math.min(maxQty, q + 1));
  }

  function handleQuantityInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseInt(e.target.value, 10);
    if (Number.isNaN(val)) return;
    setQuantity(Math.min(maxQty, Math.max(1, val)));
  }

  function handleAddToCart() {
    if (!product || !inStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    // addItem sets qty to 1; if user wants more, sync with updateQuantity
    if (quantity > 1) {
      updateQuantity(product.id, quantity);
    }
    setAdded(true);
    toast.success(`${product.name} added to cart`, {
      description: `${quantity} × $${product.price.toFixed(2)}`,
      duration: 3000,
    });
    setTimeout(() => setAdded(false), 2500);
  }

  // Loading state
  if (isLoading) {
    return (
      <div
        data-ocid="product_detail.loading_state"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <Skeleton className="h-6 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <Skeleton className="w-full aspect-square rounded-xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-12 w-full mt-4" />
          </div>
        </div>
      </div>
    );
  }

  // 404 state
  if (!product) {
    return (
      <div
        data-ocid="product_detail.error_state"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center gap-6"
      >
        <AlertCircle className="w-16 h-16 text-muted-foreground" />
        <h2 className="font-display text-3xl font-bold text-foreground">
          Product Not Found
        </h2>
        <p className="text-muted-foreground text-lg max-w-sm">
          We couldn't find the product you're looking for. It may have been
          removed or the link is incorrect.
        </p>
        <Link to="/" data-ocid="product_detail.back_link">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        to="/"
        data-ocid="product_detail.back_link"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          data-ocid="product_detail.image"
          className="w-full"
        >
          <div className="w-full aspect-square bg-muted rounded-xl overflow-hidden shadow-product">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-smooth hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Product info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          data-ocid="product_detail.info"
          className="flex flex-col gap-5"
        >
          {/* Category badge */}
          <Badge
            data-ocid="product_detail.category_badge"
            variant="secondary"
            className="self-start text-xs uppercase tracking-wide font-semibold"
          >
            {product.category}
          </Badge>

          {/* Name */}
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <p
            data-ocid="product_detail.price"
            className="font-display text-3xl font-bold text-primary"
          >
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed text-base">
            {product.description}
          </p>

          {/* Stock status */}
          <div
            data-ocid="product_detail.stock_status"
            className="flex items-center gap-2"
          >
            {inStock ? (
              <>
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">
                  In Stock
                </span>
                <span className="text-sm text-muted-foreground">
                  ({product.stock} available)
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  Out of Stock
                </span>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Quantity selector */}
          {inStock && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">
                Quantity
              </span>
              <div
                data-ocid="product_detail.quantity_selector"
                className="flex items-center border border-border rounded-lg overflow-hidden bg-card"
              >
                <button
                  type="button"
                  data-ocid="product_detail.quantity_decrement"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  data-ocid="product_detail.quantity_input"
                  type="number"
                  min={1}
                  max={maxQty}
                  value={quantity}
                  onChange={handleQuantityInput}
                  className="w-14 h-10 text-center text-sm font-semibold bg-transparent border-x border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
                  aria-label="Quantity"
                />
                <button
                  type="button"
                  data-ocid="product_detail.quantity_increment"
                  onClick={handleIncrement}
                  disabled={quantity >= maxQty}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart button */}
          <Button
            data-ocid="product_detail.add_to_cart_button"
            size="lg"
            onClick={handleAddToCart}
            disabled={!inStock || added}
            className="w-full h-14 text-base font-semibold gap-2 transition-smooth bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {added ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                {inStock ? "Add to Cart" : "Out of Stock"}
              </>
            )}
          </Button>

          {/* Cart link hint */}
          {added && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <Link
                to="/cart"
                data-ocid="product_detail.view_cart_link"
                className="text-sm text-primary underline underline-offset-2 hover:opacity-75 transition-opacity"
              >
                View Cart →
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
