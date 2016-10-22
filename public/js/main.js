var serverURL = "/public/index.php/api";
var app = angular.module('sobic', ["ngCookies",'ui.bootstrap', 'ngRoute', 'ngAnimate', 'angular-parallax', 'ngFileUpload']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	
	$locationProvider.html5Mode({
		enabled: true,
  		requireBase: false
	}).hashPrefix = '!';
	$routeProvider.when('/', {
		templateUrl: 'partials/pages/home.html',
		controller: 'HomeController'
	}).when('/users/show', {
		templateUrl: 'partials/user/show.html',
		controller: 'ListUsersController'
	}).when('/contact', {
		templateUrl: 'partials/pages/contact.html',
		controller: 'ContactController'
	/* Es importante que respetes estos comentarios para general scaffold sin probremas. */
	/** Scaffold main.js **/
	}).when('/personals', {
		templateUrl: 'partials/personal/show.html',
		controller: 'PersonalController'
	}).when('/personals/form', {
		templateUrl: 'partials/personal/form.html',
		controller: 'PersonalFormController'
	}).when('/personals/form/:id', {
		templateUrl: 'partials/personal/form.html',
		controller: 'PersonalFormController'
	}).otherwise({
		redirectTo: '/'
	});
}]);
