angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.tab = 1;
  $scope.data = {ageRange: 1,
                 rangeString: '21-25' };
  var timeoutId = null;

  $scope.$watch('data.ageRange', function() {
    console.log('hi');
    if($scope.data.ageRange < 40 && $scope.data.ageRange > 20 ){
      $scope.data.rangeString = '26-30';
    }else if($scope.data.ageRange < 60 && $scope.data.ageRange > 40){
      $scope.data.rangeString = '31-40';
    }else { $scope.data.rangeString = '21-25'; };
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

  $scope.setTab = function (tabId) {
    $scope.tab = tabId;
  };

  $scope.isSet = function (tabId) {
    return $scope.tab === tabId;
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $state, $http, $q) {
  console.log($q.defer());
  var parentplaylist = '';

})

.controller('BrowseCtrl', ['$scope', '$state', '$http', '$q', function($scope, $state, $http, $q){
  $scope.init = function () {
    $scope.getImages()
    //then takes 3 functions as args, the first two are success and error
    .then(function (res) {
      //success
      console.log('Images: ', res);
      // each shot
      $scope.imageList = res.shots;
    }, function (status) {
      // error
      // console.log('Error: ', status);
      $scope.pageError = status;
    });
  };

  $scope.getImages = function () {
    var defer = $q.defer();

    $http.jsonp('http://api.dribbble.com/shots/everyone?callback=JSON_CALLBACK')
    .success(function (res) {
      defer.resolve(res);
    })
    .error(function (status, code) {
      defer.reject(status);
    });

    return defer.promise;
  };

  // console.log('ReviewCtrl');
  // // Load the modal from the given template URL
  // $ionicModal.fromTemplateUrl('review.html', function($ionicModal) {
  //     $scope.modal = $ionicModal;
  // }, {
  //     // Use our scope for the scope of the modal to keep it simple
  //     scope: $scope,
  //     // The animation we want to use for the modal entrance
  //     animation: 'slide-in-up'
  // });

  $scope.init();
}]);

