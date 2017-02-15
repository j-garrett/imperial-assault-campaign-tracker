const app = angular.module('app', ['ngRoute']);

app.controller('CampaignController', ['$scope', '$http', function($scope, $http) {
  $scope.campaignName = 'testName';
  $http
    .get('/api/missions')
    .then(missions => {
      // console.log('data received from $http request: ', missions);
      $scope.missions = missions;
    })
    .catch(err => {
      console.log('err getting missions from server: ', err);
    });
}]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/campaign.html',
    });
});

