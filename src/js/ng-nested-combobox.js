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

			this.toggleBlur = function () {
				$timeout(function () {
					gs.isOpen = false;
				}, 200);
			};

			this.toggleFocus = function () {
				if ($scope.controlDisabled) {
					this.isOpen = false;
					return false;
				}
				gs.isOpen = false;
			};

			$scope.findNode = function (id, currentNode) {
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

			var linker = function (scope, iElement, iAttrs, ngModelController) {
				scope.ngModelController = ngModelController;

				if (!ngModelController) return;

				scope.selectValue = function (event, member) {

					if (angular.isFunction(scope.changeEvent)) {
						scope.changeEvent(member);
					}
					scope.ngModelController.$setViewValue(member);
					scope.ngModelController.$render();

				};

				function setCurrentItem(value){
					var node = null;
					if (scope.collection) {
						var searchId = angular.isObject(value)? value.id : value;
						if (!angular.isArray(scope.collection)) {
							scope.collection = [scope.collection];
						}
						for (var y = 0; y < scope.collection.length; y += 1) {
							var nd = scope.findNode(searchId, scope.collection[y]);
							if(nd)
								node = nd;
						}
						scope.selectValue(null, node)
					}
				}

				scope.$watch('model', function (value) {
					setCurrentItem(value)
				});

				scope.$watchCollection('collection', function () {
					if(scope.ngModelController.$modelValue){
						setCurrentItem(scope.ngModelController.$modelValue);
					}

					if (angular.isFunction(scope.changeEvent)) {
						scope.changeEvent();
					}
				})
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