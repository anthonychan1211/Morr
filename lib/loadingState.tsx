import { createContext, useState, ReactNode } from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
