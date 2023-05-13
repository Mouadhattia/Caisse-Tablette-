import { Route, Routes } from "react-router-dom";
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import Home from "./jsx/components/Dashboard/Home";

import ProductDetail from "./jsx/components/AppsMenu/Shop/ProductGrid/ProductDetail";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

//export default connect((mapStateToProps)(App));
export default App;
