export interface Route {
  id: string;
  routeName: string;
  from: string;
  to: string;
  timings: string[];
  stops?: string[];
  busType?: string;
  eta?: string;
  path?: [number, number][];
  color?: string;
}

export const busRoutes: Route[] = [
  {
    id: 'route1',
    path: [
      [11.4531391, 79.6515867], // Bhuvanagiri
      [11.4600000, 79.6600000],
      [11.4700000, 79.6700000],
      [11.4800000, 79.6800000],
    ],
    color: 'red',
    routeName: 'Route A',
    from: 'Bhuvanagiri',
    to: 'City Center',
    eta: '10 min',
    timings: ['08:00 AM', '10:00 AM', '01:00 PM'],
    stops: ['Stop 1', 'Stop 2', 'Stop 3'],
    busType: 'Express',
  },
  {
    id: 'route2',
    path: [
      [11.4500000, 79.6500000],
      [11.4400000, 79.6400000],
      [11.4300000, 79.6300000],
    ],
    color: 'blue',
    routeName: 'Route B',
    from: 'Bhuvanagiri',
    to: 'Industrial Area',
    eta: '25 min',
    timings: ['09:30 AM', '12:30 PM', '04:30 PM'],
    stops: ['Stop A', 'Stop B'],
    busType: 'Town Bus',
  },
];
