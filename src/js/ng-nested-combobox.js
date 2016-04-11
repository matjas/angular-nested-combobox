(function (window, angular, undefined) {
    'use strict';

    angular.module('ui.nested.combobox', [])
        .constant('nestedComboBoxConfig', {
            options: {
                childrenParam: 'children'
            }
        })
        .controller('NestedComboBoxController', ['$scope', '$element', '$attrs', 'nestedComboBoxConfig', function ($scope, $element, $attrs, nestedComboBoxConfig) {
            'use strict';
            var that = this,
                oldMemberId = null;
            this.isOpen = false;
            this.options = angular.isDefined($scope.options) ? $scope.options : nestedComboBoxConfig.options;
            this.selectedItem = {};
            var node = {};

            $scope.$watch('collection', function(value){
                for(var i = 0; i < $scope.collection.length; i +=1 ) {
                    node = findNode($scope.nsNgModel, $scope.collection[i]);
                }
                angular.extend(that.selectedItem, node);
            });


            this.toggleOpen = function () {

                if ($scope.controlDisabled) {
                    this.isOpen = false;
                    return false;
                }
                this.isOpen = !this.isOpen;
            };

            this.selectValue = function (event, member) {

                if (oldMemberId === member.id) {
                    return true;
                }
                
                $scope.changeEvent(member);
                angular.extend(that.selectedItem, member);
                $scope.nsNgModel = member.id;
                oldMemberId = member.id;

            };

            function findNode(id, currentNode) {
                var i,
                    currentChild,
                    result;

                if (currentNode){
                    if (id == currentNode.id) {
                        return currentNode;
                    } else {

                        if(currentNode[that.options.childrenParam]) {
                            for (i = 0; i < currentNode[that.options.childrenParam].length; i += 1) {
                                currentChild = currentNode[that.options.childrenParam][i];
                                // Search in the current child
                                result = findNode(id, currentChild);

                                // Return the result if the node has been found
                                if (result !== false) {
                                    return result;
                                }
                            }
                        }
                        // The node has not been found and we have no more options
                        return false;
                    }
                }

            }
        }])
        .directive('nestedComboBox', ['$templateCache', function ($templateCache) {
            'use strict';

            return {
                restrict: 'E',
                controller: 'NestedComboBoxController',
                controllerAs: 'gs',
                replace: true,
                template: $templateCache.get('select-group.html'),
                scope: {
                    collection: '=?',
                    controlClass: '@?',
                    controlDisabled: '=?',
                    changeEvent: '=?',
                    options: '=?',
                    nsNgModel: '=?'
                }
            };
        }]);
})(window, window.angular);