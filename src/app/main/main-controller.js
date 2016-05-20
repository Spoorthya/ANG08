'use strict';

angular.module('ang08')
  .controller('MainCtrl', function (UserModel, Auth, $state) {
    var main = this;
    main.auth = Auth;
    main.currentUser = null;

    main.logout = function () {
      UserModel.logout();
      $state.go('login');
    };

    main.auth.$onAuth(function (authData) {
      if (authData) {
        UserModel.setCurrentUser(authData.uid);
        main.currentUser = authData.uid;
      } else {
        main.currentUser = null;
      }
    });
  });
