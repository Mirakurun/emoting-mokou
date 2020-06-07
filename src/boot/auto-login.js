export default async ({ store }) => {
  store.dispatch('user/fetchUser');
};
