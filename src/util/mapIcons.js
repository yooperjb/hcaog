import { faBicycle, faStoreAlt, faWrench } from '@fortawesome/free-solid-svg-icons';

const MAP_ICON_DEFINITIONS = {
  'hcaog-bicycle-shop': {
    icon: faStoreAlt,
    background: '#ffffff',
    foreground: '#202020',
    stroke: '#5f5f5f'
  },
  'hcaog-bicycle-rental-17': {
    icon: faBicycle,
    background: '#ffffff',
    foreground: '#202020',
    stroke: '#5f5f5f'
  },
  'hcaog-hardware-new': {
    icon: faWrench,
    background: '#ffffff',
    foreground: '#202020',
    stroke: '#5f5f5f'
  }
};

const imageCache = new Map();

const toSvgPathMarkup = (pathData) => {
  if (Array.isArray(pathData)) {
    return pathData.map((path) => `<path d="${path}" />`).join('');
  }

  return `<path d="${pathData}" />`;
};

const buildIconSvg = ({ icon, background, foreground, stroke }) => {
  const [width, height, , , pathData] = icon.icon;
  const size = 32;
  const glyphSize = 14;
  const scale = glyphSize / Math.max(width, height);
  const xOffset = (size - width * scale) / 2;
  const yOffset = (size - height * scale) / 2;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="16" cy="16" r="12" fill="${background}" stroke="${stroke}" stroke-width="1.5" />
      <g fill="${foreground}" transform="translate(${xOffset} ${yOffset}) scale(${scale})">
        ${toSvgPathMarkup(pathData)}
      </g>
    </svg>
  `.trim();
};

const buildIconDataUrl = (definition) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(buildIconSvg(definition))}`;

const loadImage = (src) => {
  if (imageCache.has(src)) {
    return imageCache.get(src);
  }

  const imagePromise = new Promise((resolve, reject) => {
    const image = new Image(32, 32);
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

  imageCache.set(src, imagePromise);
  return imagePromise;
};

export const ensureMapIcons = async (map) => {
  await Promise.all(
    Object.entries(MAP_ICON_DEFINITIONS).map(async ([name, definition]) => {
      if (map.hasImage(name)) {
        return;
      }

      const image = await loadImage(buildIconDataUrl(definition));

      if (!map.hasImage(name)) {
        map.addImage(name, image);
      }
    })
  );
};
