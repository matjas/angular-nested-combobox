/**
 * Created by Maciek on 2014-06-29.
 */

angular.module('ng.tree.combobox',[])
    .directive('groupSelectService',function(){


        var controller=function($scope, $element, $attrs){
            var _this=this;

            this.showRoot=$attrs.showRoot;

            $scope.$watch('currentMember',function(value){
                _this.currentMember=value;
                $scope.changeEvent(value);
            });
            $scope.$watch('collection',function(value){
                //_this.collection=value;

                if($scope.collection!==undefined && $scope.collection!==null) {
                    for (var i = 0; i < $scope.collection.length; i++) {
                        $scope.collection[i].level = 0;
                    }
                }
            });

            $scope.$watch('controlDisabled',function(value){
                _this.controlDisabled=value;
            });

            //this.currentMember=$scope.currentMember;
            //console.log(this.currentMember,' current member dir');
            this.isOpen=false;
            this.toggleOpen=function(){

                if(_this.controlDisabled=='true') {
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
                _this.currentMember=member;
                $scope.currentMember=member;

                //$scope.changeEvent(member);
                oldMemberId=member.id;

            }
        }

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
                // showRoot:'@showRoot'
            }
        }
    });