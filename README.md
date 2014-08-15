angular-nested-combobox
=================

**angular-nested-combobox** is a custom drop-down list directive for AngularJs with nested elements. It can be used when
data have parents and children structure. Depth is determined by data. 

## Demo

![angular-nested-combobox](https://github.com/matjas/angular-nested-combobox/blob/master/demo/demo_img.jpg)

## Getting started

1. Link scripts:

```html
<link href="src/nestedCombobox.css" rel="stylesheet" />
<!-- angular must load first -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.17/angular.min.js" ></script>
<script src="src/ng-nested-combobox.js"></script>
```

2. Add tree combo-box directive container directive: 
```html
<select-tree-combo-box control-class="col-md-7" change-event="changeItem"  collection="collection" current-member="filter.service" />
```

3. Prepare input data and output event function :

```js
	
	angular.module('main', ['ng.tree.combobox'])
	.controller('myController', function($scope) {
	    $scope.collection=[
	       {
           		  id:1,
           		  name:'item1',
           		  childrens:[
           			  {
           				  id:2,
           				  name:'item1_1'
           			  },
           			  {
           				  id:3,
           				  name:'item2_2'
           			  }
           
           		  ]
           
           	  },
           	  {
           		  id:4,
           		  name:'item2',
           		  childrens:[
           			  {
           				  id:5,
           				  name:'item2_1'
           			  },
           			  {
           				  id:6,
           				  name:'item2_2',
           				  childrens:[
           					  {
           						  id:7,
           						  name:'item2_2_1'
           					  },
           					  {
           						  id:8,
           						  name:'item2_2_2'
           					  }
           				  ]
           			  }
           		  ]
           }
        ];
         
	     $scope.changeItem=function(value){
                        $scope.selectedItem=value;
                    }
	    });
```
## Options

1. `control-disabled` - will disable control;
2. `change-event` - function name in your controller where receive selected data from control
3. `collection` - input data collection
4. `current-member` - selected data

## Author
**Maciej Jaskula**

## Copyright
Copyright © 2014 [Maciej Jaskula](https://twitter.com/matjaskula).

## License 
angular-nested-combobox is under MIT license - http://www.opensource.org/licenses/mit-license.php
