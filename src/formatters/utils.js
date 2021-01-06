import _ from 'lodash';

const getName = (element) => element.name;
const getValue = (element) => element.value;
const getStatus = (element) => element.status;
const getChildren = (element) => element.children;
const isNested = (element) => getChildren(element) && getChildren(element).length !== 0;
const isUpdated = (element) => getStatus(element) === 'updated';
const getNewValue = (element) => element.newValue;
export {
  getName, getValue, getStatus, getChildren, isNested, isUpdated, getNewValue,
};
