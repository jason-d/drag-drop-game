(function () {

	var initialize = function () {

		var targets = $('[data-dnd-role="dropzone"]')

		targets.each(function (index, target) {

			$(target).css('background-color', $(target).attr('data-value'));
		});

		var randomNumber = Math.floor(Math.random() * (targets.length));
		var winningValue = $(targets[randomNumber]).attr('data-value');
		var pile = $($('#pile > div')[0]);
		pile.css('background-color', winningValue);
		pile.attr('data-value', winningValue);

		var targets = $('[data-dnd-role="dropzone"]');
		targets.each(function (index, target) {

			target.addEventListener('drop', dropped, false);
		});

		var draggables = $('[data-dnd-role="draggable"]');
		draggables.each(function (index, draggable) {

			draggable.addEventListener('dragstart', dragStart, false);
		});
	};

	var isDnDTypesSupported = function () {

		return d$d.isDnDTypesSupported();
	};

	var dragStart = function (e) {

		var element = $(this);
		var value = element.attr('data-value');

		if (isDnDTypesSupported) {

			e.dataTransfer.setData('text/plain', value);
		} else {

			e.dataTransfer.setData('Text', value);
		}
	};

	var dropped = function (e) {

		var target = $(this);
		var targetValue = target.attr('data-value');

		var value = '';
		if (isDnDTypesSupported) {

			value = e.dataTransfer.getData('text/plain');
		} else {

			value = e.dataTransfer.getData('Text');
		}

		if (value === targetValue) {

			alert('Correct!');
		} else {

			alert('Try again!');
		}
	};

	initialize();
} ());