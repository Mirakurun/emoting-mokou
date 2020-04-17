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
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/user/darkmode', { darkmode: payload })
      .then(({ data, status }) => {
        if (status === 200) {
          commit('setDarkMode', data.darkMode);
          resolve(data.darkMode);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
