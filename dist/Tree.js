"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
const TreeNode_1 = require("./TreeNode");
class Tree {
    static parse(model, config = { dataFieldName: "nodeData", childrenFieldName: "children" }, parentNode = null) {
        let children = model[config.childrenFieldName];
        if (children === null || children === undefined) {
            children = [];
        }
        if (!Array.isArray(children)) {
            throw new Error('The child property is not of type array');
        }
        if (model[config.dataFieldName]) {
            let node = new TreeNode_1.TreeNode(parentNode);
            node.setData(model[config.dataFieldName]);
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if (child[config.dataFieldName]) {
                    let childNode = Tree.parse(child, config, node);
                    node.addChild(childNode);
                }
            }
            return node;
        }
        else {
            throw new Error('No data field present. Maybe you are using alternative data-field names and forgot to supply the configuration object necessary');
        }
    }
    static toJson(node, dataCopyFunction, config = { dataFieldName: "nodeData", childrenFieldName: "children" }) {
        let json = {};
        json[config.dataFieldName] = dataCopyFunction(node.getData());
        json[config.childrenFieldName] = [];
        let nodeChildren = node.getChildren();
        for (let i = 0; i < nodeChildren.length; i++) {
            let child = nodeChildren[i];
            let childJson = Tree.toJson(child, dataCopyFunction, config);
            json[config.childrenFieldName].push(childJson);
        }
        return json;
    }
}
exports.Tree = Tree;
