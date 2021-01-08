import yaml from 'js-yaml';

const extentions = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (data, type) => extentions[type](data);
