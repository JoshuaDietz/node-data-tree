import { TreeNode } from "./TreeNode";

/**
 * Not intended to be instantiated, just a container for it's static methods
 */
export abstract class Tree {

    /**
     * Parses the given object structure into a new tree. By default the field "nodeData" is used for the data of the node and the field "children" is the array of children
     * which can contain nodes with the fields "nodeData" and "children" itself. The names of the node data and children fields can be altered by specifying an optional config 
     * object as second parameter Looking like this:
     *  {
     *    dataFieldName : "anotherNameForTheDataField",
     *    ChildrenFieldName : "anotherNameForTheChildrenField"
     *  }
     * 
     * 
     * @param model 
     * @param config 
     * @param parentNode Do not use this, it's only for the internal recursion
     * @returns 
     */
    static parse(model : any, config = {dataFieldName : "nodeData", childrenFieldName : "children"}, parentNode : TreeNode | null = null) : TreeNode {
        let children = model[config.childrenFieldName]
        if (children === null || children === undefined) {
            children = []
        }

        if (!Array.isArray(children)) {
            throw new Error('The child property is not of type array')
        }

        if (model[config.dataFieldName]) {
            let node = new TreeNode(parentNode)
            node.setData(model[config.dataFieldName])
            for (let i = 0; i < children.length; i++) {
                let child = children[i]
                if (child[config.dataFieldName]) {
                    let childNode = Tree.parse(child, config, node)
                    node.addChild(childNode)
                }
                
                
            }
            return node
        } else {
            throw new Error('No data field present. Maybe you are using alternative data-field names and forgot to supply the configuration object necessary')
        }
    }

    /**
     * Converts the given tree structure to a normal object structure.
     * The second parameter is a function which is responsible for copying the node data. This enables the user to specify how copying should be done, i.e. if just the object reference should be copied or if a real copy should be created. Examples:
     * 
     * Reference:
     * (nodeData) => nodeData
     * 
     * Real copy:
     * (nodeData) => {
     *    return Object.assign({}, nodeData)
     * }
     * 
     * The last parameter is an optional object specifying how the data and children field should be called in the resulting object. The default names are "nodeData" and "children" respectively.
     * The configuration object needs to look like this:
     * {
     *   dataFieldName : "alternativeNameForNodeData",
     *   childrenFieldName : "alternativeNameForChildren"
     * }
     * 
     * @param node 
     * @param dataCopyFunction 
     * @param config 
     * @returns 
     */
    static toJson(node : TreeNode, dataCopyFunction : (nodeData : object) => object, config = {dataFieldName : "nodeData", childrenFieldName : "children"}) : object {
        let json : any = {}
        json[config.dataFieldName] = dataCopyFunction(node.getData())
        json[config.childrenFieldName] = []
        
        let nodeChildren = node.getChildren()
        for (let i = 0; i < nodeChildren.length; i++) {
            let child = nodeChildren[i]
            let childJson = Tree.toJson(child, dataCopyFunction, config)
            json[config.childrenFieldName].push(childJson)
        }

        return json
    }

}