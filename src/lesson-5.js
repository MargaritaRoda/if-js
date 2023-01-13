function getNewFormatOfDate(date) {
  const regularExpression = /(?<year>\d*)-(?<month>\d*)-(?<day>\d*)/;
  return date.replace(regularExpression, '$<day>.$<month>.$<year>');
}

const date = '1990-09-30';
console.log(getNewFormatOfDate(date));

const data = [
  {
    country: 'Russia',
    city: 'Saint Petersburg',
    hotel: 'Hotel Leopold',
  },
  {
    country: 'Spain',
    city: 'Santa Cruz de Tenerife',
    hotel: 'Apartment Sunshine',
  },
  {
    country: 'Slowakia',
    city: 'Vysokie Tatry',
    hotel: 'Villa Kunerad',
  },
  {
    country: 'Germany',
    city: 'Berlin',
    hotel: 'Hostel Friendship',
  },
  {
    country: 'Indonesia',
    city: 'Bali',
    hotel: 'Ubud Bali Resort&SPA',
  },
  {
    country: 'Netherlands',
    city: 'Rotterdam',
    hotel: 'King Kong Hostel',
  },
  {
    country: 'Marocco',
    city: 'Ourika',
    hotel: 'Rokoko Hotel',
  },
  {
    country: 'Germany',
    city: 'Berlin',
    hotel: 'Hotel Rehberge Berlin Mitte',
  },
];

const word = 'Berlin';

function findPlace(word) {
  const place = [];
  for (let i = 0; i < data.length; i += 1) {
    if (
      data[i].country.includes(word) ||
      data[i].city.includes(word) ||
      data[i].hotel.includes(word)
    ) {
      place.push(`${data[i].country}, ${data[i].city}, ${data[i].hotel}`);
    }
  }
  return place;
}

console.log(findPlace(word));
