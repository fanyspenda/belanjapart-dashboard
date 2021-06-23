/* eslint-disable import/no-cycle */
import App from './App';
// import { checkAccess } from '../helpers/accessRight';
import Login from '../containers/login/Login';
import Admin from '../containers/admin/Admin';
import AdminCreate from '../containers/admin/AdminCreate';
import AdminEdit from '../containers/admin/AdminEdit';
import AdminDetail from '../containers/admin/AdminDetail';
import User from '../containers/user/User';
import UserCreate from '../containers/user/UserCreate';
import UserEdit from '../containers/user/UserEdit';
import UserDetail from '../containers/user/UserDetail';
import Transaction from '../containers/transaction/Transaction';
import TransactionDetail from '../containers/transaction/TransactionDetail';
import Master from '../containers/master/Master';
import MasterHeader from '../containers/master/MasterHeader';
import Atribut from '../containers/master/atribut/Atribut';
import AtributCreate from '../containers/master/atribut/AtributCreate';
import AtributEdit from '../containers/master/atribut/AtributEdit';
import AtributDetail from '../containers/master/atribut/AtributDetail';
import AttributeHeader from '../containers/master/atribut/components/AttributeHeader';
import GroupCategory from '../containers/master/groupcategory/GroupCategory';
import GroupCategoryCreate from '../containers/master/groupcategory/GroupCategoryCreate';
import GroupCategoryEdit from '../containers/master/groupcategory/GroupCategoryEdit';
import GroupCategoryDetail from '../containers/master/groupcategory/GroupCategoryDetail';
import GroupCategoryHeader from '../containers/master/groupcategory/components/GroupCategoryHeader';
import Category from '../containers/master/category/Category';
import CategoryCreate from '../containers/master/category/CategoryCreate';
import CategoryEdit from '../containers/master/category/CategoryEdit';
import CategoryDetail from '../containers/master/category/CategoryDetail';
import CategoryHeader from '../containers/master/category/components/CategoryHeader';
import Product from '../containers/master/product/Product';
import ProductCreate from '../containers/master/product/ProductCreate';
import ProductEdit from '../containers/master/product/ProductEdit';
import ProductDetail from '../containers/master/product/ProductDetail';
import ProductHeader from '../containers/master/product/components/ProductHeader';
import ImageLibrary from '../containers/imagelibrary/ImageLibrary';
import Fee from '../containers/master/fee/Fee';
// import FeeCreate from '../containers/master/fee/FeeCreate';
import FeeEdit from '../containers/master/fee/FeeEdit';
import FeeDetail from '../containers/master/fee/FeeDetail';

import ProfilEdit from '../containers/profil/ProfilEdit';
import ResetPassword from '../containers/resetPassword/ResetPassword';
import FeeHeader from '../containers/master/fee/component/FeeHeader';

import FileLibrary from '../containers/fileLibrary/FileLibrary';
import LogCsv from '../containers/logCsv/LogCsv';
import Notification from '../containers/notification/Notification';

