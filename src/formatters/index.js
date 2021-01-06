import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: (tree) => JSON.stringify(tree),
};

const format = (tree, formatterName) => formatters[formatterName](tree);

export default format;
