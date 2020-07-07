declare module "*.md" {
  const html: string;
  export default html;
  export const attributes: { [attrib: string]: any };
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.ico" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}
