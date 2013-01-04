/*
 * jQuery UI Notification
 * Copyright (c) 2011 Marcus Ekwall
 *
 * http://writeless.se/projects/jquery-ui-notification/
 *
 * Depends:
 *   - jQuery 1.4+
 *   - jQuery UI 1.8+ widget factory
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
 (function ($) {
    $(document.body).is("[role]") || $(document.body).attr("role", "application");
    var a = 0;
    $.widget("me.notification", {
        options: {
            notificationClass: "ui-widget-content",
            offset: 10,
            duration: 2000,
            show: {
                effect: "fade",
                options: {},
                speed: 250,
                callback: function () {}
            },
            hide: {
                effect: "fade",
                options: {},
                speed: 250,
                callback: function () {}
            },
            fancyHide: true,
            sticky: false,
            stack: "below"
        },
        content: {
            title: "Notification",
            content: function () {
                return $(this).attr("title")
            },
            template: "<h4>${Title}</h4><p>${Content}</p>"
        },
        _init: function () {
            this.notifications = $("<div></div>").attr("role", "notification").attr("aria-hidden", "true").addClass("ui-notification ui-widget ui-corner-all").hide(), this.notification = $("<div></div>").attr("role", "notification").attr("aria-hidden", "true").addClass("ui-notification ui-widget ui-corner-all").hide(), this.options.stack == "below" ? this.notification.css("marginBottom", this.options.offset) : this.notification.css("marginTop", this.options.offset), this.notificationClose = $("<a/>").attr("href", "#").attr("role", "button").addClass("ui-notification-close ui-corner-all").hover(function () {
                $(this).addClass("ui-state-hover")
            }, function () {
                $(this).removeClass("ui-state-hover")
            }).append($("<span></span>").addClass("ui-icon ui-icon-closethick").text("close")), this.notificationContent = $("<div></div>").addClass("ui-notification-content")
        },
        enable: function () {
            this.options.disabled = false
        },
        disable: function () {
            this.options.disabled = true
        },
        widget: function (a) {
            return a ? this.notifications[a] : this.notifications
        },
        index: function () {
            return a
        },
        create: function (a, b) {
            var c = this;
            a = $.extend({}, this.content, a), b = $.extend({}, this.options, b), b.disabled || this.notifications.push((new $.me.notification.instance(this))._create(a, $.extend({}, this.options, b)))
        }
    }), $.extend($.me.notification, {
        instance: function (a) {
            this.parent = a
        }
    }), $.extend($.me.notification.instance.prototype, {
        _create: function (b, c) {
            var d = this;
            this.options = c;
            var b = b.template.replace("${Title}", b.title).replace("${Content}", b.content);
            this.element = this.parent.notification.clone(true).attr("id", "ui-notification-" + a++).append(this.parent.notificationContent.clone().html(b)).addClass(c.notificationClass), c.stack == "below" ? this.element.appendTo(this.parent.element) : this.element.prependTo(this.parent.element), c.sticky ? this.parent.notificationClose.clone(true).click(function (a) {
                d.hide();
                return false
            }).prependTo(this.element) : setTimeout(function () {
                d.hide()
            }, d.options.duration), this.show();
            return this
        },
        show: function () {
            var a = this.options.show;
            this.element.attr("aria-hidden", "false").show(a.effect, a.options, a.speed, a.callback)
        },
        hide: function () {
            var a = this,
                b = this.options.hide,
                c = $("<div></div>").height(this.element.outerHeight(true));
            this.options.fancyHide && this.element.wrap(c), this.element.hide(b.effect, b.options, b.speed, function () {
                a.options.fancyHide ? $(this).parent().animate({
                    height: 0
                }, 250, function () {
                    $(this).remove()
                }) : $(this).remove(), b.callback && b.callback()
            })
        }
    })
})(jQuery)
