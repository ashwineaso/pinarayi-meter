var pinarayiMeter = angular.module('pinarayiMeter', []);

angular.module('pinarayiMeter').controller('homePageController', function($scope, $rootScope, $http) {
    $scope.selectedCategory = 'agriculture';

    $rootScope.loadingStats = true;
    $http({
        method: 'GET',
        url: '/promise/api/status'
    }).then(function successCallback(response) {
        $rootScope.status = response.data;
        $rootScope.loadingStats = false;
    }, function errorCallback(response) {
        console.log(response);
        $rootScope.loadingStats = false;
    });

    $scope.$watch(function() {
        return $scope.selectedCategory;
    }, function() {
        if (!$rootScope.categoryData[$scope.selectedCategory]) {
        	$scope.loadingCategoryData = true;
            $http({
                method: 'GET',
                url: '/promise/api/category',
                params: {
                    'type': 'minimal',
                    'categoryList': $rootScope.categoryKeys[$scope.selectedCategory]
                }
            }).then(function successCallback(response) {
            	$rootScope.categoryData[$scope.selectedCategory] = response.data.promises;
            	$scope.loadingCategoryData = false;
            	console.log($rootScope.categoryData[$scope.selectedCategory]);
            	console.log($scope.selectedCategory);
            }, function errorCallback(response) {
                console.log(response.data);
                $scope.loadingCategoryData = false;
            });
        }
    }, true);


});

pinarayiMeter.run(function($rootScope, $http) {
    $rootScope.baseURL = '127.0.0.1:8000';

    $rootScope.categoryData = {
        'agriculture': null,
        'education': null,
        'industries': null,
        'lawandorder': null,
        'it': null,
        'tourism': null,
        'infrastructure': null,
        // 'humandevelopment': null,
        'health':null,
        'others':null
    };

    $rootScope.categoryKeys = {
    	'agriculture':['Agriculture','Animal Husbandry','Irrigation','Plantation Crops','Fisheries'],
    	'education':['Education'],
    	'industries':['Traditional Industries','Modern Industries','Trade'],
    	'lawandorder': ['Law and Order','Social Security'],
    	'it':['IT'],
    	'tourism':['Tourism'],
    	'infrastructure':['Transportation','Construction'],
    	// 'humandevelopment':['Youth'],
    	'health':['Health'],
    	'others':['Electricity','Finance','Youth']
    };
    
});

angular.module('pinarayiMeter').config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});


angular.module('pinarayiMeter').controller('thirtyFivePointController',function($http, $scope, $rootScope){
	$rootScope.loadingStats = true;
    $http({
        method: 'GET',
        url: '/promise/api/status'
    }).then(function successCallback(response) {
        $rootScope.status = response.data;
        $rootScope.loadingStats = false;
    }, function errorCallback(response) {
        console.log(response);
        $rootScope.loadingStats = false;
    });
});

angular.module('pinarayiMeter').controller('categoryController',function($http, $scope, $rootScope){
	$rootScope.loadingStats = true;
    $http({
        method: 'GET',
        url: '/promise/api/status'
    }).then(function successCallback(response) {
        $rootScope.status = response.data;
        $rootScope.loadingStats = false;
    }, function errorCallback(response) {
        console.log(response);
        $rootScope.loadingStats = false;
    });
});