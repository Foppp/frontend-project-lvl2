import stylish from './stylish.js';
import plain from './plain.js';
import formatJson from './json.js';

const format = (tree, formatterName) => {
  const formatters = {
    stylish: () => stylish(tree),
    plain: () => plain(tree),
    json: () => formatJson(tree),
  };
  return formatters[formatterName](tree);
};

export default format;
