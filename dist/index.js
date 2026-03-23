"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  generate: () => generate2
});
module.exports = __toCommonJS(index_exports);

// node_modules/@varavel/vdl-plugin-sdk/dist/types-DU-ClSGG.js
function hydrateAnnotation(input) {
  return {
    position: hydratePosition(input.position),
    name: input.name,
    argument: input.argument ? hydrateLiteralValue(input.argument) : input.argument
  };
}
__name(hydrateAnnotation, "hydrateAnnotation");
function hydrateConstantDef(input) {
  return {
    position: hydratePosition(input.position),
    name: input.name,
    doc: input.doc ? input.doc : input.doc,
    annotations: input.annotations.map((el) => hydrateAnnotation(el)),
    value: hydrateLiteralValue(input.value)
  };
}
__name(hydrateConstantDef, "hydrateConstantDef");
function hydrateEnumDef(input) {
  return {
    position: hydratePosition(input.position),
    name: input.name,
    doc: input.doc ? input.doc : input.doc,
    annotations: input.annotations.map((el) => hydrateAnnotation(el)),
    enumType: input.enumType,
    members: input.members.map((el) => hydrateEnumMember(el))
  };
}
__name(hydrateEnumDef, "hydrateEnumDef");
function hydrateEnumMember(input) {
  return {
    position: hydratePosition(input.position),
    name: input.name,
    value: hydrateLiteralValue(input.value),
    doc: input.doc ? input.doc : input.doc,
    annotations: input.annotations.map((el) => hydrateAnnotation(el))
  };
}
__name(hydrateEnumMember, "hydrateEnumMember");
function hydrateField(input) {
  return {
    position: hydratePosition(input.position),
    name: input.name,
    doc: input.doc ? input.doc : input.doc,
    optional: input.optional,
    annotations: input.annotations.map((el) => hydrateAnnotation(el)),
    typeRef: hydrateTypeRef(input.typeRef)
  };
}
__name(hydrateField, "hydrateField");
function hydrateIrSchema(input) {
  return {
    entryPoint: input.entryPoint,
    constants: input.constants.map((el) => hydrateConstantDef(el)),
    enums: input.enums.map((el) => hydrateEnumDef(el)),
    types: input.types.map((el) => hydrateTypeDef(el)),
    docs: input.docs.map((el) => hydrateTopLevelDoc(el))
  };
}
__name(hydrateIrSchema, "hydrateIrSchema");
function hydrateLiteralValue(input) {
  return {
    position: hydratePosition(input.position),
    kind: input.kind,
    stringValue: input.stringValue ? input.stringValue : input.stringValue,
    intValue: input.intValue ? input.intValue : input.intValue,
    floatValue: input.floatValue ? input.floatValue : input.floatValue,
    boolValue: input.boolValue ? input.boolValue : input.boolValue,
    objectEntries: input.objectEntries ? input.objectEntries.map((el) => hydrateObjectEntry(el)) : input.objectEntries,
    arrayItems: input.arrayItems ? input.arrayItems.map((el) => hydrateLiteralValue(el)) : input.arrayItems
  };
}
__name(hydrateLiteralValue, "hydrateLiteralValue");
function hydrateObjectEntry(input) {
  return {
    position: hydratePosition(input.position),
    key: input.key,
    value: hydrateLiteralValue(input.value)
  };
}
__name(hydrateObjectEntry, "hydrateObjectEntry");
function hydratePosition(input) {
  return {
    file: input.file,
    line: input.line,
    column: input.column
  };
}
__name(hydratePosition, "hydratePosition");
function hydrateTopLevelDoc(input) {
  return {
    position: hydratePosition(input.position),
    content: input.content
  };
}
__name(hydrateTopLevelDoc, "hydrateTopLevelDoc");
function hydrateTypeDef(input) {
  return {
    position: hydratePosition(input.position),
    name: input.name,
    doc: input.doc ? input.doc : input.doc,
    annotations: input.annotations.map((el) => hydrateAnnotation(el)),
    typeRef: hydrateTypeRef(input.typeRef)
  };
}
__name(hydrateTypeDef, "hydrateTypeDef");
function hydrateTypeRef(input) {
  return {
    kind: input.kind,
    primitiveName: input.primitiveName ? input.primitiveName : input.primitiveName,
    typeName: input.typeName ? input.typeName : input.typeName,
    enumName: input.enumName ? input.enumName : input.enumName,
    enumType: input.enumType ? input.enumType : input.enumType,
    arrayType: input.arrayType ? hydrateTypeRef(input.arrayType) : input.arrayType,
    arrayDims: input.arrayDims ? input.arrayDims : input.arrayDims,
    mapType: input.mapType ? hydrateTypeRef(input.mapType) : input.mapType,
    objectFields: input.objectFields ? input.objectFields.map((el) => hydrateField(el)) : input.objectFields
  };
}
__name(hydrateTypeRef, "hydrateTypeRef");

// node_modules/@varavel/vdl-plugin-sdk/dist/index.js
function definePlugin(handler) {
  return handler;
}
__name(definePlugin, "definePlugin");

// node_modules/@varavel/vdl-plugin-sdk/dist/chunk-YKewjYmz.js
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __commonJSMin = /* @__PURE__ */ __name((cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports), "__commonJSMin");
var __exportAll = /* @__PURE__ */ __name((all, no_symbols) => {
  let target = {};
  for (var name in all) __defProp2(target, name, {
    get: all[name],
    enumerable: true
  });
  if (!no_symbols) __defProp2(target, Symbol.toStringTag, { value: "Module" });
  return target;
}, "__exportAll");
var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames2(from), i = 0, n = keys.length, key; i < n; i++) {
    key = keys[i];
    if (!__hasOwnProp2.call(to, key) && key !== except) __defProp2(to, key, {
      get: ((k) => from[k]).bind(null, key),
      enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable
    });
  }
  return to;
}, "__copyProps");
var __toESM = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod)), "__toESM");
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, { get: /* @__PURE__ */ __name((a, b) => (typeof require !== "undefined" ? require : a)[b], "get") }) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Calling `require` for "' + x + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});

