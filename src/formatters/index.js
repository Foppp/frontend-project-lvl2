import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (tree, formatterName) => {
  if (!formatters[formatterName]) {
    throw new Error('There is no such formatter');
  }
  return formatters[formatterName](tree);
};
