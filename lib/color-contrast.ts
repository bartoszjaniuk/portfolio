export type ContrastLevel = "fail" | "aa-large" | "aa" | "aaa";

export type ContrastResult = {
  ratio: number;
  level: ContrastLevel;
  label: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Convert an sRGB channel (0–1) to linear light for WCAG relative luminance. */
const srgbToLinear = (channel: number) =>
  channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

const relativeLuminance = (r: number, g: number, b: number) =>
  0.2126 * srgbToLinear(r) +
  0.7152 * srgbToLinear(g) +
  0.0722 * srgbToLinear(b);

export const contrastRatio = (foreground: Rgb, background: Rgb) => {
  const l1 = relativeLuminance(foreground.r, foreground.g, foreground.b);
  const l2 = relativeLuminance(background.r, background.g, background.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

export const getContrastLevel = (ratio: number): ContrastLevel => {
  if (ratio >= 7) return "aaa";
  if (ratio >= 4.5) return "aa";
  if (ratio >= 3) return "aa-large";
  return "fail";
};

export const getContrastLabel = (level: ContrastLevel) => {
  switch (level) {
    case "aaa":
      return "AAA";
    case "aa":
      return "AA";
    case "aa-large":
      return "AA Large";
    default:
      return "Fail";
  }
};

export const evaluateContrast = (
  foreground: string,
  background: string,
): ContrastResult => {
  const fg = parseColor(foreground);
  const bg = parseColor(background);
  const ratio = contrastRatio(fg, bg);
  const level = getContrastLevel(ratio);

  return {
    ratio,
    level,
    label: getContrastLabel(level),
  };
};

type Rgb = { r: number; g: number; b: number };

const oklchToRgb = (l: number, c: number, h: number): Rgb => {
  const hueRadians = (h * Math.PI) / 180;
  const a = c * Math.cos(hueRadians);
  const b = c * Math.sin(hueRadians);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ ** 3;
  const m3 = m_ ** 3;
  const s3 = s_ ** 3;

  const r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bVal = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  return {
    r: clamp(r, 0, 1),
    g: clamp(g, 0, 1),
    b: clamp(bVal, 0, 1),
  };
};

const hexToRgb = (hex: string): Rgb => {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const int = Number.parseInt(value, 16);
  return {
    r: ((int >> 16) & 255) / 255,
    g: ((int >> 8) & 255) / 255,
    b: (int & 255) / 255,
  };
};

const parseOklch = (value: string): Rgb | null => {
  const match = value.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+%?)?\s*\)/i,
  );
  if (!match) return null;
  return oklchToRgb(
    Number.parseFloat(match[1]),
    Number.parseFloat(match[2]),
    Number.parseFloat(match[3]),
  );
};

export const parseColor = (value: string): Rgb => {
  const trimmed = value.trim();

  if (trimmed.startsWith("#")) {
    return hexToRgb(trimmed);
  }

  const oklch = parseOklch(trimmed);
  if (oklch) return oklch;

  if (typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = trimmed;
      context.fillRect(0, 0, 1, 1);
      const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
      return { r: r / 255, g: g / 255, b: b / 255 };
    }
  }

  return { r: 0, g: 0, b: 0 };
};

export const formatRatio = (ratio: number) => `${ratio.toFixed(2)}:1`;
