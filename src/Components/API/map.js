import mapboxgl from 'mapbox-gl';

export default async function getMap(lat, long) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZDkwMzc1IiwiYSI6ImNrM2U0cW4yZTA1aTAzY3AxYzJzcDE1cXYifQ.RepQBXimGIf1nMyMh_bCmw';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 11,
    center: [lat, long]
  });
  const size = 200;
  const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    onAdd: function() {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },
    render: function() {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;
      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const { context } = this;
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 200, 200,${1 - t})`;
      context.fill();
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(255, 100, 100, 1)';
      context.strokeStyle = 'white';
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();
      this.data = context.getImageData(0, 0, this.width, this.height).data;
      map.triggerRepaint();
      return true;
    }
  };
  map.on('load', function() {
    map.resize();
    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 4 });
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [lat, long]
              }
            }
          ]
        }
      },
      layout: {
        'icon-image': 'pulsing-dot'
      }
    });
  });
}
