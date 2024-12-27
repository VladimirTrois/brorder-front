import productsRepo from './products';
import usersRepo from './users';
import ordersRepo from './orders';
import authRepo from './auth';

export default (api) => ({
  auth: authRepo(api),
  products: productsRepo(api),
  users: usersRepo(api),
  orders: ordersRepo(api),
});
