/**
 * Create an IIFE (Immediately Invoked Function Expression) so that we don't need to declare a global variable
 */
(function () {
  var repoController = function (
    $scope,
    gitHubService,
    /**
     * When you are using routing, the service $routeParams is available and it will give you
     * any parameters that is defined in the url
     */
    $routeParams
  ) {
    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    gitHubService.getRepoContributors($scope.username, $scope.reponame).then(
      (response) => {
        $scope.repo = response;
      },
      () => {
        $scope.error = "Could not locate contributors";
      }
    );
  };
  /**
   * Registering the controller to the module.
   */
  var app = angular.module("GitHubViewer");
  app.controller("RepoController", repoController);
})();
