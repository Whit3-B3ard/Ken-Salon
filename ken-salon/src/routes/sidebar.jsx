import { FaHome, FaWpforms, FaAddressCard, FaChartBar, FaTrash, FaTable, FaFileInvoice } from "react-icons/fa";
import { MdOutlineSmartButton } from "react-icons/md";

const routes = [
  {
    path: '/admin',
    icon: FaHome,
    name: 'Dashboard',
  },
  {
    path: '/admin/Forms',
    icon: FaWpforms,
    name: 'Salons',
  },
  {
    path: '/admin/cards',
    icon: FaAddressCard,
    name: 'Employees',
  },
  {
    path: '/admin/charts',
    icon: FaChartBar,
    name: 'Hours',
  },
  {
    path: '/admin/buttons',
    icon: MdOutlineSmartButton, // Update this as per your actual icon
    name: 'Services',
  },
  {
    path: '/admin/modals',
    icon: FaTrash, // Update this as per your actual icon
    name: 'Closures',
  },
  {
    path: '/admin/tables',
    icon: FaTable,
    name: 'Stats',
  },
  {
    icon: FaFileInvoice, // Assuming this is a parent category icon
    name: 'Extras',
    routes: [
      {
        path: '/login',
        name: 'Login',
      },
      {
        path: '/create-account',
        name: 'Create account',
      },
      {
        path: '/forgot-password',
        name: 'Forgot password',
      },
      {
        path: '/admin/404',
        name: '404',
      },
      {
        path: '/admin/blank',
        name: 'Blank',
      },
    ],
  },

];

export default routes;
