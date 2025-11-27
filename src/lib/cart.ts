import { toast } from "sonner";
import { product } from "@/components/shop/Mini-Components/CollectionCard";

// KEY FOR SESSION STORAGE
const CART_KEY = "geely_cart";

/* ---------------------------- UTIL FUNCTIONS ---------------------------- */

function loadCart(): { productId: string; quantity: number; price: number }[] {
  if (typeof window === "undefined") return [];
  try {
    const data = sessionStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCart(cart: any) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ---------------------------- CART MODULE ---------------------------- */

export const cart = {
  /* -------------------------- GET CART -------------------------- */
  getCart() {
    return loadCart();
  },

  /* -------------------------- ADD TO CART -------------------------- */
  addToCart(product: product, quantity: number = 1) {
    const cartData = loadCart();

    const existing = cartData.find((p) => p.productId === product._id);

    if (existing) {
      // Increase quantity
      existing.quantity += quantity;
      toast.success("Product quantity updated");
    } else {
      // Add new item
      cartData.push({
        productId: product._id,
        quantity,
        price: product.price,
      });

      toast.success("Product added to cart");
    }

    saveCart(cartData);
    return cartData;
  },

  /* ------------------------- REMOVE FROM CART ------------------------- */
  removeFromCart(productId: string) {
    let cartData = loadCart();
    const newCart = cartData.filter((p) => p.productId !== productId);

    saveCart(newCart);
    toast.success("Product removed from cart");
    return newCart;
  },

  /* ------------------------ UPDATE QUANTITY ------------------------ */
  updateCartQuantity(productId: string, quantity: number) {
    let cartData = loadCart();
    const item = cartData.find((p) => p.productId === productId);

    if (!item) {
      toast.error("Product not in cart");
      return cartData;
    }

    item.quantity = Math.max(1, quantity); // prevent 0 or negative

    saveCart(cartData);
    toast.success("Cart updated");

    return cartData;
  },

  /* ------------------------ CLEAR CART ------------------------ */
  clearCart() {
    saveCart([]);
    toast.success("Cart cleared");
  },
};
