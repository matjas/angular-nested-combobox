/**
 * Created by Maciek on 2014-06-29.
 */

angular.module('ng.nested.combobox', [])
    .directive('nestedComboBox', function () {
        'use strict';

        var controller = function ($scope, $element, $attrs) {
            var that = this;


            $scope.$watch('currentMember', function (value) {
                that.currentMember = value;
                $scope.changeEvent(value);
            });
           /* $attrs.$observe('currentMember', function (value) {
                that.currentMember = value;
                $scope.changeEvent(value);
            });*/

            $scope.$watch('collection', function (value) {
                //that.collection=value;

                if ($scope.collection !== undefined && $scope.collection !== null) {
                    for (var i = 0; i < $scope.collection.length; i++) {
                        $scope.collection[i].level = 0;
                    }
                }
            });

            $scope.$watch('controlDisabled',function(value){
                that.controlDisabled=value;
            });

            //this.currentMember=$scope.currentMember;
            //console.log(this.currentMember,' current member dir');
            this.isOpen=false;
            this.toggleOpen=function(){

                if(that.controlDisabled=='true') {
                    this.isOpen = false
                    return
                }

                this.isOpen=!this.isOpen;
            };

            var oldMemberId=null;
            this.selectValue=function(event,member){

                if(oldMemberId==member.id)
                    return;

                if(member.id=='root'){
                    member.name=event.currentTarget.innerText;
                }
                that.currentMember=member;
                $scope.currentMember=member;

                //$scope.changeEvent(member);
                oldMemberId=member.id;

            }
        };

        return{
            restrict:'E',
            controller:controller,
            controllerAs: 'gs',
            replace:true,
            templateUrl:'../src/select-group.html',
            scope:{
                collection:'=',
                currentMember:'=',
                controlClass:'@',
                controlDisabled:'@',
                changeEvent:'='
            }
        }
    });