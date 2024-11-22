import { Provider, useDispatch } from "react-redux";
import "./App.css";
import store from "./component/app/store";
import NavigationContainer from "./component/navigation/NavigationContainer";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setToken, setUser } from "./component/app/feature/authSlice";
import Footer from "./component/common/Navbar/Footer";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("rent_room_token");
    const email = Cookies.get("rent_room_email");
    const is_landowner = Cookies.get("rent_room_is_landowner")
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
      <Footer/>
    </Provider>
  );
}

export default App;
