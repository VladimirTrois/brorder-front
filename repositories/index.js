import productsRepo from './products';
import usersRepo from './users';
import ordersRepo from './orders';
import authRepo from './auth';
import allergierRepo from './allergies';

export default (api) => ({
  auth: authRepo(api),
  products: productsRepo(api),
  users: usersRepo(api),
  orders: ordersRepo(api),
  allergies: allergierRepo(api),
});
