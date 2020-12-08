export default (obj) => {
  const status = { removed: '-', added: '+', unchanged: ' ' };
  const entries = Object.entries(obj);
  const result = entries.reduce((acc, element) => {
    const [value, valueStatus] = element;
    return [...acc, `  ${status[valueStatus]} ${value}`];
  }, []);
  return ['{', result.join('\n'), '}'].join('\n');
};
