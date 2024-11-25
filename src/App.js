import { Provider, useDispatch } from "react-redux";
import "./App.css";
import store from "./component/app/store";
import NavigationContainer from "./component/navigation/NavigationContainer";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setToken, setUser } from "./component/app/feature/authSlice";
import Footer from "./component/common/Navbar/Footer";
import { HelmetProvider, Helmet } from "react-helmet-async";
function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("rent_room_token");
    const email = Cookies.get("rent_room_email");
    const is_landowner = Cookies.get("rent_room_is_landowner");
    if (token && email) {
      dispatch(setToken(token));
      dispatch(setUser({ email: email }));
      dispatch(setUser({ is_landowner: is_landowner }));
    }
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title>RoomRentNepal - Your Trusted Rental Platform</title>
        <meta
          name="description"
          content="Find and manage rental properties with ease. Explore listings with map locations and connect with landlords today!"
        />
        <meta name="robots" content="index, follow" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "RoomRentNepal",
            url: "https://roomrentnepal.site",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://roomrentnepal.site/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>
      <NavigationContainer />;
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <AppContent />
        <Footer />
      </HelmetProvider>
    </Provider>
  );
}

export default App;
