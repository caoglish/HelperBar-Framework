/*
development framework, add a useful and functional menu bar in the page.
@version     0.3.2a
*/
//$.fn.menubar jquery plugin, create a menubar 
(function ($) {
    "use strict";
	
	//core of menubar
    var STATUS_BAR = '#helper-bar-7cad339b0b08db99561c640461d00a07';
    var STATUS_TITLE = '#status-title';
    var STATUS_MESSAGE = '#status-message';
	var STATUS_FOOTER = '#status-footer';
    var STATUS_MENU = '#status-menu';
    var LIST_MENU = "#list-menu";

    //(start)Jquery plugin development framework.
    var settings;
	//private css settings.
    var tag_a_css,font_style,bar_basic_style,root_menu_style,menu_style,menu_ul_style,css_fix;//all css style variable.
    var methods = {
        init: function (menu_tree_list, options) {
            settings = $.extend(true, {
                bar_title: 'Helper Bar',
				bar_foot:'',
				foot_mode:'hide',
				foot_size:'6px',
                safe_mode: 'safe',
                hide_mode: 'notOnMenu',
                warn_size: '50px', 
                warn_color: 'red', 
                warn_mode: 'append', 
                border_radius: '56px',
                bar_bg_color: 'black',
                bar_opacity: '0.8',
                bar_font_color: 'white',
				menu_width: 'auto',
				menu_separator_color: 'black',
                menu_bg_color: '#111111',
                menu_hover_bg_color: '#333333',
                font_family: 'Arial,Helvetica,Sans-Serif',
				menu_font_color: '#EAFFED'
            }, options); //options 
			manage_css();//manage all css stylesheet
           
            return this.each(function () {
                jqob_clean.call($(this)); //clean this jquery object content and texts
                convert_status_bar.call($(this));
                init_status_bar.apply($(this), menu_tree_list);
            });
        },

        title: function (title) {
            return this.each(function () {
                $(this).find(STATUS_TITLE).append(title);
            });
        },

        clsTitle: function () {
            return this.each(function () {
                $(this).find(STATUS_TITLE).empty();
            });
        },
		foot: function (text) {
            return this.each(function () {
                $(this).find(STATUS_FOOTER).append(text);
            });
        },

        clsFoot: function () {
            return this.each(function () {
                $(this).find(STATUS_FOOTER).empty();
            });
        },

        html: function (html) {
            if (arguments.length === 0) {
                return this.find(STATUS_MESSAGE).html();
            } else {
                return this.each(function () {
                    $(this).find(STATUS_MESSAGE).html(html);
                });
            }
        },

        append: function (text) {
            return this.each(function () {
                $(this).find(STATUS_MESSAGE).append(text);
            });
        },
        getSettings: function () {
            return settings;
        }
    };

    $.fn.menubar = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.menubar');
        }
    };
    //(end)Jquery plugin development framework.
    //----------------

    //string methods 
    String.prototype.strip = function () {
        var patt = /^#|^\./;
        return this.replace(patt, '');
    };

    //jquery tag maker
    $.tag = function (tag, opts) {
        return $('<' + tag + '/>', opts);
    };

    //Menubar ui Maker
    function jqob_clean() {
        var jqob = this;
        jqob.empty().removeAttr('id').removeAttr('class').removeAttr('style');
    }
	
	function manage_css(){
		font_style={'font-family':settings.font_family
					,'font-size':'100%'};
		bar_basic_style={
            'position': 'fixed',
            'background-color': settings.bar_bg_color,
            'color': settings.bar_font_color,
            'bottom': '0',
            'right': '0',
            'opacity': settings.bar_opacity,
            'border-radius': '0px ' + settings.border_radius + ' 0px 0px',
			'padding':'0px',
            'padding-left': '2px',
            'margin-left': '1px',
            'width': '100%',
			'z-index': '99999',
			'line-height': 'normal',
            'text-align': 'left'
        };//css: #helper-bar-nnnnnnnnnnnnnn
		
		var menu_basic_style={
			'padding':'0px',
			'background':'',
			'list-style': 'none',
            'margin': '0px'
        };//basic style for both menu and root menu
		
		menu_ul_style={
            'margin': '0',
           'padding': '0',
            'position': 'absolute',
            'bottom': '23px'
        };
		
		menu_style=$.extend({},menu_style,menu_basic_style,{	
						'display': 'inline'
					 });//css:#status-menu ul li ul li

		root_menu_style=$.extend({},menu_basic_style,{	
						  'float': 'left',
						  'border-left':'1px solid '+settings.menu_separator_color
					});//css:#status-menu ul li

		tag_a_css ={
                'display': 'block',
                'padding': '5px 12px',
                'text-decoration': 'none',
                'width': settings.menu_width,
                'color': settings.menu_font_color,
                'white-space': 'nowrap'
            }; //tag a style sheet.
		bar_basic_style=$.extend({},bar_basic_style,font_style);
		css_fix={'padding':'0px'};
	}

    function convert_status_bar() {
        this.attr('id', STATUS_BAR.strip()).css(bar_basic_style); //create status bar//css: #helper-bar-nnnnnnnnnnnnnn
		
		
        var div_status_title = $.tag('div', {
            id: STATUS_TITLE.strip()
        }).css(css_fix).css(font_style); //create status title area
        var div_status_message = $.tag('div', {
            id: STATUS_MESSAGE.strip()
        }).css(css_fix).css(font_style); //create status message area
		var div_status_footer = $.tag('div', {
            id: STATUS_FOOTER.strip()
        }).css(css_fix).css(font_style); //create status footer area
		if(settings.foot_size!=='none'){div_status_footer.css('font-size',settings.foot_size);}

        this.append(div_status_title).append(div_status_message).append(div_status_footer).append(create_status_menu());
    }

    //status menu
    function create_status_menu() {
        var div_status_menu = $.tag('div', {
            id: STATUS_MENU.strip()
        }).css(css_fix); //create status menu
        var ul_list_menu = $.tag('ul', {
            id: LIST_MENU.strip()
        }); //create menu list
        ul_list_menu.css({
            margin: 0,
            padding: 0
        }); //css: #status-menu ul
        div_status_menu.append(ul_list_menu); //construct status bar
        return div_status_menu;
    }

    function create_root_menu_item(id, title, callback) {
        var tag_a = $.tag('a', {
            id: id,
            href: '#',
            text: title
        }).click(function (event) {
            event.preventDefault();
            if (callback) {
                callback.apply();
            }
        });

        tag_a.css(tag_a_css).css({
            background: settings.menu_bg_color
        }).hover(

        function () {
            $(this).css({
                background: settings.menu_hover_bg_color.hover_background_color
            });
        },

        function () {
            $(this).css({
                background: settings.menu_bg_color
            });
        }); //css:#status-menu ul li a

        var root_menu_item = $.tag('li').css(root_menu_style) //css:#status-menu ul li
        .append(tag_a);
        return root_menu_item;
    }

    function create_menu_item(id, title, callback) {
        var menu_item = $.tag('li');
        menu_item.css(menu_style); //css:#status-menu ul li ul li
        var tag_a = $.tag('a', {
            id: id,
            href: '#',
            text: title
        }).click(function (event) {
            event.preventDefault();
            if (callback) {
                callback.apply();
            }
        });

        tag_a.css(tag_a_css).css({
            background: settings.menu_bg_color
        }).css({
            'border-bottom': '1px solid '+settings.menu_separator_color
        }).hover(

        function () {
            $(this).css({
                background: settings.menu_hover_bg_color
            });
        },

        function () {
            $(this).css({
                background: settings.menu_bg_color
            });
        }); //css:#status-menu ul li ul li a
        menu_item.append(tag_a);
        return menu_item;
    }

    //root_menu must have attribute of id,title,click[function]
    function construct_root_menu(root_menu) {
        return create_root_menu_item(root_menu.id, root_menu.title, root_menu.click);
    }

    function construction_menu(menu_list) {
        var tag_ul = $.tag('ul');
        tag_ul.hide().css(menu_ul_style); //css:#status-menu ul li ul
        for (var menu in menu_list) {
            var id = menu_list[menu].id;
            var title = menu_list[menu].title;
            var click = menu_list[menu].click;
            tag_ul.append(create_menu_item(id, title, click));
        }
        return tag_ul;
    }

    function construct_one_menu_tree(menu_array) {
        var one_menu_tree = construct_root_menu(menu_array.root).append(construction_menu(menu_array.list));
        //hover to show and hide the menu items.
        one_menu_tree.hover(function () {
            $(this).find('ul').slideDown();
        }, function () {
            $(this).find('ul').slideUp();
        });
        return one_menu_tree;
    }


    //hide_mode
    function select_hide_mode() {
        //hide mode selection: all, onBar, notOnBar,notOnMenu,noHide
        var jqob_menubar = this;
        if (settings.hide_mode === 'all') {
            $(document).dblclick(function () {
                jqob_menubar.toggle();
            });
        } else if (settings.hide_mode === 'onBar') {
            $(document).dblclick(function (e) {
                var event_area = $(e.target).parents(STATUS_BAR);
                if (event_area[0] === jqob_menubar[0]) {
                    jqob_menubar.hide();
                } else {
                    jqob_menubar.show();
                }
            });
        } else if (settings.hide_mode === 'notOnBar') {
            $(document).dblclick(function (e) {
                var event_area = $(e.target).parents(STATUS_BAR);
                if (event_area[0] !== jqob_menubar[0]) {
                    jqob_menubar.toggle();
                }
            });
        } else if (settings.hide_mode === 'notOnMenu') {
            $(document).dblclick(function (e) {
                var event_area = $(e.target).parents(STATUS_BAR);
                if (!(event_area[0] === jqob_menubar[0] && e.target.nodeName === 'A')) {
                    jqob_menubar.toggle();
                }
            });
        } else if (settings.hide_mode === 'noHide') {
		} else {
            $.error('Wrong Type of Hide Mode');
        }
    }
	
    //have a parameter menu_tree_list
    function init_status_bar() {
        var menu_tree_list = arguments; //get parameter
        var jqob_menubar = this;
		//set the status menu will show on mouse over the statusbar, hide on mouse out
        var jqob_status_menu = jqob_menubar.find(STATUS_MENU);
		var jqob_footer=jqob_menubar.find(STATUS_FOOTER);
		jqob_menubar.hover(function () {
			if(settings.foot_mode === 'hide' ) {jqob_footer.show();}
            jqob_status_menu.show();
			
        }, function () {
			if(settings.foot_mode === 'hide' ) {jqob_footer.hide('slow');}
            jqob_status_menu.hide('slow');
        });
        for (var menu_tree in menu_tree_list) {
            construct_one_menu_tree(menu_tree_list[menu_tree]).appendTo(this.find(LIST_MENU));
        }
        //initalize the default appearance of the status bar
		jqob_status_menu.hide();
		if(settings.foot_mode === 'hide' ) {jqob_footer.hide();}
		jqob_menubar.menubar('title', settings.bar_title);
		jqob_menubar.menubar('foot', settings.bar_foot);
		select_hide_mode.call(jqob_menubar); //select hide mode
    }
})(jQuery);

