angular-nested-combobox
=================

**angular-nested-combobox** is a custom drop-down list directive for AngularJs with nested elements. It can be used when
data have parents and children structure. Depth is determined by data. 

### Current Version 0.0.1

## Getting started

1. Link scripts:

```html
<link href="src/treeCombobox.css" rel="stylesheet" />
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.17/angular.min.js" ></script>
<script src="src/ng-tree-combobox.js"></script>
```

2. Add tree combo-box directive container directive: 
`<select-tree-combo-box control-class="col-md-7" change-event="changeItem"  collection="collection" current-member="filter.service" />`

3. Prepare input data and output event function :

```js
	// Display an info toast with no title
	angular.module('main', ['ng.tree.combobox'])
	.controller('myController', function($scope, toaster) {
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
                                      ]
	     $scope.changeItem=function(value){
                        $scope.selectedItem=value;
                    }
	});
```

## Author
**Maciej Jaskula**


## Copyright
Copyright © 2014 [Maciej Jaskula](https://twitter.com/matjaskula).

## License 
AngularJS-Toaster is under MIT license - http://www.opensource.org/licenses/mit-license.php