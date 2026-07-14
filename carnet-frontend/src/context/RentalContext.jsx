import React, { createContext, useContext, useState } from 'react';

const RentalContext = createContext();

export function RentalProvider({ children }) {
  const [myRentals, setMyRentals] = useState([]);

  const addRentalContract = (car, days) => {
    const today = new Date();
    const expiry = new Date();
    expiry.setDate(today.getDate() + days);

    const formatOffsetDate = (date) => date.toISOString().split('T')[0];

    const newLeaseNode = {
      id: `rent_order_${Math.floor(1000 + Math.random() * 9000)}`,
      name: car.name,
      brand: car.brand,
      category: car.category,
      img: car.img,
      topSpeed: car.topSpeed,
      rentPerDay: car.rentPrice || car.baseRentPerDay,
      startDate: formatOffsetDate(today),
      startTime: "10:00 AM",
      endDate: formatOffsetDate(expiry),
      endTime: "10:00 AM",
      durationDays: days,
      status: "Active Allocation",
      escrowStatus: "Verified Settlement"
    };

    setMyRentals((prev) => [newLeaseNode, ...prev]);
  };

  // 🛠️ CRITICAL ENGINE FIX: Yeh delete method miss ho raha tha
  const removeRentalContract = (contractId) => {
    setMyRentals((prev) => prev.filter((item) => item.id !== contractId));
  };

  return (
    <RentalContext.Provider value={{ myRentals, addRentalContract, removeRentalContract }}>
      {children}
    </RentalContext.Provider>
  );
}

export const useRentalEngine = () => useContext(RentalContext);