import { products } from "@/components/constants";
import { toast } from "sonner";

export const cart = {
  getCart() {
    if (typeof window !== "undefined")  {
      const data = sessionStorage.getItem('cart')
      try {
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    }
  },
  addToCart(productId:string, productQuantity:number) {
    const cartData = this.getCart();
    const product = products.find((p) => p.id === productId);
    if (product) {
      const existingProduct = cartData?.find((p) => p.id === productId);
      let updatedCart;
      if (existingProduct) {
        updatedCart = cartData?.map((p) => p.id === productId ? 
        {...p, quantity: p.quantity + productQuantity} : p);
      } else {
        updatedCart = [...cartData, {...product, quantity: productQuantity}];
      }
      toast.success(
        "Product Added to Cart"
      )
      sessionStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    }
    return cartData;
  },
  removeFromCart(productId:string) {
    const cartData = this.getCart();
    const updatedCart = cartData.filter((p) => p.id !== productId);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  },
  updateCartQuantity(productId:string, quantity:number) {
    const cartData = this.getCart();
    const product = cartData.find((p) => p.id === productId);
    if (product) {
      product.quantity = quantity;
      sessionStorage.setItem('cart', JSON.stringify(cartData));
    } 
  },
};