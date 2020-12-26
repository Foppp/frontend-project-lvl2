import stylish from './stylish.js';
import plain from './plain.js';
import formatJson from './json.js';

const format = (formatterName) => {
  const formatters = {
    stylish: (tree) => stylish(tree),
    plain: (tree) => plain(tree),
    json: (tree) => formatJson(tree),
  };
  return formatters[formatterName];
};

export default format;
