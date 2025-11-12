import { toast } from "sonner";

  export const wishList = {
    getWishList() {
       if (typeof window !== "undefined") {
      const data = localStorage.getItem('wishList')
      return JSON.parse(data) || [];
    }
    },
    addToWishList(productId:string) {
      const wishListData = this.getWishList();
      const product = products?.find((p) => p.id === productId) || [];
      if (product) {
        wishListData.push(product);
        localStorage.setItem('wishList', JSON.stringify(wishListData));
        toast.success(
          "Added To Wishlist 🎯"
        )
      }
    },
    removeFromWishList(productId:string) {
      const wishListData = this.getWishList();
      const updatedwishList = wishListData.filter((p) => p.id !== productId);
      localStorage.setItem('wishList', JSON.stringify(updatedwishList));
    },
  };