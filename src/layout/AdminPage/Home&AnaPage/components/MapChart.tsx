import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const MapChart = () => {
  return (
    <ComposableMap projection="geoMercator" className="flex-1">
      <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
        {({ geographies }) =>
          geographies.map((geo) => {
            // Kiểm tra dữ liệu để chắc chắn
            console.log(geo.properties);

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill:
                      geo.properties.name === "Vietnam" ? "#F5BA13" : "#e0e0e0",
                  },
                  hover: {
                    fill:
                      geo.properties.name === "Vietnam" ? "#F5A013" : "#d0d0d0",
                  },
                  pressed: {
                    fill:
                      geo.properties.name === "Vietnam" ? "#F59813" : "#c0c0c0",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
