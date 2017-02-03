var dataArray = [
	{
		"id":"parent1",
		"label":"Parent 1",
		"childNodes":[
			{
				"id":"child1p1",
				"label":"Child 1 Parent 1",
				"childNodes" : [
					{
						"id":"grandChild1c1p1",
						"label":"Grand Child 1 Child 1 Parent 1",
						"childNodes" : [],
						"nodeType":"leafNode"
					},
					{
						"id":"grandChild2c1p1",
						"label":"Grand Child 2 Child 1 Parent 1",
						"childNodes" : [],
						"nodeType":"leafNode"
					}
				]
			},
			{
				"id":"child2p1",
				"label":"Child 2 Parent 1",
				"childNodes" : [
					{
						"id":"grandChild1c2p1",
						"label":"Grand Child 1 Child 2 Parent 1",
						"childNodes" : []
					},
					{
						"id":"grandChild2c2p1",
						"childNodes" : [],
						"nodeType":"leafNode"
					}
				]
			}
		]
	},
	{
		"id":"parent2",
		"label":"Parent 2",
		"childNodes":[
			{
				"id":"child1p2",
				"label":"Child 1 Parent 2",
				"childNodes" : [
					{
						"id":"grandChild1c1p2",
						"label":"Grand Child 1 Child 1 Parent 2",
						"childNodes" : []
					},
					{
						"id":"grandChild2c1p2",
						"label":"Grand Child 2 Child 1 Parent 2",
						"childNodes" : []
					}
				]
			},
			{
				"id":"child2p2",
				"label":"Child 2 Parent 2",
				"childNodes" : [
					{
						"id":"grandChild1c2p2",
						"label":"Grand Child 1 Child 2 Parent 2",
						"childNodes" : []
					},
					{
						"id":"grandChild2c2p1",
						"childNodes" : []
					}
				]
			}
		]
	}
];

var iconObj = {
	"leafNode":{
		"open":"iconImageName",
		"close":"iconImageName",
		"both":"iconImageName"
	},
	"otherwise":{
		"open":"iconImageName",
		"close":"iconImageName",
		"both":"iconImageName"
	}
}

function createTree(){
	var tree = treeWidget(document.querySelector(".tree"), dataArray, iconObj);
	tree.generateTree();
	akshay = tree;
	console.log("Tree:",tree);
}
