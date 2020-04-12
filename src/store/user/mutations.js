export function clearUser(state) {
  state.displayName = '';
  state.favorites = [];
  state.profileBanner = '';
  state.profileImage = '';
  state.role = '';
  state.username = '';
}

export function setDarkMode(state, payload) {
  state.darkMode = payload;
}

export function setFavorites(state, payload) {
  state.favorites = payload;
}

export function setUser(state, payload) {
  const {
    darkMode,
    displayName,
    favorites,
    profileBanner,
    profileImage,
    role,
    username,
  } = payload;

  state.darkMode = darkMode;
  state.displayName = displayName;
  state.favorites = favorites;
  state.profileBanner = profileBanner;
  state.profileImage = profileImage;
  state.role = role;
  state.username = username;
}
