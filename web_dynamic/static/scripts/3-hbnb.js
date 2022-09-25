/*
 * Script to implement a listener on the input checkbox tag
 * on the attributes list
 */

$(document).ready(() => {
	const check_amen_dict = {};
	$('input[type=checkbox]').change(function() {
	if ($(this).is(':checked')){
		check_amen_dict[$(this).attr('data-id')] = $(this).attr('data-name');
	} else {
	delete check_amen_dict[$(this).attr('data-id')];
	}

	if (Object.keys(check_amen_dict).length >= 1) {
		$('.amenities H4').html(Object.values(checkBoxDict).join(', ') + '&nbsp;');
	} else {
		$('.amenities H4').html('&nbsp;');
	}

	});

$.get('http://0.0.0.0:5001/api/v1/status/', function(data,textStatus) {
	if (data.status === 'OK') {
		$('div#api_status').addClass('available');
	} else {
		$('div#api_status').removeClass('available');
	}
}).fail(function () {
	windows.alert('Server response not recieved.');
	$('div#api_status').removeClass('available');
});


	$('.amenities ul li input[type="checkbox"]').css({ margin: '0px 10px 0px 0px', padding: '10px 0 0 0' });
	$('.amenities H4').css({ height: '17px', 'max-width': '250px', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden' });
});
