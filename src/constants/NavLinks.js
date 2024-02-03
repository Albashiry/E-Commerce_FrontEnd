import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { faCartPlus, faCartShopping, faPen, faPlus, faTruck, faTruckFast, faUsers } from "@fortawesome/free-solid-svg-icons";

// Roles
// 1995 => admin
// 1996 => writer
// 1999 => product manager
// 2001 => user

export const links = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: ["1995"]
  },
  {
    name: "Add User",
    path: "/dashboard/user/add",
    icon: faPlus,
    role: ["1995"]
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: faCartShopping,
    role: ["1995", "1999"]
  },
  {
    name: "Add Category",
    path: "/dashboard/category/add",
    icon: faCartPlus,
    role: ["1995", "1999"]
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: faProductHunt,
    role: ["1995", "1999"]
  },
  {
    name: "Add Product",
    path: "/dashboard/product/add",
    icon: faTruckFast,
    role: ["1995", "1999"]
  },
  {
    name: "Writer",
    path: "/dashboard/writer",
    icon: faPen,
    role: ["1995", "1996"]
  },
];