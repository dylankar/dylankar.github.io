var cnApp = angular.module('cnApp', ['cnFilters', 'ui.router', 'ngRoute']);

cnApp.factory('ClassNotes', function($http) {
	return {
		// Set data from issue
		issue: 'cnspring2015',
		notes: null,

		getNotes: function(suffix, cb) {
			var dataPath = 'data/' + this.issue + suffix + '.js';
			$http.get(dataPath).success(cb);
		},

		fullName: function(note) {
			return note.FIRST_NAME.trimRight() + ' ' + note.LAST_NAME.trimRight();
		},

		andersonPhotoURL: function(note, photoNum) {
			// Filepath
			// var path = 'img/'+ClassNotes.issue+'/alums_400/';
			var path = 'img/';
			// Filename: FirstLast (remove whitespace and periods)
			var fname = this.clean(note.FIRST_NAME) +
				this.clean(note.LAST_NAME);
			// If second photo, add '2' to end: FirstLast2
			if (note.PHOTO_2 !== null)
				fname = ((photoNum == 1) ? fname : fname + '2');
			// Get extension
			var ext = ((photoNum == 1) ?
				note.PHOTO_1.substring(note.PHOTO_1.lastIndexOf('.')) :
				note.PHOTO_2.substring(note.PHOTO_2.lastIndexOf('.')));
			// For now: if extension is .pdf of .tif, use converted .jpg version
			ext = ((ext == '.pdf' || ext == '.tif') ? '.jpg' : ext);
			// Return complete filepath for photo
			return path + fname + ext;
		},

		clean: function(name) {
			return name.replace(/ /g,'')
				.replace('.','')
				.replace('(','')
				.replace(')','');
		}
	};
});

cnApp.controller('ClassNotesCtrl', function($scope, ClassNotes){
	$scope.cn = ClassNotes;

	ClassNotes.getNotes('', function(data) {
		$scope.cn.notes = angular.fromJson(data);
	});
});

cnApp.controller('MemoriamCtrl', function($scope, ClassNotes) {
	$scope.cn = ClassNotes;

	$scope.cn.getNotes('memoriam', function(data) {
		$scope.cn.notes = angular.fromJson(data);
	});
});

cnApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'templates/home.html',
			controller: 'ClassNotesCtrl'
		})
		.state('memoriam', {
			url: '/memoriam',
			templateUrl: 'templates/memoriam.html',
			controller: 'MemoriamCtrl'
		});
});

angular.module('cnFilters', [])

.filter('search', function() {
	return function(input) {
		return input;
	};
})

/* Make name of alum in submission bold */
.filter('boldAlum', function($sce) {
	return function(str, nameToBold) {
		nameToBold = nameToBold.replace(/([()[{*+.$^\\|?])/g, '\\$1');
		str = str.replace(new RegExp(nameToBold, 'gi'),
		'<span class="note-alumnus">$&</span>');
		return $sce.trustAsHtml(str);
	};
});
