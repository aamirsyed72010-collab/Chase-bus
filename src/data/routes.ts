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
      [11.4531, 79.6516], // Bhuvanagiri
      [11.4350, 79.6650], // Keerapalayam
      [11.3996, 79.6936], // Chidambaram
    ],
    color: '#FF5722',
    routeName: 'Route 1: Chidambaram Shuttle',
    from: 'Bhuvanagiri',
    to: 'Chidambaram',
    eta: '15 min',
    timings: ['04:25 AM', '05:00 AM', '06:30 AM', '08:00 AM', '09:15 AM', '10:30 AM', '01:00 PM', '04:00 PM', '06:00 PM', '09:00 PM'],
    stops: ['Bhuvanagiri Bus Stand', 'Keerapalayam', 'Chidambaram Bus Stand'],
    busType: 'Town Bus',
  },
  {
    id: 'route2',
    path: [
      [11.4531, 79.6516], // Bhuvanagiri
      [11.4285, 79.5308], // Sethiathope
      [11.5196, 79.3247], // Virudhachalam
    ],
    color: '#2196F3',
    routeName: 'Route 2: Virudhachalam Express',
    from: 'Bhuvanagiri',
    to: 'Virudhachalam',
    eta: '50 min',
    timings: ['06:00 AM', '08:30 AM', '11:00 AM', '02:00 PM', '05:30 PM', '09:30 PM'],
    stops: ['Bhuvanagiri', 'Sethiathope Cross', 'Virudhachalam Bus Stand'],
    busType: 'Express',
  },
  {
    id: 'route3',
    path: [
      [11.4531, 79.6516], // Bhuvanagiri
      [11.5034, 79.7617], // Parangipettai
      [11.7480, 79.7714], // Cuddalore
    ],
    color: '#4CAF50',
    routeName: 'Route 3: Cuddalore Connector',
    from: 'Bhuvanagiri',
    to: 'Cuddalore',
    eta: '45 min',
    timings: ['05:30 AM', '07:00 AM', '09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM', '08:30 PM'],
    stops: ['Bhuvanagiri', 'Parangipettai', 'Cuddalore OT', 'Cuddalore New Town'],
    busType: 'Deluxe',
  },
  {
    id: 'route4',
    path: [
      [11.4531, 79.6516], // Bhuvanagiri
      [11.5581, 79.5525], // Vadalur
      [11.5983, 79.4864], // Neyveli
    ],
    color: '#9C27B0',
    routeName: 'Route 4: Neyveli Link',
    from: 'Bhuvanagiri',
    to: 'Neyveli',
    eta: '35 min',
    timings: ['06:15 AM', '07:45 AM', '09:30 AM', '11:30 AM', '02:30 PM', '05:00 PM', '07:30 PM'],
    stops: ['Bhuvanagiri', 'Vadalur', 'Neyveli Arch', 'Neyveli Township'],
    busType: 'Town Bus',
  },
];
