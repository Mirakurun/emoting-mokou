import { axiosInstance } from 'boot/axios';

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

export async function setDarkMode({ commit }, payload) {
  try {
    const { data, status } = await axiosInstance.post('/user/darkmode', {
      darkmode: payload,
    });

    if (status === 200) {
      commit('setDarkMode', data.darkMode);
    }
  } catch (error) {
    console.error(error);
  }
}
