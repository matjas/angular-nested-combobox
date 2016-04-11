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
            this.currentMember = $scope.currentMember;
            this.options = angular.isDefined($scope.options) ? $scope.options : nestedComboBoxConfig.options;


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

                if (member.id === 'root') {
                    member.name = event.currentTarget.innerText;
                }
                $scope.changeEvent(member);
                that.currentMember = member;
                oldMemberId = member.id;

            };
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
                    currentMember: '=?',
                    controlClass: '@?',
                    controlDisabled: '=?',
                    changeEvent: '=?',
                    options: '=?'
                }
            };
        }]);
})(window, window.angular);