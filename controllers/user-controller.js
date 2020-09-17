/**
 * Create an IIFE (Immediately Invoked Function Expression) so that we don't need to declare a global variable
 */
(function () {
  var userController = function (
    $scope,
    gitHubService,
    /**
     * When you are using routing, the service $routeParams is available and it will give you
     * any parameters that is defined in the url
     */
    $routeParams
  ) {
    /**
     * We are getting parameter "username" from the routing URL /user/:username which we
     * define in the app.js
     */
    $scope.username = $routeParams.username;
    gitHubService.getUser($scope.username).then(
      (usersRes) => {
        $scope.user = usersRes;
        gitHubService.getRepos(usersRes).then(
          (reposRes) => {
            $scope.repos = reposRes;
            $scope.repoSortOrder = "-stargazers_count";
            /**
             * We are invoking the $location service to set the fragment identifier/hash to div-user-details
             */
            // $location.hash("div-user-details");
            /**
             * We are calling the $anchorScroll service
             */
            //$anchorScroll();
          },
          () => {
            $scope.error = "Could not locate repositories";
          }
        );
      },
      () => {
        $scope.error = "Could not locate user";
      }
    );    
  };

  var app = angular.module("GitHubViewer");
  app.controller("UserController", userController);
})();
