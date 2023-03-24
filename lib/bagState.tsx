import { createContext, useContext } from "react";

const LocalStateContext = createContext<{ bagOpen: boolean } | null>(null);
const LocalStateProvider = LocalStateContext.Provider;

function BagStateProvider({ children }: { children: React.ReactNode }) {
  const bagOpen = true;
  return (
    <LocalStateProvider value={{ bagOpen }}>{children}</LocalStateProvider>
  );
}
function useBag() {
  const all = useContext(LocalStateContext);
  return all;
}
export { BagStateProvider };
