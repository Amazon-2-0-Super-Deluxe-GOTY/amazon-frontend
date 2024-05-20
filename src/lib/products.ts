export function splitPrice(price: number) {
  const priceParts = price.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];
  return { whole, fraction };
}

export const cartesian = (...a: any[]): any[][] =>
  a.reduce((a: any, b: any) =>
    a.flatMap((d: any) => b.map((e: any) => [d, e].flat()))
  );

const imageMaxSize = 5 * 1024 * 1024;
const imageAllowedFormats = [".jpg", ".jpeg", ".png"];

export const isImageValid = (file: File) => {
  return (
    file.size < imageMaxSize &&
    imageAllowedFormats.some((ext) => file.name.endsWith(ext))
  );
};
