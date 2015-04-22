var cnApp = angular.module('cnApp', ['cnFilters']);
cnApp.factory('Data', function() {
	console.log(data);
	return data;
});


cnApp.factory('ClassNotes', function($http) {
	var ClassNotes = {};

	ClassNotes.issue = 'cnspring2015';
	
	var dataPath = 'js/' + ClassNotes.issue + '.json';
	$http.get(dataPath).success(function(data) {
		ClassNotes.notes = angular.fromJson(data);
	});

	return ClassNotes;
});

function ClassNotesCtrl($scope, ClassNotes){
	$scope.classnotes = ClassNotes;

	$scope.fullName = function(note) {
		return note.FIRST_NAME.trimRight() + ' ' + note.LAST_NAME.trimRight();
	};

	$scope.submitDate = function(note) {
		var d = note.SUBMISSION_DATE.split('/');
		if (d[1] < 10) d[1] = "0"+d[1];
		if (d[1] < 10) d[0] = "0"+d[0];
		console.log("20"+date[2]+date[1]+date[0]);
		return "20"+date[2]+date[1]+date[0];
	};

	// Gotta adapt for alums_full too
	// $scope.andersonPhotoURL = function(note, photoNum) {
	// 	var path = 'img/alums_400/'
	// 	var str = ((photoNum == 1) ? note.PHOTO_1 : note.PHOTO_2);
	// 	var n = str.lastIndexOf('/');
	// 	var fname = str.substring(n+1).replace(/%\d{2}/g, '_');
	// 	return path + fname;
	// };

	$scope.andersonPhotoURL = function(note, photoNum) {
		// Filepath
		var path = 'img/'+ClassNotes.issue+'/alums_400/';
		// Filename: FirstLast (remove whitespace and periods)
		var fname = note.FIRST_NAME.replace(/ /g,'').replace('.','') +
			note.LAST_NAME.replace(/ /g,'').replace('.','');
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
	};
}