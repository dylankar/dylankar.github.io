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