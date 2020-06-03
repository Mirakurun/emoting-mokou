import { axiosInstance } from 'boot/axios';
import { Dark } from 'quasar';

export async function fetchFavorites({ commit }) {
  try {
    const { data, status } = await axiosInstance.get('/user/favorites');

    if (status === 200) {
      commit('setFavorites', data);
    }
  } catch (error) {
    console.error(error);
  }
}

export function fetchUser({ commit }) {
  return axiosInstance
    .get('/user/profile')
    .then(({ data, status }) => {
      if (status === 200) {
        commit('setUser', data);
        Dark.set(data.darkMode);
      }
    })
    .catch(() => {
      commit('clearUser');
    });
}

export function setDarkMode({ commit }, payload) {
  return axiosInstance
    .post('/user/darkmode', { darkmode: payload })
    .then(({ data, status }) => {
      if (status === 200) {
        commit('setDarkMode', data.darkMode);
        Dark.set(data.darkMode);
      }
    })
    .catch(error => {
      console.error(error);
    });
}
