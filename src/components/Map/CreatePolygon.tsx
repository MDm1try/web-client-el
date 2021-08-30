import { useEffect, createRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

let mapCanvas: google.maps.Map;

function CreatePolygon() {
  const googleMapsRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS_API_KEY as string,
      version: `weekly`,
      libraries: [`geometry`, `drawing`],
    });

    loader.load().then(() => {
      const { google } = window;
      mapCanvas = new google.maps.Map(googleMapsRef.current as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });

      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON],
        },
        polygonOptions: {
          draggable: true,
          editable: true,
        },
      });

      drawingManager.setMap(mapCanvas);
    });
  });

  return <div id="map" ref={googleMapsRef} className="w-100 vh-100" />;
}

export default CreatePolygon;
