(function (dndHelper) {

	var initialize = function () {

		var level = {

			numberOfTargets: 4,
			cards: ['red', 'blue', 'green', 'yellow', 'orange'],
			decorateTarget: function (index, target) {

				$(target).css('background-color', $(target).attr('data-value'));
			},
			decorateCard: function (card, value) {

				$(card).css('background-color', value);
			}
		};

		var targetCards = getTargetCards(shuffle(level.cards), level.numberOfTargets);

		forEach.call(targetCards, function (card) {

			var element = $('<div/>');
			element.attr('data-dnd-role', 'dropzone');
			element.attr('data-value', card);
			element.addClass('well');

			$('#targets').append(element);
		});

		var targets = $('[data-dnd-role="dropzone"]')

		targets.each(level.decorateTarget);

		var randomNumber = Math.floor(Math.random() * (targets.length));
		var winningValue = $(targets[randomNumber]).attr('data-value');
		var card = $($('#cards > div')[0]);
		card.attr('data-value', winningValue);
		level.decorateCard(card, winningValue);

		dndHelper.wireUpEvents();

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

	var shuffle = function (array) {

		var tmp, current, top = array.length;

		if (top) {

			while (--top) {

				current = Math.floor(Math.random() * (top + 1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}
		}

		return array;
	};

	var getTargetCards = function (cards, count) {

		var targetCards = [];

		if (cards.length >= count) {

			while (count--) {

				targetCards.push(cards.pop());
			}
		}

		return targetCards;
	};

	var forEach = Array.prototype.forEach;

	initialize();
}(d$d));