import { TraversalStrategies } from "./TraversalStrategies";
export declare class TreeNode {
    private nodeData;
    private childNodes;
    private parentNode;
    constructor(parentNode?: TreeNode | null);
    /**
     * Returns true if the node is the root node of the tree, else false
     * @returns
     */
    isRoot(): boolean;
    /**
     * Returns the number of child nodes of the current node. Equals getChildren().length
     * @returns
     */
    numChildren(): number;
    /**
     * Returns an array of all direct child nodes of the current node
     * @returns
     */
    getChildren(): TreeNode[];
    /**
     * Sets the parent node of the current node. This method is not intended to be called from outside.
     * @param parent
     */
    _setParent(parent: TreeNode | null): void;
    /**
     * Adds the given node as a child node at the given index. If no index is given (or -1) the node is added to the end of the children array.
     * @param child
     * @param index
     */
    addChild(child: TreeNode, index?: number): void;
    /**
     * Returns the data of the node.
     * Since the data is an object it can the node's data changes when the object is edited.
     * @returns
     */
    getData(): any;
    /**
     * Sets the data of the node to the given object
     * @param nodeData
     */
    setData(nodeData: object): void;
    /**
     * Returns an array representing the path from the root node to the current node (inclusive)
     * @returns
     */
    getPath(): TreeNode[];
    /**
     * Walks the tree with the given walk function. If the walk function returns false the walk is ended early.
     * Returns true if the tree was completely walked and false if the walk was stopped early.
     * @param action
     * @param strategy
     * @returns
     */
    walk: (action: (node: TreeNode) => boolean, strategy?: TraversalStrategies) => boolean;
    /**
     * Like findAll but stops when the first node is found. Returns null if no node was found.
     * @param predicate
     * @param strategy
     * @returns
     */
    findFirst(predicate: (node: TreeNode) => boolean, strategy?: TraversalStrategies): TreeNode | null;
    /**
     * Returns an array of all nodes for which the given predicate function returned true.
     * The predicate function is called for every node in the subtree represented by this node and all children (recursively)
     * @param predicate
     * @returns
     */
    findAll(predicate: (node: TreeNode) => boolean): TreeNode[];
    /**
     * Drops the child node with the given index. Returns the dropped node.
     * Note that the dropped node has no parent anymore and therefore represents its own tree.
     * Therefore this method can be used to unmount a subtree too.
     * @param childIndex
     * @returns
     */
    dropChild(childIndex: number): TreeNode;
}
