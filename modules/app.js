/***
 * This is the file where we will create the module and add some
 * configuration.
 * We are telling Angular that we have a dependency on "ngRoute"
 */
(function () {
  var app = angular.module("GitHubViewer", ["GitHubViewer", "ngRoute"]);
  /***
   * Registering configuration functions. And it is inside of here that we can configure the
   * $routeProvider service.
   */
  app.config(function ($routeProvider) {
    $routeProvider
      .when("/main", {
        templateUrl: "views/main.html",
        controller: "MainController",
      })
      /**
       * Whenever the routing provider sees a segment of the url with the colon
       * in front, it is going to treat that piece of URL as a parameter
       */
      .when("/user/:username", {
        templateUrl: "views/user.html",
        controller: "UserController"
      })
      .when("/user/:username/:reponame", {
        templateUrl: "views/repo.html",
        controller: "RepoController"
      })
      /**
       * If you see a URL that you don't understand or is not define
       */
      .otherwise({ redirectTo: "/main" });
  });
})();
