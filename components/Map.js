import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


export const Map =({ location })=> {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.googlePlacesAPI
  })

    console.log(location.lat)

    const containerStyle = {
    width: '100%',
    height: '400px'
    };

    const center = {
    lat: location.lat,
    lng: location.lng
    };


  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

    const image =  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
          { /* Child components, such as markers, info windows, etc. */}
          <Marker
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                  url: image,
                  anchor:new google.maps.Point()
              }}
          />
        <></>
      </GoogleMap>
  ) : <></>
}

// export default React.memo(Map)
