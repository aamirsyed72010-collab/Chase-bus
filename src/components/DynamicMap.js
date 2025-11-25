import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./Map'), {
  ssr: false,
});

export default function DynamicMap(props) {
  return <MapComponent {...props} />;
}
