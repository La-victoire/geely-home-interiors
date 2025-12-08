import { product } from "@/components/shop/Mini-Components/CollectionCard";
import { toast } from "sonner";

// KEY FOR SESSION STORAGE
const WISH_KEY = "geely_list";

/* ---------------------------- UTIL FUNCTIONS ---------------------------- */

function loadWishList(): product[] {
  if (typeof window === "undefined") return [];
  try {
    const data = sessionStorage.getItem(WISH_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveList(WISH: any) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(WISH_KEY, JSON.stringify(WISH));
}

  export const wishList = {
    getWishList() {
     return loadWishList();
    },
    addToWishList(product:product) {
      const wishListData = this.getWishList();
      const existing = wishListData?.find((p) => p._id === product._id);
      if (existing) {
        toast.info("Product already saved to wishlist")
      } else {
        wishListData.push(product);
        localStorage.setItem('wishList', JSON.stringify(wishListData));
        toast.success(
          "Added To Wishlist 🎯"
        )
        saveList(wishListData);
        return wishListData;
      }
    },
    removeFromWishList(productId:string) {
      const wishListData = this.getWishList();
      const updatedwishList = wishListData.filter((p) => p._id !== productId);
      saveList(updatedwishList);
    },
  };
