// import { products } from "@/components/constants";
import { toast } from "sonner";
import { deleteProduct, getData, postData } from "./actions";
import { product } from "@/components/shop/Mini-Components/CollectionCard";


export const cart = {
   getProducts () {
    try {
      const fetchedProducts = async () => {
        const data = await getData('/products');
        if (data) {
          return data;
        } else {
          toast.error("Failed to fetch products.");
          return [];
        }
      };
      return fetchedProducts();
    } catch (error) {
      toast.error("Failed to fetch products.");
      console.error("Failed to fetch products:", error);
      return [];
    }
  },

  getCart () {
    try {
      const fetchedCart = async () => {
        const data = await getData('/carts');
        if (!data) {
          toast.error("Failed to fetch cart data.");
          return [];
        }
        return data?.cart
      };
      return fetchedCart();
    } catch (error) {
      toast.error("Failed to fetch cart data.");
      console.error("Failed to fetch cart data:", error);
    }
  },
  addToCart(productId:string, productQuantity:number) {
    const cartData = this.getCart() as unknown as product[];
    const products = this.getProducts() as product[];

    const product = products.find((p) => p._id === productId);
    if (product) {
      try {
        const addProduct = async () => {
          return await postData('/carts/add', {productId, quantity: productQuantity, price: product.price});
        }
        const data = addProduct();
        if (data) {
        toast.success(
          "Product Added to Cart"
        )}
      } catch (error) {
          toast.error("Failed to add product to cart.");
          console.error("Failed to add product to cart:", error);
      }
    }
    return cartData;
  },
  removeFromCart(productId:string) {
    const cartData = this.getCart();
    try {
      const removeProduct = async () => {
        return await deleteProduct(`/carts/${productId}`);
      }
      const data = removeProduct();
      if (data) {
        toast.success(
          "Product Removed from Cart"
        )}
    } catch (error) {
        toast.error("Failed to remove product from cart.");
        console.error("Failed to remove product from cart:", error);
    }
  },
  updateCartQuantity(productId:string, quantity:number) {
    const cartData = this.getCart() as unknown as product[];
    const product = cartData.find((p) => p.id === productId);
    if (product) {
      try {
        const updateProduct = async () => {
          return await postData(`/carts/update/${productId}`, {quantity});
        }
        const data = updateProduct();
        if (data) {
        toast.success(
          "Cart Updated"
        )}
      } catch (error) {
          toast.error("Failed to update cart.");
          console.error("Failed to update cart:", error);
      }
    } 
  },
};
