import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Array dynamic toggler mapping (Adds if missing, clears if already bookmarked)
  const toggleWishlistNode = (car) => {
    setWishlistItems((prev) => {
      const isExist = prev.some((item) => item.id === car.id);
      if (isExist) {
        return prev.filter((item) => item.id !== car.id);
      } else {
        return [car, ...prev];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlistNode }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlistEngine = () => useContext(WishlistContext);