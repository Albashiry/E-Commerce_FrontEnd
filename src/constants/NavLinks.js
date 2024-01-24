import { faPen, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
export const links = [
  {
    path: "users",
    icon: faUsers,
    name: "Users",
    role: ["1995"]
  },
  {
    path: "/dashboard/user/add",
    icon: faPlus,
    name: "Add User",
    role: ["1995"]
  },
  {
    path: "/dashboard/writer",
    icon: faPen,
    name: "Writer",
    role: ["1995", "1996"]
  },
];