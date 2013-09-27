(function () {
    (function (root, factory) {
        return (typeof define === 'function' && define.amd) ? define(['jquery', 'waypoints'], factory) : factory(root.jQuery);
    })(this, function ($) {

        $.xpanel = function (obj, opt) {
            var self = this,
                $container = $(obj),
                viewportHeight,
                panels = $container.children(),
                scrollingDirection = 'down',
                lastScrollPos = 0;

            self.options = $.extend({}, $.fn.waypoint.defaults, $.xpanel.defaultOptions, opt);

            //_________________ Refresh
            var refresh = function () {
                viewportHeight = $.waypoints('viewportHeight');
                var scaled = viewportHeight * Math.max(self.options.minHeightScale, 1);

                panels.css({ 'min-height': scaled });

                $container.find('.dummy').each(function () {
                    $(this).css({ 'min-height': scaled, 'height': $(this).prev().outerHeight() });
                });
            }

            //_________________ Clear
            var clear = function () {
                panels.removeClass('in').removeClass('out').css({ 'top': '', 'bottom': '' });
            }

            //_________________ Change options
            self.changeOptions = function (opt) {

                if (opt === 'destroy') {
                    self.destroy();
                    return;
                }
                else if (opt === 'refresh') {
                    refresh();
                    $.waypoints('refresh');
                    return;
                }

                for (var name in opt) {

                    if (!(name in $.xpanel.defaultOptions)) continue; // Is option unknown?

                    var value = opt[name];
                    if (self.options[name] == value) continue; // Nothing changed?

                    switch (name) {
                        case 'shadow':
                        case 'reverse':
                        case 'dim':
                            $container.toggleClass(name);
                            break;
                        case 'minHeightScale':
                            if (!!value)
                                refresh();
                            break;
                    }

                    self.options[name] = value;
                }
            }

            //_________________ Window scroll handler
            var scrollHandler = function () {
                var scrollPos = $(window).scrollTop();

                if (self.options.fixJumpyScrolling) {
                    if (scrollPos > lastScrollPos) {
                        if (scrollingDirection != 'down') {
                            scrollingDirection = 'down';
                            onScrollingDirectionChanged(scrollingDirection);
                        }
                    }
                    else {
                        if (scrollingDirection != 'up') {
                            scrollingDirection = 'up';
                            onScrollingDirectionChanged(scrollingDirection);
                        }
                    }
                }

                lastScrollPos = scrollPos;
            };

            //_________________ On scrolling direction changed
            var onScrollingDirectionChanged = function (newDirection) {
                panels.filter('.out').animate({
                    'top': 0,
                    'bottom': 0
                }, 200);
            }

            //_________________ Initialization
            self.init = function () {
                $container.data('xpanel', self);

                $(window).bind('scroll', scrollHandler);

                $container.addClass('xpanel');
                if (self.options.reverse) $container.addClass('reverse');
                if (self.options.shadow) $container.addClass('shadow');
                if (self.options.dim) $container.addClass('dim');

                panels.last().siblings().after('<div class="dummy" />');

                $(window).bind('resize', refresh);
                refresh();

                // Top hits
                panels.waypoint(function (direction) {
                    var panel = $(this);

                    clear();
                    if (scrollingDirection === 'up' && direction === 'up') {

                        $container.removeClass('scroll-down').addClass('scroll-up');

                        if (self.options.whenScrollUp && panel.prev().length) {
                            if (self.options.fixJumpyScrolling) {
                                var diff = panel.offset().top - $(window).scrollTop();
                                panel.css('top', diff)
                            }
                            panel.addClass('out');
                            panel.prev().prev().addClass('in');
                        }
                    }
                    else {
                        $container.removeClass('scroll-up').addClass('scroll-down');
                    }
                });

                // Bottom hits
                panels.waypoint(function (direction) {
                    var panel = $(this);

                    clear();
                    if (scrollingDirection === 'down' && direction === 'down') {

                        $container.removeClass('scroll-up').addClass('scroll-down');

                        if (self.options.whenScrollDown && panel.next().length) {
                            if (self.options.fixJumpyScrolling) {
                                var diff = $(window).scrollTop() + viewportHeight - panel.next().next().offset().top;
                                panel.css('bottom', diff);
                            }
                            panel.addClass('out');
                            panel.next().next().addClass('in');
                        }
                    }
                    else {
                        $container.removeClass('scroll-down').addClass('scroll-up');
                    }
                }, { offset: function () { return -($(this).outerHeight() - viewportHeight); } });

                return this;
            }
            
            //_________________ Destroy
            self.destroy = function () {
                $(window).unbind('resize', refresh);
                $(window).unbind('scroll', scrollHandler);

                $container.removeClass('xpanel')
                          .removeClass('reverse')
                          .removeClass('dim');

                $container.find('.dummy').remove();

                clear();
                panels.each(function () {
                    $(this).css('min-height', '')
                           .waypoint('destroy');
                });

                $container.removeData('xpanel');
            }

            self.init();
        }

        //_________________ Default options
        $.xpanel.defaultOptions = {
            minHeightScale: 1.15,
            fixJumpyScrolling: true,
            reverse: true,
            shadow: true,
            dim: true,
            whenScrollDown: true,
            whenScrollUp: true,
        };

        //_________________ Extend waypoints
        return $.waypoints('extendFn', 'xpanel', function (opt) {

            if (this.length)
                this.each(function () {
                    var xpanel = $(this).data('xpanel');

                    if (xpanel instanceof $.xpanel)
                        xpanel.changeOptions(opt);
                    else
                        new $.xpanel(this, opt);
                });

            return this;
        });
    });
})();