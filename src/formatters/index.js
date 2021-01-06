import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: (tree) => tree,
};

const format = (tree, formatterName) => {
  try {
    return formatters[formatterName](tree);
  } catch (e) {
    throw new Error('There is no such file from this path or wrong name of formatter');
  }
};
export default format;
