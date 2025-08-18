import { products } from "@/components/constants";
import { toast } from "sonner";

  export const wishList = {
    getWishList() {
       if (typeof window !== "undefined") {
      const data = sessionStorage.getItem('wishList')
      return JSON.parse(data) || [];
    }
    },
    addToWishList(productId:string) {
      const wishListData = this.getWishList();
      const product = products.find((p) => p.id === productId);
      if (product) {
        const existingProduct = wishListData.find((p) => p.id === productId);
        if (existingProduct) {
          toast.message(
            "Product already in watchlist"
          )
        } else {
          toast.success(
            "Added To Wishlist 🎯"
          )
          wishListData.push(product);
        }
        sessionStorage.setItem('wishList', JSON.stringify(wishListData));
      }
    },
    removeFromWishList(productId:string) {
      const wishListData = this.getWishList();
      const updatedwishList = wishListData.filter((p) => p.id !== productId);
      sessionStorage.setItem('wishList', JSON.stringify(updatedwishList));
    },
  };