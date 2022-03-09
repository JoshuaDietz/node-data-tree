"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
var TreeNode_1 = require("./TreeNode");
var Tree = /** @class */ (function () {
    function Tree() {
    }
    Tree.parse = function (model, config) {
        if (config === void 0) { config = { dataFieldName: "nodeData", childrenFieldName: "children" }; }
        var children = model[config.childrenFieldName];
        if (children === null || children === undefined) {
            children = [];
        }
        if (!Array.isArray(children)) {
            throw new Error('The child property is not of type array');
        }
        if (model[config.dataFieldName]) {
            var node = new TreeNode_1.TreeNode();
            node.setData(model[config.dataFieldName]);
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var childNode = Tree.parse(child, config);
                if (childNode) {
                    node.addChild(childNode);
                }
            }
            return node;
        }
        return null;
    };
    Tree.toJson = function (node, dataCopyFunction, config) {
        if (config === void 0) { config = { dataFieldName: "nodeData", childrenFieldName: "children" }; }
        var json = {};
        json[config.dataFieldName] = dataCopyFunction(node.getData());
        json[config.childrenFieldName] = [];
        var nodeChildren = node.getChildren();
        for (var i = 0; i < nodeChildren.length; i++) {
            var child = nodeChildren[i];
            var childJson = Tree.toJson(child, dataCopyFunction, config);
            json[config.childrenFieldName].push(childJson);
        }
        return json;
    };
    return Tree;
}());
exports.Tree = Tree;