export default [
  {
    component: App,
    path: '/',
    routes: [
      {
        component: Admin,
        path: '/admin',
        name: 'ADMIN',
        role: ['superadmin'],
        key: 'admin',
        iconFont: 'mdi mdi-television',
        icon: '/public/images/icon/admin.png',
        exact: true,
        menu: true
      },
      {
        component: AdminCreate,
        path: '/admin/create',
        name: 'AdminCreate',
        role: ['superadmin'],
        key: 'admin',
        exact: true
      },
      {
        component: AdminEdit,
        path: '/admin/edit/:id',
        role: ['superadmin'],
        name: 'AdminEdit',
        key: 'admin',
        exact: true
      },
      {
        component: AdminDetail,
        path: '/admin/detail/:id',
        role: ['superadmin'],
        name: 'AdminDetail',
        key: 'admin',
        exact: true
      },
      {
        component: User,
        path: '/user',
        role: ['superadmin', 'admin'],
        name: 'USER',
        key: 'user',
        iconFont: 'fas fa-user',
        icon: '/public/images/icon/paket.png',
        exact: true,
        menu: true
      },
      {
        component: UserCreate,
        path: '/user/create',
        role: ['superadmin', 'admin'],
        name: 'UserCreate',
        key: 'user',
        exact: true
      },
      {
        component: UserEdit,
        path: '/user/edit/:id',
        role: ['superadmin', 'admin'],
        name: 'UserEdit',
        key: 'user',
        exact: true
      },
      {
        component: UserDetail,
        path: '/user/detail/:id',
        role: ['superadmin', 'admin'],
        name: 'UserDetail',
        key: 'user',
        exact: true
      },
      {
        component: Transaction,
        path: '/transaction',
        role: ['superadmin', 'admin'],
        name: 'TRANSACTION',
        key: 'transaction',
        iconFont: 'fas fa-coins',
        icon: '/public/images/icon/paket.png',
        exact: true,
        menu: true
      },
      {
        component: TransactionDetail,
        path: '/transaction/:id',
        role: ['superadmin', 'admin'],
        name: 'TRANSACTIONDETAIL',
        key: 'transactiondetail',
        exact: true
      },
      {
        component: Master,
        path: '/master',
        role: ['superadmin', 'admin'],
        name: 'MASTER',
        key: 'master',
        iconFont: 'fas fa-key',
        icon: '/public/images/icon/paket.png',
        menu: true,
        header: MasterHeader,
        submenu: true,
        routes: [
          {
            component: Atribut,
            path: '/master/atribut',
            role: ['superadmin', 'admin'],
            name: 'Atribut',
            code: 'A',
            key: 'master/atribut',
            header: AttributeHeader,
            icon: '/public/images/icon/user.png',
            exact: true,
            menu: true
          },
          {
            component: AtributCreate,
            path: '/master/atribut/create',
            role: ['superadmin', 'admin'],
            name: 'AtributCreate',
            // code: 'A',
            key: 'master/atribut',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: AtributEdit,
            path: '/master/atribut/edit/:id',
            role: ['superadmin', 'admin'],
            name: 'AtributEdit',
            // code: 'A',
            key: 'master/atribut',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: AtributDetail,
            path: '/master/atribut/detail/:id',
            role: ['superadmin', 'admin'],
            name: 'AtributDetail',
            // code: 'A',
            key: 'master/atribut',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: GroupCategory,
            path: '/master/groupcategory',
            role: ['superadmin', 'admin'],
            name: 'Group Category',
            code: 'GC',
            key: 'master/groupcategory',
            header: GroupCategoryHeader,
            icon: '/public/images/icon/user.png',
            exact: true,
            menu: true
          },
          {
            component: GroupCategoryCreate,
            path: '/master/groupcategory/create',
            role: ['superadmin', 'admin'],
            name: 'GroupCategoryCreate',
            // code: 'A',
            key: 'master/groupcategory',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: GroupCategoryEdit,
            path: '/master/groupcategory/edit/:id',
            role: ['superadmin', 'admin'],
            name: 'GroupCategoryEdit',
            // code: 'A',
            key: 'master/groupcategory',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: GroupCategoryDetail,
            path: '/master/groupcategory/detail/:id',
            role: ['superadmin', 'admin'],
            name: 'GroupCategoryDetail',
            // code: 'A',
            key: 'master/groupcategory',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: Category,
            path: '/master/category',
            role: ['superadmin', 'admin'],
            name: 'Category',
            code: 'C',
            key: 'master/category',
            header: CategoryHeader,
            icon: '/public/images/icon/user.png',
            exact: true,
            menu: true
          },
          {
            component: CategoryCreate,
            path: '/master/category/create',
            role: ['superadmin', 'admin'],
            name: 'CategoryCreate',
            // code: 'A',
            key: 'master/category',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: CategoryEdit,
            path: '/master/category/edit/:id',
            role: ['superadmin', 'admin'],
            name: 'CategoryEdit',
            // code: 'A',
            key: 'master/edit',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: CategoryDetail,
            path: '/master/category/detail/:id',
            role: ['superadmin', 'admin'],
            name: 'CategoryDetail',
            // code: 'A',
            key: 'master/detail',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: Product,
            path: '/master/product',
            role: ['superadmin', 'admin'],
            name: 'Product',
            placehold: 'Search id atau name',
            code: 'P',
            key: 'master/product',
            header: ProductHeader,
            icon: '/public/images/icon/user.png',
            exact: true,
            menu: true
          },
          {
            component: ProductCreate,
            path: '/master/product/create',
            role: ['superadmin', 'admin'],
            name: 'ProductCreate',
            // code: 'A',
            key: 'master/product',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: ProductEdit,
            path: '/master/product/edit/:id',
            role: ['superadmin', 'admin'],
            name: 'ProductEdit',
            // code: 'A',
            key: 'master/edit',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: ProductDetail,
            path: '/master/product/detail/:id',
            role: ['superadmin', 'admin'],
            name: 'ProductDetail',
            // code: 'A',
            key: 'master/detail',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: Fee,
            path: '/master/fee',
            role: ['superadmin', 'admin'],
            name: 'Delivery Fee',
            placehold: 'Search Province',
            header: FeeHeader,
            // code: 'P',
            key: 'master/fee',
            icon: '/public/images/icon/user.png',
            exact: true,
            menu: true
          },
          // {
          //   component: FeeCreate,
          //   path: '/master/fee/create',
          //   role: ['superadmin', 'admin'],
          //   name: 'Delivery Fee',
          //   // code: 'P',
          //   key: 'master/fee',
          //   icon: '/public/images/icon/user.png',
          //   exact: true
          // },
          {
            component: FeeEdit,
            path: '/master/fee/edit/:id',
            role: ['superadmin', 'admin'],
            name: 'Delivery Fee',
            // code: 'P',
            key: 'master/fee',
            icon: '/public/images/icon/user.png',
            exact: true
          },
          {
            component: FeeDetail,
            path: '/master/fee/detail/:id',
            role: ['superadmin', 'admin'],
            name: 'Delivery Fee',
            // code: 'P',
            key: 'master/fee',
            icon: '/public/images/icon/user.png',
            exact: true
          }
        ]
      },
      {
        component: ImageLibrary,
        path: '/imagelibrary',
        role: ['superadmin', 'admin'],
        name: 'IMAGE LIBRARY',
        key: 'imagelibrary',
        iconFont: 'far fa-image',
        icon: '/public/images/icon/paket.png',
        exact: true,
        menu: true
      },
      // {
      //   component: FileLibrary,
      //   path: '/filelibrary',
      //   role: ['superadmin', 'admin'],
      //   name: 'FILE LIBRARY',
      //   key: 'filelibrary',
      //   iconFont: 'far fa-file',
      //   icon: '/public/images/icon/paket.png',
      //   exact: true,
      //   menu: true
      // },
      {
        component: FileLibrary,
        path: '/filelibrary',
        role: ['superadmin', 'admin'],
        name: 'FILE LIBRARY',
        key: 'filelibrary',
        iconFont: 'far fa-file',
        icon: '/public/images/icon/paket.png',
        exact: true,
        menu: true
      },
      {
        component: LogCsv,
        path: '/log-csv',
        role: ['superadmin', 'admin'],
        name: 'LOG CSV',
        key: 'logcsv',
        iconFont: 'fas fa-info-circle',
        icon: '/public/images/icon/paket.png',
        exact: true,
        menu: true
      },
      {
        component: Notification,
        path: '/notification',
        role: ['superadmin', 'admin'],
        name: 'NOTIFICATION',
        key: 'notification',
        iconFont: 'fas fa-bell',
        icon: '/public/images/icon/paket.png',
        exact: true,
        menu: true
      },
      {
        component: ProfilEdit,
        path: '/profil/edit/:id',
        role: ['superadmin', 'admin'],
        key: 'login',
        exact: true,
        menu: false
      },
      {
        component: ResetPassword,
        path: '/reset-password-token',
        role: ['superadmin', 'admin'],
        key: 'resetPassword',
        exact: true,
        menu: false
      },
      {
        component: Login,
        path: '/login',
        role: ['superadmin', 'admin'],
        key: 'login',
        exact: true,
        menu: false
      }
    ]
  }
];
