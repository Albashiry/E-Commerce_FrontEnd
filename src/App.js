import "./App.css";
import HomePage from "./pages/website/HomePage";
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Users from "./pages/dashboard/Users";
import GoogleCallBack from "./pages/auth/GoogleCallBack";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAuth from "./pages/auth/RequireAuth";
import UserEdit from "./pages/dashboard/UserEdit";
import AddUser from "./pages/dashboard/UserAdd";
import Writer from "./pages/dashboard/Writer";
import Categories from "./pages/dashboard/Categories";
import Error404 from "./pages/auth/Error404";
import RequireBack from "./pages/auth/RequireBack";
import CategoryAdd from "./pages/dashboard/CategoryAdd";
import CategoryEdit from "./pages/dashboard/CategoryEdit";
import Products from "./pages/dashboard/Products";
import ProductAdd from "./pages/dashboard/ProductAdd";
import ProductEdit from "./pages/dashboard/ProductEdit";
import CategoriesShow from "./components/website/CategoriesShow";
import Website from "./components/website/Website";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* public routes */}
        <Route element={<Website />} >
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/categories' element={<CategoriesShow />} />
        </Route>
        
        <Route element={<RequireBack />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path="/auth.google.callback" element={<GoogleCallBack />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRole={['1995', '1996', "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={['1995']} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UserEdit />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={['1995', '1999']} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<CategoryEdit />} />
              <Route path="category/add" element={<CategoryAdd />} />

              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductEdit />} />
              <Route path="product/add" element={<ProductAdd />} />
            </Route>
            <Route element={<RequireAuth allowedRole={['1995', '1996']} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
          </Route>
        </Route>

        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;