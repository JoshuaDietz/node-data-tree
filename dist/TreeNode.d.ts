import { TraversalStrategies } from "./TraversalStrategies";
export declare class TreeNode {
    private nodeData;
    private childNodes;
    private parentNode;
    constructor(parentNode?: TreeNode | null);
    isRoot(): boolean;
    numChildren(): number;
    getChildren(): TreeNode[];
    /**
     * Adds the given child at the given index. -1 = end
     * @param child
     * @param index
     */
    addChild(child: TreeNode, index?: number): void;
    getData(): object;
    setData(nodeData: object): void;
    getPath(): TreeNode[];
    walk(action: (node: TreeNode) => boolean, strategy?: TraversalStrategies): void;
    findFirst(predicate: (node: TreeNode) => boolean, strategy?: TraversalStrategies): TreeNode | null;
    findAll(predicate: (node: TreeNode) => boolean): TreeNode[];
    dropChild(childIndex: number): void;
}
