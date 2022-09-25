<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="{{'../static/scripts/4-hbnb.js?' + cache_id}}"></script>
    <link rel="stylesheet" type="text/css" href="{{'../static/styles/4-common.css?' + cache_id}}">
    <link rel="stylesheet" type="text/css" href="{{'../static/styles/3-header.css?' + cache_id}}">
    <link rel="stylesheet" type="text/css" href="{{'../static/styles/3-footer.css?' + cache_id}}">
    <link rel="stylesheet" type="text/css" href="{{'../static/styles/6-filters.css?' + cache_id}}">
    <link type="text/css" rel="stylesheet" href="{{'../static/styles/8-places.css?' + cache_id}}">
    <link rel="icon" href="{{'../static/images/icon.png?' + cache_id}}" />
    <title>HBnB</title>
    <div id="api_status"></div>
  </head>
  <body>
    <header>
      <div class="logo"></div>
    </header>
    <div class="container">
      <section class="filters">
	<div class="locations">
	  <h3>States</h3>
	  <h4>&nbsp;</h4>
	  <div class="popover">
	    <ul>
	      {% for state in states %}
	      <li>
		<h2>{{ state[0].name }}:</h2>
		<ul>
		  {% for city in state[1] %}
		  <li>{{ city.name }}</li>
		  {% endfor %}
		</ul>
	      </li>
	      {% endfor %}
	    </ul>
	  </div>
	</div>
	<div class="amenities">
	  <h3>Amenities</h3>
	  <h4>&nbsp;</h4>
	  <div class="popover">
	    <ul>
	      {% for amenity in amenities %}
	      <li><input type="checkbox" data-id="{{amenity.id}}" data-name="{{amenity.name}}">{{ amenity.name }}</li>
	      {% endfor %}
	    </ul>
	  </div>
	</div>
	<button type="button">Search</button>
      </section>
      <div class="placesh1"><h1>Places</h1></div>
      <section class="places">
      </section>
    </div>
    <footer>
      <p>Holberton School</p>
    </footer>
  </body>
</html>
