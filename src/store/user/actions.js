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

export async function fetchUser({ commit }) {
  try {
    const { data, status } = await axiosInstance.get('/user/profile');

    if (status === 200) {
      commit('setUser', data);
      Dark.set(data.darkMode);
    }
  } catch (error) {
    commit('clearUser');
  }
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
