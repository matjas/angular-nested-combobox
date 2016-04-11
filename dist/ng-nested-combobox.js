(function (window, angular, undefined) {
    'use strict';

    angular.module('ui.nested.combobox', [])
        .constant('nestedComboboxConfig', {
            options: {
                childrenParam: 'childrens'
            }
        })
        .controller('NestedComboboxController', ['$scope', '$element', '$attrs', 'nestedComboboxConfig', function ($scope, $element, $attrs, nestedComboboxConfig) {
            'use strict';
            var that = this,
                oldMemberId = null;
            this.isOpen = false;
            this.currentMember = $scope.currentMember;
            this.options = angular.isDefined($scope.options) ? $scope.options : that.options;

            $scope.$watch('controlDisabled', function (value) {
                that.controlDisabled = value;
            });

            /* $element.on('blur', function (e) {
             //that.isOpen.status = !that.isOpen.status;
             that.isOpen = false;
             });
             $element.on('focus', function (e) {
             //that.isOpen.status = !that.isOpen.status;
             that.isOpen = true;
             });*/

            this.toggleOpen = function () {

                if (that.controlDisabled === 'true') {
                    this.isOpen.status = false;
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
                //that.currentMember = member;
                $scope.changeEvent(member);
                that.currentMember = member;
                oldMemberId = member.id;

            };
        }])
        .directive('nestedComboBox', [ '$templateCache', function ($templateCache) {
            'use strict';

            return {
                restrict: 'E',
                controller: 'NestedComboboxController',
                controllerAs: 'gs',
                replace: true,
                template: $templateCache.get('select-group.html'),
                scope: {
                    collection: '=',
                    currentMember: '=',
                    controlClass: '@',
                    controlDisabled: '@',
                    changeEvent: '=',
                    options: '=?'
                }
            };
        }]);
})(window, window.angular);
(function(module) {
try {
  module = angular.module('ui.nested.combobox');
} catch (e) {
  module = angular.module('ui.nested.combobox', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('select-group.html',
    '\n' +
    '<div class="custom-select"   data-ng-disabled="gs.controlDisabled==\'true\'" data-ng-class="controlClass" data-ng-click="gs.toggleOpen()">\n' +
    '    <p>{{gs.currentMember.name}}</p>\n' +
    '    <span><i class="icon-sort-down"></i></span>\n' +
    '    <div class="list" data-ng-show="gs.isOpen">\n' +
    '        <ul>\n' +
    '            <li data-ng-class="{\'active\':gs.currentMember.id === member.id}" data-ng-include="\'sub-level.html\'" data-ng-repeat="member in collection"> </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ui.nested.combobox');
} catch (e) {
  module = angular.module('ui.nested.combobox', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('sub-level.html',
    '\n' +
    '<a href="" data-ng-click="gs.selectValue(e,member)"><span>{{member.name}}</span></a>\n' +
    '<ul>\n' +
    '    <li data-ng-class="{\'active\':gs.currentMember.id === member.id}" ng-repeat="member in member[gs.options.childrenParam]" ng-include="\'sub-level.html\'"></li>\n' +
    '</ul>\n' +
    '');
}]);
})();

//# sourceMappingURL=ng-nested-combobox.js.map
