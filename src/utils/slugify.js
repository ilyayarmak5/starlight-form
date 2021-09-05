import slugify from "slugify";

const defaultOptions = {
  lower: true,
  remove: /[$*_+~.()'"!\-:@?]/g
};

export default (string, options) =>
  slugify(string, { ...defaultOptions, ...options });