//create Helper Bar as Class for the page
//provide API of Helper Bar
(function ($) {
    "use strict";
    var _menubar;
    var _settings;
	
	function _makeTagMsg(tag,text,style){
		return style?$.tag(tag).html(text).css(style):$.tag(tag).html(text);
	}
	
    function HelperBar(menu_tree_list, options) {
        _menubar = $.tag('div').appendTo('body').menubar(menu_tree_list, options);
        _settings = _menubar.menubar('getSettings');
        if (_settings.safe_mode === 'safe') {} else if (_settings.safe_mode === 'unsafe') {
            this.getMenuBar = function () {
				return _menubar;
            };
            this.getSettings = function () {
				return _settings;
            };
        } else {
            $.error('no this type of safe mode.');
        }
    }

    HelperBar.prototype.append = function (text) {
        _menubar.menubar('append', text);
        return this;
    };

    HelperBar.prototype.html = function (html) {
        if (arguments.length !== 0) {
            _menubar.menubar('html', html);
            return this;
        } else {
            return _menubar.menubar('html');
        }
    };

    HelperBar.prototype.addmsg = function (msg, style) {
        if (typeof style === 'string') {
            msg = _makeTagMsg('span',msg,{color:style});
        } else if (typeof style === 'object') {
            msg = _makeTagMsg('span',msg,style);
			
        }
        this.append(msg);
        return this;
    };

    HelperBar.prototype.msg = function (msg, style) {
        if (arguments.length !== 0) {
            this.cls();
            return this.addmsg(msg, style);
        } else {
            return $(this.html()).text();
        }
    };

    HelperBar.prototype.log = function (msg) {
        msg = _makeTagMsg('div',msg);
        return this.addmsg(msg);
    };

    HelperBar.prototype.warn = function (msg) {
        var style = {
            color: _settings.warn_color,
            'font-size': _settings.warn_size
        };
        if (_settings.warn_mode === 'append') {
            return this.addmsg(msg, style);
        } else if (_settings.warn_mode === 'log') {
            msg = _makeTagMsg('div',msg,style);
            return this.append(msg);
        } else if (_settings.warn_mode === 'clean') {
			return this.msg(msg, style);
        } else {
            $.error('no this type of warning mode');
        }
    };
	
	//add in version 0.3.2a
	HelperBar.prototype.clickClsMsg = function (msg, style,func) {
		if(typeof style  === 'function') func = style;
		
        var message=$.tag('div')
			.html(msg)
			.click(function(){
				$(this).remove();
				if(typeof func === "function") func.call(message);
			});
			
		if(typeof style  === 'number') {
			message.css({'font-size':style});
		}else if(typeof style  === 'string') {
			message.css({'color':style});
		}else if(typeof style  === 'object'){
			message.css(style);
		}else{
			message.css({'font-size':'100%'});
		}
		this.msg(message);
    };

    HelperBar.prototype.cls = function () {
        this.html('');
        return this;
    };

    HelperBar.prototype.title = function (text) {
        _menubar.menubar('title', text);
        return this;
    };
	
	HelperBar.prototype.clsTitle = function () {
        _menubar.menubar('clsTitle');
        this.title(_settings.bar_title);
        return this;
    };
	
	HelperBar.prototype.foot = function (text) {
        _menubar.menubar('foot', text);
        return this;
    };
	
	HelperBar.prototype.clsFoot = function () {
        _menubar.menubar('clsFoot');
        return this;
    };

    HelperBar.prototype.open = function (url, mode) {
        mode = mode || 'self';
        if (mode === 'new') {
            window.open(url, '_blank');
        } else if (mode === 'self') {
            window.open(url, '_self');
        } else {
            window.open(url);
        }
        return this;
    };

    HelperBar.prototype.show = function (speed) {
        if (speed === undefined) {
            _menubar.show();
        } else {
            _menubar.slideDown(speed);
        }
        return this;
    };

    HelperBar.prototype.hide = function (speed) {
        if (speed === undefined) {
            _menubar.hide();
        } else {
            _menubar.slideUp(speed);
        }
        return this;
    };

    HelperBar.prototype.version = function () {
        return '0.3.2a';
    };

    window.HelperBar = (function () {
        var instantiated;

        function init(menu_tree_list, options) {
            return new HelperBar(menu_tree_list, options);
        }
        return {
            getbar: function (menu_tree_list, options) {
                if (!instantiated) {
                    instantiated = init(menu_tree_list, options);
                }
                return instantiated;
            },
            version: function () {
                return HelperBar.prototype.version();
            }
        };
    })();
})(jQuery);