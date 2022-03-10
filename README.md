# node-data-tree
A library to implement tree-like structures in node.js

Note that this library is *not* extensively tested (look at the tests) and is not feature-complete either. For now, I just implemented the features that I needed.

Usage:
------
For a more detailed function overview please take a look at the jsdoc comments in Tree.ts and TreeNode.ts
### Installation

    npm i --save node-data-tree
### Example
    import {Tree, TreeNode} from 'node-data-tree'

    let tree = Tree.parse({
        nodeData : {
            someData : "some String"
        },
        children : [
            {
                nodeData : {
                    someOtherData : 42
                }
            }
        ]
    })

    let anotherNode = Tree.parse({nodeData : {someMoreData : "xyz"}})

    tree.addChild(anotherNode)


