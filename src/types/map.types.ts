/**
 * Map-related TypeScript types and interfaces
 */

/**
 * Represents a geographic coordinate
 */
export interface LatLng {
  latitude: number;
  longitude: number;
}

/**
 * Represents a tee box location with optional metadata
 */
export interface TeeBox extends LatLng {
  name?: string; // e.g., "Championship", "Men's", "Ladies'"
  color?: string; // e.g., "black", "blue", "white", "red"
}

/**
 * Represents data for a single golf hole
 */
export interface HoleData {
  holeNumber: number;
  greenCenter: LatLng;
  teeBoxes: TeeBox[];
  par?: number;
  handicap?: number;
}

/**
 * Props for the MapAdapter component
 */
export interface MapAdapterProps {
  /** Array of hole data to display on the map */
  holeData: HoleData[];
  /** Current user location */
  userLocation: LatLng;
  /** Callback fired when user taps on the map */
  onTap?: (coordinate: LatLng) => void;
  /** Whether to show distance line from user to selected hole */
  showDistanceLine?: boolean;
  /** Currently selected hole number for distance line */
  selectedHoleNumber?: number;
  /** Initial map region (optional, defaults to user location) */
  initialRegion?: MapRegion;
  /** Map style override */
  style?: object;
}

/**
 * Region for map viewport
 */
export interface MapRegion extends LatLng {
  latitudeDelta: number;
  longitudeDelta: number;
}

/**
 * Props for platform-specific map views
 */
export interface PlatformMapViewProps extends MapAdapterProps {
  /** Computed target coordinate for distance line */
  distanceLineTarget?: LatLng;
}
