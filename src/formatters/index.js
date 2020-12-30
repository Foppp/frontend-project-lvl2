import stylish from './stylish.js';
import plain from './plain.js';
import formatJson from './json.js';

const formatters = {
  stylish: (tree) => stylish(tree),
  plain: (tree) => plain(tree),
  json: (tree) => formatJson(tree),
};

const format = (tree, formatterName) => {
  try {
    return formatters[formatterName](tree);
  } catch (e) {
    throw new Error('There is no such formatter');
  }
};
export default format;
