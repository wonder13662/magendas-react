import $ from 'jquery';

export default class JqueryUtil {

	static init() {
		// Add classChanged event callback
		(function( func ) {
			$.fn.addClass = function() {
				func.apply( this, arguments );
				this.trigger('classChanged');
				return this;
			};
		})($.fn.addClass);

		(function( func ) {
			$.fn.removeClass = function() {
				func.apply( this, arguments );
				this.trigger('classChanged');
				return this;
			};
		})($.fn.removeClass);
	}

    static isInside(event, $target) {
        if(typeof event === 'undefined' || null === event) {
            // console.log("event is not valid!");
            return null;
        }
        if(typeof $target === 'undefined' || null === $target) {
            // console.log("$target is not valid!");
            return null;
        }

        const pageX = event.pageX;
        const pageY = event.pageY;

        const dropDownListOffset = $target.offset();
        const dropDownListTop = dropDownListOffset.top;
        const dropDownListLeft = dropDownListOffset.left;
        const dropDownListWidth = $target.outerWidth();
        const dropDownListHeight = $target.outerHeight();

        if( (dropDownListLeft < pageX) &&
            (pageX < (dropDownListLeft + dropDownListWidth)) &&
            (dropDownListTop < pageY) &&
            (pageY < (dropDownListTop + dropDownListHeight))) {
            return true;
        }

        return false;
    }
    static addCollisionWatcher(onClickBody) {
        if(typeof onClickBody === 'undefined' || onClickBody === null) {
            // console.log("onClickBody is not valid!");
            return;
        }

        const watcher =  {
            bindEventCollision:function() {
                // DropDown 외부에서 발생하는 클릭에 대해 이벤트 받아야 함. DropDown을 닫는 신호.
                this.unbindEventCollision();
                $("body").bind("click", onClickBody);
            },
            unbindEventCollision:function() {
                $("body").unbind("click", onClickBody);
            },
        };
        watcher.bindEventCollision();

        return watcher;
    }
}
