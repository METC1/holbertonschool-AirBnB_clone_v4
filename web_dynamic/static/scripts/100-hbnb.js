/*
 * Script to implement a listener on the input checkbox tag
 * on the attributes list
 */

$(document).ready(() => {
	/* Listener and data collector for checkboxes in amenities */
	const check_amen_dict = {};
	const check_state_dict = {};
	const check_city_dict = {};

	$('.amenities input[type=checkbox]').change(function() {
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
/*listener and data collection for locations states*/
$('.locations ul input[type=checkbox]').change(function() {
	if ($(this).is(':checked')){
		check_state_dict[$(this).attr('data-id')] = $(this).attr('data-name');
	} else {
	delete check_state_dict[$(this).attr('data-id')];
	}

	if (Object.keys(check_state_dict).length >= 1) {
		$('.locations H4').html(Object.values(check_state_dict).join(', ') + '&nbsp;');
	} else {
		$('.locations H4').html('&nbsp;');
	}
});
/* Listener and data collection for locations cities */
$('.locations ul ul input[type=checkbox]').change(function() {
        if ($(this).is(':checked')){
                check_city_dict[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
        delete check_city_dict[$(this).attr('data-id')];
        }

        if (Object.keys(check_city_dict).length >= 1) {
                $('.locations H4').html(Object.values(check_city_dict).join(', ') + '&nbsp;');
        } else {
                $('.locations H4').html('&nbsp;');
        }
});




/* checking for api connection status */
$.get('http://0.0.0.0:5001/api/v1/status/', function(data,textStatus) {
	if (data.status === 'OK') {
		$('div#api_status').addClass('available');
	} else {
		$('div#api_status').removeClass('available');
	}
}).fail(function () {
	window.alert('Server response not recieved.');
	$('div#api_status').removeClass('available');
});


/* populating <article> section with database data */	
function templatePrint (data, index) {
	if (index >= data.length) {
		return;
	}

	let name = '';
	let lastName = '';
	const place = data[index];
	$.get(' http://0.0.0.0:5001/api/v1/users/${place.user_id}', function (data1, textStatus) {
		name = data1.first_name;
		lastName = data1.last_name;
		const articleComplete = `<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guests</div>
			<div class="number_rooms">${place.number_rooms} Bedrooms</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
			<div class="user">
			<b>Owner:</b> ${name} ${lastName}
			</div>
			<div class="description">
		${place.description}
		</div>
		</article>`;
		templatePrint(data, index + 1);
		$('section.places').append(articleComplete);
});
}
/* Move to BUTTON on click Post request to places_search with list of amenities*/
$('BUTTON').click(function (){
	const dataAmenities = { amenities: [...Object.keys(check_amen_dict)] };
	const dataStates = { states: [...Object.keys(check_state_dict)] };
	const dataCities = { cities: [...Object.keys(check_citi_dict)] };
	const dataAll = Object.assign({}, dataAmenities, dataStates, dataCities);

	console.log(dataAll);
	$('ARTICLE').remove();
	const optionsApi = {
	type: 'POST',
	url: 'http://0.0.0.0:5001/api/v1/places_search',
	data: JSON.stringify(dataAmenities),
	dataType: 'json',
	contentType: 'application/json',
	success: (data) => { templatePrint(data, 0);}
	};
$.ajax(optionsApi);
});
/* Adding css */
	$('.amenities ul li input[type="checkbox"]').css({ margin: '0px 10px 0px 0px', padding: '10px 0 0 0' });

	$('.locations ul input[type="checkbox"]').css({ margin: '0px 10px 0px 0px', padding: '10px 0 0 0', float: 'left'  });
	
	$('.amenities H4').css({ height: '17px', 'max-width': '250px', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden' });
});
