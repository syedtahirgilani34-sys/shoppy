import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import type { CartItem } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, X } from "lucide-react";

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  index,
}: {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  index: number;
}) {
  return (
    <div
      data-ocid={`cart.item.${index}`}
      className="flex items-center gap-4 py-5"
    >
      {/* Product image */}
      <div className="w-20 h-20 shrink-0 rounded-md overflow-hidden border border-border bg-muted">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name + price */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-foreground text-sm leading-snug truncate">
          {item.name}
        </p>
        <p className="text-muted-foreground text-sm mt-0.5">
          {formatPrice(item.price)} each
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          data-ocid={`cart.decrease_button.${index}`}
          onClick={onDecrease}
          aria-label={
            item.quantity === 1
              ? `Remove ${item.name} from cart`
              : `Decrease quantity of ${item.name}`
          }
          className="w-8 h-8 flex items-center justify-center rounded border border-border bg-background hover:bg-muted transition-colors duration-200 text-foreground"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span
          data-ocid={`cart.quantity.${index}`}
          className="w-8 text-center text-sm font-bold font-display tabular-nums select-none"
        >
          {item.quantity}
        </span>
        <button
          type="button"
          data-ocid={`cart.increase_button.${index}`}
          onClick={onIncrease}
          aria-label={`Increase quantity of ${item.name}`}
          className="w-8 h-8 flex items-center justify-center rounded border border-border bg-background hover:bg-muted transition-colors duration-200 text-foreground"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="w-20 text-right shrink-0">
        <span className="font-display font-bold text-sm text-foreground tabular-nums">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>

      {/* Remove button */}
      <button
        type="button"
        data-ocid={`cart.delete_button.${index}`}
        onClick={onRemove}
        aria-label={`Remove ${item.name} from cart`}
        className="w-8 h-8 flex items-center justify-center rounded hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors duration-200 shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function EmptyCart() {
  return (
    <div
      data-ocid="cart.empty_state"
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <ShoppingBag className="w-9 h-9 text-muted-foreground" />
      </div>
      <h2 className="font-display font-bold text-2xl text-foreground mb-2">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground text-sm mb-8 max-w-xs">
        Looks like you haven't added anything yet. Browse our collection and
        find something you love.
      </p>
      <Link to="/">
        <Button
          data-ocid="cart.browse_products_button"
          size="lg"
          className="font-display font-bold"
        >
          Browse Products
        </Button>
      </Link>
    </div>
  );
}

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalItems = useCartStore((s) => s.totalItems);

  const itemCount = totalItems();
  const orderTotal = totalPrice();

  return (
    <div data-ocid="cart.page" className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            data-ocid="cart.continue_shopping_link"
            className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-lg text-foreground">
              Your Cart
            </h1>
            {itemCount > 0 && (
              <span
                data-ocid="cart.item_count_badge"
                className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold tabular-nums"
              >
                {itemCount}
              </span>
            )}
          </div>
          {/* Spacer to balance header */}
          <div className="w-28" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* Column labels */}
            <div className="hidden sm:flex items-center gap-4 pb-2 text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">
              <div className="w-20 shrink-0" />
              <span className="flex-1">Product</span>
              <span className="w-[88px] text-center">Quantity</span>
              <span className="w-20 text-right">Subtotal</span>
              <span className="w-8" />
            </div>

            <Separator />

            {/* Cart items */}
            <div data-ocid="cart.list">
              {items.map((item, idx) => (
                <div key={item.productId}>
                  <CartItemRow
                    item={item}
                    index={idx + 1}
                    onIncrease={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    onDecrease={() => {
                      if (item.quantity === 1) {
                        removeItem(item.productId);
                      } else {
                        updateQuantity(item.productId, item.quantity - 1);
                      }
                    }}
                    onRemove={() => removeItem(item.productId)}
                  />
                  {idx < items.length - 1 && <Separator />}
                </div>
              ))}
            </div>

            <Separator />

            {/* Order summary */}
            <div
              data-ocid="cart.order_summary"
              className="mt-6 bg-muted/40 rounded-xl border border-border px-6 py-5"
            >
              <h2 className="font-display font-bold text-base text-foreground mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-muted-foreground"
                  >
                    <span className="truncate pr-4">
                      {item.name}{" "}
                      <span className="text-xs">× {item.quantity}</span>
                    </span>
                    <span className="shrink-0 tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-base text-foreground">
                  Total
                </span>
                <span
                  data-ocid="cart.order_total"
                  className="font-display font-bold text-xl text-primary tabular-nums"
                >
                  {formatPrice(orderTotal)}
                </span>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="mt-6 flex justify-start">
              <Link to="/">
                <Button
                  data-ocid="cart.continue_shopping_button"
                  variant="outline"
                  className="font-display font-bold"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
