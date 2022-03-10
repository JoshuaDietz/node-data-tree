# node-tree
A library to implement tree-like structures in node.js

Note that this library is *not* extensively tested (look at the tests) and it not feature-complete either. I for now just implemented the features that I needed.

Usage:
------
For a more detailed function overview please take a look at the jsdoc comments in Tree.ts and TreeNode.ts
### Example
    import {Tree, TreeNode} from '/path/to/index.js'

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


