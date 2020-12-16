import _ from 'lodash';

export default (obj) => {
  const statusSymbol = {
    removed: '-', added: '+', default: ' ',
  };
  const space = '';
  const iter = (newObj, depth) => {
    if (!_.isObject(newObj)) {
      return `${newObj}`;
    }
    const flatted = !_.isArray(newObj) ? Object.entries(newObj)
      .map(([name, value]) => ({ name, value })) : newObj;
    const result = flatted.reduce((acc, element) => {
      const {
        name, value, status, newValue, children,
      } = element;
      const nested = `${space.repeat(depth)}${statusSymbol.default} ${name}: ${iter(children, depth + 2)}`;
      const added = `${space.repeat(depth)}${statusSymbol.added} ${name}: ${iter(newValue, depth + 2)}`;
      const removed = `${space.repeat(depth)}${statusSymbol.removed} ${name}: ${iter(value, depth + 2)}`;
      const unchanged = `${space.repeat(depth)}${statusSymbol.default} ${name}: ${iter(value, depth + 2)}`;
      switch (status) {
        case 'nested': return [...acc, nested];
        case 'changed': return [...acc, removed, added];
        case 'added': return [...acc, added];
        case 'removed': return [...acc, removed];
        default: return [...acc, unchanged];
      }
    }, []);
    return ['{', result.join('\n'), `${space.repeat(depth - 1)}}`].join('\n');
  };
  return iter(obj, 1);
};
