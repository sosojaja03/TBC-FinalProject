import { useContext } from "react";
import { AuthContext } from "../index";

export const UseAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "No auth context found You Must Use It inside Auth Provider",
    );
  }
  return authContext;
};