// node_modules/@varavel/vdl-plugin-sdk/dist/utils/index.js
function at$1(arr, indices) {
  const result = new Array(indices.length);
  const length = arr.length;
  for (let i = 0; i < indices.length; i++) {
    let index = indices[i];
    index = Number.isInteger(index) ? index : Math.trunc(index) || 0;
    if (index < 0) index += length;
    result[i] = arr[index];
  }
  return result;
}
__name(at$1, "at$1");
function chunk$1(arr, size) {
  if (!Number.isInteger(size) || size <= 0) throw new Error("Size must be an integer greater than zero.");
  const chunkLength = Math.ceil(arr.length / size);
  const result = Array(chunkLength);
  for (let index = 0; index < chunkLength; index++) {
    const start = index * size;
    const end = start + size;
    result[index] = arr.slice(start, end);
  }
  return result;
}
__name(chunk$1, "chunk$1");
function compact$1(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item) result.push(item);
  }
  return result;
}
__name(compact$1, "compact$1");
function countBy$3(arr, mapper) {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    var _result$key;
    const item = arr[i];
    const key = mapper(item, i, arr);
    result[key] = ((_result$key = result[key]) !== null && _result$key !== void 0 ? _result$key : 0) + 1;
  }
  return result;
}
__name(countBy$3, "countBy$3");
function difference$1(firstArr, secondArr) {
  const secondSet = new Set(secondArr);
  return firstArr.filter((item) => !secondSet.has(item));
}
__name(difference$1, "difference$1");
function differenceBy$1(firstArr, secondArr, mapper) {
  const mappedSecondSet = new Set(secondArr.map((item) => mapper(item)));
  return firstArr.filter((item) => {
    return !mappedSecondSet.has(mapper(item));
  });
}
__name(differenceBy$1, "differenceBy$1");
function differenceWith$1(firstArr, secondArr, areItemsEqual) {
  return firstArr.filter((firstItem) => {
    return secondArr.every((secondItem) => {
      return !areItemsEqual(firstItem, secondItem);
    });
  });
}
__name(differenceWith$1, "differenceWith$1");
function drop$1(arr, itemsCount) {
  itemsCount = Math.max(itemsCount, 0);
  return arr.slice(itemsCount);
}
__name(drop$1, "drop$1");
function dropRight$1(arr, itemsCount) {
  itemsCount = Math.min(-itemsCount, 0);
  if (itemsCount === 0) return arr.slice();
  return arr.slice(0, itemsCount);
}
__name(dropRight$1, "dropRight$1");
function dropRightWhile$1(arr, canContinueDropping) {
  for (let i = arr.length - 1; i >= 0; i--) if (!canContinueDropping(arr[i], i, arr)) return arr.slice(0, i + 1);
  return [];
}
__name(dropRightWhile$1, "dropRightWhile$1");
function dropWhile$1(arr, canContinueDropping) {
  const dropEndIndex = arr.findIndex((item, index, arr2) => !canContinueDropping(item, index, arr2));
  if (dropEndIndex === -1) return [];
  return arr.slice(dropEndIndex);
}
__name(dropWhile$1, "dropWhile$1");
function flatten$1(arr, depth = 1) {
  const result = [];
  const flooredDepth = Math.floor(depth);
  const recursive = /* @__PURE__ */ __name((arr2, currentDepth) => {
    for (let i = 0; i < arr2.length; i++) {
      const item = arr2[i];
      if (Array.isArray(item) && currentDepth < flooredDepth) recursive(item, currentDepth + 1);
      else result.push(item);
    }
  }, "recursive");
  recursive(arr, 0);
  return result;
}
__name(flatten$1, "flatten$1");
function flatMap$1(arr, iteratee, depth = 1) {
  return flatten$1(arr.map((item, index) => iteratee(item, index, arr)), depth);
}
__name(flatMap$1, "flatMap$1");
function flattenDeep$1(arr) {
  return flatten$1(arr, Infinity);
}
__name(flattenDeep$1, "flattenDeep$1");
function flatMapDeep$1(arr, iteratee) {
  return flattenDeep$1(arr.map((item, index) => iteratee(item, index, arr)));
}
__name(flatMapDeep$1, "flatMapDeep$1");
function groupBy$1(arr, getKeyFromItem) {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = getKeyFromItem(item, i, arr);
    if (!Object.hasOwn(result, key)) result[key] = [];
    result[key].push(item);
  }
  return result;
}
__name(groupBy$1, "groupBy$1");
function head$1(arr) {
  return arr[0];
}
__name(head$1, "head$1");
function initial$1(arr) {
  return arr.slice(0, -1);
}
__name(initial$1, "initial$1");
function intersection$1(firstArr, secondArr) {
  const secondSet = new Set(secondArr);
  return firstArr.filter((item) => secondSet.has(item));
}
__name(intersection$1, "intersection$1");
function intersectionBy$1(firstArr, secondArr, mapper) {
  const result = [];
  const mappedSecondSet = new Set(secondArr.map(mapper));
  for (let i = 0; i < firstArr.length; i++) {
    const item = firstArr[i];
    const mappedItem = mapper(item);
    if (mappedSecondSet.has(mappedItem)) {
      result.push(item);
      mappedSecondSet.delete(mappedItem);
    }
  }
  return result;
}
__name(intersectionBy$1, "intersectionBy$1");
function intersectionWith$1(firstArr, secondArr, areItemsEqual) {
  return firstArr.filter((firstItem) => {
    return secondArr.some((secondItem) => {
      return areItemsEqual(firstItem, secondItem);
    });
  });
}
__name(intersectionWith$1, "intersectionWith$1");
function isSubset$1(superset, subset) {
  return difference$1(subset, superset).length === 0;
}
__name(isSubset$1, "isSubset$1");
function isSubsetWith$1(superset, subset, areItemsEqual) {
  return differenceWith$1(subset, superset, areItemsEqual).length === 0;
}
__name(isSubsetWith$1, "isSubsetWith$1");
function keyBy$3(arr, getKeyFromItem) {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = getKeyFromItem(item, i, arr);
    result[key] = item;
  }
  return result;
}
__name(keyBy$3, "keyBy$3");
function last$1(arr) {
  return arr[arr.length - 1];
}
__name(last$1, "last$1");
function maxBy$1(items, getValue) {
  if (items.length === 0) return;
  let maxElement = items[0];
  let max = getValue(maxElement, 0, items);
  for (let i = 1; i < items.length; i++) {
    const element = items[i];
    const value = getValue(element, i, items);
    if (value > max) {
      max = value;
      maxElement = element;
    }
  }
  return maxElement;
}
__name(maxBy$1, "maxBy$1");
function minBy$1(items, getValue) {
  if (items.length === 0) return;
  let minElement = items[0];
  let min = getValue(minElement, 0, items);
  for (let i = 1; i < items.length; i++) {
    const element = items[i];
    const value = getValue(element, i, items);
    if (value < min) {
      min = value;
      minElement = element;
    }
  }
  return minElement;
}
__name(minBy$1, "minBy$1");
function compareValues(a, b, order) {
  if (a < b) return order === "asc" ? -1 : 1;
  if (a > b) return order === "asc" ? 1 : -1;
  return 0;
}
__name(compareValues, "compareValues");
function orderBy$1(arr, criteria, orders) {
  return arr.slice().sort((a, b) => {
    const ordersLength = orders.length;
    for (let i = 0; i < criteria.length; i++) {
      const order = ordersLength > i ? orders[i] : orders[ordersLength - 1];
      const criterion = criteria[i];
      const criterionIsFunction = typeof criterion === "function";
      const result = compareValues(criterionIsFunction ? criterion(a) : a[criterion], criterionIsFunction ? criterion(b) : b[criterion], order);
      if (result !== 0) return result;
    }
    return 0;
  });
}
__name(orderBy$1, "orderBy$1");
function partition$1(arr, isInTruthy) {
  const truthy = [];
  const falsy = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (isInTruthy(item, i, arr)) truthy.push(item);
    else falsy.push(item);
  }
  return [truthy, falsy];
}
__name(partition$1, "partition$1");
function sortBy$1(arr, criteria) {
  return orderBy$1(arr, criteria, ["asc"]);
}
__name(sortBy$1, "sortBy$1");
function tail$1(arr) {
  return arr.slice(1);
}
__name(tail$1, "tail$1");
function isSymbol(value) {
  return typeof value === "symbol" || value instanceof Symbol;
}
__name(isSymbol, "isSymbol");
function toNumber(value) {
  if (isSymbol(value)) return NaN;
  return Number(value);
}
__name(toNumber, "toNumber");
function toFinite(value) {
  if (!value) return value === 0 ? value : 0;
  value = toNumber(value);
  if (value === Infinity || value === -Infinity) return (value < 0 ? -1 : 1) * Number.MAX_VALUE;
  return value === value ? value : 0;
}
__name(toFinite, "toFinite");
function toInteger(value) {
  const finite = toFinite(value);
  const remainder = finite % 1;
  return remainder ? finite - remainder : finite;
}
__name(toInteger, "toInteger");
function take$1(arr, count, guard) {
  count = guard || count === void 0 ? 1 : toInteger(count);
  return arr.slice(0, count);
}
__name(take$1, "take$1");
function takeRight$1(arr, count, guard) {
  count = guard || count === void 0 ? 1 : toInteger(count);
  if (count <= 0 || arr.length === 0) return [];
  return arr.slice(-count);
}
__name(takeRight$1, "takeRight$1");
function takeRightWhile$1(arr, shouldContinueTaking) {
  for (let i = arr.length - 1; i >= 0; i--) if (!shouldContinueTaking(arr[i], i, arr)) return arr.slice(i + 1);
  return arr.slice();
}
__name(takeRightWhile$1, "takeRightWhile$1");
function takeWhile$1(arr, shouldContinueTaking) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!shouldContinueTaking(item, i, arr)) break;
    result.push(item);
  }
  return result;
}
__name(takeWhile$1, "takeWhile$1");
function toFilled$1(arr, value, start = 0, end = arr.length) {
  const length = arr.length;
  const finalStart = Math.max(start >= 0 ? start : length + start, 0);
  const finalEnd = Math.min(end >= 0 ? end : length + end, length);
  const newArr = arr.slice();
  for (let i = finalStart; i < finalEnd; i++) newArr[i] = value;
  return newArr;
}
__name(toFilled$1, "toFilled$1");
function uniq$1(arr) {
  return [...new Set(arr)];
}
__name(uniq$1, "uniq$1");
function union$1(arr1, arr2) {
  return uniq$1(arr1.concat(arr2));
}
__name(union$1, "union$1");
function uniqBy$1(arr, mapper) {
  const map = /* @__PURE__ */ new Map();
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = mapper(item, i, arr);
    if (!map.has(key)) map.set(key, item);
  }
  return Array.from(map.values());
}
__name(uniqBy$1, "uniqBy$1");
function unionBy$1(arr1, arr2, mapper) {
  return uniqBy$1(arr1.concat(arr2), mapper);
}
__name(unionBy$1, "unionBy$1");
function uniqWith$1(arr, areItemsEqual) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (result.every((v) => !areItemsEqual(v, item))) result.push(item);
  }
  return result;
}
__name(uniqWith$1, "uniqWith$1");
function unionWith$1(arr1, arr2, areItemsEqual) {
  return uniqWith$1(arr1.concat(arr2), areItemsEqual);
}
__name(unionWith$1, "unionWith$1");
function unzip$1(zipped) {
  let maxLen = 0;
  for (let i = 0; i < zipped.length; i++) if (zipped[i].length > maxLen) maxLen = zipped[i].length;
  const result = new Array(maxLen);
  for (let i = 0; i < maxLen; i++) {
    result[i] = new Array(zipped.length);
    for (let j = 0; j < zipped.length; j++) result[i][j] = zipped[j][i];
  }
  return result;
}
__name(unzip$1, "unzip$1");
function unzipWith$1(target, iteratee) {
  const maxLength = Math.max(...target.map((innerArray) => innerArray.length));
  const result = new Array(maxLength);
  for (let i = 0; i < maxLength; i++) {
    const group = new Array(target.length);
    for (let j = 0; j < target.length; j++) group[j] = target[j][i];
    result[i] = iteratee(...group);
  }
  return result;
}
__name(unzipWith$1, "unzipWith$1");
function windowed$1(arr, size, step = 1, { partialWindows = false } = {}) {
  if (size <= 0 || !Number.isInteger(size)) throw new Error("Size must be a positive integer.");
  if (step <= 0 || !Number.isInteger(step)) throw new Error("Step must be a positive integer.");
  const result = [];
  const end = partialWindows ? arr.length : arr.length - size + 1;
  for (let i = 0; i < end; i += step) result.push(arr.slice(i, i + size));
  return result;
}
__name(windowed$1, "windowed$1");
function without$1(array, ...values) {
  return difference$1(array, values);
}
__name(without$1, "without$1");
function xor$1(arr1, arr2) {
  return difference$1(union$1(arr1, arr2), intersection$1(arr1, arr2));
}
__name(xor$1, "xor$1");
function xorBy$1(arr1, arr2, mapper) {
  return differenceBy$1(unionBy$1(arr1, arr2, mapper), intersectionBy$1(arr1, arr2, mapper), mapper);
}
__name(xorBy$1, "xorBy$1");
function xorWith$1(arr1, arr2, areElementsEqual) {
  return differenceWith$1(unionWith$1(arr1, arr2, areElementsEqual), intersectionWith$1(arr1, arr2, areElementsEqual), areElementsEqual);
}
__name(xorWith$1, "xorWith$1");
function zip$1(...arrs) {
  let rowCount = 0;
  for (let i = 0; i < arrs.length; i++) if (arrs[i].length > rowCount) rowCount = arrs[i].length;
  const columnCount = arrs.length;
  const result = Array(rowCount);
  for (let i = 0; i < rowCount; ++i) {
    const row = Array(columnCount);
    for (let j = 0; j < columnCount; ++j) row[j] = arrs[j][i];
    result[i] = row;
  }
  return result;
}
__name(zip$1, "zip$1");
function zipObject$1(keys, values) {
  const result = {};
  for (let i = 0; i < keys.length; i++) result[keys[i]] = values[i];
  return result;
}
__name(zipObject$1, "zipObject$1");
function zipWith$1(arr1, ...rest) {
  const arrs = [arr1, ...rest.slice(0, -1)];
  const combine = rest[rest.length - 1];
  const maxIndex = Math.max(...arrs.map((arr) => arr.length));
  const result = Array(maxIndex);
  for (let i = 0; i < maxIndex; i++) result[i] = combine(...arrs.map((arr) => arr[i]), i);
  return result;
}
__name(zipWith$1, "zipWith$1");
var at = at$1;
var chunk = chunk$1;
var compact = compact$1;
var countBy$2 = countBy$3;
var difference = difference$1;
var differenceBy = differenceBy$1;
var differenceWith = differenceWith$1;
var drop = drop$1;
var dropRight = dropRight$1;
var dropRightWhile = dropRightWhile$1;
var dropWhile = dropWhile$1;
var flatMap = flatMap$1;
var flatMapDeep = flatMapDeep$1;
var flatten = flatten$1;
var flattenDeep = flattenDeep$1;
var groupBy = groupBy$1;
var head = head$1;
var initial = initial$1;
var intersection = intersection$1;
var intersectionBy = intersectionBy$1;
var intersectionWith = intersectionWith$1;
var isSubset = isSubset$1;
var isSubsetWith = isSubsetWith$1;
var keyBy$2 = keyBy$3;
var last = last$1;
var maxBy = maxBy$1;
var minBy = minBy$1;
var orderBy = orderBy$1;
var partition = partition$1;
var sortBy = sortBy$1;
var tail = tail$1;
var take = take$1;
var takeRight = takeRight$1;
var takeRightWhile = takeRightWhile$1;
var takeWhile = takeWhile$1;
var toFilled = toFilled$1;
var union = union$1;
var unionBy = unionBy$1;
var unionWith = unionWith$1;
var uniq = uniq$1;
var uniqBy = uniqBy$1;
var uniqWith = uniqWith$1;
var unzip = unzip$1;
var unzipWith = unzipWith$1;
var windowed = windowed$1;
var without = without$1;
var xor = xor$1;
var xorBy = xorBy$1;
var xorWith = xorWith$1;
var zip = zip$1;
var zipObject = zipObject$1;
var zipWith = zipWith$1;
var arrays_exports = /* @__PURE__ */ __exportAll({
  at: /* @__PURE__ */ __name(() => at, "at"),
  chunk: /* @__PURE__ */ __name(() => chunk, "chunk"),
  compact: /* @__PURE__ */ __name(() => compact, "compact"),
  countBy: /* @__PURE__ */ __name(() => countBy$2, "countBy"),
  difference: /* @__PURE__ */ __name(() => difference, "difference"),
  differenceBy: /* @__PURE__ */ __name(() => differenceBy, "differenceBy"),
  differenceWith: /* @__PURE__ */ __name(() => differenceWith, "differenceWith"),
  drop: /* @__PURE__ */ __name(() => drop, "drop"),
  dropRight: /* @__PURE__ */ __name(() => dropRight, "dropRight"),
  dropRightWhile: /* @__PURE__ */ __name(() => dropRightWhile, "dropRightWhile"),
  dropWhile: /* @__PURE__ */ __name(() => dropWhile, "dropWhile"),
  flatMap: /* @__PURE__ */ __name(() => flatMap, "flatMap"),
  flatMapDeep: /* @__PURE__ */ __name(() => flatMapDeep, "flatMapDeep"),
  flatten: /* @__PURE__ */ __name(() => flatten, "flatten"),
  flattenDeep: /* @__PURE__ */ __name(() => flattenDeep, "flattenDeep"),
  groupBy: /* @__PURE__ */ __name(() => groupBy, "groupBy"),
  head: /* @__PURE__ */ __name(() => head, "head"),
  initial: /* @__PURE__ */ __name(() => initial, "initial"),
  intersection: /* @__PURE__ */ __name(() => intersection, "intersection"),
  intersectionBy: /* @__PURE__ */ __name(() => intersectionBy, "intersectionBy"),
  intersectionWith: /* @__PURE__ */ __name(() => intersectionWith, "intersectionWith"),
  isSubset: /* @__PURE__ */ __name(() => isSubset, "isSubset"),
  isSubsetWith: /* @__PURE__ */ __name(() => isSubsetWith, "isSubsetWith"),
  keyBy: /* @__PURE__ */ __name(() => keyBy$2, "keyBy"),
  last: /* @__PURE__ */ __name(() => last, "last"),
  maxBy: /* @__PURE__ */ __name(() => maxBy, "maxBy"),
  minBy: /* @__PURE__ */ __name(() => minBy, "minBy"),
  orderBy: /* @__PURE__ */ __name(() => orderBy, "orderBy"),
  partition: /* @__PURE__ */ __name(() => partition, "partition"),
  sortBy: /* @__PURE__ */ __name(() => sortBy, "sortBy"),
  tail: /* @__PURE__ */ __name(() => tail, "tail"),
  take: /* @__PURE__ */ __name(() => take, "take"),
  takeRight: /* @__PURE__ */ __name(() => takeRight, "takeRight"),
  takeRightWhile: /* @__PURE__ */ __name(() => takeRightWhile, "takeRightWhile"),
  takeWhile: /* @__PURE__ */ __name(() => takeWhile, "takeWhile"),
  toFilled: /* @__PURE__ */ __name(() => toFilled, "toFilled"),
  union: /* @__PURE__ */ __name(() => union, "union"),
  unionBy: /* @__PURE__ */ __name(() => unionBy, "unionBy"),
  unionWith: /* @__PURE__ */ __name(() => unionWith, "unionWith"),
  uniq: /* @__PURE__ */ __name(() => uniq, "uniq"),
  uniqBy: /* @__PURE__ */ __name(() => uniqBy, "uniqBy"),
  uniqWith: /* @__PURE__ */ __name(() => uniqWith, "uniqWith"),
  unzip: /* @__PURE__ */ __name(() => unzip, "unzip"),
  unzipWith: /* @__PURE__ */ __name(() => unzipWith, "unzipWith"),
  windowed: /* @__PURE__ */ __name(() => windowed, "windowed"),
  without: /* @__PURE__ */ __name(() => without, "without"),
  xor: /* @__PURE__ */ __name(() => xor, "xor"),
  xorBy: /* @__PURE__ */ __name(() => xorBy, "xorBy"),
  xorWith: /* @__PURE__ */ __name(() => xorWith, "xorWith"),
  zip: /* @__PURE__ */ __name(() => zip, "zip"),
  zipObject: /* @__PURE__ */ __name(() => zipObject, "zipObject"),
  zipWith: /* @__PURE__ */ __name(() => zipWith, "zipWith")
});
function partial$1(func, ...partialArgs) {
  return partialImpl(func, placeholderSymbol$1, ...partialArgs);
}
__name(partial$1, "partial$1");
function partialImpl(func, placeholder, ...partialArgs) {
  const partialed = /* @__PURE__ */ __name(function(...providedArgs) {
    let providedArgsIndex = 0;
    const substitutedArgs = partialArgs.slice().map((arg) => arg === placeholder ? providedArgs[providedArgsIndex++] : arg);
    const remainingArgs = providedArgs.slice(providedArgsIndex);
    return func.apply(this, substitutedArgs.concat(remainingArgs));
  }, "partialed");
  if (func.prototype) partialed.prototype = Object.create(func.prototype);
  return partialed;
}
__name(partialImpl, "partialImpl");
var placeholderSymbol$1 = /* @__PURE__ */ Symbol("partial.placeholder");
partial$1.placeholder = placeholderSymbol$1;
function partialRight$1(func, ...partialArgs) {
  return partialRightImpl(func, placeholderSymbol, ...partialArgs);
}
__name(partialRight$1, "partialRight$1");
function partialRightImpl(func, placeholder, ...partialArgs) {
  const partialedRight = /* @__PURE__ */ __name(function(...providedArgs) {
    const placeholderLength = partialArgs.filter((arg) => arg === placeholder).length;
    const rangeLength = Math.max(providedArgs.length - placeholderLength, 0);
    const remainingArgs = providedArgs.slice(0, rangeLength);
    let providedArgsIndex = rangeLength;
    const substitutedArgs = partialArgs.slice().map((arg) => arg === placeholder ? providedArgs[providedArgsIndex++] : arg);
    return func.apply(this, remainingArgs.concat(substitutedArgs));
  }, "partialedRight");
  if (func.prototype) partialedRight.prototype = Object.create(func.prototype);
  return partialedRight;
}
__name(partialRightImpl, "partialRightImpl");
var placeholderSymbol = /* @__PURE__ */ Symbol("partialRight.placeholder");
partialRight$1.placeholder = placeholderSymbol;
function getAnnotation(annotations, name) {
  if (!annotations) return void 0;
  return annotations.find((anno) => anno.name === name);
}
__name(getAnnotation, "getAnnotation");
function getAnnotationArg(annotations, name) {
  const anno = getAnnotation(annotations, name);
  return anno === null || anno === void 0 ? void 0 : anno.argument;
}
__name(getAnnotationArg, "getAnnotationArg");
var ACRONYM_TO_CAPITALIZED_WORD_BOUNDARY_RE = /([A-Z]+)([A-Z][a-z])/g;
var LOWERCASE_OR_DIGIT_TO_UPPERCASE_BOUNDARY_RE = /([a-z0-9])([A-Z])/g;
var NON_ALPHANUMERIC_SEQUENCE_RE = /[^A-Za-z0-9]+/g;
var WHITESPACE_SEQUENCE_RE = /\s+/;
function words(str) {
  const normalized = str.replace(ACRONYM_TO_CAPITALIZED_WORD_BOUNDARY_RE, "$1 $2").replace(LOWERCASE_OR_DIGIT_TO_UPPERCASE_BOUNDARY_RE, "$1 $2").replace(NON_ALPHANUMERIC_SEQUENCE_RE, " ").trim();
  return normalized.length === 0 ? [] : normalized.split(WHITESPACE_SEQUENCE_RE);
}
__name(words, "words");
function capitalize$1(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
__name(capitalize$1, "capitalize$1");
function pascalCase(str) {
  return words(str).map(capitalize$1).join("");
}
__name(pascalCase, "pascalCase");
function hoistAnonymousTypes(schema, nameFn) {
  const output = hydrateIrSchema(schema);
  const usedNames = new Set(output.types.map((typeDef) => typeDef.name));
  const flatTypes = [];
  for (const typeDef of output.types) {
    const hoisted = [];
    typeDef.typeRef = visitTypeRef(typeDef.typeRef, [typeDef.name], typeDef.name, typeDef.position, hoisted, usedNames, nameFn, false);
    flatTypes.push(typeDef, ...hoisted);
  }
  output.types = flatTypes;
  return output;
}
__name(hoistAnonymousTypes, "hoistAnonymousTypes");
function visitField(field, parts, parentName, hoisted, usedNames, nameFn) {
  field.typeRef = visitTypeRef(field.typeRef, [...parts, field.name], parentName, field.position, hoisted, usedNames, nameFn, true);
  return field;
}
__name(visitField, "visitField");
function visitTypeRef(typeRef, parts, parentName, position, hoisted, usedNames, nameFn, shouldHoistObject) {
  switch (typeRef.kind) {
    case "array":
      if (typeRef.arrayType) typeRef.arrayType = visitTypeRef(typeRef.arrayType, [...parts, "Item"], parentName, position, hoisted, usedNames, nameFn, true);
      return typeRef;
    case "map":
      if (typeRef.mapType) typeRef.mapType = visitTypeRef(typeRef.mapType, [...parts, "Value"], parentName, position, hoisted, usedNames, nameFn, true);
      return typeRef;
    case "object":
      var _typeRef$objectFields;
      if (shouldHoistObject) return hoistObject(typeRef, parts, parentName, position, hoisted, usedNames, nameFn);
      typeRef.objectFields = (_typeRef$objectFields = typeRef.objectFields) === null || _typeRef$objectFields === void 0 ? void 0 : _typeRef$objectFields.map((field) => visitField(field, parts, parentName, hoisted, usedNames, nameFn));
      return typeRef;
    default:
      return typeRef;
  }
}
__name(visitTypeRef, "visitTypeRef");
function hoistObject(typeRef, parts, parentName, position, hoisted, usedNames, nameFn) {
  var _nameFn, _typeRef$objectFields2;
  const defaultName = pascalCase(parts.join(" "));
  const baseName = ((_nameFn = nameFn === null || nameFn === void 0 ? void 0 : nameFn({
    parts: [...parts],
    parentName,
    defaultName
  })) !== null && _nameFn !== void 0 ? _nameFn : defaultName).trim();
  if (baseName === "") throw new Error(`hoistAnonymousTypes could not generate a name for '${parts.join(".")}'.`);
  const name = makeUniqueName(baseName, usedNames);
  const generated = {
    position: copyPosition(position),
    name,
    annotations: [],
    typeRef: {
      kind: "object",
      objectFields: []
    }
  };
  hoisted.push(generated);
  generated.typeRef.objectFields = (_typeRef$objectFields2 = typeRef.objectFields) === null || _typeRef$objectFields2 === void 0 ? void 0 : _typeRef$objectFields2.map((field) => visitField(field, parts, name, hoisted, usedNames, nameFn));
  return {
    kind: "type",
    typeName: name
  };
}
__name(hoistObject, "hoistObject");
function makeUniqueName(baseName, usedNames) {
  if (!usedNames.has(baseName)) {
    usedNames.add(baseName);
    return baseName;
  }
  let index = 2;
  let name = `${baseName}${index}`;
  while (usedNames.has(name)) {
    index += 1;
    name = `${baseName}${index}`;
  }
  usedNames.add(name);
  return name;
}
__name(makeUniqueName, "makeUniqueName");
function copyPosition(position) {
  return {
    file: position.file,
    line: position.line,
    column: position.column
  };
}
__name(copyPosition, "copyPosition");
function unwrapLiteral(value) {
  return unwrapLiteralValue(value);
}
__name(unwrapLiteral, "unwrapLiteral");
function unwrapLiteralValue(value) {
  switch (value.kind) {
    case "string":
      return value.stringValue;
    case "int":
      return value.intValue;
    case "float":
      return value.floatValue;
    case "bool":
      return value.boolValue;
    case "object": {
      var _value$objectEntries;
      const resolvedObject = {};
      const entries = (_value$objectEntries = value.objectEntries) !== null && _value$objectEntries !== void 0 ? _value$objectEntries : [];
      for (const entry of entries) resolvedObject[entry.key] = unwrapLiteralValue(entry.value);
      return resolvedObject;
    }
    case "array":
      var _value$arrayItems;
      return ((_value$arrayItems = value.arrayItems) !== null && _value$arrayItems !== void 0 ? _value$arrayItems : []).map((item) => unwrapLiteralValue(item));
    default:
      return null;
  }
}
__name(unwrapLiteralValue, "unwrapLiteralValue");
var ir_exports = /* @__PURE__ */ __exportAll({
  getAnnotation: /* @__PURE__ */ __name(() => getAnnotation, "getAnnotation"),
  getAnnotationArg: /* @__PURE__ */ __name(() => getAnnotationArg, "getAnnotationArg"),
  hoistAnonymousTypes: /* @__PURE__ */ __name(() => hoistAnonymousTypes, "hoistAnonymousTypes"),
  unwrapLiteral: /* @__PURE__ */ __name(() => unwrapLiteral, "unwrapLiteral")
});
function attempt$1(func) {
  try {
    return [null, func()];
  } catch (error) {
    return [error, null];
  }
}
__name(attempt$1, "attempt$1");
function invariant$1(condition, message) {
  if (condition) return;
  if (typeof message === "string") throw new Error(message);
  throw message;
}
__name(invariant$1, "invariant$1");
var assert = invariant$1;
var attempt = attempt$1;
var invariant = invariant$1;
var misc_exports = /* @__PURE__ */ __exportAll({
  assert: /* @__PURE__ */ __name(() => assert, "assert"),
  attempt: /* @__PURE__ */ __name(() => attempt, "attempt"),
  invariant: /* @__PURE__ */ __name(() => invariant, "invariant")
});
function getOptionArray(options, key, defaultValue = [], separator = ",") {
  const value = options === null || options === void 0 ? void 0 : options[key];
  if (value === void 0) return defaultValue;
  const trimmedValue = value.trim();
  if (trimmedValue === "") return [];
  return trimmedValue.split(separator).map((item) => item.trim()).filter((item) => item.length > 0);
}
__name(getOptionArray, "getOptionArray");
function getOptionBool(options, key, defaultValue) {
  const value = options === null || options === void 0 ? void 0 : options[key];
  if (value === void 0) return defaultValue;
  switch (value.trim().toLowerCase()) {
    case "true":
    case "1":
    case "yes":
    case "on":
    case "enable":
    case "enabled":
    case "y":
      return true;
    case "false":
    case "0":
    case "no":
    case "off":
    case "disable":
    case "disabled":
    case "n":
      return false;
    default:
      return defaultValue;
  }
}
__name(getOptionBool, "getOptionBool");
function getOptionEnum(options, key, allowedValues, defaultValue) {
  const value = options === null || options === void 0 ? void 0 : options[key];
  if (value === void 0) return defaultValue;
  const trimmedValue = value.trim();
  if (trimmedValue === "") return defaultValue;
  return allowedValues.includes(trimmedValue) ? trimmedValue : defaultValue;
}
__name(getOptionEnum, "getOptionEnum");
function getOptionNumber(options, key, defaultValue) {
  const value = options === null || options === void 0 ? void 0 : options[key];
  if (value === void 0) return defaultValue;
  const trimmedValue = value.trim();
  if (trimmedValue === "") return defaultValue;
  const parsedValue = Number(trimmedValue);
  return Number.isFinite(parsedValue) ? parsedValue : defaultValue;
}
__name(getOptionNumber, "getOptionNumber");
function getOptionString(options, key, defaultValue) {
  const value = options === null || options === void 0 ? void 0 : options[key];
  return value === void 0 ? defaultValue : value;
}
__name(getOptionString, "getOptionString");
var options_exports = /* @__PURE__ */ __exportAll({
  getOptionArray: /* @__PURE__ */ __name(() => getOptionArray, "getOptionArray"),
  getOptionBool: /* @__PURE__ */ __name(() => getOptionBool, "getOptionBool"),
  getOptionEnum: /* @__PURE__ */ __name(() => getOptionEnum, "getOptionEnum"),
  getOptionNumber: /* @__PURE__ */ __name(() => getOptionNumber, "getOptionNumber"),
  getOptionString: /* @__PURE__ */ __name(() => getOptionString, "getOptionString")
});
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
__name(capitalize, "capitalize");
function camelCase(str) {
  const parts = words(str);
  if (parts.length === 0) return "";
  return parts.map((part, index) => index === 0 ? part.toLowerCase() : capitalize(part)).join("");
}
__name(camelCase, "camelCase");
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
__name(ownKeys, "ownKeys");
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
__name(_objectSpread, "_objectSpread");
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) Object.defineProperty(obj, key, {
    value,
    enumerable: true,
    configurable: true,
    writable: true
  });
  else obj[key] = value;
  return obj;
}
__name(_defineProperty, "_defineProperty");
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
__name(_toPropertyKey, "_toPropertyKey");
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
__name(_toPrimitive, "_toPrimitive");
var dedent$1 = createDedent({});
function createDedent(options) {
  dedent2.withOptions = (newOptions) => createDedent(_objectSpread(_objectSpread({}, options), newOptions));
  return dedent2;
  function dedent2(strings, ...values) {
    const raw = typeof strings === "string" ? [strings] : strings.raw;
    const { alignValues = false, escapeSpecialCharacters = Array.isArray(strings), trimWhitespace = true } = options;
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      let next = raw[i];
      if (escapeSpecialCharacters) next = next.replace(/\\\n[ \t]*/g, "").replace(/\\`/g, "`").replace(/\\\$/g, "$").replace(/\\\{/g, "{");
      result += next;
      if (i < values.length) {
        const value = alignValues ? alignValue(values[i], result) : values[i];
        result += value;
      }
    }
    const lines = result.split("\n");
    let mindent = null;
    for (const l of lines) {
      const m = l.match(/^(\s+)\S+/);
      if (m) {
        const indent2 = m[1].length;
        if (!mindent) mindent = indent2;
        else mindent = Math.min(mindent, indent2);
      }
    }
    if (mindent !== null) {
      const m = mindent;
      result = lines.map((l) => l[0] === " " || l[0] === "	" ? l.slice(m) : l).join("\n");
    }
    if (trimWhitespace) result = result.trim();
    if (escapeSpecialCharacters) result = result.replace(/\\n/g, "\n").replace(/\\t/g, "	").replace(/\\r/g, "\r").replace(/\\v/g, "\v").replace(/\\b/g, "\b").replace(/\\f/g, "\f").replace(/\\0/g, "\0").replace(/\\x([\da-fA-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\u\{([\da-fA-F]{1,6})\}/g, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/\\u([\da-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
    if (typeof Bun !== "undefined") result = result.replace(/\\u(?:\{([\da-fA-F]{1,6})\}|([\da-fA-F]{4}))/g, (_, braced, unbraced) => {
      var _ref;
      const hex = (_ref = braced !== null && braced !== void 0 ? braced : unbraced) !== null && _ref !== void 0 ? _ref : "";
      return String.fromCodePoint(parseInt(hex, 16));
    });
    return result;
  }
  __name(dedent2, "dedent");
}
__name(createDedent, "createDedent");
function alignValue(value, precedingText) {
  if (typeof value !== "string" || !value.includes("\n")) return value;
  const indentMatch = precedingText.slice(precedingText.lastIndexOf("\n") + 1).match(/^(\s+)/);
  if (indentMatch) {
    const indent2 = indentMatch[1];
    return value.replace(/\n/g, `
${indent2}`);
  }
  return value;
}
__name(alignValue, "alignValue");
function dedent(input) {
  return dedent$1(input);
}
__name(dedent, "dedent");
function ensurePrefix(str, prefix) {
  if (str.startsWith(prefix)) return str;
  return prefix + str;
}
__name(ensurePrefix, "ensurePrefix");
function ensureSuffix(str, suffix) {
  if (str.endsWith(suffix)) return str;
  return str + suffix;
}
__name(ensureSuffix, "ensureSuffix");
function kebabCase(str, upperCase2 = false) {
  return words(str).map((part) => upperCase2 ? part.toUpperCase() : part.toLowerCase()).join("-");
}
__name(kebabCase, "kebabCase");
var cache = /* @__PURE__ */ new Map();
function limitBlankLines(str, maxConsecutive = 0) {
  const limit = Math.max(0, maxConsecutive);
  let regex = cache.get(limit);
  if (!regex) {
    regex = new RegExp(`(\\r?\\n\\s*){${limit + 2},}`, "g");
    cache.set(limit, regex);
  }
  return str.replace(regex, "\n".repeat(limit + 1));
}
__name(limitBlankLines, "limitBlankLines");
function lowerCase(str) {
  return words(str).map((part) => part.toLowerCase()).join(" ");
}
__name(lowerCase, "lowerCase");
function toLength(value) {
  if (!Number.isFinite(value)) return;
  return Math.trunc(value);
}
__name(toLength, "toLength");
function createPadding(length, chars) {
  if (length <= 0) return "";
  const paddingCharacters = Array.from(chars);
  if (paddingCharacters.length === 0) return "";
  const result = [];
  while (result.length < length) result.push(...paddingCharacters);
  return result.slice(0, length).join("");
}
__name(createPadding, "createPadding");
function getPaddingTargetLength(str, length) {
  const currentLength = Array.from(str).length;
  const targetLength = toLength(length);
  if (targetLength === void 0 || targetLength <= currentLength) return;
  return {
    currentLength,
    targetLength
  };
}
__name(getPaddingTargetLength, "getPaddingTargetLength");
function buildPadding(length, chars) {
  return createPadding(length, chars !== null && chars !== void 0 ? chars : " ");
}
__name(buildPadding, "buildPadding");
function pad(str, length, chars) {
  const target = getPaddingTargetLength(str, length);
  if (target === void 0) return str;
  const totalPadding = target.targetLength - target.currentLength;
  const leftPaddingLength = Math.floor(totalPadding / 2);
  const rightPaddingLength = totalPadding - leftPaddingLength;
  const leftPadding = buildPadding(leftPaddingLength, chars);
  const rightPadding = buildPadding(rightPaddingLength, chars);
  if (leftPaddingLength > 0 && leftPadding.length === 0) return str;
  if (rightPaddingLength > 0 && rightPadding.length === 0) return str;
  return `${leftPadding}${str}${rightPadding}`;
}
__name(pad, "pad");
function padLeft(str, length, chars) {
  const target = getPaddingTargetLength(str, length);
  if (target === void 0) return str;
  const padding = buildPadding(target.targetLength - target.currentLength, chars);
  return padding.length === 0 ? str : `${padding}${str}`;
}
__name(padLeft, "padLeft");
function padRight(str, length, chars) {
  const target = getPaddingTargetLength(str, length);
  if (target === void 0) return str;
  const padding = buildPadding(target.targetLength - target.currentLength, chars);
  return padding.length === 0 ? str : `${str}${padding}`;
}
__name(padRight, "padRight");
var import_pluralize = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module2) => {
  (function(root, pluralize2) {
    if (typeof __require === "function" && typeof exports === "object" && typeof module2 === "object") module2.exports = pluralize2();
    else if (typeof define === "function" && define.amd) define(function() {
      return pluralize2();
    });
    else root.pluralize = pluralize2();
  })(exports, function() {
    var pluralRules = [];
    var singularRules = [];
    var uncountables = {};
    var irregularPlurals = {};
    var irregularSingles = {};
    function sanitizeRule(rule) {
      if (typeof rule === "string") return new RegExp("^" + rule + "$", "i");
      return rule;
    }
    __name(sanitizeRule, "sanitizeRule");
    function restoreCase(word, token) {
      if (word === token) return token;
      if (word === word.toLowerCase()) return token.toLowerCase();
      if (word === word.toUpperCase()) return token.toUpperCase();
      if (word[0] === word[0].toUpperCase()) return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
      return token.toLowerCase();
    }
    __name(restoreCase, "restoreCase");
    function interpolate(str, args) {
      return str.replace(/\$(\d{1,2})/g, function(match, index) {
        return args[index] || "";
      });
    }
    __name(interpolate, "interpolate");
    function replace(word, rule) {
      return word.replace(rule[0], function(match, index) {
        var result = interpolate(rule[1], arguments);
        if (match === "") return restoreCase(word[index - 1], result);
        return restoreCase(match, result);
      });
    }
    __name(replace, "replace");
    function sanitizeWord(token, word, rules) {
      if (!token.length || uncountables.hasOwnProperty(token)) return word;
      var len = rules.length;
      while (len--) {
        var rule = rules[len];
        if (rule[0].test(word)) return replace(word, rule);
      }
      return word;
    }
    __name(sanitizeWord, "sanitizeWord");
    function replaceWord(replaceMap, keepMap, rules) {
      return function(word) {
        var token = word.toLowerCase();
        if (keepMap.hasOwnProperty(token)) return restoreCase(word, token);
        if (replaceMap.hasOwnProperty(token)) return restoreCase(word, replaceMap[token]);
        return sanitizeWord(token, word, rules);
      };
    }
    __name(replaceWord, "replaceWord");
    function checkWord(replaceMap, keepMap, rules, bool) {
      return function(word) {
        var token = word.toLowerCase();
        if (keepMap.hasOwnProperty(token)) return true;
        if (replaceMap.hasOwnProperty(token)) return false;
        return sanitizeWord(token, token, rules) === token;
      };
    }
    __name(checkWord, "checkWord");
    function pluralize2(word, count, inclusive) {
      var pluralized = count === 1 ? pluralize2.singular(word) : pluralize2.plural(word);
      return (inclusive ? count + " " : "") + pluralized;
    }
    __name(pluralize2, "pluralize");
    pluralize2.plural = replaceWord(irregularSingles, irregularPlurals, pluralRules);
    pluralize2.isPlural = checkWord(irregularSingles, irregularPlurals, pluralRules);
    pluralize2.singular = replaceWord(irregularPlurals, irregularSingles, singularRules);
    pluralize2.isSingular = checkWord(irregularPlurals, irregularSingles, singularRules);
    pluralize2.addPluralRule = function(rule, replacement) {
      pluralRules.push([sanitizeRule(rule), replacement]);
    };
    pluralize2.addSingularRule = function(rule, replacement) {
      singularRules.push([sanitizeRule(rule), replacement]);
    };
    pluralize2.addUncountableRule = function(word) {
      if (typeof word === "string") {
        uncountables[word.toLowerCase()] = true;
        return;
      }
      pluralize2.addPluralRule(word, "$0");
      pluralize2.addSingularRule(word, "$0");
    };
    pluralize2.addIrregularRule = function(single, plural) {
      plural = plural.toLowerCase();
      single = single.toLowerCase();
      irregularSingles[single] = plural;
      irregularPlurals[plural] = single;
    };
    [
      ["I", "we"],
      ["me", "us"],
      ["he", "they"],
      ["she", "they"],
      ["them", "them"],
      ["myself", "ourselves"],
      ["yourself", "yourselves"],
      ["itself", "themselves"],
      ["herself", "themselves"],
      ["himself", "themselves"],
      ["themself", "themselves"],
      ["is", "are"],
      ["was", "were"],
      ["has", "have"],
      ["this", "these"],
      ["that", "those"],
      ["echo", "echoes"],
      ["dingo", "dingoes"],
      ["volcano", "volcanoes"],
      ["tornado", "tornadoes"],
      ["torpedo", "torpedoes"],
      ["genus", "genera"],
      ["viscus", "viscera"],
      ["stigma", "stigmata"],
      ["stoma", "stomata"],
      ["dogma", "dogmata"],
      ["lemma", "lemmata"],
      ["schema", "schemata"],
      ["anathema", "anathemata"],
      ["ox", "oxen"],
      ["axe", "axes"],
      ["die", "dice"],
      ["yes", "yeses"],
      ["foot", "feet"],
      ["eave", "eaves"],
      ["goose", "geese"],
      ["tooth", "teeth"],
      ["quiz", "quizzes"],
      ["human", "humans"],
      ["proof", "proofs"],
      ["carve", "carves"],
      ["valve", "valves"],
      ["looey", "looies"],
      ["thief", "thieves"],
      ["groove", "grooves"],
      ["pickaxe", "pickaxes"],
      ["passerby", "passersby"]
    ].forEach(function(rule) {
      return pluralize2.addIrregularRule(rule[0], rule[1]);
    });
    [
      [/s?$/i, "s"],
      [/[^\u0000-\u007F]$/i, "$0"],
      [/([^aeiou]ese)$/i, "$1"],
      [/(ax|test)is$/i, "$1es"],
      [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
      [/(e[mn]u)s?$/i, "$1s"],
      [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
      [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
      [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
      [/(seraph|cherub)(?:im)?$/i, "$1im"],
      [/(her|at|gr)o$/i, "$1oes"],
      [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
      [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
      [/sis$/i, "ses"],
      [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
      [/([^aeiouy]|qu)y$/i, "$1ies"],
      [/([^ch][ieo][ln])ey$/i, "$1ies"],
      [/(x|ch|ss|sh|zz)$/i, "$1es"],
      [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
      [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
      [/(pe)(?:rson|ople)$/i, "$1ople"],
      [/(child)(?:ren)?$/i, "$1ren"],
      [/eaux$/i, "$0"],
      [/m[ae]n$/i, "men"],
      ["thou", "you"]
    ].forEach(function(rule) {
      return pluralize2.addPluralRule(rule[0], rule[1]);
    });
    [
      [/s$/i, ""],
      [/(ss)$/i, "$1"],
      [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, "$1fe"],
      [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
      [/ies$/i, "y"],
      [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, "$1ie"],
      [/\b(mon|smil)ies$/i, "$1ey"],
      [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
      [/(seraph|cherub)im$/i, "$1"],
      [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
      [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
      [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
      [/(test)(?:is|es)$/i, "$1is"],
      [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
      [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
      [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
      [/(alumn|alg|vertebr)ae$/i, "$1a"],
      [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
      [/(matr|append)ices$/i, "$1ix"],
      [/(pe)(rson|ople)$/i, "$1rson"],
      [/(child)ren$/i, "$1"],
      [/(eau)x?$/i, "$1"],
      [/men$/i, "man"]
    ].forEach(function(rule) {
      return pluralize2.addSingularRule(rule[0], rule[1]);
    });
    [
      "adulthood",
      "advice",
      "agenda",
      "aid",
      "aircraft",
      "alcohol",
      "ammo",
      "analytics",
      "anime",
      "athletics",
      "audio",
      "bison",
      "blood",
      "bream",
      "buffalo",
      "butter",
      "carp",
      "cash",
      "chassis",
      "chess",
      "clothing",
      "cod",
      "commerce",
      "cooperation",
      "corps",
      "debris",
      "diabetes",
      "digestion",
      "elk",
      "energy",
      "equipment",
      "excretion",
      "expertise",
      "firmware",
      "flounder",
      "fun",
      "gallows",
      "garbage",
      "graffiti",
      "hardware",
      "headquarters",
      "health",
      "herpes",
      "highjinks",
      "homework",
      "housework",
      "information",
      "jeans",
      "justice",
      "kudos",
      "labour",
      "literature",
      "machinery",
      "mackerel",
      "mail",
      "media",
      "mews",
      "moose",
      "music",
      "mud",
      "manga",
      "news",
      "only",
      "personnel",
      "pike",
      "plankton",
      "pliers",
      "police",
      "pollution",
      "premises",
      "rain",
      "research",
      "rice",
      "salmon",
      "scissors",
      "series",
      "sewage",
      "shambles",
      "shrimp",
      "software",
      "species",
      "staff",
      "swine",
      "tennis",
      "traffic",
      "transportation",
      "trout",
      "tuna",
      "wealth",
      "welfare",
      "whiting",
      "wildebeest",
      "wildlife",
      "you",
      /pok[eé]mon$/i,
      /[^aeiou]ese$/i,
      /deer$/i,
      /fish$/i,
      /measles$/i,
      /o[iu]s$/i,
      /pox$/i,
      /sheep$/i
    ].forEach(pluralize2.addUncountableRule);
    return pluralize2;
  });
})))(), 1);
function pluralize(word, count, inclusive) {
  return (0, import_pluralize.default)(word, count, inclusive);
}
__name(pluralize, "pluralize");
function snakeCase(str, upperCase2 = false) {
  return words(str).map((part) => upperCase2 ? part.toUpperCase() : part.toLowerCase()).join("_");
}
__name(snakeCase, "snakeCase");
function toTrimCharacterSet(chars) {
  const values = Array.isArray(chars) ? chars : [chars];
  const characterSet = /* @__PURE__ */ new Set();
  for (const value of values) for (const character of Array.from(value)) characterSet.add(character);
  return characterSet;
}
__name(toTrimCharacterSet, "toTrimCharacterSet");
function trimWithCharacters(str, chars, mode) {
  if (chars === void 0) switch (mode) {
    case "start":
      return str.replace(/^\s+/, "");
    case "end":
      return str.replace(/\s+$/, "");
    default:
      return str.trim();
  }
  const trimCharacters = toTrimCharacterSet(chars);
  if (trimCharacters.size === 0) return str;
  const characters = Array.from(str);
  let start = 0;
  let end = characters.length;
  if (mode === "start" || mode === "both") while (start < end && trimCharacters.has(characters[start])) start += 1;
  if (mode === "end" || mode === "both") while (end > start && trimCharacters.has(characters[end - 1])) end -= 1;
  return characters.slice(start, end).join("");
}
__name(trimWithCharacters, "trimWithCharacters");
function trim(str, chars) {
  return trimWithCharacters(str, chars, "both");
}
__name(trim, "trim");
function trimEnd(str, chars) {
  return trimWithCharacters(str, chars, "end");
}
__name(trimEnd, "trimEnd");
function trimStart(str, chars) {
  return trimWithCharacters(str, chars, "start");
}
__name(trimStart, "trimStart");
function upperCase(str) {
  return words(str).map((part) => part.toUpperCase()).join(" ");
}
__name(upperCase, "upperCase");
var strings_exports = /* @__PURE__ */ __exportAll({
  camelCase: /* @__PURE__ */ __name(() => camelCase, "camelCase"),
  dedent: /* @__PURE__ */ __name(() => dedent, "dedent"),
  ensurePrefix: /* @__PURE__ */ __name(() => ensurePrefix, "ensurePrefix"),
  ensureSuffix: /* @__PURE__ */ __name(() => ensureSuffix, "ensureSuffix"),
  kebabCase: /* @__PURE__ */ __name(() => kebabCase, "kebabCase"),
  limitBlankLines: /* @__PURE__ */ __name(() => limitBlankLines, "limitBlankLines"),
  lowerCase: /* @__PURE__ */ __name(() => lowerCase, "lowerCase"),
  pad: /* @__PURE__ */ __name(() => pad, "pad"),
  padLeft: /* @__PURE__ */ __name(() => padLeft, "padLeft"),
  padRight: /* @__PURE__ */ __name(() => padRight, "padRight"),
  pascalCase: /* @__PURE__ */ __name(() => pascalCase, "pascalCase"),
  pluralize: /* @__PURE__ */ __name(() => pluralize, "pluralize"),
  snakeCase: /* @__PURE__ */ __name(() => snakeCase, "snakeCase"),
  trim: /* @__PURE__ */ __name(() => trim, "trim"),
  trimEnd: /* @__PURE__ */ __name(() => trimEnd, "trimEnd"),
  trimStart: /* @__PURE__ */ __name(() => trimStart, "trimStart"),
  upperCase: /* @__PURE__ */ __name(() => upperCase, "upperCase"),
  words: /* @__PURE__ */ __name(() => words, "words")
});

// src/shared/errors.ts
var _GenerationError = class _GenerationError extends Error {
  constructor(message, position) {
    super(message);
    this.name = "GenerationError";
    this.position = position;
  }
};
__name(_GenerationError, "GenerationError");
var GenerationError = _GenerationError;
function fail(message, position) {
  throw new GenerationError(message, position);
}
__name(fail, "fail");
function expectCondition(condition, message, position) {
  misc_exports.invariant(condition, new GenerationError(message, position));
}
__name(expectCondition, "expectCondition");
function expectValue(value, message, position) {
  expectCondition(value !== null && value !== void 0, message, position);
  return value;
}
__name(expectValue, "expectValue");
function toPluginOutputError(error) {
  if (error instanceof GenerationError) {
    return {
      message: error.message,
      position: error.position
    };
  }
  if (error instanceof Error) {
    return {
      message: error.message
    };
  }
  return {
    message: "An unknown generation error occurred."
  };
}
__name(toPluginOutputError, "toPluginOutputError");

// node_modules/@varavel/gen/dist/index.js
var _a;
var Generator = (_a = class {
  constructor() {
    this.chunks = [];
    this.indentLevel = 0;
    this.indentUnit = "  ";
    this.atStartOfLine = true;
  }
  /**
  * Uses spaces for one indent level.
  *
  * Example: `withSpaces(2)` makes each level equal to two spaces.
  */
  withSpaces(spaces) {
    this.indentUnit = " ".repeat(Math.max(0, spaces));
    return this;
  }
  /**
  * Uses one tab character for each indent level.
  */
  withTabs() {
    this.indentUnit = "	";
    return this;
  }
  /**
  * Moves one indentation level deeper for future writes.
  */
  indent() {
    this.indentLevel++;
    return this;
  }
  /**
  * Moves one indentation level up for future writes.
  *
  * If already at zero, it stays at zero.
  */
  dedent() {
    if (this.indentLevel > 0) this.indentLevel--;
    return this;
  }
  /**
  * Writes text exactly as given.
  *
  * It does not add indentation or newlines.
  */
  raw(content) {
    if (content.length === 0) return this;
    this.chunks.push(content);
    this.atStartOfLine = content.endsWith("\n");
    return this;
  }
  /**
  * Writes exactly one newline character.
  */
  break() {
    this.chunks.push("\n");
    this.atStartOfLine = true;
    return this;
  }
  /**
  * Writes text on the current line.
  *
  * It adds indentation only when writing at the start of a line.
  */
  inline(content) {
    if (content.length === 0) return this;
    const sublines = content.split("\n");
    for (let index = 0; index < sublines.length; index++) {
      var _sublines$index;
      const subline = (_sublines$index = sublines[index]) !== null && _sublines$index !== void 0 ? _sublines$index : "";
      if (index > 0) {
        this.chunks.push("\n");
        this.atStartOfLine = true;
      }
      if (subline.length > 0) {
        if (this.atStartOfLine) this.chunks.push(this.indentUnit.repeat(this.indentLevel));
        this.chunks.push(subline);
        this.atStartOfLine = false;
      }
    }
    if (content.endsWith("\n")) this.atStartOfLine = true;
    return this;
  }
  /**
  * Same as `inline` but adds one newline at the end of the content.
  */
  line(content) {
    this.inline(content);
    this.break();
    return this;
  }
  /**
  * Runs a callback one level deeper, then restores the previous level.
  */
  block(run) {
    this.indent();
    try {
      run();
    } finally {
      this.dedent();
    }
    return this;
  }
  /**
  * Returns all generated content as a single string.
  */
  toString() {
    return this.chunks.join("");
  }
}, __name(_a, "Generator"), _a);
function newGenerator() {
  return new Generator();
}
__name(newGenerator, "newGenerator");

// src/shared/comments.ts
var DEFAULT_DEPRECATED_MESSAGE = "This symbol is deprecated and should not be used in new code.";
function getDeprecatedMessage(annotations) {
  const deprecated = ir_exports.getAnnotation(annotations, "deprecated");
  if (!deprecated) {
    return void 0;
  }
  const argument = ir_exports.getAnnotationArg(annotations, "deprecated");
  const unwrapped = argument ? ir_exports.unwrapLiteral(argument) : void 0;
  if (typeof unwrapped === "string" && unwrapped.trim().length > 0) {
    return unwrapped;
  }
  return DEFAULT_DEPRECATED_MESSAGE;
}
__name(getDeprecatedMessage, "getDeprecatedMessage");
function writeDocComment(g, options) {
  const lines = buildDocCommentLines(options);
  writeDocCommentLines(g, lines);
}
__name(writeDocComment, "writeDocComment");
function buildDocCommentLines(options) {
  var _a2, _b, _c;
  const lines = (_c = (_b = (_a2 = options.doc) != null ? _a2 : options.fallback) == null ? void 0 : _b.split("\n")) != null ? _c : [];
  const deprecatedMessage = getDeprecatedMessage(options.annotations);
  if (!deprecatedMessage) return lines;
  if (lines.length === 0) return [`@deprecated ${deprecatedMessage}`];
  return [...lines, "", `@deprecated ${deprecatedMessage}`];
}
__name(buildDocCommentLines, "buildDocCommentLines");
function writeDocCommentLines(g, lines) {
  if (lines.length === 0) return;
  g.line("/**");
  for (const line of lines) {
    g.line(` * ${line}`.replace(/[\t ]+$/u, ""));
  }
  g.line(" */");
}
__name(writeDocCommentLines, "writeDocCommentLines");

// src/shared/render-ts-file.ts
function renderTypeScriptFile(body) {
  const g = newGenerator().withSpaces(2);
  const trimmedBody = body.trim();
  g.line("/* eslint-disable */");
  g.line("/* tslint:disable */");
  g.line("// biome-ignore-all lint: Generated by VDL");
  g.break();
  if (trimmedBody.length > 0) {
    g.raw(trimmedBody);
    g.break();
  }
  return strings_exports.limitBlankLines(g.toString(), 1);
}
__name(renderTypeScriptFile, "renderTypeScriptFile");

// src/shared/naming.ts
function isIdentifierName(value) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value);
}
__name(isIdentifierName, "isIdentifierName");
function renderPropertyName(value) {
  return isIdentifierName(value) ? value : JSON.stringify(value);
}
__name(renderPropertyName, "renderPropertyName");
function renderRecordAccess(recordExpression, key) {
  return `${recordExpression}[${JSON.stringify(key)}]`;
}
__name(renderRecordAccess, "renderRecordAccess");

// src/shared/ts-types.ts
function renderPrimitiveType(primitiveName) {
  switch (primitiveName) {
    case "string":
      return "string";
    case "int":
    case "float":
      return "number";
    case "bool":
      return "boolean";
    case "datetime":
      return "Date";
    default:
      fail(
        "Encountered a primitive type reference without a valid primitive name."
      );
  }
}
__name(renderPrimitiveType, "renderPrimitiveType");
function renderTypeScriptType(typeRef, context) {
  var _a2;
  switch (typeRef.kind) {
    case "primitive":
      return renderPrimitiveType(typeRef.primitiveName);
    case "type":
      return expectValue(
        typeRef.typeName,
        "Encountered a named type reference without a type name."
      );
    case "enum":
      return expectValue(
        typeRef.enumName,
        "Encountered an enum reference without an enum name."
      );
    case "array":
      return `${renderTypeScriptType(getArrayItemType(typeRef), context)}[]`;
    case "map":
      return `Record<string, ${renderTypeScriptType(expectValue(typeRef.mapType, "Encountered a map type reference without a value type."), context)}>`;
    case "object":
      return renderInlineObjectType((_a2 = typeRef.objectFields) != null ? _a2 : [], context);
    default:
      fail(`Unsupported VDL type kind ${JSON.stringify(typeRef.kind)}.`);
  }
}
__name(renderTypeScriptType, "renderTypeScriptType");
function resolveNamedType(typeRef, context, visited = /* @__PURE__ */ new Set()) {
  const typeName = expectValue(
    typeRef.typeName,
    "Encountered a named type reference without a type name."
  );
  if (visited.has(typeName)) {
    fail(`Detected a type cycle while resolving ${JSON.stringify(typeName)}.`);
  }
  visited.add(typeName);
  return expectValue(
    context.typeDefsByName.get(typeName),
    `Unknown VDL type reference ${JSON.stringify(typeName)}.`
  );
}
__name(resolveNamedType, "resolveNamedType");
function resolveNonAliasTypeRef(typeRef, context, visited = /* @__PURE__ */ new Set()) {
  if (typeRef.kind !== "type") {
    return typeRef;
  }
  const typeDef = resolveNamedType(typeRef, context, visited);
  return resolveNonAliasTypeRef(typeDef.typeRef, context, visited);
}
__name(resolveNonAliasTypeRef, "resolveNonAliasTypeRef");
function getArrayItemType(typeRef) {
  var _a2;
  const arrayDims = (_a2 = typeRef.arrayDims) != null ? _a2 : 1;
  const arrayType = expectValue(
    typeRef.arrayType,
    "Encountered an array type reference without an element type."
  );
  if (arrayDims === 1) {
    return arrayType;
  }
  return {
    kind: "array",
    arrayDims: arrayDims - 1,
    arrayType
  };
}
__name(getArrayItemType, "getArrayItemType");
function renderInlineObjectType(fields, context) {
  if (fields.length === 0) {
    return "Record<string, never>";
  }
  const g = newGenerator().withSpaces(2);
  g.line("{");
  g.block(() => {
    for (const field of fields) {
      const optionalSuffix = field.optional ? "?" : "";
      g.line(
        `${renderPropertyName(field.name)}${optionalSuffix}: ${renderTypeScriptType(field.typeRef, context)};`
      );
    }
  });
  g.line("}");
  return g.toString().trim();
}
__name(renderInlineObjectType, "renderInlineObjectType");

// src/shared/ts-literals.ts
function renderLiteralValueExpression(typeRef, literal, context) {
  return renderLiteralValue(typeRef, literal, context, 0);
}
__name(renderLiteralValueExpression, "renderLiteralValueExpression");
function renderLiteralValue(typeRef, literal, context, depth) {
  const resolvedTypeRef = typeRef.kind === "type" ? resolveNonAliasTypeRef(typeRef, context) : typeRef;
  switch (resolvedTypeRef.kind) {
    case "primitive":
      return renderPrimitiveLiteral(resolvedTypeRef.primitiveName, literal);
    case "enum":
      return renderEnumLiteral(literal);
    case "type":
      fail(
        "Named aliases should have been resolved before rendering literals."
      );
      return "";
    case "array":
      return renderArrayLiteral(resolvedTypeRef, literal, context, depth);
    case "map":
      return renderMapLiteral(resolvedTypeRef, literal, context, depth);
    case "object":
      return renderObjectLiteral(resolvedTypeRef, literal, context, depth);
    default:
      fail(
        `Unsupported VDL literal type kind ${JSON.stringify(resolvedTypeRef.kind)}.`
      );
      return "";
  }
}
__name(renderLiteralValue, "renderLiteralValue");
function renderPrimitiveLiteral(primitiveName, literal) {
  switch (primitiveName) {
    case "string":
      return JSON.stringify(
        expectValue(literal.stringValue, "Expected a string literal value.")
      );
    case "int":
      return String(
        expectValue(literal.intValue, "Expected an int literal value.")
      );
    case "float":
      return String(
        expectValue(literal.floatValue, "Expected a float literal value.")
      );
    case "bool":
      return String(
        expectValue(literal.boolValue, "Expected a bool literal value.")
      );
    case "datetime": {
      if (literal.kind !== "string") {
        fail(
          "Datetime literals must be backed by strings in generated TypeScript constants."
        );
      }
      const stringValue = expectValue(
        literal.stringValue,
        "Expected a string-backed datetime literal."
      );
      return `new Date(${JSON.stringify(stringValue)})`;
    }
    default:
      fail("Encountered an unsupported primitive literal type.");
      return "";
  }
}
__name(renderPrimitiveLiteral, "renderPrimitiveLiteral");
function renderEnumLiteral(literal) {
  switch (literal.kind) {
    case "string":
      return JSON.stringify(
        expectValue(
          literal.stringValue,
          "Expected a string enum literal value."
        )
      );
    case "int":
      return String(
        expectValue(literal.intValue, "Expected an int enum literal value.")
      );
    default:
      fail("Enum literals must be string or int values.");
      return "";
  }
}
__name(renderEnumLiteral, "renderEnumLiteral");
function renderArrayLiteral(typeRef, literal, context, depth) {
  var _a2;
  const items = (_a2 = literal.arrayItems) != null ? _a2 : [];
  const itemType = getArrayItemType(typeRef);
  if (items.length === 0) {
    return "[]";
  }
  return [
    "[",
    items.map(
      (item) => indentLiteral(
        renderLiteralValue(itemType, item, context, depth + 1),
        depth + 1
      )
    ).join(",\n"),
    `${indent(depth)}]`
  ].join("\n");
}
__name(renderArrayLiteral, "renderArrayLiteral");
function renderMapLiteral(typeRef, literal, context, depth) {
  var _a2;
  const entries = (_a2 = literal.objectEntries) != null ? _a2 : [];
  const valueType = expectValue(
    typeRef.mapType,
    "Encountered a map type reference without a value type."
  );
  if (entries.length === 0) {
    return "{}";
  }
  return [
    "{",
    entries.map(
      (entry) => renderObjectEntry(
        entry.key,
        renderLiteralValue(valueType, entry.value, context, depth + 1),
        depth + 1
      )
    ).join(",\n"),
    `${indent(depth)}}`
  ].join("\n");
}
__name(renderMapLiteral, "renderMapLiteral");
function renderObjectLiteral(typeRef, literal, context, depth) {
  var _a2, _b, _c;
  const fields = new Map(
    ((_a2 = typeRef.objectFields) != null ? _a2 : []).map((field) => [field.name, field])
  );
  const entries = (_b = literal.objectEntries) != null ? _b : [];
  const renderedEntries = [];
  for (const entry of entries) {
    const field = fields.get(entry.key);
    if (!field) {
      fail(
        `Object literal contains unknown field ${JSON.stringify(entry.key)}.`
      );
    }
    renderedEntries.push(
      renderObjectEntry(
        entry.key,
        renderLiteralValue(field.typeRef, entry.value, context, depth + 1),
        depth + 1
      )
    );
  }
  const missingRequiredField = ((_c = typeRef.objectFields) != null ? _c : []).find(
    (field) => !field.optional && !entries.some((entry) => entry.key === field.name)
  );
  if (missingRequiredField) {
    fail(
      `Object literal is missing required field ${JSON.stringify(missingRequiredField.name)}.`
    );
  }
  if (renderedEntries.length === 0) {
    return "{}";
  }
  return ["{", renderedEntries.join(",\n"), `${indent(depth)}}`].join("\n");
}
__name(renderObjectLiteral, "renderObjectLiteral");
function renderObjectEntry(key, value, depth) {
  const lines = value.split("\n");
  const [firstLine, ...restLines] = lines;
  return [
    `${indent(depth)}${JSON.stringify(key)}: ${firstLine}`,
    ...restLines
  ].join("\n");
}
__name(renderObjectEntry, "renderObjectEntry");
function indentLiteral(value, depth) {
  const [firstLine, ...restLines] = value.split("\n");
  return [`${indent(depth)}${firstLine}`, ...restLines].join("\n");
}
__name(indentLiteral, "indentLiteral");
function indent(depth) {
  return "  ".repeat(depth);
}
__name(indent, "indent");

// src/stages/emit/files/constants.ts
function generateConstantsFile(context) {
  if (!context.options.genConsts || context.constants.length === 0) {
    return void 0;
  }
  const g = newGenerator().withSpaces(2);
  for (const constant of context.constants) {
    writeDocComment(g, {
      doc: constant.def.doc,
      annotations: constant.def.annotations,
      fallback: `${constant.def.name} holds a generated VDL constant.`
    });
    g.line(
      `export const ${constant.def.name} = ${renderLiteralValueExpression(constant.typeRef, constant.def.value, context)} as const;`
    );
    g.break();
  }
  return {
    path: "constants.ts",
    content: renderTypeScriptFile(g.toString())
  };
}
__name(generateConstantsFile, "generateConstantsFile");

// src/stages/emit/files/enums.ts
function generateEnumsFile(context) {
  if (context.schema.enums.length === 0) {
    return void 0;
  }
  const g = newGenerator().withSpaces(2);
  for (const enumDef of context.schema.enums) {
    renderEnum(g, enumDef, context.options.strict);
    g.break();
  }
  g.break();
  renderEnumRuntimeHelpers(g);
  return {
    path: "enums.ts",
    content: renderTypeScriptFile(g.toString())
  };
}
__name(generateEnumsFile, "generateEnumsFile");
function renderEnum(g, enumDef, strict) {
  writeDocComment(g, {
    doc: enumDef.doc,
    annotations: enumDef.annotations,
    fallback: `${enumDef.name} declares a generated VDL enum.`
  });
  if (enumDef.members.length === 0) {
    g.line(`export type ${enumDef.name} = never;`);
  } else {
    g.line(
      `export type ${enumDef.name} = ${enumDef.members.map((member) => renderEnumMemberLiteral(member.value)).join(" | ")};`
    );
  }
  g.break();
  writeDocComment(g, {
    fallback: `${enumDef.name} exposes the generated enum values and runtime helpers for ${enumDef.name}.`
  });
  g.line(`export const ${enumDef.name} = {`);
  g.block(() => {
    renderEnumMembers(g, enumDef);
    g.break();
    writeDocComment(g, {
      fallback: `Returns every declared ${enumDef.name} value in definition order.`
    });
    g.line(`values(): ${enumDef.name}[] {`);
    g.block(() => {
      g.line(`return ${renderEnumValuesExpression(enumDef)};`);
    });
    g.line("},");
    g.break();
    writeDocComment(g, {
      fallback: strict ? `Parses a JSON string into a validated and hydrated ${enumDef.name} value.` : `Parses a JSON string and hydrates it as ${enumDef.name} without runtime validation.`
    });
    g.line(`parse(json: string): ${enumDef.name} {`);
    g.block(() => {
      g.line("const input = _vdl.parseJson(json);");
      if (strict) {
        g.line(`const error = ${enumDef.name}.validate(input);`);
        g.line("if (error !== null) {");
        g.block(() => {
          g.line("throw new Error(error);");
        });
        g.line("}");
      }
      g.line(`return ${enumDef.name}.hydrate(input as ${enumDef.name});`);
    });
    g.line("},");
    if (strict) {
      g.break();
      writeDocComment(g, {
        fallback: `Performs structural enum validation only (membership in ${enumDef.name}); it does not enforce business rules.`
      });
      g.line(
        `validate(input: unknown, path = ${JSON.stringify(enumDef.name)}): string | null {`
      );
      g.block(() => {
        g.line(
          `if (!${enumDef.name}.values().includes(input as ${enumDef.name})) {`
        );
        g.block(() => {
          g.line(
            `return \`\${path}: invalid value "\${String(input)}" for ${enumDef.name} enum\`;`
          );
        });
        g.line("}");
        g.line("return null;");
      });
      g.line("},");
      g.break();
    } else {
      g.break();
    }
    writeDocComment(g, {
      fallback: `Hydrates a validated ${enumDef.name} value. Enums return the input unchanged to keep the generated API uniform.`
    });
    g.line(`hydrate(input: ${enumDef.name}): ${enumDef.name} {`);
    g.block(() => {
      g.line("return input;");
    });
    g.line("},");
  });
  g.line("} as const;");
}
__name(renderEnum, "renderEnum");
function renderEnumMembers(g, enumDef) {
  for (const [index, member] of enumDef.members.entries()) {
    writeDocComment(g, {
      doc: member.doc,
      annotations: member.annotations,
      fallback: `Represents the ${member.name} member of the ${enumDef.name} enum.`
    });
    g.line(
      `${renderPropertyName(member.name)}: ${renderEnumMemberLiteral(member.value)} as ${enumDef.name},`
    );
    if (index < enumDef.members.length - 1) {
      g.break();
    }
  }
}
__name(renderEnumMembers, "renderEnumMembers");
function renderEnumRuntimeHelpers(g) {
  writeDocComment(g, {
    fallback: "Internal helpers shared by the generated enum namespaces in this file."
  });
  g.line("const _vdl = {");
  g.block(() => {
    writeDocComment(g, {
      fallback: "Parses JSON text and wraps syntax failures in a stable generated error message."
    });
    g.line("parseJson(json: string): unknown {");
    g.block(() => {
      g.line("try {");
      g.block(() => {
        g.line("return JSON.parse(json);");
      });
      g.line("} catch (error) {");
      g.block(() => {
        g.line(
          "const message = error instanceof Error ? error.message : String(error);"
        );
        g.line(`throw new Error(\`Invalid JSON input: \${message}\`);`);
      });
      g.line("}");
    });
    g.line("},");
  });
  g.line("} as const;");
}
__name(renderEnumRuntimeHelpers, "renderEnumRuntimeHelpers");
function renderEnumValuesExpression(enumDef) {
  return `[${enumDef.members.map((member) => renderEnumMemberLiteral(member.value)).join(", ")}]`;
}
__name(renderEnumValuesExpression, "renderEnumValuesExpression");
function renderEnumMemberLiteral(value) {
  if (value.kind === "string") {
    return JSON.stringify(value.stringValue);
  }
  return String(value.intValue);
}
__name(renderEnumMemberLiteral, "renderEnumMemberLiteral");

// src/shared/imports.ts
var IMPORT_EXTENSION_VALUES = ["none", "js", "ts"];
function formatImportPath(path, importExtension) {
  if (importExtension === "none") {
    return path;
  }
  return `${path}.${importExtension}`;
}
__name(formatImportPath, "formatImportPath");
function renderExportAll(path, importExtension) {
  return `export * from ${JSON.stringify(formatImportPath(path, importExtension))};`;
}
__name(renderExportAll, "renderExportAll");

// src/stages/emit/files/index.ts
function generateIndexFile(context) {
  const lines = [];
  if (context.schema.enums.length > 0) {
    lines.push(renderExportAll("./enums", context.options.importExtension));
  }
  if (context.exportedTypes.length > 0) {
    lines.push(renderExportAll("./types", context.options.importExtension));
  }
  if (context.options.genConsts && context.constants.length > 0) {
    lines.push(renderExportAll("./constants", context.options.importExtension));
  }
  if (lines.length === 0) {
    lines.push("export {};");
  }
  return {
    path: "index.ts",
    content: renderTypeScriptFile(lines.join("\n"))
  };
}
__name(generateIndexFile, "generateIndexFile");

// src/stages/emit/files/types.ts
function generateTypesFile(context) {
  if (context.exportedTypes.length === 0) {
    return void 0;
  }
  const g = newGenerator().withSpaces(2);
  if (context.schema.enums.length > 0) {
    g.line(
      `import { ${context.schema.enums.map((enumDef) => enumDef.name).join(", ")} } from ${JSON.stringify(formatImportPath("./enums", context.options.importExtension))};`
    );
    g.break();
  }
  for (const typeDef of context.exportedTypes) {
    renderNamedType(g, typeDef, context);
    g.break();
  }
  g.break();
  renderRuntimeHelpers(g, context.options.strict);
  return {
    path: "types.ts",
    content: renderTypeScriptFile(g.toString())
  };
}
__name(generateTypesFile, "generateTypesFile");
function renderNamedType(g, typeDef, context) {
  writeDocComment(g, {
    doc: typeDef.doc,
    annotations: typeDef.annotations,
    fallback: typeDef.typeRef.kind === "object" ? `${typeDef.name} represents a generated VDL object.` : `${typeDef.name} represents a generated VDL type alias.`
  });
  renderTypeDeclaration(g, typeDef, context);
  g.break();
  writeDocComment(g, {
    fallback: `${typeDef.name} exposes the generated runtime helpers for ${typeDef.name}.`
  });
  renderTypeNamespace(g, typeDef, context.options.strict);
}
__name(renderNamedType, "renderNamedType");
function renderTypeDeclaration(g, typeDef, context) {
  if (typeDef.typeRef.kind !== "object") {
    g.line(
      `export type ${typeDef.name} = ${renderTypeScriptType(typeDef.typeRef, context)};`
    );
    return;
  }
  g.line(`export type ${typeDef.name} = {`);
  g.block(() => {
    var _a2;
    for (const field of (_a2 = typeDef.typeRef.objectFields) != null ? _a2 : []) {
      writeDocComment(g, {
        doc: field.doc,
        annotations: field.annotations
      });
      g.line(
        `${renderPropertyName(field.name)}${field.optional ? "?" : ""}: ${renderTypeScriptType(field.typeRef, context)};`
      );
    }
  });
  g.line("};");
}
__name(renderTypeDeclaration, "renderTypeDeclaration");
function renderTypeNamespace(g, typeDef, strict) {
  g.line(`export const ${typeDef.name} = {`);
  g.block(() => {
    writeDocComment(g, {
      fallback: strict ? `Parses a JSON string into a validated and hydrated ${typeDef.name} value.` : `Parses a JSON string and hydrates it as ${typeDef.name} without runtime validation.`
    });
    g.line(`parse(json: string): ${typeDef.name} {`);
    g.block(() => {
      g.line("const input = _vdl.parseJson(json);");
      if (strict) {
        g.line(`const error = ${typeDef.name}.validate(input);`);
        g.line("if (error !== null) {");
        g.block(() => {
          g.line("throw new Error(error);");
        });
        g.line("}");
      }
      g.line(`return ${typeDef.name}.hydrate(input as ${typeDef.name});`);
    });
    g.line("},");
    if (strict) {
      g.break();
      writeDocComment(g, {
        fallback: `Performs structural validation for ${typeDef.name} (required field presence and basic type shape only); it does not enforce business rules.`
      });
      g.line(
        `validate(input: unknown, path = ${JSON.stringify(typeDef.name)}): string | null {`
      );
      g.block(() => {
        writeValidationStatements(g, {
          typeRef: typeDef.typeRef,
          valueExpression: "input",
          pathExpression: "path",
          depth: 0
        });
        g.line("return null;");
      });
      g.line("},");
      g.break();
    } else {
      g.break();
    }
    writeDocComment(g, {
      fallback: `Hydrates a validated ${typeDef.name} value into its runtime representation.`
    });
    g.line(`hydrate(input: ${typeDef.name}): ${typeDef.name} {`);
    g.block(() => {
      g.line(
        `return ${renderHydrationExpression(typeDef.typeRef, "input", 0)};`
      );
    });
    g.line("},");
  });
  g.line("} as const;");
}
__name(renderTypeNamespace, "renderTypeNamespace");
function renderHydrationExpression(typeRef, valueExpression, depth) {
  var _a2;
  switch (typeRef.kind) {
    case "primitive":
      return typeRef.primitiveName === "datetime" ? `_vdl.hydrateDateInput(${valueExpression})` : valueExpression;
    case "enum":
      return `${typeRef.enumName}.hydrate(${valueExpression})`;
    case "type":
      return `${typeRef.typeName}.hydrate(${valueExpression})`;
    case "array": {
      const itemName = `item${depth}`;
      return `${valueExpression}.map((${itemName}) => ${renderHydrationExpression(getArrayItemType(typeRef), itemName, depth + 1)})`;
    }
    case "map": {
      const keyName = `key${depth}`;
      const mapValueName = `value${depth}`;
      return `Object.fromEntries(Object.entries(${valueExpression}).map(([${keyName}, ${mapValueName}]) => [${keyName}, ${renderHydrationExpression(typeRef.mapType, mapValueName, depth + 1)}]))`;
    }
    case "object": {
      if (((_a2 = typeRef.objectFields) != null ? _a2 : []).length === 0) {
        return "{}";
      }
      const objectGenerator = newGenerator().withSpaces(2);
      objectGenerator.line("{");
      objectGenerator.block(() => {
        var _a3;
        for (const field of (_a3 = typeRef.objectFields) != null ? _a3 : []) {
          const accessExpression = renderValueAccess(
            valueExpression,
            field.name
          );
          const hydratedValue = renderHydrationExpression(
            field.typeRef,
            accessExpression,
            depth + 1
          );
          const finalValue = field.optional ? `${accessExpression} === undefined ? undefined : ${hydratedValue}` : hydratedValue;
          objectGenerator.line(
            `${renderPropertyName(field.name)}: ${finalValue},`
          );
        }
      });
      objectGenerator.line("}");
      return objectGenerator.toString().trim();
    }
    default:
      return valueExpression;
  }
}
__name(renderHydrationExpression, "renderHydrationExpression");
function writeValidationStatements(g, options) {
  var _a2, _b;
  switch (options.typeRef.kind) {
    case "primitive":
      writePrimitiveValidation(
        g,
        options.typeRef,
        options.valueExpression,
        options.pathExpression
      );
      return;
    case "enum":
      g.line("{");
      g.block(() => {
        g.line(
          `const error = ${options.typeRef.enumName}.validate(${options.valueExpression}, ${options.pathExpression});`
        );
        g.line("if (error !== null) {");
        g.block(() => {
          g.line("return error;");
        });
        g.line("}");
      });
      g.line("}");
      return;
    case "type":
      g.line("{");
      g.block(() => {
        g.line(
          `const error = ${options.typeRef.typeName}.validate(${options.valueExpression}, ${options.pathExpression});`
        );
        g.line("if (error !== null) {");
        g.block(() => {
          g.line("return error;");
        });
        g.line("}");
      });
      g.line("}");
      return;
    case "array": {
      const itemType = getArrayItemType(options.typeRef);
      const indexName = `index${options.depth}`;
      const itemPathName = `itemPath${options.depth}`;
      g.line(`if (!Array.isArray(${options.valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${options.pathExpression}}: expected array, got \${_vdl.describeValue(${options.valueExpression})}\`;`
        );
      });
      g.line("}");
      g.line(
        `for (let ${indexName} = 0; ${indexName} < ${options.valueExpression}.length; ${indexName} += 1) {`
      );
      g.block(() => {
        g.line(
          `const ${itemPathName} = \`\${${options.pathExpression}}[\${${indexName}}]\`;`
        );
        writeValidationStatements(g, {
          typeRef: itemType,
          valueExpression: `${options.valueExpression}[${indexName}]`,
          pathExpression: itemPathName,
          depth: options.depth + 1
        });
      });
      g.line("}");
      return;
    }
    case "map": {
      const keyName = `key${options.depth}`;
      const valueName = `value${options.depth}`;
      const valuePathName = `valuePath${options.depth}`;
      g.line(`if (!_vdl.isRecord(${options.valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${options.pathExpression}}: expected object, got \${_vdl.describeValue(${options.valueExpression})}\`;`
        );
      });
      g.line("}");
      g.line(
        `for (const [${keyName}, ${valueName}] of Object.entries(${options.valueExpression})) {`
      );
      g.block(() => {
        g.line(
          `const ${valuePathName} = \`\${${options.pathExpression}}[\${JSON.stringify(${keyName})}]\`;`
        );
        writeValidationStatements(g, {
          typeRef: typeRefMapValue(options.typeRef),
          valueExpression: valueName,
          pathExpression: valuePathName,
          depth: options.depth + 1
        });
      });
      g.line("}");
      return;
    }
    case "object": {
      const recordName = `record${options.depth}`;
      g.line(`if (!_vdl.isRecord(${options.valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${options.pathExpression}}: expected object, got \${_vdl.describeValue(${options.valueExpression})}\`;`
        );
      });
      g.line("}");
      g.line(
        `const ${recordName} = ${options.valueExpression} as Record<string, unknown>;`
      );
      for (let fieldIndex = 0; fieldIndex < ((_a2 = options.typeRef.objectFields) != null ? _a2 : []).length; fieldIndex += 1) {
        const field = (_b = options.typeRef.objectFields) == null ? void 0 : _b[fieldIndex];
        const fieldPathName = `fieldPath${options.depth}_${fieldIndex}`;
        const fieldValueExpression = renderRecordAccess(recordName, field.name);
        g.line(
          `const ${fieldPathName} = \`\${${options.pathExpression}}.${field.name}\`;`
        );
        if (!field.optional) {
          g.line(
            `if (!_vdl.hasOwn(${recordName}, ${JSON.stringify(field.name)}) || ${fieldValueExpression} === undefined) {`
          );
          g.block(() => {
            g.line(
              `return \`\${${fieldPathName}}: required field is missing\`;`
            );
          });
          g.line("}");
          writeValidationStatements(g, {
            typeRef: field.typeRef,
            valueExpression: fieldValueExpression,
            pathExpression: fieldPathName,
            depth: options.depth + 1
          });
          continue;
        }
        g.line(
          `if (_vdl.hasOwn(${recordName}, ${JSON.stringify(field.name)}) && ${fieldValueExpression} !== undefined) {`
        );
        g.block(() => {
          writeValidationStatements(g, {
            typeRef: field.typeRef,
            valueExpression: fieldValueExpression,
            pathExpression: fieldPathName,
            depth: options.depth + 1
          });
        });
        g.line("}");
      }
      return;
    }
    default:
      return;
  }
}
__name(writeValidationStatements, "writeValidationStatements");
function writePrimitiveValidation(g, typeRef, valueExpression, pathExpression) {
  switch (typeRef.primitiveName) {
    case "string":
      g.line(`if (typeof ${valueExpression} !== "string") {`);
      g.block(() => {
        g.line(
          `return \`\${${pathExpression}}: expected string, got \${_vdl.describeValue(${valueExpression})}\`;`
        );
      });
      g.line("}");
      return;
    case "int":
    case "float":
      g.line(
        `if (typeof ${valueExpression} !== "number" || !Number.isFinite(${valueExpression})) {`
      );
      g.block(() => {
        g.line(
          `return \`\${${pathExpression}}: expected number, got \${_vdl.describeValue(${valueExpression})}\`;`
        );
      });
      g.line("}");
      return;
    case "bool":
      g.line(`if (typeof ${valueExpression} !== "boolean") {`);
      g.block(() => {
        g.line(
          `return \`\${${pathExpression}}: expected boolean, got \${_vdl.describeValue(${valueExpression})}\`;`
        );
      });
      g.line("}");
      return;
    case "datetime":
      g.line(`if (!_vdl.isValidDateInput(${valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${pathExpression}}: expected datetime string or Date, got \${_vdl.describeValue(${valueExpression})}\`;`
        );
      });
      g.line("}");
      return;
    default:
      return;
  }
}
__name(writePrimitiveValidation, "writePrimitiveValidation");
function renderRuntimeHelpers(g, strict) {
  writeDocComment(g, {
    fallback: "Internal helpers shared by the generated runtime namespaces in this file."
  });
  g.line("const _vdl = {");
  g.block(() => {
    writeDocComment(g, {
      fallback: "Parses JSON text and wraps syntax failures in a stable generated error message."
    });
    g.line("parseJson(json: string): unknown {");
    g.block(() => {
      g.line("try {");
      g.block(() => {
        g.line("return JSON.parse(json);");
      });
      g.line("} catch (error) {");
      g.block(() => {
        g.line(
          "const message = error instanceof Error ? error.message : String(error);"
        );
        g.line(`throw new Error(\`Invalid JSON input: \${message}\`);`);
      });
      g.line("}");
    });
    g.line("},");
    g.break();
    if (strict) {
      writeDocComment(g, {
        fallback: "Checks whether a value can be validated as a plain object record."
      });
      g.line("isRecord(value: unknown): value is Record<string, unknown> {");
      g.block(() => {
        g.line(
          'return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Date);'
        );
      });
      g.line("},");
      g.break();
      writeDocComment(g, {
        fallback: "Checks whether a record defines a property directly on the current object."
      });
      g.line("hasOwn(record: Record<string, unknown>, key: string): boolean {");
      g.block(() => {
        g.line("return Object.prototype.hasOwnProperty.call(record, key);");
      });
      g.line("},");
      g.break();
      writeDocComment(g, {
        fallback: "Describes an input value using the categories reported by generated validation errors."
      });
      g.line("describeValue(value: unknown): string {");
      g.block(() => {
        g.line("if (value === null) {");
        g.block(() => {
          g.line('return "null";');
        });
        g.line("}");
        g.line("if (Array.isArray(value)) {");
        g.block(() => {
          g.line('return "array";');
        });
        g.line("}");
        g.line("if (value instanceof Date) {");
        g.block(() => {
          g.line('return "Date";');
        });
        g.line("}");
        g.line("return typeof value;");
      });
      g.line("},");
      g.break();
      writeDocComment(g, {
        fallback: "Checks whether an input can be hydrated into a valid Date instance."
      });
      g.line("isValidDateInput(value: unknown): value is string | Date {");
      g.block(() => {
        g.line("if (value instanceof Date) {");
        g.block(() => {
          g.line("return !Number.isNaN(value.getTime());");
        });
        g.line("}");
        g.line('if (typeof value !== "string") {');
        g.block(() => {
          g.line("return false;");
        });
        g.line("}");
        g.line("return !Number.isNaN(new Date(value).getTime());");
      });
      g.line("},");
      g.break();
    }
    writeDocComment(g, {
      fallback: "Hydrates a string or Date input into a fresh Date instance."
    });
    g.line("hydrateDateInput(value: string | Date): Date {");
    g.block(() => {
      g.line(
        "return value instanceof Date ? new Date(value.getTime()) : new Date(value);"
      );
    });
    g.line("},");
  });
  g.line("} as const;");
}
__name(renderRuntimeHelpers, "renderRuntimeHelpers");
function typeRefMapValue(typeRef) {
  return typeRef.mapType;
}
__name(typeRefMapValue, "typeRefMapValue");
function renderValueAccess(expression, key) {
  return isIdentifierName(key) ? `${expression}.${key}` : renderRecordAccess(expression, key);
}
__name(renderValueAccess, "renderValueAccess");

// src/stages/emit/generate-files.ts
function generateFiles(context) {
  return arrays_exports.compact([
    generateEnumsFile(context),
    generateTypesFile(context),
    generateConstantsFile(context),
    generateIndexFile(context)
  ]);
}
__name(generateFiles, "generateFiles");

// src/stages/model/constants.ts
function buildConstantDescriptors(options) {
  var _a2;
  const inferredTypes = /* @__PURE__ */ new Map();
  for (const typeDef of options.schema.types) {
    if (!typeDef.name.startsWith("$Const") || typeDef.name.length <= 6) {
      continue;
    }
    inferredTypes.set(toConstLookupKey(typeDef.name.slice(6)), typeDef.typeRef);
  }
  const constants = [];
  const errors = [];
  for (const constant of options.schema.constants) {
    const inferredType = inferredTypes.get(toConstLookupKey(constant.name));
    if (inferredType) {
      constants.push({ def: constant, typeRef: inferredType });
      continue;
    }
    const inference = inferTypeRefFromLiteral(constant.value);
    if (!inference.typeRef) {
      errors.push({
        message: `Could not infer a TypeScript type for constant ${JSON.stringify(constant.name)}: ${(_a2 = inference.error) != null ? _a2 : "unknown inference failure"}`,
        position: constant.position
      });
      continue;
    }
    constants.push({
      def: constant,
      typeRef: inference.typeRef
    });
  }
  return {
    constants,
    errors
  };
}
__name(buildConstantDescriptors, "buildConstantDescriptors");
function inferTypeRefFromLiteral(literal) {
  var _a2, _b;
  switch (literal.kind) {
    case "string":
      return { typeRef: { kind: "primitive", primitiveName: "string" } };
    case "int":
      return { typeRef: { kind: "primitive", primitiveName: "int" } };
    case "float":
      return { typeRef: { kind: "primitive", primitiveName: "float" } };
    case "bool":
      return { typeRef: { kind: "primitive", primitiveName: "bool" } };
    case "array":
      return inferArrayTypeRef((_a2 = literal.arrayItems) != null ? _a2 : []);
    case "object":
      return inferObjectTypeRef((_b = literal.objectEntries) != null ? _b : []);
    default:
      return { error: "unsupported literal kind" };
  }
}
__name(inferTypeRefFromLiteral, "inferTypeRefFromLiteral");
function inferArrayTypeRef(items) {
  if (items.length === 0) {
    return {
      error: "array literals cannot be empty when no declared constant type is available"
    };
  }
  const first = items[0];
  if (!first) {
    return { error: "encountered an undefined array item literal" };
  }
  const firstInference = inferTypeRefFromLiteral(first);
  if (!firstInference.typeRef) {
    return firstInference;
  }
  for (let index = 1; index < items.length; index += 1) {
    const candidateItem = items[index];
    if (!candidateItem) {
      return { error: "encountered an undefined array item literal" };
    }
    const candidate = inferTypeRefFromLiteral(candidateItem);
    if (!candidate.typeRef) {
      return candidate;
    }
    if (!areTypeRefsEquivalent(firstInference.typeRef, candidate.typeRef)) {
      return {
        error: `array literal item at index ${String(index)} does not match the inferred element type`
      };
    }
  }
  return {
    typeRef: {
      kind: "array",
      arrayDims: 1,
      arrayType: firstInference.typeRef
    }
  };
}
__name(inferArrayTypeRef, "inferArrayTypeRef");
function inferObjectTypeRef(entries) {
  const fields = [];
  for (const entry of entries) {
    const inference = inferTypeRefFromLiteral(entry.value);
    if (!inference.typeRef) {
      return inference;
    }
    fields.push({
      position: entry.position,
      name: entry.key,
      doc: void 0,
      optional: false,
      annotations: [],
      typeRef: inference.typeRef
    });
  }
  return {
    typeRef: {
      kind: "object",
      objectFields: fields
    }
  };
}
__name(inferObjectTypeRef, "inferObjectTypeRef");
function areTypeRefsEquivalent(left, right) {
  var _a2, _b, _c, _d;
  if (left.kind !== right.kind) {
    return false;
  }
  switch (left.kind) {
    case "primitive":
      return left.primitiveName === right.primitiveName;
    case "type":
      return left.typeName === right.typeName;
    case "enum":
      return left.enumName === right.enumName && left.enumType === right.enumType;
    case "array":
      return ((_a2 = left.arrayDims) != null ? _a2 : 1) === ((_b = right.arrayDims) != null ? _b : 1) && areTypeRefsEquivalent(
        left.arrayType,
        right.arrayType
      );
    case "map":
      return areTypeRefsEquivalent(
        left.mapType,
        right.mapType
      );
    case "object": {
      const leftFields = (_c = left.objectFields) != null ? _c : [];
      const rightFields = (_d = right.objectFields) != null ? _d : [];
      if (leftFields.length !== rightFields.length) {
        return false;
      }
      for (let index = 0; index < leftFields.length; index += 1) {
        const leftField = leftFields[index];
        const rightField = rightFields[index];
        if (!leftField || !rightField) {
          return false;
        }
        if (leftField.name !== rightField.name || leftField.optional !== rightField.optional || !areTypeRefsEquivalent(leftField.typeRef, rightField.typeRef)) {
          return false;
        }
      }
      return true;
    }
    default:
      return false;
  }
}
__name(areTypeRefsEquivalent, "areTypeRefsEquivalent");
function toConstLookupKey(name) {
  return strings_exports.words(name).join("").toLowerCase();
}
__name(toConstLookupKey, "toConstLookupKey");

// src/stages/model/build-context.ts
function createGeneratorContext(options) {
  const schema = ir_exports.hoistAnonymousTypes(options.input.ir);
  const constantResult = buildConstantDescriptors({ schema });
  const typeDefsByName = new Map(
    schema.types.map((typeDef) => [typeDef.name, typeDef])
  );
  const enumDefsByName = new Map(
    schema.enums.map((enumDef) => [enumDef.name, enumDef])
  );
  const exportedTypes = schema.types.filter(
    (typeDef) => !typeDef.name.startsWith("$Const")
  );
  const errors = [...constantResult.errors];
  if (errors.length > 0) {
    return {
      errors
    };
  }
  return {
    errors: [],
    context: {
      schema,
      options: options.generatorOptions,
      typeDefsByName,
      enumDefsByName,
      exportedTypes,
      constants: constantResult.constants
    }
  };
}
__name(createGeneratorContext, "createGeneratorContext");

// src/stages/options/resolve.ts
function resolveGeneratorOptions(input) {
  const genConsts = options_exports.getOptionBool(input.options, "genConsts", true);
  const strict = options_exports.getOptionBool(input.options, "strict", true);
  const importExtension = options_exports.getOptionEnum(
    input.options,
    "importExtension",
    IMPORT_EXTENSION_VALUES,
    "js"
  );
  return {
    errors: [],
    options: {
      genConsts,
      strict,
      importExtension
    }
  };
}
__name(resolveGeneratorOptions, "resolveGeneratorOptions");

// src/generate.ts
function generate(input) {
  try {
    const optionsResult = resolveGeneratorOptions(input);
    if (optionsResult.errors.length > 0 || !optionsResult.options) {
      return {
        errors: optionsResult.errors
      };
    }
    const contextResult = createGeneratorContext({
      input,
      generatorOptions: optionsResult.options
    });
    if (contextResult.errors.length > 0 || !contextResult.context) {
      return {
        errors: contextResult.errors
      };
    }
    return {
      files: generateFiles(contextResult.context)
    };
  } catch (error) {
    return {
      errors: [toPluginOutputError(error)]
    };
  }
}
__name(generate, "generate");

// src/index.ts
var generate2 = definePlugin((input) => generate(input));
