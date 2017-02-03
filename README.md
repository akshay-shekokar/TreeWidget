# TreeWidget
This library can be used to create a TreeWidget

You can simply include this TreeWidget in your workpage, Follow the bellow steps:
1. Download treeWidget.js
2. Include it in your Web page
3. Create Tree object like this:
	var treeWidgetObj = treeWidget(treeDOMNode, dataArray, iconObj);
	i. treeDOMNode: This is HTML DOM, in which TreeWidget will be added.
	ii. dataArray: This is data epected by TreeWidget
	iii. iconObj: It is used for adding the customized Icons(More details are added below)
4. Call method on tree object.
	treeWidgetObj.generateTree();

