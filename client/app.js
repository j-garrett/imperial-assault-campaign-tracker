const app = angular.module('app', ['ngRoute']);

app.controller('CampaignController', ['$scope', function($scope) {
  $scope.campaignName = 'testName';
}]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/campaign.html',
    });
});

