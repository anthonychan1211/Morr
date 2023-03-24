import React from "react";
export const AddButton: React.FC<{
  onClick?: React.MouseEventHandler<HTMLElement>;
}> = ({ children }: any) => {
  return <button style={{}}>{children}</button>;
};

export default AddButton;
