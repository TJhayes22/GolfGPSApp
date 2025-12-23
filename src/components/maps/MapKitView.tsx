import React, { useRef, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, MapPressEvent } from 'react-native-maps';
import { PlatformMapViewProps, LatLng, MapRegion } from '../../types/map.types';

/**
 * MapKit implementation for iOS platform
 * Uses Apple Maps as the default provider on iOS
 */
const MapKitView: React.FC<PlatformMapViewProps> = ({
  holeData,
  userLocation,
  onTap,
  showDistanceLine = false,
  distanceLineTarget,
  initialRegion,
  style,
}) => {
  const mapRef = useRef<MapView>(null);

  // Default region centered on user location
  const defaultRegion: MapRegion = {
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleMapPress = useCallback(
    (event: MapPressEvent) => {
      if (onTap) {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        onTap({ latitude, longitude });
      }
    },
    [onTap]
  );

  // Build polyline coordinates from user location to target
  const getDistanceLineCoordinates = (): LatLng[] => {
    if (!showDistanceLine || !distanceLineTarget) {
      return [];
    }
    return [userLocation, distanceLineTarget];
  };

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        // No provider specified = uses Apple Maps (MapKit) on iOS
        initialRegion={initialRegion ?? defaultRegion}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        mapType="standard"
        onPress={handleMapPress}
      >
        {/* User location marker */}
        <Marker
          coordinate={userLocation}
          title="You"
          pinColor="blue"
          identifier="user-location"
        />

        {/* Hole green center markers */}
        {holeData.map((hole) => (
          <Marker
            key={`hole-${hole.holeNumber}`}
            coordinate={hole.greenCenter}
            title={`Hole ${hole.holeNumber}`}
            description={hole.par ? `Par ${hole.par}` : undefined}
            pinColor="green"
            identifier={`hole-${hole.holeNumber}`}
          />
        ))}

        {/* Tee box markers */}
        {holeData.flatMap((hole) =>
          hole.teeBoxes.map((teeBox, index) => (
            <Marker
              key={`hole-${hole.holeNumber}-tee-${index}`}
              coordinate={teeBox}
              title={`Hole ${hole.holeNumber} Tee`}
              description={teeBox.name ?? `Tee ${index + 1}`}
              pinColor={teeBox.color ?? 'orange'}
              identifier={`hole-${hole.holeNumber}-tee-${index}`}
            />
          ))
        )}

        {/* Distance line from user to selected hole */}
        {showDistanceLine && distanceLineTarget && (
          <Polyline
            coordinates={getDistanceLineCoordinates()}
            strokeColor="#FF6B6B"
            strokeWidth={3}
            lineDashPattern={[10, 5]}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapKitView;
