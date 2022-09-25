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
		$('.amenities H4').html(Object.values(check_amen_dict).join(', ') + '&nbsp;');
	} else {
		$('.amenities H4').html('&nbsp;');
	}

	});

	$('.amenities ul li input[type="checkbox"]').css({ margin: '0px 10px 0px 0px', padding: '10px 0 0 0' });
	$('.amenities H4').css({ height: '17px', 'max-width': '250px', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden' });
});
