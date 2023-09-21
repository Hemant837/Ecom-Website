import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/pages/Root";
import CartProvider from "./store/CartProvider";
import HomePage from "./components/pages/Home";
import Products from "./components/pages/Products/Products";
import AboutPage from "./components/pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/store", element: <Products /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
