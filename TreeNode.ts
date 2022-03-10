import { TraversalStrategies } from "./TraversalStrategies"

export class TreeNode {
    private nodeData : object
    private childNodes : TreeNode[]
    private parentNode : TreeNode | null

    constructor(parentNode : TreeNode | null = null) {
        this.nodeData = {}
        this.childNodes = []
        this.parentNode = parentNode
    }


    isRoot() : boolean {
        return this.parentNode === null
    }

    numChildren() : number {
        return this.childNodes.length
    }

    getChildren() : TreeNode[] {
        return this.childNodes
    }

    _setParent(parent : TreeNode | null) {
        //only to be used by dropChild
        this.parentNode = parent
    }

    /**
     * Adds the given child at the given index. -1 = end
     * @param child 
     * @param index 
     */
    addChild(child : TreeNode, index = -1) {
        if (index === -1) {
            child._setParent(this)
            this.childNodes.push(child)
            return
        }

        if (index > this.childNodes.length) {
            throw new Error("Index out of range")
        }

        child._setParent(this)
        this.childNodes.splice(index, 0, child)
    }

    getData() : any {
        return this.nodeData
    }

    setData(nodeData : object) : void {
        this.nodeData = nodeData
    }


    getPath() : TreeNode[] {
        if (this.isRoot()) {
            return [this]
        }

        let pathToParent = (this.parentNode as TreeNode).getPath()
        return [...pathToParent, this]
    }

    /**
     * Walks the tree with the given walk function. If the walk function returns false the walk is ended early.
     * Returns true if the tree was completely walked and false if the walk was stopped early.
     * @param action 
     * @param strategy 
     * @returns 
     */
    walk = (action : (node : TreeNode) => boolean, strategy = TraversalStrategies.PRE) : boolean => {
        //walk all child elements (and their children etc)

        if (strategy === TraversalStrategies.PRE) {
            let exitEarly = !action(this)
            if (exitEarly) {
                return false
            }

            for (let i = 0; i < this.childNodes.length; i++) {
                let node = this.childNodes[i]
                let continueWalk = node.walk(action, strategy)
                if (!continueWalk) {
                    return false
                }
            }
        }

        return true
    }

    findFirst(predicate : (node : TreeNode) => boolean, strategy = TraversalStrategies.PRE) : TreeNode | null {
        let result : TreeNode | null = null 
        this.walk((node) => {
            if (predicate(node)) {
                //found
                result = node
                return false //to halt the walk
            }
            return true
        })
        return result
    }

    findAll(predicate : (node : TreeNode) => boolean) : TreeNode[] {
        let result : TreeNode[] = []
        this.walk((node) => {
            if (predicate(node)) {
                //found
                result.push(node)
            }
            return true
        })
        return result
    }

    dropChild(childIndex : number) {
        let child = this.childNodes[childIndex]
        this.childNodes.splice(childIndex, 1);
        child._setParent(null)
        return child
    }


}