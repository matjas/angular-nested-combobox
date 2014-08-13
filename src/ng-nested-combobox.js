/**
 * Created by Maciek on 2014-06-29.
 */

angular.module('ng.nested.combobox', [])
    .directive('nestedComboBox', function () {
        'use strict';

        var controller = function ($scope, $element, $attrs) {
            var that = this,
                oldMemberId = null;
            this.isOpen = false;
            this.currentMember = $scope.currentMember;

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
        };

        return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'gs',
            replace: true,
            templateUrl: '../src/select-group.html',
            scope: {
                collection: '=',
                currentMember: '=',
                controlClass: '@',
                controlDisabled: '@',
                changeEvent: '='
            }
        };
    });