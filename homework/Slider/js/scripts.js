"use strict";

(function () {
    function Slider(node, slides) {
        this.$node = $(node);
        this.slides = slides;
        this.buildDOM();
        this.$menu = this.$node.find(".nav-buttons");
        this.$slidesHolder = this.$node.find(".slider-img");
        this.sliderTimer = setInterval(this.nextSlide.bind(this), 2000);
        this.delay = null;
        this.$menu.on("click", "li", this.onClick.bind(this));
    }

    Slider.prototype.onClick = function(event){
        clearInterval(this.sliderTimer);
        clearTimeout(this.delay);
        this.$menu.find("li").removeClass("active");
        $(event.target).addClass("active");
        var sliderNode = this.$node;
        var itemAttr = $(event.target).attr("rel");
        this.moveSlide(itemAttr, sliderNode);
        var _this = this;
        this.delay = setTimeout(function () {
            _this.sliderTimer = setInterval(_this.nextSlide.bind(_this), 2000);
        }, 3000);
    };

    Slider.prototype.buildDOM = function () {
        this.$node.html("<div class='slider'><ul class='nav-buttons'></ul><div class='img-wrapper'><ul class='slider-img'></ul></div></div>");
        var _this = this;
        this.slides.forEach(function (element, index) {
            _this.$node.find('.nav-buttons').append("<li rel='" + index + "'></li>");
            _this.$node.find('.slider-img').append("<li class='slider" + index + "'><img src='" + _this.slides[index] + "'></li>");
        });
        var imgHeight = this.$node.find(".img-wrapper").height();
        this.$node.find('.nav-buttons li').height(imgHeight / this.slides.length).first().addClass("active");
    };

    Slider.prototype.nextSlide = function () {
        var activeItem = this.$menu.find(".active");
        var itemAttr = parseInt(activeItem.attr("rel"));
        activeItem.removeClass("active");
        if (itemAttr === this.$slidesHolder.children().size() - 1) {
            this.$menu.find("li:eq(0)").addClass("active");
            itemAttr = 0;
        } else {
            activeItem.next().addClass("active");
            itemAttr += 1;
        }
        this.moveSlide(itemAttr, this.$node);
    };

    Slider.prototype.moveSlide = function (itAttr, slNode) {
        var listNode = $(slNode).find(".slider-img");
        var activeItem = $(slNode).find("li.slider" + itAttr);
        var step = $(activeItem).width();
        $(listNode).stop().animate({
            marginLeft: "-" + step * itAttr
        }, 300);
    };

    window.Slider = Slider;
})();


