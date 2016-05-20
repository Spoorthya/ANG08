'use strict';

angular.module('ang08.common')
  .factory('Auth', function ($firebaseAuth, ENDPOINT_URI) {
    var ref = new Firebase(ENDPOINT_URI);
    return $firebaseAuth(ref);
  })
;