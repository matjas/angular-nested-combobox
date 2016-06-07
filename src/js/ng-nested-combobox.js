(function (window, angular, undefined) {
    'use strict';

    angular.module('ui.nested.combobox', [])
        .constant('nestedComboBoxConfig', {
            options: {
                childrenParam: 'children'
            }
        })
        .controller('NestedComboBoxController', ['$scope', '$element', '$attrs', 'nestedComboBoxConfig', '$timeout', function ($scope, $element, $attrs, nestedComboBoxConfig, $timeout) {
            'use strict';
            var gs = this;
            this.isOpen = false;
            this.options = angular.isDefined($scope.options) ? $scope.options : nestedComboBoxConfig.options;

            this.toggleOpen = function () {
                if ($scope.controlDisabled) {
                    this.isOpen = false;
                    return false;
                }
                this.isOpen = !this.isOpen;
            };

            this.toggleBlur = function() {
                $timeout(function (){
                    gs.isOpen = false;
                }, 200);
            };

            this.toggleFocus = function(){
                if ($scope.controlDisabled) {
                    this.isOpen = false;
                    return false;
                }
                gs.isOpen = false;
            };

            $scope.findNode = function(id, currentNode) {
                var i,
                    currentChild,
                    result;

                    if (id === currentNode.id) {
                        return currentNode;
                    } else {

                        if (angular.isArray(currentNode[gs.options.childrenParam])) {
                            for (i = 0; i < currentNode[gs.options.childrenParam].length; i += 1) {
                                currentChild = currentNode[gs.options.childrenParam][i];
                                // Search in the current child
                                result = $scope.findNode(id, currentChild);
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
        }])
        .directive('nestedComboBox', ['$templateCache', function ($templateCache) {
            'use strict';

            var linker = function (scope, iElement, iAttrs, ngModelController){
                scope.ngModelController = ngModelController;
                var oldMemberId = null;
                var node = false;

                scope.selectValue = function (event, member) {

                    if (oldMemberId === member.id) {
                        return true;
                    }
                    if(angular.isFunction(scope.changeEvent)){
                        scope.changeEvent(member);
                    }
                    scope.ngModelController.$setViewValue(member);
                    scope.ngModelController.$render();
                    oldMemberId = member.id;

                };

                scope.$watch('model', function(value){
                    if(scope.collection){
                        if(!angular.isArray(scope.collection)){
                            scope.collection = [scope.collection];
                        }
                        for(var y = 0; y < scope.collection.length; y += 1 ) {
                            node = scope.findNode(value, scope.collection[y]);
                            if(node !== false){
                                scope.ngModelController.$setViewValue(node);
                                scope.ngModelController.$render();
                                if(angular.isFunction(scope.changeEvent)){
                                    scope.changeEvent(node);
                                }
                            }
                        }
                    }
                });
            };

            return {
                restrict: 'E',
                controller: 'NestedComboBoxController',
                controllerAs: 'gs',
                link: linker,
                require: 'ngModel',
                replace: true,
                template: $templateCache.get('select-group.html'),
                scope: {
                    collection: '=?',
                    controlClass: '@?',
                    controlDisabled: '=?',
                    changeEvent: '=?',
                    options: '=?',
                    model: '=ngModel'
                }
            };
        }]);
})(window, window.angular);