import { API_HOTELS_URL } from './config.js';

export async function fetchHotels({
  search = '',
  adults = 0,
  childrenAges = [],
  rooms = 0,
}) {
  const url = new URL(API_HOTELS_URL);
  if (adults > 0) {
    url.searchParams.append('adults', adults.toString());
    if (childrenAges.length > 0) {
      url.searchParams.append('children', childrenAges.join(','));
    }
    url.searchParams.append('rooms', rooms.toString());
  }
  url.searchParams.append('search', search.trim());
  return fetch(url);
}
