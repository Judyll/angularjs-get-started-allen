/**
 * Create an IIFE (Immediately Invoked Function Expression) so that we don't need to declare a global variable
 */
(function () {
  var gitHubController = function (
    $scope,
    gitHubService,
    $interval,
    $log,
    $anchorScroll,
    $location
  ) {
    var countDownInterval = null;
    $scope.search = function (username) {
      $log.info("Searching for " + username);
      gitHubService.getUser(username).then(
        (usersRes) => {
          $scope.user = usersRes;
          gitHubService.getRepos(usersRes).then(
            (reposRes) => {
              $scope.repos = reposRes;
              $scope.repoSortOrder = "-stargazers_count";
              /**
               * We are invoking the $location service to set the fragment identifier/hash to div-user-details
               */
              $location.hash("div-user-details");
              /**
               * We are calling the $anchorScroll service
               */
              $anchorScroll();
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
      if (countDownInterval) {
        /**
         * Cancel the timer
         */
        $interval.cancel(countDownInterval);
        $scope.countDown = null;
      }
    };

    var startCountDown = function () {
      /**
       * var doWork = function(){...}
       * setTimeout(doWork, 2000) -- Native global function to call doWork after 2 seconds.
       * setInterval(doWork, 2000) -- Same as setTimeout but this will continue to be invoked until you will stop it or close the browser.
       *
       * $interval is provided by Angular as a service which is equivalent to setInterval in javascript.
       */
      countDownInterval = $interval(
        () => {
          $scope.countDown -= 1;
          if ($scope.countDown < 1) {
            $scope.search($scope.username);
          }
        },
        1000,
        $scope.countDown
      );
    };

    $scope.username = "Angular";
    $scope.countDown = 5;
    startCountDown();
  };

  var app = angular.module("GitHubViewer", []);
  app.controller("GitHubController", gitHubController);
})();
