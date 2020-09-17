/**
 * Create an IIFE (Immediately Invoked Function Expression) so that we don't need to declare a global variable
 */
(function () {
  var mainController = function ($scope, $interval, $location) {
    $scope.username = "Angular";
    $scope.countDown = 5;
    $scope.searchLabel = "Auto-searching in " + $scope.countDown;
    $scope.search = function (username) {
      $scope.cancelCountDown();
      /**
       * We are letting $location service to move us to another URL which is the /user path
       * passing the username as the parameter in the URL. This how it is defined in our
       * routing configuration found in app.js
       */
      $location.path("/user/" + username);
    };
    $scope.cancelCountDown = function () {
      if (countDownInterval) {
        /**
         * Cancel the timer
         */
        $interval.cancel(countDownInterval);
        $scope.countDown = null;
        $scope.searchLabel = "Search";
      }
    };

    var countDownInterval = null;
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
          $scope.searchLabel = "Auto-searching in " + $scope.countDown;
          if ($scope.countDown < 1) {
            $scope.search($scope.username);
          }
        },
        1000,
        $scope.countDown
      );
    };

    startCountDown();
  };

  /**
   * Registering the controller to the module.
   */
  var app = angular.module("GitHubViewer");
  app.controller("MainController", mainController);
})();
