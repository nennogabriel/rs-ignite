export interface Coordinate {
  latitude: number;
  longitude: number;
}

export function getDistanceInMetersBetweenCoordinates(
  from: Coordinate,
  to: Coordinate
): number {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }
  const earthRadiusInMeters = 6371000;
  const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const latitudeDistance = degreesToRadians(to.latitude - from.latitude);
  const longitudeDistance = degreesToRadians(to.longitude - from.longitude);

  const a =
    Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
    Math.cos(degreesToRadians(from.latitude)) *
      Math.cos(degreesToRadians(to.latitude)) *
      Math.sin(longitudeDistance / 2) *
      Math.sin(longitudeDistance / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusInMeters * c;
}
