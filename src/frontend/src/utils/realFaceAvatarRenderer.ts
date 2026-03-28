/**
 * Real Face Avatar Renderer
 * Transforms a user's photo into a stylized pride avatar using Canvas API.
 */

function hexToHsl(hex: string): [number, number, number] {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(
  hIn: number,
  sIn: number,
  lIn: number,
): [number, number, number] {
  const hN = hIn / 360;
  const sN = sIn / 100;
  const lN = lIn / 100;
  let r: number;
  let g: number;
  let b: number;
  if (sN === 0) {
    r = lN;
    g = lN;
    b = lN;
  } else {
    const hue2rgb = (p: number, q: number, tIn: number) => {
      let t = tIn;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = lN < 0.5 ? lN * (1 + sN) : lN + sN - lN * sN;
    const p = 2 * lN - q;
    r = hue2rgb(p, q, hN + 1 / 3);
    g = hue2rgb(p, q, hN);
    b = hue2rgb(p, q, hN - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export async function stylizePhotoToAvatar(
  imageFile: File,
  categoryColors: string[],
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(imageFile);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const SIZE = 400;
      const canvas = document.createElement("canvas");
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }

      // --- Background: deep space radial gradient ---
      const bgGrad = ctx.createRadialGradient(
        SIZE / 2,
        SIZE / 2,
        40,
        SIZE / 2,
        SIZE / 2,
        SIZE / 2,
      );
      bgGrad.addColorStop(0, "#1a0533");
      bgGrad.addColorStop(0.5, "#0a0518");
      bgGrad.addColorStop(1, "#000000");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, SIZE, SIZE);

      // --- Circular clip for the face image ---
      const cx = SIZE / 2;
      const cy = SIZE / 2;
      const radius = 170;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Draw and scale image to fill circle
      const scale = Math.max(SIZE / img.width, SIZE / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (SIZE - dw) / 2;
      const dy = (SIZE - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);

      // --- Apply pixel manipulation effects ---
      const imageData = ctx.getImageData(0, 0, SIZE, SIZE);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Contrast boost
        r = Math.min(255, r * 1.3);
        g = Math.min(255, g * 1.3);
        b = Math.min(255, b * 1.3);

        // Posterize: snap to nearest 32 step
        r = Math.round(r / 32) * 32;
        g = Math.round(g / 32) * 32;
        b = Math.round(b / 32) * 32;

        // Saturation boost via HSL
        const [h, s, l] = hexToHsl(
          `#${Math.min(255, r).toString(16).padStart(2, "0")}${Math.min(255, g).toString(16).padStart(2, "0")}${Math.min(255, b).toString(16).padStart(2, "0")}`,
        );
        const [nr, ng, nb] = hslToRgb(h, Math.min(100, s * 1.4), l);

        data[i] = nr;
        data[i + 1] = ng;
        data[i + 2] = nb;
      }

      ctx.putImageData(imageData, 0, 0);
      ctx.restore();

      // --- Pride ring border ---
      const colors =
        categoryColors.length > 0
          ? categoryColors
          : ["#FF0000", "#FF7700", "#FFFF00", "#00FF00", "#0000FF", "#8B00FF"];
      // Draw ring as arc segments for each color
      const segmentAngle = (Math.PI * 2) / colors.length;
      ctx.lineWidth = 12;
      ctx.shadowBlur = 18;
      for (let idx = 0; idx < colors.length; idx++) {
        ctx.shadowColor = colors[idx];
        ctx.strokeStyle = colors[idx];
        ctx.beginPath();
        ctx.arc(
          cx,
          cy,
          radius + 6,
          idx * segmentAngle - Math.PI / 2,
          (idx + 1) * segmentAngle - Math.PI / 2,
        );
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // --- Pride gem / crown at top center ---
      const gemX = cx;
      const gemY = cy - radius - 10;

      // Gold glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#FFD700";

      // Gem diamond shape
      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.moveTo(gemX, gemY - 14);
      ctx.lineTo(gemX + 10, gemY);
      ctx.lineTo(gemX, gemY + 10);
      ctx.lineTo(gemX - 10, gemY);
      ctx.closePath();
      ctx.fill();

      // Gem inner shine
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.beginPath();
      ctx.moveTo(gemX, gemY - 10);
      ctx.lineTo(gemX + 5, gemY - 2);
      ctx.lineTo(gemX, gemY + 3);
      ctx.lineTo(gemX - 5, gemY - 2);
      ctx.closePath();
      ctx.fill();

      // Crown points
      ctx.fillStyle = "#FFC107";
      ctx.shadowColor = "#FFD700";
      ctx.shadowBlur = 15;
      for (let pt = -1; pt <= 1; pt++) {
        ctx.beginPath();
        ctx.moveTo(gemX + pt * 8, gemY - 2);
        ctx.lineTo(gemX + pt * 8 + 3, gemY - 10);
        ctx.lineTo(gemX + pt * 8 - 3, gemY - 10);
        ctx.closePath();
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // --- "Prydo ID" watermark label ---
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.textAlign = "center";
      ctx.fillText("PRYDO IDENTITY", cx, SIZE - 14);

      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}
