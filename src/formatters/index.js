import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (tree, formatterName) => {
  if (!formatters[formatterName]) {
    throw new Error(`"${formatterName}" - is not valid formatter! Valid formaters: (${Object.keys(formatters)})`);
  }
  return formatters[formatterName](tree);
};
