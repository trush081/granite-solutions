import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Home from "./scenes/home/Home"
import About from "./scenes/about/About";
import Services from "./scenes/services/Services";
import Products from "./scenes/products/Products";
import Estimate from "./scenes/estimate/Estimate";
import Visualizer from "./scenes/visualizer/Visualizer";
import Contact from "./scenes/contact/Contact";
import Confirmation from "./scenes/checkout/Confirmation";
import Checkout from "./scenes/checkout/Checkout";
import ProductDetails from "./scenes/products/productDetails/ProductDetails";
import Navbar from "./global/Navbar";
import CartMenu from "./global/CartMenu";
import Footer from "./global/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [pathname])

  return null;
}

function App() {
  return <div className="app">
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:productId" element={<ProductDetails />} />
        <Route path="estimate" element={<Estimate />} />
        <Route path="visualizer" element={<Visualizer />} />
        <Route path="contact" element={<Contact />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/success" element={<Confirmation />} />
      </Routes>
      <CartMenu />
      <Footer />
    </BrowserRouter>
  </div>
}

export default App;
