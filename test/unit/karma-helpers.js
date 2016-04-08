(function() {
    var karmaHelpers;

    karmaHelpers = {
        handleTranslate: function($provide, $translateProvider) {
            $provide.factory('customLoader', function($q) {
                return function() {
                    var deferred;
                    deferred = $q.defer();
                    deferred.resolve({});
                    return deferred.promise;
                };
            });
            $translateProvider.useLoader('customLoader');
            return null;
        }
    };

}).call(this);