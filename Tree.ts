import { TreeNode } from "./TreeNode";

export class Tree {
    static parse(model : any, config = {dataFieldName : "nodeData", childrenFieldName : "children"}) : TreeNode | null {
        let children = model[config.childrenFieldName]
        if (children === null || children === undefined) {
            children = []
        }

        if (!Array.isArray(children)) {
            throw new Error('The child property is not of type array')
        }

        if (model[config.dataFieldName]) {
            let node = new TreeNode()
            node.setData(model[config.dataFieldName])
            for (let i = 0; i < children.length; i++) {
                let child = children[i]
                let childNode = Tree.parse(child, config)
                if (childNode) {
                    node.addChild(childNode)
                }
                
            }
            return node
        }

        return null
    }

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