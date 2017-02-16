const app = angular.module('app', ['ngRoute']);

app.controller('CampaignController', ['$scope', '$http', function($scope, $http) {
  $scope.campaignName = 'testName';
  $http
    .get('/api/campaigns')
    .then(campaigns => {
      console.log('data received from $http request: ', campaigns);
      // For now, let's jsut grab the last campaign entry
      $scope.campaigns = campaigns.data;
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

