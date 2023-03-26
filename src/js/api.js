import { API_HOTELS_URL } from './config.js';

export async function fetchHotels({
  search = '',
  adults = 0,
  childrenAges = [],
  rooms = 0,
  checkinDate = null,
  checkoutDate = null,
}) {
  const url = new URL(API_HOTELS_URL);
  if (adults > 0) {
    url.searchParams.append('adults', adults.toString());
    if (childrenAges.length > 0) {
      url.searchParams.append('children', childrenAges.join(','));
    }
    url.searchParams.append('rooms', rooms.toString());
  }
  if (checkinDate && checkoutDate) {
    url.searchParams.append('checkinDate', checkinDate.toISOString());
    url.searchParams.append('checkoutDate', checkoutDate.toISOString());
  }
  url.searchParams.append('search', search.trim());

  return fetch(url);
}
