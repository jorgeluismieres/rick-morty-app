export const MIN_LOCATION_ID = 1;
export const MAX_LOCATION_ID = 126;

export function getRandomId(min = MIN_LOCATION_ID, max = MAX_LOCATION_ID) {

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
