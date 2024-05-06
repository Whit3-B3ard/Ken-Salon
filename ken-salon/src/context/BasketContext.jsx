"use client"
import React, { createContext, useState } from 'react';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);

  // Functions to modify the basket
  const addToBasket = (service, imageUrl) => {
    const basketItem = {
      ...service,
      imageUrl: imageUrl,
    };
    if (basket.length < 4) {
      setBasket([...basket, basketItem]);
      setTotal(total + parseFloat(service.price.replace("AED ", "")));
    } else {
      alert("Maximum of 4 items can be added to the basket.");
    }
  };
  const removeFromBasket = (indexToRemove) => {
    setBasket(basket.filter((item, index) => index !== indexToRemove));
    const newTotal = basket.reduce((acc, item, index) => {
      if (index !== indexToRemove) {
        return acc + parseFloat(item.price.replace("AED ", ""));
      }
      return acc;
    }, 0);
    setTotal(newTotal);
  };

  return (
    <BasketContext.Provider value={{ basket, setBasket, total, setTotal, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
