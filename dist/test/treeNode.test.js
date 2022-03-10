"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Tree_1 = require("../Tree");
const TreeNode_1 = require("../TreeNode");
describe('', () => {
    let tree;
    beforeEach(() => {
        tree = Tree_1.Tree.parse({
            nodeData: {
                key1: "value of key 1",
                key2: 42
            },
            children: [
                {
                    nodeData: {
                        key3: "value of key 3",
                        key4: true,
                        iWantToBeFound: true
                    },
                    children: [
                        {
                            nodeData: {
                                key5: "value of key 5"
                            }
                        }
                    ]
                },
                {
                    nodeData: {
                        key6: {
                            test: "ok"
                        },
                        iWantToBeFound: true
                    }
                }
            ]
        });
    });
    it('Should correctly output the path to a deep node', () => {
        let level0 = tree;
        let level1 = tree.getChildren()[0];
        let level2 = level1.getChildren()[0];
        let path = level2.getPath();
        let intendedPath = [level0, level1, level2];
        (0, chai_1.expect)(path).to.deep.equal(intendedPath);
    });
    it('Should correctly output the path to the root node', () => {
        let path = tree.getPath();
        (0, chai_1.expect)(path).to.deep.equal([tree]);
    });
    it('Should correctly walk the tree (pre)', () => {
        let nodesVisited = [];
        let intendedVisitOrder = [tree, tree.getChildren()[0], tree.getChildren()[0].getChildren()[0], tree.getChildren()[1]];
        tree.walk((node) => {
            nodesVisited.push(node);
            return true;
        });
        (0, chai_1.expect)(nodesVisited).to.deep.equal(intendedVisitOrder);
    });
    it('Should correctly walk the tree (pre) and halt at the specific element', () => {
        let nodesVisited = [];
        let stopNode = tree.getChildren()[0].getChildren()[0];
        let intendedVisitOrder = [tree, tree.getChildren()[0], stopNode];
        tree.walk((node) => {
            nodesVisited.push(node);
            if (node === stopNode) {
                return false;
            }
            return true;
        });
        (0, chai_1.expect)(nodesVisited).to.deep.equal(intendedVisitOrder);
    });
    it('Should correctly find one element', () => {
        let nodeFound = tree.findFirst((node) => {
            if (node.getData().key5) {
                return true;
            }
            return false;
        });
        (0, chai_1.expect)(nodeFound).to.equal(tree.getChildren()[0].getChildren()[0]);
    });
    it('Should correctly find all elements', () => {
        let nodesFound = tree.findAll((node) => {
            if (node.getData().iWantToBeFound) {
                return true;
            }
            return false;
        });
        let intendedResult = [tree.getChildren()[0], tree.getChildren()[1]];
        (0, chai_1.expect)(nodesFound).to.have.members(intendedResult);
    });
    it('Should find no element and return null if the element does not exist', () => {
        let nodeFound = tree.findFirst((node) => false);
        (0, chai_1.expect)(nodeFound).to.be.null;
    });
    it('Should find no elements and return an empty array if the element(s) do not exist', () => {
        let nodeFound = tree.findAll((node) => false);
        (0, chai_1.expect)(nodeFound).to.be.empty;
    });
    it('Num children', () => {
        (0, chai_1.expect)(tree.numChildren()).to.equal(2);
        (0, chai_1.expect)(tree.getChildren()[0].numChildren()).to.equal(1);
        (0, chai_1.expect)(tree.getChildren()[1].numChildren()).to.equal(0);
    });
    it('Add child with default index', () => {
        let childNode = new TreeNode_1.TreeNode();
        childNode.setData({ newlyAdded: true });
        tree.addChild(childNode);
        (0, chai_1.expect)(tree.getChildren()[2]).to.equal(childNode);
        //check if the path of the child is correct
        (0, chai_1.expect)(childNode.getPath()).to.deep.equal([tree, childNode]);
    });
    it('Add child with another index', () => {
        let childNode = new TreeNode_1.TreeNode();
        childNode.setData({ newlyAdded: true });
        let index = 1;
        let childOccupyingIndex = tree.getChildren()[index];
        tree.addChild(childNode, index);
        (0, chai_1.expect)(tree.getChildren()[index]).to.equal(childNode);
        //check if the path of the child is correct
        (0, chai_1.expect)(childNode.getPath()).to.deep.equal([tree, childNode]);
        //check if the node which was an that position before was moved one to the right
        (0, chai_1.expect)(tree.getChildren()[index + 1]).to.equal(childOccupyingIndex);
    });
    it('Should drop a child node', () => {
        let droppedChild = tree.dropChild(1);
        let childShouldLookLike = new TreeNode_1.TreeNode();
        childShouldLookLike.setData({ key6: { test: "ok" }, iWantToBeFound: true });
        console.log('DroppedChild: ', droppedChild);
        console.log('childShouldLookLike: ', childShouldLookLike);
        (0, chai_1.expect)(droppedChild.getData()).to.deep.equal(childShouldLookLike.getData());
        (0, chai_1.expect)(droppedChild.isRoot()).to.be.true;
        (0, chai_1.expect)(tree.numChildren()).to.equal(1);
        (0, chai_1.expect)(tree.getChildren()[0].getData()).to.deep.equal({
            key3: "value of key 3",
            key4: true,
            iWantToBeFound: true
        });
    });
});
