(function () {

	var targets = $('[data-dnd-role="dropzone"]')

	targets.each(function (index, target) {

		$(target).css('background-color', $(target).attr('data-value'));
	});

	var randomNumber = Math.floor(Math.random() * (targets.length));
	var winningColor = $(targets[randomNumber]).css('background-color');
	$($('#pile > div')[0]).css('background-color', winningColor);
} ());