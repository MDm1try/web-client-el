import { useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  GoogleMap,
  useJsApiLoader,
  DrawingManager,
  Data,
} from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import classcat from "classcat";

import { MapForm } from "@/types";
import ukraineGeoJSON from "../../../../../public/ukraineGeo.json";
import CustomDrawingManagerControls from "./CustomDrawingManagerControls";
import css from "./AddLandPlot.module.css";

type Props = {
  onBack(): void;
  onSubmit(): void;
  isCreating: boolean;
};

const UKRAINE_BOUNDS = {
  north: 52.754542,
  south: 44,
  west: 22,
  east: 40.9,
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const center = { lat: -34.397, lng: 150.644 };
const libraries: Libraries = [`geometry`, `drawing`];

function AddLandPlot({ onBack, onSubmit, isCreating }: Props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    version: `weekly`,
    libraries,
  });
  const { reset, handleSubmit, setValue, getValues } =
    useFormContext<MapForm>();
  const [drawingModes, setDrawingModes] = useState<
    google.maps.drawing.OverlayType[]
  >([]);
  const [shapes, setShapes] = useState<google.maps.Polygon[]>([]);
  const [shapeError, setShapeError] = useState<string>();

  const handlePolygonComplete = useCallback(
    (polygon: google.maps.Polygon) => {
      const shape = polygon
        .getPath()
        .getArray()
        .map((l) => l.toJSON());

      setDrawingModes([]);
      setValue(`shape`, shape, { shouldDirty: true });
      setShapeError(``);
    },
    [setValue, setShapeError],
  );

  const handleOverlayComplete = (
    e: google.maps.drawing.OverlayCompleteEvent,
  ) => {
    setShapes((shapes) => [...shapes, e.overlay as google.maps.Polygon]);
    setShapeError(``);
  };

  const handleLoad = useCallback(
    (drawingManager: google.maps.drawing.DrawingManager) => {
      const map = drawingManager.getMap();

      const paths = getValues(`shape`);

      if (paths.length && map) {
        const polygon = new google.maps.Polygon({
          draggable: true,
          editable: true,
          paths,
          map,
        });

        map.setCenter(paths[0]);
        setShapes((shapes) => [...shapes, polygon]);
        setDrawingModes([]);
        setShapeError(``);
      } else {
        setDrawingModes([google.maps.drawing.OverlayType.POLYGON]);
      }
    },
    [getValues, setShapeError],
  );

  const handleLoadData = (data: google.maps.Data) => {
    data.addGeoJson(ukraineGeoJSON);
    data.setStyle({ strokeWeight: 1 });
  };

  const handleRemoveShape = useCallback(() => {
    setDrawingModes([google.maps.drawing.OverlayType.POLYGON]);
    setShapes((shapes) => {
      shapes.forEach((shape) => shape.setMap(null));
      return [];
    });
    reset({ shape: [] });
  }, [reset]);

  const handleRequest = useCallback(
    (data: MapForm) => {
      if (data.shape?.length) {
        onSubmit();
      } else {
        setShapeError(`Please, draw the shape of your land.`);
      }
    },
    [onSubmit],
  );

  const areShapeExists = useMemo(() => shapes.length > 0, [shapes]);
  return (
    <form className="mt-4" onSubmit={handleSubmit(handleRequest)}>
      <div className={css.mapContainer}>
        {isLoaded ? (
          <GoogleMap
            center={center}
            zoom={16}
            options={{
              mapTypeId: google.maps.MapTypeId.SATELLITE,
              restriction: {
                latLngBounds: UKRAINE_BOUNDS,
                strictBounds: false,
              },
            }}
            mapContainerClassName="w-100 vh-100"
          >
            <DrawingManager
              options={{
                drawingMode: drawingModes.length ? drawingModes[0] : null,
                drawingControl: !areShapeExists,
                drawingControlOptions: {
                  position: google.maps.ControlPosition.TOP_CENTER,
                  drawingModes,
                },
                polygonOptions: {
                  draggable: true,
                  editable: true,
                },
              }}
              onLoad={handleLoad}
              onPolygonComplete={handlePolygonComplete}
              onOverlayComplete={handleOverlayComplete}
            />
            <CustomDrawingManagerControls
              position={google.maps.ControlPosition.TOP_CENTER}
            >
              <button
                type="button"
                className={classcat([css.removeBtn, `btn btn-light btn-xs`])}
                onClick={handleRemoveShape}
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Remove"
                hidden={!areShapeExists}
              >
                <i className="bi bi-trash-fill" />
              </button>
            </CustomDrawingManagerControls>
            <Data onLoad={handleLoadData} />
          </GoogleMap>
        ) : (
          `Loading...`
        )}
      </div>
      {loadError && <div className="text-danger my-3">{loadError.message}</div>}
      {shapeError && <div className="text-danger my-3">{shapeError}</div>}
      <div className="d-flex justify-content-between mt-4">
        <button type="button" className="btn btn-primary" onClick={onBack}>
          Предыдущая
        </button>
        <button type="submit" className="btn btn-primary" disabled={isCreating}>
          Следующая
          {isCreating && (
            <div
              className="spinner-border spinner-border-sm ms-2"
              role="status"
            />
          )}
        </button>
      </div>
    </form>
  );
}
export default AddLandPlot;
