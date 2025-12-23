import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import GoogleMapsView from './GoogleMapsView';
import MapKitView from './MapKitView';
import { MapAdapterProps, LatLng } from '../../types/map.types';

/**
 * MapAdapter component that abstracts map functionality across platforms
 * 
 * - Uses Google Maps on Android and Windows
 * - Uses MapKit (Apple Maps) on iOS
 * 
 * @example
 * ```tsx
 * <MapAdapter
 *   holeData={holes}
 *   userLocation={{ latitude: 40.7128, longitude: -74.0060 }}
 *   showDistanceLine={true}
 *   selectedHoleNumber={1}
 *   onTap={(coord) => console.log('Tapped:', coord)}
 * />
 * ```
 */
const MapAdapter: React.FC<MapAdapterProps> = (props) => {
  const {
    holeData,
    userLocation,
    onTap,
    showDistanceLine = false,
    selectedHoleNumber,
    initialRegion,
    style,
  } = props;

  // Calculate the target coordinate for the distance line
  const distanceLineTarget: LatLng | undefined = useMemo(() => {
    if (!showDistanceLine || selectedHoleNumber === undefined) {
      return undefined;
    }

    const selectedHole = holeData.find(
      (hole) => hole.holeNumber === selectedHoleNumber
    );

    return selectedHole?.greenCenter;
  }, [showDistanceLine, selectedHoleNumber, holeData]);

  // Common props to pass to platform-specific views
  const platformProps = {
    holeData,
    userLocation,
    onTap,
    showDistanceLine,
    distanceLineTarget,
    initialRegion,
    style,
  };

  // Platform-specific rendering
  // iOS uses MapKit (Apple Maps), Android/Windows use Google Maps
  if (Platform.OS === 'ios') {
    return <MapKitView {...platformProps} />;
  }

  // Android, Windows, and other platforms use Google Maps
  return <GoogleMapsView {...platformProps} />;
};

export default MapAdapter;
