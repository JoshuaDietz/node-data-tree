"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNode = void 0;
var TraversalStrategies_1 = require("./TraversalStrategies");
var TreeNode = /** @class */ (function () {
    function TreeNode(parentNode) {
        if (parentNode === void 0) { parentNode = null; }
        this.nodeData = {};
        this.childNodes = [];
        this.parentNode = parentNode;
    }
    TreeNode.prototype.isRoot = function () {
        return this.parentNode === null;
    };
    TreeNode.prototype.numChildren = function () {
        return this.childNodes.length;
    };
    TreeNode.prototype.getChildren = function () {
        return this.childNodes;
    };
    /**
     * Adds the given child at the given index. -1 = end
     * @param child
     * @param index
     */
    TreeNode.prototype.addChild = function (child, index) {
        if (index === void 0) { index = -1; }
        if (index === -1) {
            this.childNodes.push(child);
            return;
        }
        if (index > this.childNodes.length) {
            throw new Error("Index out of range");
        }
        this.childNodes.splice(index, 0, child);
    };
    TreeNode.prototype.getData = function () {
        return this.nodeData;
    };
    TreeNode.prototype.setData = function (nodeData) {
        this.nodeData = nodeData;
    };
    TreeNode.prototype.getPath = function () {
        if (this.isRoot()) {
            return [];
        }
        var pathToParent = this.parentNode.getPath();
        return __spreadArray(__spreadArray([], pathToParent, true), [this], false);
    };
    TreeNode.prototype.walk = function (action, strategy) {
        //walk all child elements (and their children etc)
        if (strategy === void 0) { strategy = TraversalStrategies_1.TraversalStrategies.PRE; }
        if (strategy === TraversalStrategies_1.TraversalStrategies.PRE) {
            var exitEarly = !action(this);
            if (exitEarly) {
                return;
            }
            for (var i = 0; i < this.childNodes.length; i++) {
                var node = this.childNodes[i];
                node.walk(action, strategy);
            }
        }
    };
    TreeNode.prototype.findFirst = function (predicate, strategy) {
        if (strategy === void 0) { strategy = TraversalStrategies_1.TraversalStrategies.PRE; }
        var result = null;
        this.walk(function (node) {
            if (predicate(node)) {
                //found
                result = node;
                return false; //to halt the walk
            }
            return true;
        });
        return result;
    };
    TreeNode.prototype.findAll = function (predicate) {
        var result = [];
        this.walk(function (node) {
            if (predicate(node)) {
                //found
                result.push(node);
                return false; //to halt the walk
            }
            return true;
        });
        return result;
    };
    TreeNode.prototype.dropChild = function (childIndex) {
        this.childNodes.splice(childIndex, 1);
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
