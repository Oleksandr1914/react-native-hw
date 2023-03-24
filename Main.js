import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { authStateChangedUser } from "./redux/auth/authOperation";
import { useRouts } from "./routs";

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangedUser());
  }, []);

  const routing = useRouts(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
