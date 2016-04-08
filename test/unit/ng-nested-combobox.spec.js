/**
 * Created by Maciek on 2014-08-12.
 */
describe('angular-nested-combobox directive', function () {
    'use strict';
    var scope, $compile, $controller, element, ctrl;
    var collection = [
        {
            id: 1,
            name: 'item1',
            childrens: [
                {
                    id: 2,
                    name: 'item1_1'
                },
                {
                    id: 3,
                    name: 'item2_2'
                }
            ]
        },
        {
            id: 4,
            name: 'item2',
            childrens: [
                {
                    id: 5,
                    name: 'item2_1'
                },
                {
                    id: 6,
                    name: 'item2_2',
                    childrens: [
                        {
                            id: 7,
                            name: 'item2_2_1'
                        },
                        {
                            id: 8,
                            name: 'item2_2_2'
                        }
                    ]
                }
            ]

        }
    ];

    beforeEach(module('ui.nested.combobox'));
    // load the template
    //beforeEach(module('template/select-group.html'));
    //beforeEach(module('template/sub-level.html'));
    beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_, _$controller_) {
        scope = _$rootScope_;
        $compile = _$compile_;
        $controller = _$controller_;

        ctrl = $controller('NestedComboboxController', { $scope: scope, $element: null, $attrs: null});
    }));

    beforeEach(function() {
        scope.collection = collection;
        element = $compile('<nested-combo-box   control-class="col-md-7" control-disabled="isDisabled" change-event="changeItem"  collection="collection" current-member="activeItem" />')(scope);
        //element = $compile('<div><span class="custom-select" disabled="disabled">cos tam</span></div>')(scope);
        //elm = element.find('div');
        angular.element(document.body).append(element);
    });

    /*afterEach(function() {
        element.remove();
    });*/

    it('should has class = "col-md-7"', function () {

        scope.$digest();
        expect(element.attr('class')).toMatch(/col-md-7/);
    });

   /* it('should apply collection"', function () {
        //scope.collection = collection;
        var selected = null;
        scope.$digest();
        ctrl.changeItem = function (value) {
            selected = value;
        };
        ctrl.selectValue(null, {name: 'text', id: '1'});

        expect(selected.id).toEqual('1');
    });*/


});