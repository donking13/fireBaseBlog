'use strict';

var angular 	= require('angular'),
	ngRoute 	= require('angular-route'),
	firebase 	= require('firebase'),
	angularfire = require('angularfire');

var myBlog = angular.module('myBlog',['ngRoute','firebase']);

/*controllers*/
var blogCtrl = require('./controller/blog'),
	addPostCtrl = require('./controller/addPost'),
	loginCtrl = require('./controller/login');


myBlog.run(["$rootScope", "$location", function($rootScope, $location) {
		$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
		  // We can catch the error thrown when the $requireAuth promise is rejected
		  // and redirect the user back to the home page
		  if (error === "AUTH_REQUIRED") {
		    $location.path("/");
		  }
		});
	}]);


myBlog.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
	.when('/',{
		templateUrl:'views/blog.html',
		controller:'blogController'
	})
	.when('/blog',{
		templateUrl:'views/blog.html',
		controller:'blogController'
	})
	.when('/blog/:id',{
		templateUrl:'views/post.html',
		controller:'blogController'
	})
	.when('/login',{
		templateUrl:'views/login.html',
		controller:'loginController'
	})
	.when('/addPost',{
		templateUrl:'views/addPost.html',
		controller:'addPostController',
		resolve: {
				    // controller will not be loaded until $waitForAuth resolves
				    // Auth refers to our $firebaseAuth wrapper in the example above
				    currentAuth: ["Auth", function(Auth) {
				      // $waitForAuth returns a promise so the resolve waits for it to complete
				      return Auth.$requireAuth();
				    }]
				  }
	})
	.when('/addPost/:id',{
		templateUrl:'views/addPost.html',
		controller:'addPostController'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

//factories---------------------------------------------------------------------------------
myBlog.factory("Auth", ["$firebaseAuth",
		  function($firebaseAuth) {
		    var fRef = new Firebase('https://donblog.firebaseio.com/');
		    return $firebaseAuth(fRef);
		  }
		]);

myBlog.factory('donblogRefArray',['$firebaseArray',function($firebaseArray){
	var blogRef = new Firebase('https://donblog.firebaseio.com/blog');
	return $firebaseArray(blogRef);
}]);


//controllers--------------------------------------------------------------------------------
myBlog.controller('blogController',['$scope','donblogRefArray','$routeParams','$filter','$location','Auth',blogCtrl]);
myBlog.controller('addPostController',['$scope','donblogRefArray','$filter','Auth','$location','$routeParams',addPostCtrl]);
myBlog.controller('loginController',['$scope','Auth','$location',loginCtrl]);
