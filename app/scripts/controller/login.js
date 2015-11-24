'use strict';


var loginCtrl = function($scope,Auth,$location){
	$scope.authObj = Auth;

	$scope.login = function(username,password){
		$scope.authObj.$authWithPassword({
				  email: username,
				  password: password
		}).then(function(authData){
			console.log("Logged in as:", authData.uid);
			$location.path('/addPost');
		}).catch(function(error){
			console.log(+ error);
			if(error.code == 'INVALID_USER' || error.code == 'INVALID_PASSWORD'){
				  	$scope.loginError = 'Your username or password is incorrect';
				  }
		});
	}
	
}

module.exports = loginCtrl;