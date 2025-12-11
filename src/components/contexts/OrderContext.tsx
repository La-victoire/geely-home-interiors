import React, { createContext, useContext, useEffect, useState } from "react"

const OrderContext = createContext({});

export const OrderProvider = ({children}:{children: React.ReactNode}) => {
    const [order, setOrder] = useState({});

    return (
        <OrderContext.Provider value={{
            order, setOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used inside OrderProvider")
    }
    return context;
} 
