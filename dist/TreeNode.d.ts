import { TraversalStrategies } from "./TraversalStrategies";
export declare class TreeNode {
    private nodeData;
    private childNodes;
    private parentNode;
    constructor(parentNode?: TreeNode | null);
    isRoot(): boolean;
    numChildren(): number;
    getChildren(): TreeNode[];
    _setParent(parent: TreeNode | null): void;
    /**
     * Adds the given child at the given index. -1 = end
     * @param child
     * @param index
     */
    addChild(child: TreeNode, index?: number): void;
    getData(): any;
    setData(nodeData: object): void;
    getPath(): TreeNode[];
    /**
     * Walks the tree with the given walk function. If the walk function returns false the walk is ended early.
     * Returns true if the tree was completely walked and false if the walk was stopped early.
     * @param action
     * @param strategy
     * @returns
     */
    walk: (action: (node: TreeNode) => boolean, strategy?: TraversalStrategies) => boolean;
    findFirst(predicate: (node: TreeNode) => boolean, strategy?: TraversalStrategies): TreeNode | null;
    findAll(predicate: (node: TreeNode) => boolean): TreeNode[];
    dropChild(childIndex: number): TreeNode;
}
