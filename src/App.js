import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/Home";
import AboutPage from "./components/pages/About";
import RootLayout from "./components/pages/Root";
import CartProvider from "./store/CartProvider";
import Products from "./components/Products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Products /> },
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
