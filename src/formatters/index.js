import stylish from './stylish.js';
import plain from './plain.js';

const format = (formatterName) => {
  const formatters = {
    stylish: (tree) => stylish(tree),
    plain: (tree) => plain(tree),
  };
  return formatters[formatterName];
};

export default format;
