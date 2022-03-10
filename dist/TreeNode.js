"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNode = void 0;
const TraversalStrategies_1 = require("./TraversalStrategies");
class TreeNode {
    constructor(parentNode = null) {
        /**
         * Walks the tree with the given walk function. If the walk function returns false the walk is ended early.
         * Returns true if the tree was completely walked and false if the walk was stopped early.
         * @param action
         * @param strategy
         * @returns
         */
        this.walk = (action, strategy = TraversalStrategies_1.TraversalStrategies.PRE) => {
            //walk all child elements (and their children etc)
            if (strategy === TraversalStrategies_1.TraversalStrategies.PRE) {
                let exitEarly = !action(this);
                if (exitEarly) {
                    return false;
                }
                for (let i = 0; i < this.childNodes.length; i++) {
                    let node = this.childNodes[i];
                    let continueWalk = node.walk(action, strategy);
                    if (!continueWalk) {
                        return false;
                    }
                }
            }
            return true;
        };
        this.nodeData = {};
        this.childNodes = [];
        this.parentNode = parentNode;
    }
    isRoot() {
        return this.parentNode === null;
    }
    numChildren() {
        return this.childNodes.length;
    }
    getChildren() {
        return this.childNodes;
    }
    _setParent(parent) {
        //only to be used by dropChild
        this.parentNode = parent;
    }
    /**
     * Adds the given child at the given index. -1 = end
     * @param child
     * @param index
     */
    addChild(child, index = -1) {
        if (index === -1) {
            child._setParent(this);
            this.childNodes.push(child);
            return;
        }
        if (index > this.childNodes.length) {
            throw new Error("Index out of range");
        }
        child._setParent(this);
        this.childNodes.splice(index, 0, child);
    }
    getData() {
        return this.nodeData;
    }
    setData(nodeData) {
        this.nodeData = nodeData;
    }
    getPath() {
        if (this.isRoot()) {
            return [this];
        }
        let pathToParent = this.parentNode.getPath();
        return [...pathToParent, this];
    }
    findFirst(predicate, strategy = TraversalStrategies_1.TraversalStrategies.PRE) {
        let result = null;
        this.walk((node) => {
            if (predicate(node)) {
                //found
                result = node;
                return false; //to halt the walk
            }
            return true;
        });
        return result;
    }
    findAll(predicate) {
        let result = [];
        this.walk((node) => {
            if (predicate(node)) {
                //found
                result.push(node);
            }
            return true;
        });
        return result;
    }
    dropChild(childIndex) {
        let child = this.childNodes[childIndex];
        this.childNodes.splice(childIndex, 1);
        child._setParent(null);
        return child;
    }
}
exports.TreeNode = TreeNode;
