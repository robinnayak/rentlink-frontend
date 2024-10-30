import { Provider, useDispatch } from "react-redux";
import "./App.css";
import store from "./component/app/store";
import NavigationContainer from "./component/navigation/NavigationContainer";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setToken, setUser } from "./component/app/feature/authSlice";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    const email = Cookies.get("email");
    const is_landowner = Cookies.get("is_landowner")
    if(token && email){
      dispatch(setToken(token));
      dispatch(setUser({email: email}));
      dispatch(setUser({is_landowner:is_landowner}))
    }
  }, [dispatch]);
  return <NavigationContainer />;
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
