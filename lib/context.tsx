import { createContext, useState, ReactNode } from "react";
import { Product } from "./types";

interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  productData: Product[];
  setProductData: (productData: Product[]) => void;
}

export const Context = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
  productData: [],
  setProductData: () => {},
});

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<Product[]>([]);
  return (
    <Context.Provider
      value={{ loading, setLoading, productData, setProductData }}
    >
      {children}
    </Context.Provider>
  );
};
