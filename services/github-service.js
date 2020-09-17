/**
 * Create an IIFE (Immediately Invoked Function Expression) so that we don't need to declare a global variable
 */
(function () {
  /**
   * We are now creating our gitHub service and we are using the revealing design pattern where were a function can return an api. What we are going to return is a the public API.
   */
   var gitHub = function ($http) {
    var getUser = function (userName) {
      return $http
        .get("https://api.github.com/users/" + userName)
        .then((response) => {
          /**
           * Whatever you return from the .then function will be wrapped into another promise that is given back to the caller.
           */
          return response.data;
        });
    };

    var getRepos = function (user) {
      return $http.get(user.repos_url).then((response) => {
        return response.data;
      });
    };

    /**
     * We are now returning the public API
     */
    return {
      getUser: getUser,
      getRepos: getRepos,
    };
  };

  var app = angular.module("GitHubViewer");
  /**
   * We will now register our service to be used by Angular. This is one of
   * the many ways to register a custom service.
   * The first parameter is the given service name which is "gitHubService"
   * and the second parameter is a function that will return your API.
   */
  app.factory("gitHubService", gitHub);
})();
