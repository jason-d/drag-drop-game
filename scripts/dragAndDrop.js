var d$d = (function () {

	var _dragTargetClassName = "over";
	var _dragSourceClassName = "drag";
	var _isDnDTypesSupported = true;

	var targets = $('[data-dnd-role="dropzone"]');
	var draggables = $('[data-dnd-role="draggable"]');

	var isDnDTypesSupported = function () {

		return _isDnDTypesSupported;
	};

	var cancel = function (e) {

		if (e.preventDefault) {

			e.preventDefault();
		}

		if (e.stopPropigation) {

			e.stopPropigation();
		}

		return false;
	};

	var dragStart = function (e) {

		var element = $(this);

		element.addClass(_dragSourceClassName);

		try {

			e.dataTransfer.setData('text/plain', '');
		} catch (ex) {

			_isDnDTypesSupported = false; //Indicates IE
		}
	};

	var dragEnd = function (e) {

		$('.' + _dragSourceClassName).removeClass(_dragSourceClassName);
		$('.' + _dragTargetClassName).removeClass(_dragTargetClassName);
	};

	var dropped = function (e) {

		cancel(e);

		$(this).removeClass(_dragTargetClassName);
	};

	var dragOver = function (e) {

		cancel(e);

		$(this).addClass(_dragTargetClassName);
	};

	var dragLeave = function (e) {

		$(this).removeClass(_dragTargetClassName);
	};

	targets.each(function (index, target) {

		target.addEventListener('drop', dropped, false);
		target.addEventListener('dragenter', cancel, false);
		target.addEventListener('dragover', dragOver, false);
		target.addEventListener('dragleave', dragLeave, false);
	});

	draggables.each(function (index, draggable) {

		$(draggable).prop('draggable', true);

		draggable.addEventListener('dragstart', dragStart, false);
		draggable.addEventListener('dragend', dragEnd, false);
	});

	return {
		isDnDTypesSupported: isDnDTypesSupported
	};
} ());