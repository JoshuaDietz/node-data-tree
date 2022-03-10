import { expect } from 'chai'
import {Tree} from '../Tree'
import { TreeNode } from '../TreeNode'

describe('', () => {
    let tree : TreeNode
    beforeEach(() => {
        tree = Tree.parse({
            nodeData : {
                key1 : "value of key 1",
                key2 : 42
            },
            children : [
                {
                    nodeData : {
                        key3 : "value of key 3",
                        key4 : true,
                        iWantToBeFound : true
                    },
                    children : [
                        {
                            nodeData : {
                                key5 : "value of key 5"
                            }
                        }
                    ]
                },

                {
                    nodeData : {
                        key6 : {
                            test : "ok"
                        },
                        iWantToBeFound : true
                    }
                }
            ]
        })
    })

    it('Should correctly output the path to a deep node', () => {
        let level0 = tree
        let level1 = tree.getChildren()[0]
        let level2 = level1.getChildren()[0]
        let path = level2.getPath()
        let intendedPath = [level0, level1, level2]
        expect(path).to.deep.equal(intendedPath)
    })

    it('Should correctly output the path to the root node', () => {
        let path = tree.getPath()
        expect(path).to.deep.equal([tree])
    })

    it('Should correctly walk the tree (pre)', () => {
        let nodesVisited : TreeNode[] = []
        let intendedVisitOrder : TreeNode[] = [tree, tree.getChildren()[0], tree.getChildren()[0].getChildren()[0], tree.getChildren()[1]]

        tree.walk((node) => {
            nodesVisited.push(node)
            return true
        })

        expect(nodesVisited).to.deep.equal(intendedVisitOrder)
    })

    it('Should correctly walk the tree (pre) and halt at the specific element', () => {
        let nodesVisited : TreeNode[] = []
        let stopNode = tree.getChildren()[0].getChildren()[0]
        let intendedVisitOrder : TreeNode[] = [tree, tree.getChildren()[0], stopNode]
        
        tree.walk((node) => {
            nodesVisited.push(node)
            if (node === stopNode) {
                return false
            }
            return true
        })

        expect(nodesVisited).to.deep.equal(intendedVisitOrder)
    })

    it('Should correctly find one element', () => {
        let nodeFound = tree.findFirst((node) => {
            if (node.getData().key5) {
                return true
            }
            return false
        })

        expect(nodeFound).to.equal(tree.getChildren()[0].getChildren()[0])
    })

    it('Should correctly find all elements', () => {
        let nodesFound = tree.findAll((node) => {
            if (node.getData().iWantToBeFound) {
                return true
            }
            return false
        })

        let intendedResult = [tree.getChildren()[0], tree.getChildren()[1]]
        expect(nodesFound).to.have.members(intendedResult)
    })

    it('Should find no element and return null if the element does not exist', () => {
        let nodeFound = tree.findFirst((node) => false)

        expect(nodeFound).to.be.null
    })

    it('Should find no elements and return an empty array if the element(s) do not exist', () => {
        let nodeFound = tree.findAll((node) => false)

        expect(nodeFound).to.be.empty
    })

    it('Num children', () => {
        expect(tree.numChildren()).to.equal(2)
        expect(tree.getChildren()[0].numChildren()).to.equal(1)
        expect(tree.getChildren()[1].numChildren()).to.equal(0)
    })

    it('Add child with default index', () => {
        let childNode = new TreeNode()
        childNode.setData({newlyAdded : true})

        tree.addChild(childNode)

        expect(tree.getChildren()[2]).to.equal(childNode)

        //check if the path of the child is correct
        expect(childNode.getPath()).to.deep.equal([tree, childNode])
    })

    it('Add child with another index', () => {
        let childNode = new TreeNode()
        childNode.setData({newlyAdded : true})

        let index = 1
        let childOccupyingIndex = tree.getChildren()[index]

        tree.addChild(childNode, index)

        expect(tree.getChildren()[index]).to.equal(childNode)

        //check if the path of the child is correct
        expect(childNode.getPath()).to.deep.equal([tree, childNode])

        //check if the node which was an that position before was moved one to the right
        expect(tree.getChildren()[index + 1]).to.equal(childOccupyingIndex)
    })

    it('Should drop a child node', () => {
        let droppedChild = tree.dropChild(1)

        let childShouldLookLike = new TreeNode()
        childShouldLookLike.setData({key6 : {test : "ok"}, iWantToBeFound : true})

        console.log('DroppedChild: ', droppedChild)
        console.log('childShouldLookLike: ', childShouldLookLike)

        expect(droppedChild.getData()).to.deep.equal(childShouldLookLike.getData())
        expect(droppedChild.isRoot()).to.be.true
        expect(tree.numChildren()).to.equal(1)
        expect(tree.getChildren()[0].getData()).to.deep.equal({
            key3 : "value of key 3",
            key4 : true,
            iWantToBeFound : true
        })
    })
})