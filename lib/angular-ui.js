
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param [ajaxHandler] {function} optional handler function for using Ajax-Chosen
 * @link http://harvesthq.github.com/chosen/
 * @link https://github.com/harvesthq/chosen/
 * @link https://github.com/jobvite/ajax-chosen/
 */

angular.module('ui.directives', []).directive('uiChosen', [function() {
	
	var options = {
		
	}, ajaxOptions = {
			minLength: 3,
			queryLimit: 10,
			delay: 100,
			chosenOptions: options,
			searchingText: "Searching...",
			noresultsText: "No results.",
			initialQuery: false
	};
	return function(scope, elm, attrs) {
		var handler = scope.$eval(attrs.uiChosen);
		if (angular.isFunction(handler)) {
			elm.ajaxChosen(ajaxOptions, handler);
		} else {
			elm.chosen(options);
		}
	};
}]);

/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param expression {boolean} condition to check if it should be a link or not
 */

angular.module('ui.directives', []).directive('uiLinky', [function() {
  return function(scope, elm, attrs) {
    var newElm, isLink = scope.$eval(attrs.uiLinky);
    if (isLink) {
      newElm = angular.element('<a>');
      if (attr['ng-click']) {
        newElm.click(function(e){
          if (attr.href === undefined) {
            e.preventDefault();
          }
          scope.$eval(attr['ng-click']);
        });
      }
    } else {
      newElm = angular.element('<span>');
    }     
    delete attrs.href;
    delete attrs['ng-click'];
    delete attrs.uiLinky;
    newElm.attr(attrs);
    elm.html(newElm);
  };
}]);

/**
 * Actually removes html from the DOM instead of hiding it for assistance with 
 * CSS3 selectors such as :first-child, :last-child, etc
 * 
 * @param remove {boolean} condition to check if the element should be removed form the DOM
 */

angular.module('ui.directives', []).directive('uiRemove', [function() {
	return function(scope, elm, attrs) {
		if (scope.$eval(attrs.uiRemove)) {
			elm.remove();
		}
	};
}]);
/**
 * Add a clear button to form inputs to reset their value
 */

angular.module('ui.directives', []).directive('uiReset', [function() {
	return function(scope, elm, attrs) {
		elm.wrap('<span class="ui-resetwrap" />').after('<a class="ui-reset" />').next().click(function(e){
			e.preventDefault();
			elm.val(null).trigger('change');
			// scope[attrs.ngModel] = null;
			// scope[attrs.ngModelInstant] = null;
			// scope.$apply();
		});
	};
}]);
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param [offset] {int} optional Y-offset to override the detected offset
 */

angular.module('ui.directives', []).directive('uiScrollfix', [function() {
  return function(scope, elm, attrs) {
    if (!attrs.jvScrollfix) {
      attrs.jvScrollfix = elm.offset().top;
    }
    $(window).scroll(function(){
      if (!elm.hasClass('fixed') && window.pageYOffset > attrs.jvScrollfix) {
        elm.addClass('fixed');
      } else if (elm.hasClass('fixed') && window.pageYOffset < attrs.jvScrollfix) {
        elm.removeClass('fixed');
      }
    });
  };
}]);

/**
 * NOTE: Only adds classes, you must add the class definition yourself
 */

/**
 * uiShow Directive
 *
 * Adds a 'show' class to the element instead of display:block
 * Created to allow tighter control  of CSS without bulkier directives
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */

angular.module('ui.directives', []).directive('uiShow', [function() {
	return function(scope, elm, attrs) {
		if (scope.$eval(attrs.uiShow)) {
			elm.addClass('show');
		} else {
			elm.removeClass('show');
		}
	};
}]);

/**
 * uiHide Directive
 *
 * Adds a 'hide' class to the element instead of display:block
 * Created to allow tighter control  of CSS without bulkier directives
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */

angular.module('ui.directives', []).directive('uiHide', [function() {
	return function(scope, elm, attrs) {
		if (scope.$eval(attrs.uiShow)) {
			elm.addClass('hide');
		} else {
			elm.removeClass('hide');
		}
	};
}]);

/**
 * uiToggle Directive
 *
 * Adds a class 'show' if true, and a 'hide' if false to the element instead of display:block/display:none
 * Created to allow tighter control  of CSS without bulkier directives. This also allows you to override the
 * default visibility of the element using either class.
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */

angular.module('ui.directives', []).directive('uiToggle', [function() {
	return function(scope, elm, attrs) {
		if (scope.$eval(attrs.uiShow)) {
			elm.switchClass('show', 'hide');
		} else {
			elm.removeClass('hide', 'show');
		}
	};
}]);
/**
 * Adds a 'fixed' class to the element when the page scrolls past it's position.
 * @param expression {boolean} condition to check if it should be a link or not
 */
 
angular.module('ui.filters', []).filter('highlight', function() {

  return function(text, filter) {
    if (filter === undefined) {
      return text;
    } else {
      return text.replace(new RegExp(filter, 'gi'), '<span class="match">$&</span>');
    };
  };

});

/* EOF */
/**
 * @module ui
 * Bind Angular.js modules
 */

angular.module('ui', [
  'ui.filters', 
  'ui.directives'
]);