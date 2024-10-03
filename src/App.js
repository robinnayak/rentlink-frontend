import { Provider } from "react-redux";
import "./App.css";
import store from "./component/app/store";
import NavigationContainer from "./component/navigation/NavigationContainer";
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
  );
}

export default App;
