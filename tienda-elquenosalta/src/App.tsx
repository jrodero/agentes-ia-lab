import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductPage } from './pages/ProductPage';
import { Customizer } from './pages/Customizer';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { InfoPage } from './pages/InfoPage';
import { NotFound } from './pages/NotFound';
import { AdminLayout, CostsAdmin, Dashboard, InventoryAdmin, OrdersAdmin, ProductsAdmin } from './pages/admin/Admin';

export function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="personas" element={<Catalog />} />
            <Route path="personas/:categoria" element={<Catalog />} />
            <Route path="producto/:slug" element={<ProductPage />} />
            <Route path="personalizar" element={<Customizer />} />
            <Route path="carrito" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="pedido/:id" element={<OrderConfirmation />} />
            <Route path="info/:pagina" element={<InfoPage />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="productos" element={<ProductsAdmin />} />
              <Route path="inventario" element={<InventoryAdmin />} />
              <Route path="pedidos" element={<OrdersAdmin />} />
              <Route path="costes" element={<CostsAdmin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
