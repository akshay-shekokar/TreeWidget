var treeWidget = function(tree,dataList,iconList){
	var currObj = this;
	var treeAreaNode = null;
	var searchItemIndex = -1, searchedNode = null;
	var searchBegAnchor = null;
	var searchNextAnchor = null;
	var nodeClickMethod = null;
	var nodeDblClickMethod = null;
	var nodeRightClickMethod = null;
	var treeNodesObj = {}, searchedNodeObj = {};
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
		createSearchBox();
		treeAreaNode = document.createElement("div");
		treeAreaNode.className = "TreeAreaNode";
		tree.appendChild(treeAreaNode);
		createTreeNodes(treeAreaNode, dataList, iconList);
	};
	
	var removeChildNodes = function(node){
		var firstChild = node.firstChild;
		while (firstChild) {
    		firstChild.childNodes.length > 0 ? removeChildNodes(firstChild) : node.removeChild(firstChild);
    		firstChild = node.firstChild;
		}
	};

	var refreshTree = function(){
		removeChildNodes(treeAreaNode);
		treeNodesObj = {};
		searchedNodeObj = {};
		searchItemIndex = -1;
		searchedNode = null;
		createTreeNodes(treeAreaNode, dataList, iconList);
	};

	var createTreeNodes = function(parentNode, data, iconListObj){
		for(var ind in data){
			var nodeDiv = document.createElement("div");
			nodeDiv.className = "nodeDiv";
			var nodeObj = {};
			var node = document.createElement("div");
			node.className = "node";
			node.id = data[ind].id;
			nodeObj["data-status"] = "open";
			//Code for adding icon for every node
				addIconDiv(node,data[ind],iconListObj, nodeObj);
			//Code Ends Here
			var nodeText = document.createElement("div");
			nodeText.className = "nodeText";
			nodeText.innerHTML = data[ind].label || data[ind].id;
			node.appendChild(nodeText);
			node.title = data[ind].label || data[ind].id;
			nodeObj["title"] = node.title;
			node.addEventListener("click",nodeClicked,false);
			node.addEventListener('dblclick', nodeDblClicked, false);
			node.addEventListener('contextmenu', nodeRightClicked, false);
			nodeDiv.appendChild(node);
			treeNodesObj[node.id] = nodeObj;
			var childNodeDiv = document.createElement("div");
			childNodeDiv.className = "childNodes";
			nodeDiv.appendChild(childNodeDiv);
			parentNode.appendChild(nodeDiv);
			
			createTreeNodes(childNodeDiv,data[ind].childNodes,iconListObj);
		}
		
	};
	
	var addIconDiv = function(node,data, iconListObj, nodeObj){
		var nodeType = data.nodeType;
		var iconImage = "";
		var nodeTypeIconObj = null;
		var getIconsFromDefault = true;
		var iconDivObj = {};
		if(nodeType && iconListObj){
			getIconsFromDefault = false;
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
				nodeObj["isLeafNode"] = false;
				//node.setAttribute("isLeafNode","false");
				node.style.backgroundColor = "#FAFAFA";
			}
			else{
				nodeTypeIconObj = getIconsFromDefault? defaultIconList["leafNode"] : nodeTypeIconObj;
				nodeObj["isLeafNode"] = true;
				//node.setAttribute("isLeafNode","true");
				node.style.backgroundColor = "#EEECED";
			}

		var iconDiv = document.createElement("img");
		iconDiv.className = "iconDiv";
		if(nodeTypeIconObj.close){
			//iconDiv.setAttribute("data-image-close",nodeTypeIconObj.close);
			iconDivObj["data-image-close"] = nodeTypeIconObj.close;
		}
		if(nodeTypeIconObj.both){
			iconDivObj["data-image-both"] = nodeTypeIconObj.both;
			//iconDiv.setAttribute("data-image-both",nodeTypeIconObj.both);
			//iconDiv.style.backgroundImage = "url('./"+nodeTypeIconObj.both+"')"
			iconDiv.setAttribute("src",nodeTypeIconObj.both);
		}
		if(nodeTypeIconObj.open){
			iconDivObj["data-image-open"] = nodeTypeIconObj.open;
			//iconDiv.setAttribute("data-image-open",nodeTypeIconObj.open);
			//iconDiv.style.backgroundImage = "url('./"+nodeTypeIconObj.open+"')"
			iconDiv.setAttribute("src",nodeTypeIconObj.open);
		}
		nodeObj["iconDivObj"] = iconDivObj;
		node.appendChild(iconDiv);
	};

	var nodeRightClicked = function(event){
		event.preventDefault();
		var clickedNodeObj = {};
		clickedNodeObj["node"] = this;
		clickedNodeObj["nodeObj"] = treeNodesObj[this.id];
		console.log("Right Click:",clickedNodeObj);
		nodeRightClickMethod && nodeRightClickMethod(event,clickedNodeObj);
    	return false;
	};

	var nodeDblClicked = function(event){
		var clickedNodeObj = {};
		clickedNodeObj["node"] = this;
		clickedNodeObj["nodeObj"] = treeNodesObj[this.id];
		console.log("Dbl Click:",clickedNodeObj);
		nodeDblClickMethod && nodeDblClickMethod(event, clickedNodeObj);
	};

	var nodeClicked = function(event){
		var nodeDivObj = treeNodesObj[this.id];
		var iconDivObj = nodeDivObj["iconDivObj"];
		var clickedNodeObj = {};
		clickedNodeObj["node"] = this;
		clickedNodeObj["nodeObj"] = nodeDivObj;
		console.log("Click:",clickedNodeObj);

		if(this.nextSibling && nodeDivObj["isLeafNode"] === false){
			var iconDiv = this.querySelector(".iconDiv");
			if(iconDivObj["data-image-both"]){
				//iconDiv.style.backgroundImage = "url('"+iconDiv.getAttribute("data-image-both")+"')";
				iconDiv.setAttribute("src",iconDivObj["data-image-both"]);//iconDiv.getAttribute("data-image-both"));
			}
			
			if(nodeDivObj["data-status"] === "close"){
				this.style.backgroundColor = "#FAFAFA";
				nodeDivObj["data-status"] = "open";//this.setAttribute("data-status","open");
				this.nextSibling.style.display = "block";
				if(iconDivObj["data-image-open"]){//iconDiv.getAttribute("data-image-open")){
					//iconDiv.style.backgroundImage = "url('"+iconDiv.getAttribute("data-image-open")+"')";
					iconDiv.setAttribute("src",iconDivObj["data-image-open"]);//iconDiv.getAttribute("data-image-open"));
				}
			}
			else{
				this.style.backgroundColor = "#CCCCCC";
				nodeDivObj["data-status"] = "close";//this.setAttribute("data-status","close");
				this.nextSibling.style.display = "none";
				if(iconDivObj["data-image-close"])//iconDiv.getAttribute("data-image-close")){
					//iconDiv.style.backgroundImage = "url('"+iconDiv.getAttribute("data-image-close")+"')"	;
					iconDiv.setAttribute("src",iconDivObj["data-image-close"]);//iconDiv.getAttribute("data-image-close"));
				
			}
		}
		nodeClickMethod && nodeClickedMethod(event,clickedNodeObj);
		console.log("Node Clicked:",clickedNodeObj,this.nextSibling);
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
			var nodeDivObj = treeNodesObj[nodeList[ind].id];
			if(nodeDivObj["title"].indexOf(searchValue) != -1){
				if(searchedNode){
					var isLeafNode = searchedNodeObj["isLeafNode"];
					if(isLeafNode == true || isLeafNode == "true")
						searchedNode.style.backgroundColor = "#eeeced";
					else{
						searchedNode.style.backgroundColor = "#fafafa";
						if(searchedNodeObj["data-status"]== "close")
							searchedNode.style.backgroundColor = "#ccc";
					}
					//searchedNode.setAttribute("id","");
				}
				nodeList[ind].style.backgroundColor = "#DEF2F9";
				searchedNode = nodeList[ind];
				searchedNodeObj = nodeDivObj;
				//searchedNode.setAttribute("id","nodeFound");
				searchBegAnchor.href="#"+nodeList[ind].id;
				searchNextAnchor.href="#"+nodeList[ind].id;
				searchItemIndex = ind;
				var parentNode = nodeList[ind];
				var clickableNodes = [];
				while(true){				
					parentNode = findParent(parentNode,"childNodes");
					if(parentNode != null){
						var parentNodePrevNodeObj = treeNodesObj[parentNode.previousSibling.id];
						if(parentNodePrevNodeObj["data-status"] === "close")
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
	/*var findParent = function (element, className) {
		while ((element = element.parentElement) && !element.classList.contains(className));
		return element;
	};*/
	var createSearchBox = function(){
		var searchBox = document.createElement("div");
		searchBox.className = "searchBox";
			var inputTag = document.createElement("input");
			inputTag.className = "searchInput";
			inputTag.setAttribute("type","text");
		searchBox.appendChild(inputTag);
			var searchNext = document.createElement("a");
			searchNext.className="searchNext";
			searchNext.innerHTML = "Search Next";
			searchNext.addEventListener("click",searchNextItemLocal,false);
		searchBox.appendChild(searchNext);
		var searchBeg = document.createElement("a");
			searchBeg.className="searchBeg";
			searchBeg.innerHTML = "Search";
			searchBeg.addEventListener("click",searchItemLocal,false);
		searchBox.appendChild(searchBeg);
		searchNextAnchor = searchNext;
		searchBegAnchor = searchBeg;
		tree.appendChild(searchBox);
	};
	var getTreeNode = function(){
		return tree;
	};
	var setTreeNode = function(clientTreeNode){
		tree = treeNode;
	};
	var getDataList = function(){
		return dataList;
	};
	var setDataList = function(clientDataList){
		dataList = clientDataList;
	};
	var getIconList = function(){
		return iconList;
	};
	var setIconList = function(clientIconList){
		iconList = clientIconList;
	};
	var setNodeClickedEvent = function(method){
		nodeClickMethod = method;
	};
	var setNodeDblClickedEvent = function(method){
		nodeDblClickMethod = method;
	};
	var setNodeRightClickedEvent = function(method){
		nodeRightClickMethod = method;
	};
	return {
		getTreeNode : getTreeNode,
		setTreeNode : setTreeNode,
		getDataList : getDataList,
		setDataList : setDataList,
		getIconList : getIconList,
		setIconList : setIconList,
		generateTree : generateTree,
		searchItem : searchItemLocal,
		searchNextItem : searchNextItemLocal,
		refreshTree : refreshTree,
		setNodeClickedEvent : setNodeClickedEvent,
		setNodeDblClickedEvent : setNodeDblClickedEvent,
		setNodeRightClickedEvent : setNodeRightClickedEvent
	};
}