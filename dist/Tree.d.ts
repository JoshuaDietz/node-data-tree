import { TreeNode } from "./TreeNode";
export declare class Tree {
    static parse(model: any, config?: {
        dataFieldName: string;
        childrenFieldName: string;
    }): TreeNode | null;
    static toJson(node: TreeNode, dataCopyFunction: (nodeData: object) => object, config?: {
        dataFieldName: string;
        childrenFieldName: string;
    }): object;
}
