import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./Map'), {
    ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DynamicMap(props: any) {
    return <MapComponent {...props} />;
}
