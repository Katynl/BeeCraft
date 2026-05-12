// import "./App.css";
// import "./input.css";

// import { lazy, useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import Catalog from "./pages/Catalog";
// import Footer from "./components/Footer";
// import { CartProvider } from "./context/CartContext";
// import Cart from "./pages/Cart";
// import ProductPage from "./pages/ProductPage";
// import Checkout from "./pages/Checkout";

// function App() {
//   return (
//     <div className="App">
//       <CartProvider>
//         <BrowserRouter>
//           <Navbar />
//           <main className="flex-grow">
//             <Routes>
//               <Route path="/" element={<Home />}></Route>
//               <Route path="/catalog" element={<Catalog />}></Route>
//               <Route path="/login" element={<Login />}></Route>
//               <Route path="/register" element={<Register />}></Route>
//               <Route path="/cart" element={<Cart />}></Route>
//               <Route path="/catalog/:slug" element={<ProductPage />} />
//               <Route path="/checkout" element={<Checkout></Checkout>}></Route>
//               <Route path="/profile" element={<Profile />}></Route>
//             </Routes>
//           </main>
//           <Footer></Footer>
//         </BrowserRouter>
//       </CartProvider>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import "./input.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

// Обычные импорты (не lazy)
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import OrderDetail from "./pages/OrderDetail";

// Ленивые импорты
const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<div className="text-center py-20">Загрузка...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/catalog/:slug" element={<ProductPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/orders/:id" element={<OrderDetail></OrderDetail>} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;