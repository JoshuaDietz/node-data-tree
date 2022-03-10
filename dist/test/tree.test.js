"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Tree_1 = require("../Tree");
const tree1Naming1 = {
    nodeData: {
        key1: "value of key 1",
        key2: 42
    },
    children: [
        {
            nodeData: {
                key3: "value of key 3",
                key4: true
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
                }
            }
        }
    ]
};
const tree1Naming1ChildrenEverywhere = {
    nodeData: {
        key1: "value of key 1",
        key2: 42
    },
    children: [
        {
            nodeData: {
                key3: "value of key 3",
                key4: true
            },
            children: [
                {
                    nodeData: {
                        key5: "value of key 5"
                    },
                    children: []
                }
            ]
        },
        {
            nodeData: {
                key6: {
                    test: "ok"
                }
            },
            children: []
        }
    ]
};
const tree1Naming2 = {
    otherNodeData: {
        key1: "value of key 1",
        key2: 42
    },
    otherChildren: [
        {
            otherNodeData: {
                key3: "value of key 3",
                key4: true
            },
            otherChildren: [
                {
                    otherNodeData: {
                        key5: "value of key 5"
                    }
                }
            ]
        },
        {
            otherNodeData: {
                key6: {
                    test: "ok"
                }
            }
        }
    ]
};
const tree1Naming2ChildrenEverywhere = {
    otherNodeData: {
        key1: "value of key 1",
        key2: 42
    },
    otherChildren: [
        {
            otherNodeData: {
                key3: "value of key 3",
                key4: true
            },
            otherChildren: [
                {
                    otherNodeData: {
                        key5: "value of key 5"
                    },
                    otherChildren: []
                }
            ]
        },
        {
            otherNodeData: {
                key6: {
                    test: "ok"
                }
            },
            otherChildren: []
        }
    ]
};
describe('Testing the parser', () => {
    it('Should successfully parse the tree', () => {
        let tree = Tree_1.Tree.parse(tree1Naming1);
        (0, chai_1.expect)(tree.getData()).to.deep.equal({ key1: "value of key 1", key2: 42 });
        (0, chai_1.expect)(tree.getChildren()[0].getChildren()[0].getData()).to.deep.equal({ key5: "value of key 5" });
    });
    it('Should successfully parse the tree with alternate field names', () => {
        let tree = Tree_1.Tree.parse(tree1Naming2, { dataFieldName: "otherNodeData", childrenFieldName: "otherChildren" });
        (0, chai_1.expect)(tree.getData()).to.deep.equal({ key1: "value of key 1", key2: 42 });
        (0, chai_1.expect)(tree.getChildren()[0].getChildren()[0].getData()).to.deep.equal({ key5: "value of key 5" });
    });
});
describe('Testing toJson', () => {
    let tree1;
    let tree2;
    beforeEach(() => {
        tree1 = Tree_1.Tree.parse(tree1Naming1);
        tree2 = Tree_1.Tree.parse(tree1Naming2, { dataFieldName: "otherNodeData", childrenFieldName: "otherChildren" });
    });
    it('Should successfully export the tree with reference data-copy and default names', () => {
        let json = Tree_1.Tree.toJson(tree1, (data) => data);
        (0, chai_1.expect)(json).to.deep.equal(tree1Naming1ChildrenEverywhere);
        //ensure that the data nodes are the same reference
        (0, chai_1.expect)(json.children[0].nodeData).to.equal(tree1Naming1.children[0].nodeData);
    });
    it('Should successfully export the tree with deep data-copy and default names', () => {
        let json = Tree_1.Tree.toJson(tree1, (data) => {
            return Object.assign({}, data);
        });
        (0, chai_1.expect)(json).to.deep.equal(tree1Naming1ChildrenEverywhere);
        //ensure that the data nodes have the same data but are not the same reference
        (0, chai_1.expect)(json.children[0].nodeData).to.deep.equal(tree1Naming1.children[0].nodeData);
        (0, chai_1.expect)(json.children[0].nodeData).to.not.equal(tree1Naming1.children[0].nodeData);
    });
    it('Should successfully export the tree with reference data-copy and non-default names', () => {
        let json = Tree_1.Tree.toJson(tree1, (data) => data, { dataFieldName: 'otherNodeData', childrenFieldName: 'otherChildren' });
        (0, chai_1.expect)(json).to.deep.equal(tree1Naming2ChildrenEverywhere);
        //ensure that the data nodes are the same reference
        (0, chai_1.expect)(json.otherChildren[0].otherNodeData).to.equal(tree1Naming1.children[0].nodeData); //have to use naming variant 1 here because tree1 was the origin
    });
    it('Should successfully export the tree with deep data-copy and non-default names', () => {
        let json = Tree_1.Tree.toJson(tree1, (data) => {
            return Object.assign({}, data);
        }, { dataFieldName: 'otherNodeData', childrenFieldName: 'otherChildren' });
        (0, chai_1.expect)(json).to.deep.equal(tree1Naming2ChildrenEverywhere);
        //ensure that the data nodes have the same data but are not the same reference
        (0, chai_1.expect)(json.otherChildren[0].otherNodeData).to.deep.equal(tree1Naming2.otherChildren[0].otherNodeData);
        (0, chai_1.expect)(json.otherChildren[0].otherNodeData).to.not.equal(tree1Naming2.otherChildren[0].otherNodeData);
    });
    it('Should export a tree to json, parse it, export it again and have it the same after that', () => {
        let json = Tree_1.Tree.toJson(tree1, (data) => {
            return Object.assign({}, data);
        });
        let parsedTree = Tree_1.Tree.parse(json);
        let secondJson = Tree_1.Tree.toJson(parsedTree, (data) => {
            return Object.assign({}, data);
        });
        (0, chai_1.expect)(json).to.deep.equal(secondJson);
    });
});
