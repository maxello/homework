'use strict';

(function (){
	var ESC_KEYCODE = 27;
	function ContextMenu(requiresMenu, menuExample){
		this.root = requiresMenu;
		this.menu = this.createMenu(menuExample);
		document.body.appendChild(this.menu);
		this.root.addEventListener('contextmenu', this.menuPosition.bind(this), false);
		document.documentElement.addEventListener('click', this.onGlobalClick.bind(this), false);
		document.documentElement.addEventListener('keyup', this.onGlobalKeyUp.bind(this), false);
	}
	ContextMenu.prototype.createMenu = function(structure) {
		var listContainer = document.createElement('ul');
		listContainer.className = 'context-menu';
		var itemContainer;
		var submenuArrow;
		for (var i = 0; i < structure.length; i += 1) {
			itemContainer = document.createElement('li');
			itemContainer.textContent = structure[i].title;
			if (structure[i].hasOwnProperty('submenu')) {
				submenuArrow = document.createElement('span');
				submenuArrow.textContent = '→';
				itemContainer.className = 'submenu-list';
				itemContainer.appendChild(this.createMenu(structure[i].submenu));
				itemContainer.appendChild(submenuArrow);
				itemContainer.addEventListener('mouseenter', function(event) {
					this.firstElementChild.style.display = 'block';
				}, false);
				itemContainer.addEventListener('mouseleave', function(event) {
					this.firstElementChild.style.display = 'none';
				}, false);
			}
			else {
				itemContainer.addEventListener('click', structure[i].action, false);	
			}
			listContainer.appendChild(itemContainer);
		}
		return listContainer;
	};

	ContextMenu.prototype.menuPosition = function(event){
		event.preventDefault();
		var x = event.pageX + 'px';
		var y = event.pageY + 'px';
		this.show(x, y);
	};

	ContextMenu.prototype.onGlobalClick = function(event){
		var menu = this.menu;
		if(!topWalker(event.target, function(node) {
			return menu === node;
		})) 
		this.hide();
	};

	ContextMenu.prototype.onGlobalKeyUp = function(event){
		if(event.keyCode === ESC_KEYCODE) {
			this.hide();
		}
	};

	ContextMenu.prototype.show = function(left, top){
		this.menu.style.display = 'block';
		this.menu.style.left = left;
		this.menu.style.top = top;
	};

	ContextMenu.prototype.hide = function(){
		this.menu.style.display = 'none';
	};

	window.ContextMenu = ContextMenu;

	function topWalker(node, testFunc, lastParent){
		while(node && node !== lastParent){
			if(testFunc(node)) {
				return node;
			}
			node = node.parentNode;
		}
	}
})();





































/*
function contextMenu(requiresMenu, menuExample) {

	function createMenu(menuExample) {
		var listContainer = document.createElement('ul');
		var itemContainer;
		for (var i = 0; i < menuExample.length; i += 1) {
			itemContainer = document.createElement('li');
			listContainer.appendChild(itemContainer);
			if (menuExample[i].hasOwnProperty('submenu')) {
				itemContainer.textContent = '> ' + menuExample[i].title;
				itemContainer.appendChild(createMenu(menuExample[i].submenu));
				itemContainer.firstElementChild.className += 'submenu-list';
				itemContainer.firstElementChild.style.display = 'none';
				itemContainer.addEventListener('mouseenter', function(event) {
					this.firstElementChild.style.display = '';
				}, false);
				itemContainer.addEventListener('mouseleave', function(event) {
					this.firstElementChild.style.display = 'none';
				}, false);
			} else {
				if (menuExample[i].hasOwnProperty('action')) {
					itemContainer.addEventListener('click', menuExample[i].action, false);
				}
				itemContainer.textContent = menuExample[i].title;
			}
			listContainer.appendChild(itemContainer);
		}
		return listContainer;
	}

	var menu = createMenu(menuExample);
	menu.className += 'menu';
	document.body.appendChild(menu);
	requiresMenu.addEventListener('contextmenu', function(event) {
		event.preventDefault();
		menu.style.display = 'block';
		menu.style.left = event.clientX + 'px';
		menu.style.top = event.clientY + 'px';
	}, false);
	document.addEventListener('click', function(event) {
		menu.style.display = 'none';
	}, false);
}
contextMenu(requiresMenu, menuExample);
*/
