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

// node_modules/@varavel/vdl-plugin-sdk/dist/core/define-plugin.js
function definePlugin(handler) {
  return handler;
}
__name(definePlugin, "definePlugin");

// node_modules/@varavel/vdl-plugin-sdk/dist/core/types/enums.js
var EnumValueType = {
  String: "string",
  Int: "int",
  values() {
    return ["string", "int"];
  },
  parse(json) {
    const input = _vdl.parseJson(json);
    const error = EnumValueType.validate(input);
    if (error !== null) throw new Error(error);
    return EnumValueType.hydrate(input);
  },
  validate(input, path = "EnumValueType") {
    if (!_vdl.arrayIncludes(EnumValueType.values(), input)) return `${path}: invalid value "${String(input)}" for EnumValueType enum`;
    return null;
  },
  hydrate(input) {
    return input;
  }
};
var LiteralKind = {
  String: "string",
  Int: "int",
  Float: "float",
  Bool: "bool",
  Object: "object",
  Array: "array",
  values() {
    return [
      "string",
      "int",
      "float",
      "bool",
      "object",
      "array"
    ];
  },
  parse(json) {
    const input = _vdl.parseJson(json);
    const error = LiteralKind.validate(input);
    if (error !== null) throw new Error(error);
    return LiteralKind.hydrate(input);
  },
  validate(input, path = "LiteralKind") {
    if (!_vdl.arrayIncludes(LiteralKind.values(), input)) return `${path}: invalid value "${String(input)}" for LiteralKind enum`;
    return null;
  },
  hydrate(input) {
    return input;
  }
};
var PrimitiveType = {
  String: "string",
  Int: "int",
  Float: "float",
  Bool: "bool",
  Datetime: "datetime",
  values() {
    return [
      "string",
      "int",
      "float",
      "bool",
      "datetime"
    ];
  },
  parse(json) {
    const input = _vdl.parseJson(json);
    const error = PrimitiveType.validate(input);
    if (error !== null) throw new Error(error);
    return PrimitiveType.hydrate(input);
  },
  validate(input, path = "PrimitiveType") {
    if (!_vdl.arrayIncludes(PrimitiveType.values(), input)) return `${path}: invalid value "${String(input)}" for PrimitiveType enum`;
    return null;
  },
  hydrate(input) {
    return input;
  }
};
var TypeKind = {
  Primitive: "primitive",
  Type: "type",
  Enum: "enum",
  Array: "array",
  Map: "map",
  Object: "object",
  values() {
    return [
      "primitive",
      "type",
      "enum",
      "array",
      "map",
      "object"
    ];
  },
  parse(json) {
    const input = _vdl.parseJson(json);
    const error = TypeKind.validate(input);
    if (error !== null) throw new Error(error);
    return TypeKind.hydrate(input);
  },
  validate(input, path = "TypeKind") {
    if (!_vdl.arrayIncludes(TypeKind.values(), input)) return `${path}: invalid value "${String(input)}" for TypeKind enum`;
    return null;
  },
  hydrate(input) {
    return input;
  }
};
var _vdl = {
  parseJson(json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Invalid JSON input: ${message}`);
    }
  },
  arrayIncludes(values, value) {
    for (let index = 0; index < values.length; index += 1) if (values[index] === value) return true;
    return false;
  }
};

// node_modules/@varavel/vdl-plugin-sdk/dist/core/types/types.js
var Annotation = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = Annotation.validate(input);
    if (error !== null) throw new Error(error);
    return Annotation.hydrate(input);
  },
  validate(input, path = "Annotation") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.position`;
    if (!_vdl2.hasOwn(record0, "position") || record0["position"] === void 0) return `${fieldPath0_0}: required field is missing`;
    {
      const error = Position.validate(record0["position"], fieldPath0_0);
      if (error !== null) return error;
    }
    const fieldPath0_1 = `${path}.name`;
    if (!_vdl2.hasOwn(record0, "name") || record0["name"] === void 0) return `${fieldPath0_1}: required field is missing`;
    if (typeof record0["name"] !== "string") return `${fieldPath0_1}: expected string, got ${_vdl2.describeValue(record0["name"])}`;
    const fieldPath0_2 = `${path}.argument`;
    if (_vdl2.hasOwn(record0, "argument") && record0["argument"] !== void 0) {
      const error = LiteralValue.validate(record0["argument"], fieldPath0_2);
      if (error !== null) return error;
    }
    return null;
  },
  hydrate(input) {
    return _vdl2.withOptional({
      position: Position.hydrate(input.position),
      name: input.name
    }, "argument", input.argument === void 0 ? void 0 : LiteralValue.hydrate(input.argument));
  }
};
var ConstantDef = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = ConstantDef.validate(input);
    if (error !== null) throw new Error(error);
    return ConstantDef.hydrate(input);
  },
  validate(input, path = "ConstantDef") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.position`;
    if (!_vdl2.hasOwn(record0, "position") || record0["position"] === void 0) return `${fieldPath0_0}: required field is missing`;
    {
      const error = Position.validate(record0["position"], fieldPath0_0);
      if (error !== null) return error;
    }
    const fieldPath0_1 = `${path}.name`;
    if (!_vdl2.hasOwn(record0, "name") || record0["name"] === void 0) return `${fieldPath0_1}: required field is missing`;
    if (typeof record0["name"] !== "string") return `${fieldPath0_1}: expected string, got ${_vdl2.describeValue(record0["name"])}`;
    const fieldPath0_2 = `${path}.doc`;
    if (_vdl2.hasOwn(record0, "doc") && record0["doc"] !== void 0) {
      if (typeof record0["doc"] !== "string") return `${fieldPath0_2}: expected string, got ${_vdl2.describeValue(record0["doc"])}`;
    }
    const fieldPath0_3 = `${path}.annotations`;
    if (!_vdl2.hasOwn(record0, "annotations") || record0["annotations"] === void 0) return `${fieldPath0_3}: required field is missing`;
    if (!Array.isArray(record0["annotations"])) return `${fieldPath0_3}: expected array, got ${_vdl2.describeValue(record0["annotations"])}`;
    for (let index1 = 0; index1 < record0["annotations"].length; index1 += 1) {
      const itemPath1 = `${fieldPath0_3}[${index1}]`;
      {
        const error = Annotation.validate(record0["annotations"][index1], itemPath1);
        if (error !== null) return error;
      }
    }
    const fieldPath0_4 = `${path}.value`;
    if (!_vdl2.hasOwn(record0, "value") || record0["value"] === void 0) return `${fieldPath0_4}: required field is missing`;
    {
      const error = LiteralValue.validate(record0["value"], fieldPath0_4);
      if (error !== null) return error;
    }
    return null;
  },
  hydrate(input) {
    return _vdl2.withOptional({
      position: Position.hydrate(input.position),
      name: input.name,
      annotations: input.annotations.map((item1) => Annotation.hydrate(item1)),
      value: LiteralValue.hydrate(input.value)
    }, "doc", input.doc === void 0 ? void 0 : input.doc);
  }
};
var EnumDef = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = EnumDef.validate(input);
    if (error !== null) throw new Error(error);
    return EnumDef.hydrate(input);
  },
  validate(input, path = "EnumDef") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.position`;
    if (!_vdl2.hasOwn(record0, "position") || record0["position"] === void 0) return `${fieldPath0_0}: required field is missing`;
    {
      const error = Position.validate(record0["position"], fieldPath0_0);
      if (error !== null) return error;
    }
    const fieldPath0_1 = `${path}.name`;
    if (!_vdl2.hasOwn(record0, "name") || record0["name"] === void 0) return `${fieldPath0_1}: required field is missing`;
    if (typeof record0["name"] !== "string") return `${fieldPath0_1}: expected string, got ${_vdl2.describeValue(record0["name"])}`;
    const fieldPath0_2 = `${path}.doc`;
    if (_vdl2.hasOwn(record0, "doc") && record0["doc"] !== void 0) {
      if (typeof record0["doc"] !== "string") return `${fieldPath0_2}: expected string, got ${_vdl2.describeValue(record0["doc"])}`;
    }
    const fieldPath0_3 = `${path}.annotations`;
    if (!_vdl2.hasOwn(record0, "annotations") || record0["annotations"] === void 0) return `${fieldPath0_3}: required field is missing`;
    if (!Array.isArray(record0["annotations"])) return `${fieldPath0_3}: expected array, got ${_vdl2.describeValue(record0["annotations"])}`;
    for (let index1 = 0; index1 < record0["annotations"].length; index1 += 1) {
      const itemPath1 = `${fieldPath0_3}[${index1}]`;
      {
        const error = Annotation.validate(record0["annotations"][index1], itemPath1);
        if (error !== null) return error;
      }
    }
    const fieldPath0_4 = `${path}.enumType`;
    if (!_vdl2.hasOwn(record0, "enumType") || record0["enumType"] === void 0) return `${fieldPath0_4}: required field is missing`;
    {
      const error = EnumValueType.validate(record0["enumType"], fieldPath0_4);
      if (error !== null) return error;
    }
    const fieldPath0_5 = `${path}.members`;
    if (!_vdl2.hasOwn(record0, "members") || record0["members"] === void 0) return `${fieldPath0_5}: required field is missing`;
    if (!Array.isArray(record0["members"])) return `${fieldPath0_5}: expected array, got ${_vdl2.describeValue(record0["members"])}`;
    for (let index1 = 0; index1 < record0["members"].length; index1 += 1) {
      const itemPath1 = `${fieldPath0_5}[${index1}]`;
      {
        const error = EnumMember.validate(record0["members"][index1], itemPath1);
        if (error !== null) return error;
      }
    }
    return null;
  },
  hydrate(input) {
    return _vdl2.withOptional({
      position: Position.hydrate(input.position),
      name: input.name,
      annotations: input.annotations.map((item1) => Annotation.hydrate(item1)),
      enumType: EnumValueType.hydrate(input.enumType),
      members: input.members.map((item1) => EnumMember.hydrate(item1))
    }, "doc", input.doc === void 0 ? void 0 : input.doc);
  }
};
var EnumMember = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = EnumMember.validate(input);
    if (error !== null) throw new Error(error);
    return EnumMember.hydrate(input);
  },
  validate(input, path = "EnumMember") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.position`;
    if (!_vdl2.hasOwn(record0, "position") || record0["position"] === void 0) return `${fieldPath0_0}: required field is missing`;
    {
      const error = Position.validate(record0["position"], fieldPath0_0);
      if (error !== null) return error;
    }
    const fieldPath0_1 = `${path}.name`;
    if (!_vdl2.hasOwn(record0, "name") || record0["name"] === void 0) return `${fieldPath0_1}: required field is missing`;
    if (typeof record0["name"] !== "string") return `${fieldPath0_1}: expected string, got ${_vdl2.describeValue(record0["name"])}`;
    const fieldPath0_2 = `${path}.value`;
    if (!_vdl2.hasOwn(record0, "value") || record0["value"] === void 0) return `${fieldPath0_2}: required field is missing`;
    {
      const error = LiteralValue.validate(record0["value"], fieldPath0_2);
      if (error !== null) return error;
    }
    const fieldPath0_3 = `${path}.doc`;
    if (_vdl2.hasOwn(record0, "doc") && record0["doc"] !== void 0) {
      if (typeof record0["doc"] !== "string") return `${fieldPath0_3}: expected string, got ${_vdl2.describeValue(record0["doc"])}`;
    }
    const fieldPath0_4 = `${path}.annotations`;
    if (!_vdl2.hasOwn(record0, "annotations") || record0["annotations"] === void 0) return `${fieldPath0_4}: required field is missing`;
    if (!Array.isArray(record0["annotations"])) return `${fieldPath0_4}: expected array, got ${_vdl2.describeValue(record0["annotations"])}`;
    for (let index1 = 0; index1 < record0["annotations"].length; index1 += 1) {
      const itemPath1 = `${fieldPath0_4}[${index1}]`;
      {
        const error = Annotation.validate(record0["annotations"][index1], itemPath1);
        if (error !== null) return error;
      }
    }
    return null;
  },
  hydrate(input) {
    return _vdl2.withOptional({
      position: Position.hydrate(input.position),
      name: input.name,
      value: LiteralValue.hydrate(input.value),
      annotations: input.annotations.map((item1) => Annotation.hydrate(item1))
    }, "doc", input.doc === void 0 ? void 0 : input.doc);
  }
};
var Field = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = Field.validate(input);
    if (error !== null) throw new Error(error);
    return Field.hydrate(input);
  },
  validate(input, path = "Field") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.position`;
    if (!_vdl2.hasOwn(record0, "position") || record0["position"] === void 0) return `${fieldPath0_0}: required field is missing`;
    {
      const error = Position.validate(record0["position"], fieldPath0_0);
      if (error !== null) return error;
    }
    const fieldPath0_1 = `${path}.name`;
    if (!_vdl2.hasOwn(record0, "name") || record0["name"] === void 0) return `${fieldPath0_1}: required field is missing`;
    if (typeof record0["name"] !== "string") return `${fieldPath0_1}: expected string, got ${_vdl2.describeValue(record0["name"])}`;
    const fieldPath0_2 = `${path}.doc`;
    if (_vdl2.hasOwn(record0, "doc") && record0["doc"] !== void 0) {
      if (typeof record0["doc"] !== "string") return `${fieldPath0_2}: expected string, got ${_vdl2.describeValue(record0["doc"])}`;
    }
    const fieldPath0_3 = `${path}.optional`;
    if (!_vdl2.hasOwn(record0, "optional") || record0["optional"] === void 0) return `${fieldPath0_3}: required field is missing`;
    if (typeof record0["optional"] !== "boolean") return `${fieldPath0_3}: expected boolean, got ${_vdl2.describeValue(record0["optional"])}`;
    const fieldPath0_4 = `${path}.annotations`;
    if (!_vdl2.hasOwn(record0, "annotations") || record0["annotations"] === void 0) return `${fieldPath0_4}: required field is missing`;
    if (!Array.isArray(record0["annotations"])) return `${fieldPath0_4}: expected array, got ${_vdl2.describeValue(record0["annotations"])}`;
    for (let index1 = 0; index1 < record0["annotations"].length; index1 += 1) {
      const itemPath1 = `${fieldPath0_4}[${index1}]`;
      {
        const error = Annotation.validate(record0["annotations"][index1], itemPath1);
        if (error !== null) return error;
      }
    }
    const fieldPath0_5 = `${path}.typeRef`;
    if (!_vdl2.hasOwn(record0, "typeRef") || record0["typeRef"] === void 0) return `${fieldPath0_5}: required field is missing`;
    {
      const error = TypeRef.validate(record0["typeRef"], fieldPath0_5);
      if (error !== null) return error;
    }
    return null;
  },
  hydrate(input) {
    return _vdl2.withOptional({
      position: Position.hydrate(input.position),
      name: input.name,
      optional: input.optional,
      annotations: input.annotations.map((item1) => Annotation.hydrate(item1)),
      typeRef: TypeRef.hydrate(input.typeRef)
    }, "doc", input.doc === void 0 ? void 0 : input.doc);
  }
};
var IrSchema = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = IrSchema.validate(input);
    if (error !== null) throw new Error(error);
    return IrSchema.hydrate(input);
  },
  validate(input, path = "IrSchema") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.entryPoint`;
    if (!_vdl2.hasOwn(record0, "entryPoint") || record0["entryPoint"] === void 0) return `${fieldPath0_0}: required field is missing`;
    if (typeof record0["entryPoint"] !== "string") return `${fieldPath0_0}: expected string, got ${_vdl2.describeValue(record0["entryPoint"])}`;
    const fieldPath0_1 = `${path}.constants`;
    if (!_vdl2.hasOwn(record0, "constants") || record0["constants"] === void 0) return `${fieldPath0_1}: required field is missing`;
    if (!Array.isArray(record0["constants"])) return `${fieldPath0_1}: expected array, got ${_vdl2.describeValue(record0["constants"])}`;
    for (let index1 = 0; index1 < record0["constants"].length; index1 += 1) {
      const itemPath1 = `${fieldPath0_1}[${index1}]`;
      {
        const error = ConstantDef.validate(record0["constants"][index1], itemPath1);
        if (error !== null) return error;
      }
    }
    const fieldPath0_2 = `${path}.enums`;
    if (!_vdl2.hasOwn(record0, "enums") || record0["enums"] === void 0) return `${fieldPath0_2}: required field is missing`;
    if (!Array.isArray(record0["enums"])) return `${fieldPath0_2}: expected array, got ${_vdl2.describeValue(record0["enums"])}`;
    for (let index1 = 0; index1 < record0["enums"].length; index1 += 1) {
      const itemPath1 = `${fieldPath0_2}[${index1}]`;
      {
        const error = EnumDef.validate(record0["enums"][index1], itemPath1);
        if (error !== null) return error;
      }
    }
    const fieldPath0_3 = `${path}.types`;
    if (!_vdl2.hasOwn(record0, "types") || record0["types"] === void 0) return `${fieldPath0_3}: required field is missing`;
    if (!Array.isArray(record0["types"])) return `${fieldPath0_3}: expected array, got ${_vdl2.describeValue(record0["types"])}`;
    for (let index1 = 0; index1 < record0["types"].length; index1 += 1) {
      const itemPath1 = `${fieldPath0_3}[${index1}]`;
      {
        const error = TypeDef.validate(record0["types"][index1], itemPath1);
        if (error !== null) return error;
      }
    }
    const fieldPath0_4 = `${path}.docs`;
    if (!_vdl2.hasOwn(record0, "docs") || record0["docs"] === void 0) return `${fieldPath0_4}: required field is missing`;
    if (!Array.isArray(record0["docs"])) return `${fieldPath0_4}: expected array, got ${_vdl2.describeValue(record0["docs"])}`;
    for (let index1 = 0; index1 < record0["docs"].length; index1 += 1) {
      const itemPath1 = `${fieldPath0_4}[${index1}]`;
      {
        const error = TopLevelDoc.validate(record0["docs"][index1], itemPath1);
        if (error !== null) return error;
      }
    }
    return null;
  },
  hydrate(input) {
    return {
      entryPoint: input.entryPoint,
      constants: input.constants.map((item1) => ConstantDef.hydrate(item1)),
      enums: input.enums.map((item1) => EnumDef.hydrate(item1)),
      types: input.types.map((item1) => TypeDef.hydrate(item1)),
      docs: input.docs.map((item1) => TopLevelDoc.hydrate(item1))
    };
  }
};
var LiteralValue = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = LiteralValue.validate(input);
    if (error !== null) throw new Error(error);
    return LiteralValue.hydrate(input);
  },
  validate(input, path = "LiteralValue") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.position`;
    if (!_vdl2.hasOwn(record0, "position") || record0["position"] === void 0) return `${fieldPath0_0}: required field is missing`;
    {
      const error = Position.validate(record0["position"], fieldPath0_0);
      if (error !== null) return error;
    }
    const fieldPath0_1 = `${path}.kind`;
    if (!_vdl2.hasOwn(record0, "kind") || record0["kind"] === void 0) return `${fieldPath0_1}: required field is missing`;
    {
      const error = LiteralKind.validate(record0["kind"], fieldPath0_1);
      if (error !== null) return error;
    }
    const fieldPath0_2 = `${path}.stringValue`;
    if (_vdl2.hasOwn(record0, "stringValue") && record0["stringValue"] !== void 0) {
      if (typeof record0["stringValue"] !== "string") return `${fieldPath0_2}: expected string, got ${_vdl2.describeValue(record0["stringValue"])}`;
    }
    const fieldPath0_3 = `${path}.intValue`;
    if (_vdl2.hasOwn(record0, "intValue") && record0["intValue"] !== void 0) {
      if (typeof record0["intValue"] !== "number" || !Number.isFinite(record0["intValue"])) return `${fieldPath0_3}: expected number, got ${_vdl2.describeValue(record0["intValue"])}`;
    }
    const fieldPath0_4 = `${path}.floatValue`;
    if (_vdl2.hasOwn(record0, "floatValue") && record0["floatValue"] !== void 0) {
      if (typeof record0["floatValue"] !== "number" || !Number.isFinite(record0["floatValue"])) return `${fieldPath0_4}: expected number, got ${_vdl2.describeValue(record0["floatValue"])}`;
    }
    const fieldPath0_5 = `${path}.boolValue`;
    if (_vdl2.hasOwn(record0, "boolValue") && record0["boolValue"] !== void 0) {
      if (typeof record0["boolValue"] !== "boolean") return `${fieldPath0_5}: expected boolean, got ${_vdl2.describeValue(record0["boolValue"])}`;
    }
    const fieldPath0_6 = `${path}.objectEntries`;
    if (_vdl2.hasOwn(record0, "objectEntries") && record0["objectEntries"] !== void 0) {
      if (!Array.isArray(record0["objectEntries"])) return `${fieldPath0_6}: expected array, got ${_vdl2.describeValue(record0["objectEntries"])}`;
      for (let index1 = 0; index1 < record0["objectEntries"].length; index1 += 1) {
        const itemPath1 = `${fieldPath0_6}[${index1}]`;
        {
          const error = ObjectEntry.validate(record0["objectEntries"][index1], itemPath1);
          if (error !== null) return error;
        }
      }
    }
    const fieldPath0_7 = `${path}.arrayItems`;
    if (_vdl2.hasOwn(record0, "arrayItems") && record0["arrayItems"] !== void 0) {
      if (!Array.isArray(record0["arrayItems"])) return `${fieldPath0_7}: expected array, got ${_vdl2.describeValue(record0["arrayItems"])}`;
      for (let index1 = 0; index1 < record0["arrayItems"].length; index1 += 1) {
        const itemPath1 = `${fieldPath0_7}[${index1}]`;
        {
          const error = LiteralValue.validate(record0["arrayItems"][index1], itemPath1);
          if (error !== null) return error;
        }
      }
    }
    return null;
  },
  hydrate(input) {
    return _vdl2.withOptional(_vdl2.withOptional(_vdl2.withOptional(_vdl2.withOptional(_vdl2.withOptional(_vdl2.withOptional({
      position: Position.hydrate(input.position),
      kind: LiteralKind.hydrate(input.kind)
    }, "stringValue", input.stringValue === void 0 ? void 0 : input.stringValue), "intValue", input.intValue === void 0 ? void 0 : input.intValue), "floatValue", input.floatValue === void 0 ? void 0 : input.floatValue), "boolValue", input.boolValue === void 0 ? void 0 : input.boolValue), "objectEntries", input.objectEntries === void 0 ? void 0 : input.objectEntries.map((item1) => ObjectEntry.hydrate(item1))), "arrayItems", input.arrayItems === void 0 ? void 0 : input.arrayItems.map((item1) => LiteralValue.hydrate(item1)));
  }
};
var ObjectEntry = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = ObjectEntry.validate(input);
    if (error !== null) throw new Error(error);
    return ObjectEntry.hydrate(input);
  },
  validate(input, path = "ObjectEntry") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.position`;
    if (!_vdl2.hasOwn(record0, "position") || record0["position"] === void 0) return `${fieldPath0_0}: required field is missing`;
    {
      const error = Position.validate(record0["position"], fieldPath0_0);
      if (error !== null) return error;
    }
    const fieldPath0_1 = `${path}.key`;
    if (!_vdl2.hasOwn(record0, "key") || record0["key"] === void 0) return `${fieldPath0_1}: required field is missing`;
    if (typeof record0["key"] !== "string") return `${fieldPath0_1}: expected string, got ${_vdl2.describeValue(record0["key"])}`;
    const fieldPath0_2 = `${path}.value`;
    if (!_vdl2.hasOwn(record0, "value") || record0["value"] === void 0) return `${fieldPath0_2}: required field is missing`;
    {
      const error = LiteralValue.validate(record0["value"], fieldPath0_2);
      if (error !== null) return error;
    }
    return null;
  },
  hydrate(input) {
    return {
      position: Position.hydrate(input.position),
      key: input.key,
      value: LiteralValue.hydrate(input.value)
    };
  }
};
var Position = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = Position.validate(input);
    if (error !== null) throw new Error(error);
    return Position.hydrate(input);
  },
  validate(input, path = "Position") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.file`;
    if (!_vdl2.hasOwn(record0, "file") || record0["file"] === void 0) return `${fieldPath0_0}: required field is missing`;
    if (typeof record0["file"] !== "string") return `${fieldPath0_0}: expected string, got ${_vdl2.describeValue(record0["file"])}`;
    const fieldPath0_1 = `${path}.line`;
    if (!_vdl2.hasOwn(record0, "line") || record0["line"] === void 0) return `${fieldPath0_1}: required field is missing`;
    if (typeof record0["line"] !== "number" || !Number.isFinite(record0["line"])) return `${fieldPath0_1}: expected number, got ${_vdl2.describeValue(record0["line"])}`;
    const fieldPath0_2 = `${path}.column`;
    if (!_vdl2.hasOwn(record0, "column") || record0["column"] === void 0) return `${fieldPath0_2}: required field is missing`;
    if (typeof record0["column"] !== "number" || !Number.isFinite(record0["column"])) return `${fieldPath0_2}: expected number, got ${_vdl2.describeValue(record0["column"])}`;
    return null;
  },
  hydrate(input) {
    return {
      file: input.file,
      line: input.line,
      column: input.column
    };
  }
};
var TopLevelDoc = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = TopLevelDoc.validate(input);
    if (error !== null) throw new Error(error);
    return TopLevelDoc.hydrate(input);
  },
  validate(input, path = "TopLevelDoc") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.position`;
    if (!_vdl2.hasOwn(record0, "position") || record0["position"] === void 0) return `${fieldPath0_0}: required field is missing`;
    {
      const error = Position.validate(record0["position"], fieldPath0_0);
      if (error !== null) return error;
    }
    const fieldPath0_1 = `${path}.content`;
    if (!_vdl2.hasOwn(record0, "content") || record0["content"] === void 0) return `${fieldPath0_1}: required field is missing`;
    if (typeof record0["content"] !== "string") return `${fieldPath0_1}: expected string, got ${_vdl2.describeValue(record0["content"])}`;
    return null;
  },
  hydrate(input) {
    return {
      position: Position.hydrate(input.position),
      content: input.content
    };
  }
};
var TypeDef = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = TypeDef.validate(input);
    if (error !== null) throw new Error(error);
    return TypeDef.hydrate(input);
  },
  validate(input, path = "TypeDef") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.position`;
    if (!_vdl2.hasOwn(record0, "position") || record0["position"] === void 0) return `${fieldPath0_0}: required field is missing`;
    {
      const error = Position.validate(record0["position"], fieldPath0_0);
      if (error !== null) return error;
    }
    const fieldPath0_1 = `${path}.name`;
    if (!_vdl2.hasOwn(record0, "name") || record0["name"] === void 0) return `${fieldPath0_1}: required field is missing`;
    if (typeof record0["name"] !== "string") return `${fieldPath0_1}: expected string, got ${_vdl2.describeValue(record0["name"])}`;
    const fieldPath0_2 = `${path}.doc`;
    if (_vdl2.hasOwn(record0, "doc") && record0["doc"] !== void 0) {
      if (typeof record0["doc"] !== "string") return `${fieldPath0_2}: expected string, got ${_vdl2.describeValue(record0["doc"])}`;
    }
    const fieldPath0_3 = `${path}.annotations`;
    if (!_vdl2.hasOwn(record0, "annotations") || record0["annotations"] === void 0) return `${fieldPath0_3}: required field is missing`;
    if (!Array.isArray(record0["annotations"])) return `${fieldPath0_3}: expected array, got ${_vdl2.describeValue(record0["annotations"])}`;
    for (let index1 = 0; index1 < record0["annotations"].length; index1 += 1) {
      const itemPath1 = `${fieldPath0_3}[${index1}]`;
      {
        const error = Annotation.validate(record0["annotations"][index1], itemPath1);
        if (error !== null) return error;
      }
    }
    const fieldPath0_4 = `${path}.typeRef`;
    if (!_vdl2.hasOwn(record0, "typeRef") || record0["typeRef"] === void 0) return `${fieldPath0_4}: required field is missing`;
    {
      const error = TypeRef.validate(record0["typeRef"], fieldPath0_4);
      if (error !== null) return error;
    }
    return null;
  },
  hydrate(input) {
    return _vdl2.withOptional({
      position: Position.hydrate(input.position),
      name: input.name,
      annotations: input.annotations.map((item1) => Annotation.hydrate(item1)),
      typeRef: TypeRef.hydrate(input.typeRef)
    }, "doc", input.doc === void 0 ? void 0 : input.doc);
  }
};
var TypeRef = {
  parse(json) {
    const input = _vdl2.parseJson(json);
    const error = TypeRef.validate(input);
    if (error !== null) throw new Error(error);
    return TypeRef.hydrate(input);
  },
  validate(input, path = "TypeRef") {
    if (!_vdl2.isRecord(input)) return `${path}: expected object, got ${_vdl2.describeValue(input)}`;
    const record0 = input;
    const fieldPath0_0 = `${path}.kind`;
    if (!_vdl2.hasOwn(record0, "kind") || record0["kind"] === void 0) return `${fieldPath0_0}: required field is missing`;
    {
      const error = TypeKind.validate(record0["kind"], fieldPath0_0);
      if (error !== null) return error;
    }
    const fieldPath0_1 = `${path}.primitiveName`;
    if (_vdl2.hasOwn(record0, "primitiveName") && record0["primitiveName"] !== void 0) {
      const error = PrimitiveType.validate(record0["primitiveName"], fieldPath0_1);
      if (error !== null) return error;
    }
    const fieldPath0_2 = `${path}.typeName`;
    if (_vdl2.hasOwn(record0, "typeName") && record0["typeName"] !== void 0) {
      if (typeof record0["typeName"] !== "string") return `${fieldPath0_2}: expected string, got ${_vdl2.describeValue(record0["typeName"])}`;
    }
    const fieldPath0_3 = `${path}.enumName`;
    if (_vdl2.hasOwn(record0, "enumName") && record0["enumName"] !== void 0) {
      if (typeof record0["enumName"] !== "string") return `${fieldPath0_3}: expected string, got ${_vdl2.describeValue(record0["enumName"])}`;
    }
    const fieldPath0_4 = `${path}.enumType`;
    if (_vdl2.hasOwn(record0, "enumType") && record0["enumType"] !== void 0) {
      const error = EnumValueType.validate(record0["enumType"], fieldPath0_4);
      if (error !== null) return error;
    }
    const fieldPath0_5 = `${path}.arrayType`;
    if (_vdl2.hasOwn(record0, "arrayType") && record0["arrayType"] !== void 0) {
      const error = TypeRef.validate(record0["arrayType"], fieldPath0_5);
      if (error !== null) return error;
    }
    const fieldPath0_6 = `${path}.arrayDims`;
    if (_vdl2.hasOwn(record0, "arrayDims") && record0["arrayDims"] !== void 0) {
      if (typeof record0["arrayDims"] !== "number" || !Number.isFinite(record0["arrayDims"])) return `${fieldPath0_6}: expected number, got ${_vdl2.describeValue(record0["arrayDims"])}`;
    }
    const fieldPath0_7 = `${path}.mapType`;
    if (_vdl2.hasOwn(record0, "mapType") && record0["mapType"] !== void 0) {
      const error = TypeRef.validate(record0["mapType"], fieldPath0_7);
      if (error !== null) return error;
    }
    const fieldPath0_8 = `${path}.objectFields`;
    if (_vdl2.hasOwn(record0, "objectFields") && record0["objectFields"] !== void 0) {
      if (!Array.isArray(record0["objectFields"])) return `${fieldPath0_8}: expected array, got ${_vdl2.describeValue(record0["objectFields"])}`;
      for (let index1 = 0; index1 < record0["objectFields"].length; index1 += 1) {
        const itemPath1 = `${fieldPath0_8}[${index1}]`;
        {
          const error = Field.validate(record0["objectFields"][index1], itemPath1);
          if (error !== null) return error;
        }
      }
    }
    return null;
  },
  hydrate(input) {
    return _vdl2.withOptional(_vdl2.withOptional(_vdl2.withOptional(_vdl2.withOptional(_vdl2.withOptional(_vdl2.withOptional(_vdl2.withOptional(_vdl2.withOptional({ kind: TypeKind.hydrate(input.kind) }, "primitiveName", input.primitiveName === void 0 ? void 0 : PrimitiveType.hydrate(input.primitiveName)), "typeName", input.typeName === void 0 ? void 0 : input.typeName), "enumName", input.enumName === void 0 ? void 0 : input.enumName), "enumType", input.enumType === void 0 ? void 0 : EnumValueType.hydrate(input.enumType)), "arrayType", input.arrayType === void 0 ? void 0 : TypeRef.hydrate(input.arrayType)), "arrayDims", input.arrayDims === void 0 ? void 0 : input.arrayDims), "mapType", input.mapType === void 0 ? void 0 : TypeRef.hydrate(input.mapType)), "objectFields", input.objectFields === void 0 ? void 0 : input.objectFields.map((item1) => Field.hydrate(item1)));
  }
};
var _vdl2 = {
  parseJson(json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Invalid JSON input: ${message}`);
    }
  },
  recordEntries(record) {
    const entries = [];
    for (const key in record) if (Object.prototype.hasOwnProperty.call(record, key)) {
      const value = record[key];
      entries.push([key, value]);
    }
    return entries;
  },
  mapRecord(record, mapValue) {
    const output = {};
    for (const key in record) if (Object.prototype.hasOwnProperty.call(record, key)) {
      const value = record[key];
      output[key] = mapValue(value);
    }
    return output;
  },
  withOptional(record, key, value) {
    const mutable = record;
    if (value !== void 0) mutable[key] = value;
    return record;
  },
  isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Date);
  },
  hasOwn(record, key) {
    return Object.prototype.hasOwnProperty.call(record, key);
  },
  describeValue(value) {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    if (value instanceof Date) return "Date";
    return typeof value;
  },
  isValidDateInput(value) {
    if (value instanceof Date) return !Number.isNaN(value.getTime());
    if (typeof value !== "string") return false;
    return !Number.isNaN(new Date(value).getTime());
  },
  hydrateDateInput(value) {
    return value instanceof Date ? new Date(value.getTime()) : new Date(value);
  }
};

// node_modules/@varavel/vdl-plugin-sdk/dist/node_modules/es-toolkit/dist/util/invariant.js
function invariant(condition, message) {
  if (condition) return;
  if (typeof message === "string") throw new Error(message);
  throw message;
}
__name(invariant, "invariant");

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
  invariant(condition, new GenerationError(message, position));
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

// node_modules/@varavel/vdl-plugin-sdk/dist/node_modules/es-toolkit/dist/array/compact.js
function compact(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item) result.push(item);
  }
  return result;
}
__name(compact, "compact");

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

// node_modules/@varavel/vdl-plugin-sdk/dist/utils/ir/get-annotation.js
function getAnnotation(annotations, name) {
  if (!annotations) return void 0;
  return annotations.find((anno) => anno.name === name);
}
__name(getAnnotation, "getAnnotation");

// node_modules/@varavel/vdl-plugin-sdk/dist/utils/ir/get-annotation-arg.js
function getAnnotationArg(annotations, name) {
  const anno = getAnnotation(annotations, name);
  return anno === null || anno === void 0 ? void 0 : anno.argument;
}
__name(getAnnotationArg, "getAnnotationArg");

// node_modules/@varavel/vdl-plugin-sdk/dist/utils/strings/words.js
var ACRONYM_TO_CAPITALIZED_WORD_BOUNDARY_RE = /([A-Z]+)([A-Z][a-z])/g;
var LOWERCASE_OR_DIGIT_TO_UPPERCASE_BOUNDARY_RE = /([a-z0-9])([A-Z])/g;
var NON_ALPHANUMERIC_SEQUENCE_RE = /[^A-Za-z0-9]+/g;
var WHITESPACE_SEQUENCE_RE = /\s+/;
function words(str) {
  const normalized = str.replace(ACRONYM_TO_CAPITALIZED_WORD_BOUNDARY_RE, "$1 $2").replace(LOWERCASE_OR_DIGIT_TO_UPPERCASE_BOUNDARY_RE, "$1 $2").replace(NON_ALPHANUMERIC_SEQUENCE_RE, " ").trim();
  return normalized.length === 0 ? [] : normalized.split(WHITESPACE_SEQUENCE_RE);
}
__name(words, "words");

// node_modules/@varavel/vdl-plugin-sdk/dist/utils/strings/pascal-case.js
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
__name(capitalize, "capitalize");
function pascalCase(str) {
  return words(str).map(capitalize).join("");
}
__name(pascalCase, "pascalCase");

// node_modules/@varavel/vdl-plugin-sdk/dist/utils/ir/hoist-anonymous-types.js
function hoistAnonymousTypes(schema, nameFn) {
  const output = IrSchema.hydrate(schema);
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

// node_modules/@varavel/vdl-plugin-sdk/dist/utils/ir/unwrap-literal.js
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

// src/shared/comments.ts
var DEFAULT_DEPRECATED_MESSAGE = "This symbol is deprecated and should not be used in new code.";
function getDeprecatedMessage(annotations) {
  const deprecated = getAnnotation(annotations, "deprecated");
  if (!deprecated) {
    return void 0;
  }
  const argument = getAnnotationArg(annotations, "deprecated");
  const unwrapped = argument ? unwrapLiteral(argument) : void 0;
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

// node_modules/@varavel/vdl-plugin-sdk/dist/utils/strings/limit-blank-lines.js
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
  return limitBlankLines(g.toString(), 1);
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
        g.line(`if (!_vdl.arrayIncludes(${enumDef.name}.values(), input)) {`);
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
    g.break();
    writeDocComment(g, {
      fallback: "Checks whether an array contains a value using strict equality."
    });
    g.line(
      "arrayIncludes<TValue>(values: TValue[], value: unknown): value is TValue {"
    );
    g.block(() => {
      g.line("for (let index = 0; index < values.length; index += 1) {");
      g.block(() => {
        g.line("if (values[index] === value) {");
        g.block(() => {
          g.line("return true;");
        });
        g.line("}");
      });
      g.line("}");
      g.line("return false;");
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
      const mapValueName = `value${depth}`;
      return `_vdl.mapRecord(${valueExpression}, (${mapValueName}) => ${renderHydrationExpression(typeRef.mapType, mapValueName, depth + 1)})`;
    }
    case "object": {
      const fields = (_a2 = typeRef.objectFields) != null ? _a2 : [];
      if (fields.length === 0) {
        return "{}";
      }
      const requiredFields = fields.filter((field) => !field.optional);
      const optionalFields = fields.filter((field) => field.optional);
      const baseObjectGenerator = newGenerator().withSpaces(2);
      baseObjectGenerator.line("{");
      baseObjectGenerator.block(() => {
        for (const field of requiredFields) {
          const accessExpression = renderValueAccess(
            valueExpression,
            field.name
          );
          const hydratedValue = renderHydrationExpression(
            field.typeRef,
            accessExpression,
            depth + 1
          );
          baseObjectGenerator.line(
            `${renderPropertyName(field.name)}: ${hydratedValue},`
          );
        }
      });
      baseObjectGenerator.line("}");
      let expression = baseObjectGenerator.toString().trim();
      for (const field of optionalFields) {
        const accessExpression = renderValueAccess(valueExpression, field.name);
        const hydratedValue = renderHydrationExpression(
          field.typeRef,
          accessExpression,
          depth + 1
        );
        const optionalValue = `${accessExpression} === undefined ? undefined : ${hydratedValue}`;
        expression = `_vdl.withOptional(${expression}, ${JSON.stringify(field.name)}, ${optionalValue})`;
      }
      return expression;
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
      const entryName = `entry${options.depth}`;
      g.line(`if (!_vdl.isRecord(${options.valueExpression})) {`);
      g.block(() => {
        g.line(
          `return \`\${${options.pathExpression}}: expected object, got \${_vdl.describeValue(${options.valueExpression})}\`;`
        );
      });
      g.line("}");
      g.line(
        `for (const ${entryName} of _vdl.recordEntries(${options.valueExpression})) {`
      );
      g.block(() => {
        g.line(`const ${keyName} = ${entryName}[0];`);
        g.line(`const ${valueName} = ${entryName}[1];`);
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
    writeDocComment(g, {
      fallback: "Returns own enumerable entries from a record in insertion order."
    });
    g.line(
      "recordEntries<TValue>(record: Record<string, TValue>): Array<[string, TValue]> {"
    );
    g.block(() => {
      g.line("const entries: Array<[string, TValue]> = [];");
      g.line("for (const key in record) {");
      g.block(() => {
        g.line("if (Object.prototype.hasOwnProperty.call(record, key)) {");
        g.block(() => {
          g.line("const value = record[key] as TValue;");
          g.line("entries.push([key, value]);");
        });
        g.line("}");
      });
      g.line("}");
      g.line("return entries;");
    });
    g.line("},");
    g.break();
    writeDocComment(g, {
      fallback: "Creates a new record by mapping every own enumerable value."
    });
    g.line(
      "mapRecord<TInput, TOutput>(record: Record<string, TInput>, mapValue: (value: TInput) => TOutput): Record<string, TOutput> {"
    );
    g.block(() => {
      g.line("const output: Record<string, TOutput> = {};");
      g.line("for (const key in record) {");
      g.block(() => {
        g.line("if (Object.prototype.hasOwnProperty.call(record, key)) {");
        g.block(() => {
          g.line("const value = record[key] as TInput;");
          g.line("output[key] = mapValue(value);");
        });
        g.line("}");
      });
      g.line("}");
      g.line("return output;");
    });
    g.line("},");
    g.break();
    writeDocComment(g, {
      fallback: "Adds an optional property only when the value is defined."
    });
    g.line(
      "withOptional<TRecord extends object, TKey extends string, TValue>(record: TRecord, key: TKey, value: TValue | undefined): TRecord & Partial<Record<TKey, TValue>> {"
    );
    g.block(() => {
      g.line("const mutable = record as Record<string, unknown>;");
      g.line("if (value !== undefined) {");
      g.block(() => {
        g.line("mutable[key] = value;");
      });
      g.line("}");
      g.line("return record as TRecord & Partial<Record<TKey, TValue>>;");
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
  return compact([
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
  return words(name).join("").toLowerCase();
}
__name(toConstLookupKey, "toConstLookupKey");

// src/stages/model/build-context.ts
function createGeneratorContext(options) {
  const schema = hoistAnonymousTypes(options.input.ir);
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

// node_modules/@varavel/vdl-plugin-sdk/dist/utils/options/get-option-bool.js
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

// node_modules/@varavel/vdl-plugin-sdk/dist/utils/options/get-option-enum.js
function getOptionEnum(options, key, allowedValues, defaultValue) {
  const value = options === null || options === void 0 ? void 0 : options[key];
  if (value === void 0) return defaultValue;
  const trimmedValue = value.trim();
  if (trimmedValue === "") return defaultValue;
  return allowedValues.includes(trimmedValue) ? trimmedValue : defaultValue;
}
__name(getOptionEnum, "getOptionEnum");

// src/stages/options/resolve.ts
function resolveGeneratorOptions(input) {
  const genConsts = getOptionBool(input.options, "genConsts", true);
  const strict = getOptionBool(input.options, "strict", true);
  const importExtension = getOptionEnum(
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
