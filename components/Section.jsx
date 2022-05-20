import { createContext, useContext } from "react";

const FamilyContext = createContext();

export const useFamily = () => useContext(FamilyContext);

export default function Section({ family, title, children }) {
  return (
    <FamilyContext.Provider value={family}>
      <div className="flex flex-col gap-6 bg-white p-4 rounded-xl drop-shadow-lg">
        <h4>{title}</h4>
        {children}
      </div>
    </FamilyContext.Provider>
  );
}
