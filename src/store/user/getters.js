export function isFavorite(state) {
  return id => {
    return state.favorites.includes(id);
  };
}

export function isEmptyMedia(state) {
  return state.media.length === 0;
}
