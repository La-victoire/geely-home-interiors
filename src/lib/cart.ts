import { products } from "@/components/constants";

export const cart = {
  getCart() {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem('cart')
      return JSON.parse(data) || [];
    }
  },
  addToCart(productId:string, productQuantity:number) {
    const cardData = this.getCart();
    const product = products.find((p) => p.id === productId);
    if (product) {
      const existingProduct = cardData.find((p) => p.id === productId);
      if (existingProduct) {
        existingProduct.quantity += productQuantity;
      } else {
        cardData.push({ ...product, quantity: productQuantity});
      }
      sessionStorage.setItem('cart', JSON.stringify(cardData));
    }
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