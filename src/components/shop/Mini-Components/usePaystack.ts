"use client";
import { useEffect, useState } from "react";

export const usePaystack = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Prevent duplicate loading
    if (document.getElementById("paystack-script")) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "paystack-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error("Failed to load Paystack script");
    document.body.appendChild(script);
  }, []);

  return loaded;
};
