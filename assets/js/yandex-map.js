const renderMapPopup = marker => {
  if (!marker) return;

  const { title, description, image, url } = marker;

  const titleEl = document.querySelector('[data-map-title]');
  const descriptionEl = document.querySelector('[data-map-description]');
  const imageEl = document.querySelector('[data-map-image]');
  const thumbnailEl = document.querySelector('[data-map-thumbnail]');
  const urlEl = document.querySelector('[data-map-url]');

  if (titleEl) titleEl.innerHTML = title ?? '';
  if (descriptionEl) descriptionEl.innerHTML = description ?? '';
  if (thumbnailEl) {
    if (image) {
      imageEl.src = image;
      thumbnailEl.style.display = '';
    } else {
      thumbnailEl.style.display = 'none';
    }
  }
  if (urlEl) urlEl.href = url ?? '#';

  window.popup.open('map-info');
};

export const initYandexMap = () => {
  if (!window.ymaps3) {
    console.warn('Yandex Maps API not loaded');
    return;
  }

  ymaps3.ready.then(async () => {
    // Регистрируем CDN для пакетов (как в доке Яндекса)
    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
      '@yandex/ymaps3-default-ui-theme@0.0',
      '@yandex/ymaps3-clusterer@0.0',
      '@yandex/ymaps3-controls@0.0.1',
    ]);

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker } = ymaps3;

    const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

    const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-default-ui-theme');

    const { YMapClusterer, clusterByGrid } = await ymaps3.import('@yandex/ymaps3-clusterer');

    const map = new YMap(document.getElementById('map'), {
      location: {
        center: [57.588144, 55.733842],
        zoom: 3,
      },
      zoomRange: { min: 3, max: 15 },
    });

    const customization = await fetch('./../assets/json/customization.json').then(r => r.json());

    const schemeLayer = new YMapDefaultSchemeLayer({ customization });
    map.addChild(schemeLayer);
    map.addChild(new YMapDefaultFeaturesLayer({}));

    map.addChild(new YMapControls({ position: 'right' }).addChild(new YMapZoomControl({})));

    const markers = await fetch('./../assets/json/markers.json').then(r => r.json());

    const featuresForMap = markers.points.map((point, index) => ({
      type: 'Feature',
      id: String(point.id ?? index),
      geometry: {
        type: 'Point',
        coordinates: point.coordinates,
      },
      properties: {
        point,
      },
    }));

    const marker = feature => {
      const point = feature.properties.point;
      const container = document.createElement('div');
      container.classList.add('marker-container');

      const text = document.createElement('div');
      text.classList.add('marker-text');
      text.innerText = point.description;

      container.onmouseover = () => text.classList.add('visible');
      container.onmouseout = () => text.classList.remove('visible');

      container.onclick = () => {
        renderMapPopup(point);
      };

      const markerEl = document.createElement('div');
      markerEl.classList.add('marker');

      const img = document.createElement('img');
      img.classList.add('image');
      img.src = point.pointType === 'TownSquare' ? './../assets/img/townSquareGreen.png' : './../assets/img/theatre.png';

      markerEl.appendChild(img);

      container.appendChild(text);
      container.appendChild(markerEl);

      return new YMapMarker({ coordinates: point.coordinates }, container);
    };

    const cluster = (coordinates, features) =>
      new YMapMarker(
        {
          coordinates,
          onClick() {
            const points = features.map(f => f.geometry.coordinates);

            const bounds = points.reduce(
              (acc, [lng, lat]) => [
                [Math.min(acc[0][0], lng), Math.min(acc[0][1], lat)],
                [Math.max(acc[1][0], lng), Math.max(acc[1][1], lat)],
              ],
              [[...points[0]], [...points[0]]]
            );

            map.update({
              location: {
                bounds,
                duration: 400,
              },
            });
          },
        },
        circle(features.length).cloneNode(true)
      );

    function circle(count) {
      const container = document.createElement('div');
      container.classList.add('marker-container');

      const label = document.createElement('div');
      label.classList.add('cluster-count');
      label.innerText = count.toString();

      const markerEl = document.createElement('div');
      markerEl.classList.add('marker');

      const img = document.createElement('img');
        img.src = '/assets/img/unity_tree_green.png';
      img.classList.add('image');

      markerEl.appendChild(img);

      container.appendChild(markerEl);
      container.appendChild(label);

      return container;
    }

    const clusterer = new YMapClusterer({
      method: clusterByGrid({ gridSize: 32 }),
      cluster,
      marker,
      features: featuresForMap,
    });

    map.addChild(clusterer);
  });
};
