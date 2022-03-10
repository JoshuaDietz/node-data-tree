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
    /**
     * Returns true if the node is the root node of the tree, else false
     * @returns
     */
    isRoot() {
        return this.parentNode === null;
    }
    /**
     * Returns the number of child nodes of the current node. Equals getChildren().length
     * @returns
     */
    numChildren() {
        return this.childNodes.length;
    }
    /**
     * Returns an array of all direct child nodes of the current node
     * @returns
     */
    getChildren() {
        return this.childNodes;
    }
    /**
     * Sets the parent node of the current node. This method is not intended to be called from outside.
     * @param parent
     */
    _setParent(parent) {
        //only to be used by dropChild
        this.parentNode = parent;
    }
    /**
     * Adds the given node as a child node at the given index. If no index is given (or -1) the node is added to the end of the children array.
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
    /**
     * Returns the data of the node.
     * Since the data is an object it can the node's data changes when the object is edited.
     * @returns
     */
    getData() {
        return this.nodeData;
    }
    /**
     * Sets the data of the node to the given object
     * @param nodeData
     */
    setData(nodeData) {
        this.nodeData = nodeData;
    }
    /**
     * Returns an array representing the path from the root node to the current node (inclusive)
     * @returns
     */
    getPath() {
        if (this.isRoot()) {
            return [this];
        }
        let pathToParent = this.parentNode.getPath();
        return [...pathToParent, this];
    }
    /**
     * Like findAll but stops when the first node is found. Returns null if no node was found.
     * @param predicate
     * @param strategy
     * @returns
     */
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
    /**
     * Returns an array of all nodes for which the given predicate function returned true.
     * The predicate function is called for every node in the subtree represented by this node and all children (recursively)
     * @param predicate
     * @returns
     */
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
    /**
     * Drops the child node with the given index. Returns the dropped node.
     * Note that the dropped node has no parent anymore and therefore represents its own tree.
     * Therefore this method can be used to unmount a subtree too.
     * @param childIndex
     * @returns
     */
    dropChild(childIndex) {
        let child = this.childNodes[childIndex];
        this.childNodes.splice(childIndex, 1);
        child._setParent(null);
        return child;
    }
}
exports.TreeNode = TreeNode;
