(function () {

    'use strict';

    function TagList(targetNode, predefinedTagList) {
        this.$root = targetNode;
        this.tagsArray = predefinedTagList || [];
        this.buildDOM();
        this.$widget = this.$root.find('.widget-wrapper');
        this.$button = this.$root.find('.show-hide-edit-box');
        this.$editBox = this.$root.find('.edit-box');
        this.$tagBox = this.$root.find('.tag-box');
        this.$tagInput = this.$root.find('.tag-input');
        this.$tagButton = this.$root.find('.tag-button');
        this.$closeAllButton = this.$root.find('.close-all-button');
        this.events();
        this.addPredefinedTag();
    }

    TagList.prototype.buildDOM = function () {
        this.$root.html('<div class="widget-wrapper">' +
        '<span class="show-hide-edit-box">В режим редактирования</span>' +
        '<span class="close-all-button">Удалить все теги</span>' +
        '<div class="tag-box"></div><div class="edit-box">' +
        '<input type="text" class="tag-input" maxlength="40" placeholder="Введите название тега">' +
        '<input type="submit" class="tag-button" value="Добавить"></div></div>')
    };

    TagList.prototype.events = function () {
        var _this = this;
        this.$button.click(function () {
            _this.switchButton();
        });
        this.$tagButton.click(function () {
            _this.addTag();
        });
        this.$tagBox.on('click', 'span', function () {
            var value = $(this).closest('.tag').text().replace(/[×]/, '');
            var index = _this.tagsArray.indexOf(value);
            _this.tagsArray.splice(index, 1);
            $(this).closest('.tag').remove();
            if (_this.tagsArray.length === 0) {
                _this.$closeAllButton.css({
                    'opacity': '0'
                });
            }
        });
        this.$tagInput.keyup(function (event) {
            if (event.keyCode === 13) {
                _this.addTag();
            }
        });
        this.$closeAllButton.click(function () {
            _this.tagsArray = [];
            _this.$tagBox.find('.tag').remove();
            $(this).css({
                'opacity': '0'
            });
        });
    };

    TagList.prototype.addPredefinedTag = function () {
        var _this = this;
        this.tagsArray.forEach(function (value) {
            _this.displayTags(value);
        });
        _this.$widget.find('.tag span').text('');

    };

    TagList.prototype.switchButton = function () {
        this.$editBox.stop().slideToggle('fast');
        if (this.$button.text() === 'В режим редактирования') {
            this.enableEditMode();
        } else {
            this.disableEditMode();
        }
    };

    TagList.prototype.enableEditMode = function () {
        this.$button.text('В режим проверки');
        this.$widget.find('.tag span').text('×');
        this.$widget.find('.tag').css({
            'padding': '4px 28px 4px 15px'
        });
        if (this.tagsArray.length !== 0) {
            this.$closeAllButton.css({
                'opacity': '1'
            });
        }
    };

    TagList.prototype.disableEditMode = function () {
        this.$button.text('В режим редактирования');
        this.$widget.find('.tag span').text('');
        this.$widget.find('.tag').css({
            'padding': '4px 15px'
        });
        this.$closeAllButton.css({
            'opacity': '0'
        });
    };

    TagList.prototype.addTag = function () {
        this.inputValue = this.$tagInput.val();
        if (this.tagsArray.indexOf(this.inputValue.trim()) !== -1 || this.inputValue === '') {
            return;
        }
        this.tagsArray.push(this.inputValue);
        this.displayTags(this.inputValue);
        this.$widget.find('.tag').css({
            'padding': '4px 28px 4px 15px'
        }).find('span').text('×');
        this.inputValue = this.$tagInput.val('');
        this.$closeAllButton.css({
            'opacity': '1'
        });
    };

    TagList.prototype.displayTags = function (value) {
        var _this = this;
        this.tagsArray.forEach(function (currentValue) {
            if (currentValue === value) {
                _this.$tagBox.append('<div class="tag">' + currentValue + '<span></span></div>');
            }
        });
    };

    window.TagList = TagList;
})();