import { faCartShopping, faPen, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
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
    name: "Writer",
    path: "/dashboard/writer",
    icon: faPen,
    role: ["1995", "1996"]
  },
];