function titleHash(x, y) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function titleValueNoise(x, y) {
  const cellX = Math.floor(x);
  const cellY = Math.floor(y);
  const localX = x - cellX;
  const localY = y - cellY;
  const easedX = localX * localX * (3 - 2 * localX);
  const easedY = localY * localY * (3 - 2 * localY);
  const lower =
    titleHash(cellX, cellY) * (1 - easedX) +
    titleHash(cellX + 1, cellY) * easedX;
  const upper =
    titleHash(cellX, cellY + 1) * (1 - easedX) +
    titleHash(cellX + 1, cellY + 1) * easedX;

  return lower * (1 - easedY) + upper * easedY;
}

function titleFbm(x, y) {
  let value = 0;
  let amplitude = 0.5;

  for (let octave = 0; octave < 4; octave += 1) {
    value += amplitude * titleValueNoise(x, y);
    x = x * 2.03 + 17.1;
    y = y * 2.03 + 9.2;
    amplitude *= 0.5;
  }

  return value / 0.9375;
}

function titleSmoothStep(edgeStart, edgeEnd, value) {
  const normalized = Math.min(
    1,
    Math.max(0, (value - edgeStart) / Math.max(0.0001, edgeEnd - edgeStart))
  );

  return normalized * normalized * (3 - 2 * normalized);
}

export function createTitleInkController({
  layer,
  canvas,
  sourceImages,
  sourcePaths,
  preloadedAssets,
}) {
  if (!layer || !canvas) {
    return {
      render() {},
      resize() {},
      setLanguage() {},
    };
  }

  const context = canvas.getContext("2d");
  let language = "zh";
  let progress = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;
  const maskCanvas = document.createElement("canvas");
  const maskContext = maskCanvas.getContext("2d");
  let maskWidth = 0;
  let maskHeight = 0;
  let waterField = new Float32Array();

  function rebuildWaterField() {
    maskWidth = Math.min(128, Math.max(48, Math.round(canvasWidth / 2)));
    maskHeight = Math.min(256, Math.max(96, Math.round(canvasHeight / 2)));
    maskCanvas.width = maskWidth;
    maskCanvas.height = maskHeight;
    waterField = new Float32Array(maskWidth * maskHeight);

    const maxX = Math.max(1, maskWidth - 1);
    const maxY = Math.max(1, maskHeight - 1);

    for (let y = 0; y < maskHeight; y += 1) {
      const yNorm = y / maxY;

      for (let x = 0; x < maskWidth; x += 1) {
        const xNorm = x / maxX;
        const broadWater = titleFbm(xNorm * 4.8 + 3.7, yNorm * 8.5 + 8.1);
        const blotWater = titleFbm(xNorm * 12.5 + 21.4, yNorm * 5.4 + 2.6);

        waterField[y * maskWidth + x] =
          (broadWater - 0.5) * 0.24 + (blotWater - 0.5) * 0.1;
      }
    }
  }

  function resizeCanvas() {
    const width = Math.max(1, layer.clientWidth);
    const height = Math.max(1, layer.clientHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const nextWidth = Math.max(1, Math.round(width * pixelRatio));
    const nextHeight = Math.max(1, Math.round(height * pixelRatio));

    if (nextWidth === canvasWidth && nextHeight === canvasHeight) {
      return;
    }

    canvasWidth = nextWidth;
    canvasHeight = nextHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    rebuildWaterField();
  }

  function renderTitleInk(nextProgress) {
    progress = Math.min(1, Math.max(0, Number(nextProgress) || 0));
    resizeCanvas();

    if (!context) {
      return;
    }

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    if (progress <= 0) {
      return;
    }

    const source =
      preloadedAssets.get(sourcePaths[language]) || sourceImages[language];
    const sourceWidth = source?.naturalWidth || source?.width || 0;
    const sourceHeight = source?.naturalHeight || source?.height || 0;

    if (!source || !sourceWidth || !sourceHeight) {
      return;
    }

    context.drawImage(source, 0, 0, canvasWidth, canvasHeight);

    if (progress >= 0.999 || !maskContext || !waterField.length) {
      return;
    }

    const maskImageData = maskContext.createImageData(maskWidth, maskHeight);
    const maskPixels = maskImageData.data;
    const maxX = Math.max(1, maskWidth - 1);
    const maxY = Math.max(1, maskHeight - 1);

    for (let y = 0; y < maskHeight; y += 1) {
      const yNorm = y / maxY;

      for (let x = 0; x < maskWidth; x += 1) {
        const pixelIndex = (y * maskWidth + x) * 4;
        const xNorm = x / maxX;
        const distanceFromRight = 1 - xNorm;
        const waterFront =
          progress - distanceFromRight + waterField[y * maskWidth + x];
        const wetness = titleSmoothStep(-0.16, 0.11, waterFront);

        maskPixels[pixelIndex] = 255;
        maskPixels[pixelIndex + 1] = 255;
        maskPixels[pixelIndex + 2] = 255;
        maskPixels[pixelIndex + 3] = Math.round(wetness * 255);
      }
    }

    maskContext.putImageData(maskImageData, 0, 0);
    context.save();
    context.globalCompositeOperation = "destination-in";
    context.imageSmoothingEnabled = true;
    context.drawImage(maskCanvas, 0, 0, canvasWidth, canvasHeight);
    context.restore();
  }

  const controller = {
    render: renderTitleInk,
    resize() {
      resizeCanvas();
      renderTitleInk(progress);
    },
    setLanguage(nextLanguage) {
      language = nextLanguage === "en" ? "en" : "zh";
      renderTitleInk(progress);
    },
  };

  const resizeObserver = new ResizeObserver(() => controller.resize());
  resizeObserver.observe(layer);
  controller.render(0);

  return controller;
}
