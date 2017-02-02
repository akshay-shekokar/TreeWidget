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
						"label":"Grand Child 2 Child 2 Parent 1",
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
						"label":"Grand Child 2 Child 2 Parent 2",
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

var Tree = function(tree,data,icons){
	var dataList = data;
	var iconList = icons;
	var currObj = this;
	var treeAreaNode = null;
	var searchItemIndex = -1, searchedNode = null;
	var defaultIconList = {
				"nonLeafNode" : {
					"open":"parent_open.jpg",
					"close":"parent_close.jpg",
					"both":"parent_both.jpg"
				},
				"leafNode" : {
					"both":"file_icon.jpg"
				}
			};
			
	var generateTree = function (){
		//console.log("Default Function:",tree, dataList,iconList);
		createSearchBox(tree);
		treeAreaNode = document.createElement("div");
		treeAreaNode.className = "TreeAreaNode";
		tree.appendChild(treeAreaNode);
		createTreeNodes(treeAreaNode, dataList, iconList);
	};
	var setHierarchicalData = function(data){
		dataList = data;
	};
	var createTreeNodes = function(parentNode, data, iconListObj){
		//console.log("createTreeNodes:",parentNode, data)
		for(var ind in data){
			var nodeDiv = document.createElement("div");
			nodeDiv.className = "nodeDiv";
			var node = document.createElement("div");
			node.className = "node";
			node.setAttribute("data-status","open");	
			/*Code for adding icon for every node*/
				addIconDiv(node,data[ind],iconListObj);
				/*Code Ends Here*/
			var nodeText = document.createElement("div");
			nodeText.className = "nodeText";
			nodeText.innerHTML = data[ind].label;
			node.appendChild(nodeText);
			node.title = data[ind].label;
			node.addEventListener("click",nodeClicked,false);
			nodeDiv.appendChild(node);
			
			var childNodeDiv = document.createElement("div");
			childNodeDiv.className = "childNodes";
			nodeDiv.appendChild(childNodeDiv);
			parentNode.appendChild(nodeDiv);
			
			createTreeNodes(childNodeDiv,data[ind].childNodes,iconListObj);
		}
		
	};
	
	var addIconDiv = function(node,data, iconListObj){
		var nodeType = data.nodeType;
		var iconImage = "";
		var nodeTypeIconObj = null;
		var getIconsFromDefault = true;
		//console.log("iconListObj",iconListObj);
		if(nodeType && iconListObj){
			getIconsFromDefault = false;
			//console.log("Node Type:",nodeType,iconListObj[nodeType]);
			nodeTypeIconObj = iconListObj[nodeType];
			if(!nodeTypeIconObj){
				nodeTypeIconObj = iconListObj["otherwise"];
				//console.log("2. Node Type:",nodeType,iconListObj["otherwise"]);
				if(!nodeTypeIconObj){
					getIconsFromDefault = true;
				}
			}
			
		}
			if(data.childNodes.length > 0){
				nodeTypeIconObj = getIconsFromDefault? defaultIconList["nonLeafNode"] : nodeTypeIconObj;
				node.setAttribute("isLeafNode","false");
				node.style.backgroundColor = "#FAFAFA";
			}
			else{
				nodeTypeIconObj = getIconsFromDefault? defaultIconList["leafNode"] : nodeTypeIconObj;
				node.setAttribute("isLeafNode","true");
				node.style.backgroundColor = "#EEECED";
			}
			
		var iconDiv = document.createElement("img");
		iconDiv.className = "iconDiv";
		if(nodeTypeIconObj.close){
			iconDiv.setAttribute("data-image-close",nodeTypeIconObj.close);
		}
		if(nodeTypeIconObj.both){
			iconDiv.setAttribute("data-image-both",nodeTypeIconObj.both);
			//iconDiv.style.backgroundImage = "url('./"+nodeTypeIconObj.both+"')"
			iconDiv.setAttribute("src",nodeTypeIconObj.both);
		}
		if(nodeTypeIconObj.open){
			iconDiv.setAttribute("data-image-open",nodeTypeIconObj.open);
			//iconDiv.style.backgroundImage = "url('./"+nodeTypeIconObj.open+"')"
			iconDiv.setAttribute("src",nodeTypeIconObj.open);
		}
		node.appendChild(iconDiv);
	};
	
	var nodeClicked = function(){
		//console.log("Node Clicked:",this,this.nextSibling);
		if(this.nextSibling && this.getAttribute("isLeafNode") == "false"){
			var iconDiv = this.querySelector(".iconDiv");
			if(iconDiv.getAttribute("data-image-both")){
				//iconDiv.style.backgroundImage = "url('"+iconDiv.getAttribute("data-image-both")+"')";
				iconDiv.setAttribute("src",iconDiv.getAttribute("data-image-both"));
			}
			
			if(this.getAttribute("data-status") == "close"){
				this.style.backgroundColor = "#FAFAFA";
				this.setAttribute("data-status","open");
				this.nextSibling.style.display = "block";
				if(iconDiv.getAttribute("data-image-open")){
					//iconDiv.style.backgroundImage = "url('"+iconDiv.getAttribute("data-image-open")+"')";
					iconDiv.setAttribute("src",iconDiv.getAttribute("data-image-open"));
				}
			}
			else{
				this.style.backgroundColor = "#CCCCCC";
				this.setAttribute("data-status","close");
				this.nextSibling.style.display = "none";
				if(iconDiv.getAttribute("data-image-close")){
					//iconDiv.style.backgroundImage = "url('"+iconDiv.getAttribute("data-image-close")+"')"	;
					iconDiv.setAttribute("src",iconDiv.getAttribute("data-image-close"));
				}
			}
		}
	};
	var searchItemLocal = function(){
		searchNextItemLocal(true);
	};
	var searchNextItemLocal = function(searchFromStart){
		var nodeList = tree.querySelectorAll(".node");
		var searchValue = tree.querySelector(".searchInput").value;
		var ind = 0;
		//console.log("nodeList:",nodeList);
		if(searchFromStart === true){
			searchItemIndex = -1;
		}
		for(ind = searchItemIndex + 1; ind < nodeList.length; ind++){
			if(nodeList[ind].getAttribute("title").indexOf(searchValue) != -1){
				if(searchedNode){
					var isLeafNode = searchedNode.getAttribute("isLeafNode");
					if(isLeafNode == true || isLeafNode == "true")
						searchedNode.style.backgroundColor = "#eeeced";
					else{
						searchedNode.style.backgroundColor = "#fafafa";
						if(searchedNode.getAttribute("data-status")== "close")
							searchedNode.style.backgroundColor = "#ccc";
					}
					searchedNode.setAttribute("id","");
				}
				//console.log(nodeList[ind]);
				nodeList[ind].style.backgroundColor = "#DEF2F9";
				searchedNode = nodeList[ind];
				searchedNode.setAttribute("id","nodeFound");
				searchItemIndex = ind;
				var parentNode = nodeList[ind];
				var clickableNodes = [];
				while(true){				
					parentNode = findParent(parentNode,"childNodes");
					if(parentNode != null){
						if(parentNode.previousSibling.getAttribute("data-status") == "close")
							clickableNodes.push(parentNode.previousSibling);
					}
					else{
						break;
					}
				}
				//console.log("Clickable Nodes:",clickableNodes);
				for(var cInd = 0; cInd < clickableNodes.length; cInd++){
					clickableNodes[cInd].click();
				}
				break;
			}
			window.location.hash = "nodeFound";
		}
	};
	var findParent = function (element, className) {
		while ((element = element.parentElement) && !element.classList.contains(className));
		return element;
	};
	var createSearchBox = function(node){
		var searchBox = document.createElement("div");
		searchBox.className = "searchBox";
			var inputTag = document.createElement("input");
			inputTag.className = "searchInput";
			inputTag.setAttribute("type","text");
		searchBox.appendChild(inputTag);
			var searchNext = document.createElement("div");
			searchNext.className="searchNext";
			searchNext.innerHTML = "Search Next";
			searchNext.addEventListener("click",searchNextItemLocal,false);
		searchBox.appendChild(searchNext);
		var searchBeg = document.createElement("div");
			searchBeg.className="searchBeg";
			searchBeg.innerHTML = "Search";
			searchBeg.addEventListener("click",searchItemLocal,false);
		searchBox.appendChild(searchBeg);
		
		node.appendChild(searchBox);
	};
	return {
		treeNode : tree,
		dataList : dataList,
		iconList : iconList,
		generateTree : generateTree,
		searchItem : searchItemLocal,
		searchNextItem : searchNextItemLocal
	};
}

function createTree(){
	var tree = new Tree(document.querySelector(".tree"), dataArray, iconObj);
	tree.generateTree();
	//console.log("Tree:",tree);
}
