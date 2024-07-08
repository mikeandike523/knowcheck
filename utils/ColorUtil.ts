import Color from 'color';

import { zip } from './itertools';

/**
 * Represents an RGBA color and provides utility methods for color manipulation and conversion.
 * Supports setting individual color components (red, green, blue, alpha), creating copies of the color with modified components, converting to CSS string format, and constructing a color from a CSS string. Additionally, it offers a static method for mixing multiple colors into an opaque color.
 */
export default class ColorUtil {
  /**
   * Red component of the color, ranging from 0 to 255.
   */
  r: number;

  /**
   * Green component of the color, ranging from 0 to 255.
   */
  g: number;

  /**
   * Blue component of the color, ranging from 0 to 255.
   */
  b: number;

  /**
   * Alpha (transparency) component of the color, ranging from 0.0 (completely transparent) to 1.0 (completely opaque).
   */
  a: number;
  /**
   * Constructs a `ColorUtil` instance with specified RGBA values.
   * @param r - Red component, 0-255.
   * @param g - Green component, 0-255.
   * @param b - Blue component, 0-255.
   * @param a - Alpha component, 0.0-1.0. Defaults to 1.0 if not specified.
   */
  constructor(r: number, g: number, b: number, a: number = 1.0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * Creates a copy of the current color instance.
   * @returns A new `ColorUtil` instance with the same RGBA values as the current instance.
   */
  copy(): ColorUtil {
    return new ColorUtil(this.r, this.g, this.b, this.a);
  }

  /**
   * Sets the red component of the color.
   * @param r - New red component value, 0-255.
   * @returns The current `ColorUtil` instance for chaining.
   */
  setR(r: number): ColorUtil {
    this.r = r;
    return this;
  }

  /**
   * Sets the green component of the color.
   * @param g - New green component value, 0-255.
   * @returns The current `ColorUtil` instance for chaining.
   */
  setG(g: number): ColorUtil {
    this.g = g;
    return this;
  }

  /**
   * Sets the blue component of the color.
   * @param b - New blue component value, 0-255.
   * @returns The current `ColorUtil` instance for chaining.
   */
  setB(b: number): ColorUtil {
    this.b = b;
    return this;
  }

  /**
   * Sets the alpha (transparency) component of the color.
   * @param a - New alpha component value, 0.0-1.0.
   * @returns The current `ColorUtil` instance for chaining.
   */
  setA(a: number): ColorUtil {
    this.a = a;
    return this;
  }

  /**
   * Creates a copy of the current color instance with a modified red component.
   * @param r - New red component value, 0-255.
   * @returns A new `ColorUtil` instance with the specified red component and other components copied from the current instance.
   */
  withR(r: number): ColorUtil {
    const copy = this.copy();
    copy.r = r;
    return copy;
  }

  /**
   * Creates a copy of the current color instance with a modified green component.
   * @param g - New red component value, 0-255.
   * @returns A new `ColorUtil` instance with the specified green component and other components copied from the current instance.
   */
  withG(g: number): ColorUtil {
    const copy = this.copy();
    copy.g = g;
    return copy;
  }

  /**
   * Creates a copy of the current color instance with a modified blue component.
   * @param b - New red component value, 0-255.
   * @returns A new `ColorUtil` instance with the specified blue component and other components copied from the current instance.
   */
  withB(b: number): ColorUtil {
    const copy = this.copy();
    copy.b = b;
    return copy;
  }

  /**
   * Creates a copy of the current color instance with a modified alpha component.
   * @param a - New red component value, 0-255.
   * @returns A new `ColorUtil` instance with the specified alpha component and other components copied from the current instance.
   */
  withA(a: number): ColorUtil {
    const copy = this.copy();
    copy.a = a;
    return copy;
  }

  /**
   * Converts the color to a CSS-compatible RGBA string.
   * @returns A CSS string representing the color, e.g., "rgba(255, 255, 255, 1.0)".
   */
  toCss(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  /**
   * Allows for use directly in template literals without needing to call this.toCss().
   * @returns The CSS string representation of the color.
   */
  toString(): string {
    return this.toCss();
  }

  /**
   * Constructs a `ColorUtil` instance from a CSS color string.
   * @param css - A CSS string representing the color.
   * @returns A new `ColorUtil` instance corresponding to the CSS color string.
   */
  static fromCss(css: string): ColorUtil {
    const color = Color(css);
    const r = color.red();
    const g = color.green();
    const b = color.blue();
    const alpha = color.alpha();
    return new ColorUtil(r, g, b, alpha ?? 1.0);
  }

  static fromHSLA(h: number, s: number, l: number, a: number = 1.0) {
    const colorObject = Color.hsl(h, s, l);
    const r = colorObject.red();
    const g = colorObject.green();
    const b = colorObject.blue();
    return new ColorUtil(r, g, b, a);
  }

  getH(): number {
    return Color.rgb(this.r, this.g, this.b).hue();
  }

  getS(): number {
    return Color.rgb(this.r, this.g, this.b).saturationl();
  }

  getL(): number {
    return Color.rgb(this.r, this.g, this.b).lightness();
  }

  setH(h: number): ColorUtil {
    const s = this.getS();
    const l = this.getL();
    const newColorObject = Color.hsl(h, s, l);
    this.r = newColorObject.red();
    this.g = newColorObject.green();
    this.b = newColorObject.blue();
    return this;
  }

  setS(s: number): ColorUtil {
    const h = this.getH();
    const l = this.getL();
    const newColorObject = Color.hsl(h, s, l);
    this.r = newColorObject.red();
    this.g = newColorObject.green();
    this.b = newColorObject.blue();
    return this;
  }

  setL(l: number): ColorUtil {
    const h = this.getH();
    const s = this.getS();
    const newColorObject = Color.hsl(h, s, l);
    this.r = newColorObject.red();
    this.g = newColorObject.green();
    this.b = newColorObject.blue();
    return this;
  }

  withH(s: number) {
    return this.copy().setH(s);
  }

  withS(s: number) {
    return this.copy().setS(s);
  }

  withL(s: number) {
    return this.copy().setL(s);
  }

  /**
   * Mixes multiple colors (provided as `ColorUtil` instances or CSS color strings) into a single opaque color.
   * This method calculates the average of the RGB components of the provided colors, factoring in the alpha transparency of each color to determine its contribution to the mix. The resulting color is always opaque (alpha = 1.0), regardless of the alpha values of the input colors.
   *
   * Note: When mixing colors, the alpha value of each color affects its "weight" in the mix. Colors with lower alpha values will have less influence on the resulting color than colors with higher alpha values. However, the resulting color's alpha value is always set to 1.0, making it fully opaque.
   *
   * @param colors - An array of colors to be mixed, each of which can be a `ColorUtil` instance or a CSS color string. If a string is provided, it will be converted to a `ColorUtil` instance using `fromCss`.
   * @returns A new `ColorUtil` instance representing the mixed color, which is always opaque (alpha = 1.0).
   * @throws An error if no colors are provided to the method, as there is nothing to mix.
   */
  static mixIntoOpaque(...colors: (ColorUtil | string)[]): ColorUtil {
    const normalizedColors = colors.map((color) => {
      if (typeof color === 'string') {
        return ColorUtil.fromCss(color);
      } else {
        return color;
      }
    });
    if (colors.length === 0) {
      throw new Error('Cannot mix no colors');
    }
    if (colors.length === 1) {
      return normalizedColors[0].withA(1.0);
    }
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    for (const color of normalizedColors) {
      totalR += color.r * color.a;
      totalG += color.g * color.a;
      totalB += color.b * color.a;
    }
    const avgR = Math.floor(totalR / colors.length);
    const avgG = Math.floor(totalG / colors.length);
    const avgB = Math.floor(totalB / colors.length);
    return new ColorUtil(avgR, avgG, avgB, 1.0);
  }

  /**
   * Creates variants of a color for differnet brightness levels
   */
  createColorVariants(
    weightVariants: number[] = [100, 200, 300, 400, 500, 600, 700, 800, 900],
    center = 500,
  ) {
    const rangeUp = Math.max(...weightVariants) - center;
    const rangeDown = center - Math.min(...weightVariants);
    return weightVariants.map((weight) => {
      if (weight < center) {
        const lightnessOffset = (weight - center) / rangeDown;
        return this.withL(this.getL() * (1.0 + lightnessOffset));
      } else if (weight === center) {
        return this.copy();
      } else {
        const lightnessOffset = (weight - center) / rangeUp;
        return this.withL(this.getL() * (1.0 - lightnessOffset));
      }
    });
  }

  createColorScale(
    weightVariants: number[] = [100, 200, 300, 400, 500, 600, 700, 800, 900],
    center = 500,
  ) {
    const sequence = this.createColorVariants(weightVariants, center);
    return Object.fromEntries(
      zip(weightVariants, sequence).map(([weight, color]) => [
        weight,
        color.toCss(),
      ]),
    );
  }

  scaleSaturation(scaleFactor: number) {
    const existingSaturation = this.getS();
    this.setS(existingSaturation * scaleFactor);
    return this;
  }

  withScaledSaturation(scaleFactor: number) {
    return this.copy().scaleSaturation(scaleFactor);
  }

  scaleLightness(scaleFactor: number) {
    const existingLightness = this.getL();
    this.setL(existingLightness * scaleFactor);
    return this;
  }

  withScaledLightness(scaleFactor: number) {
    return this.copy().scaleLightness(scaleFactor);
  }
}
