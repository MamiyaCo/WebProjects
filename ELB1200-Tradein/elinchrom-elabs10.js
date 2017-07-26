var lang="";
var maxwsc=402;

// Support / Downloads _________________________________________________________________________________________________________________________________________
var currentCat = 'undef';
var searchTimer = 'undef';
var lastParams = '';
function aSyncSearch() {
	var params = '';
	$.each($('#fSearchDL').serializeArray(), function(i, field) {
		params+= '&'+field.name+'='+field.value;
	});
	if (lastParams!==params) {
		lastParams = params;
		$.ajax({
			url: '/_.php?f=searchDL'+params,
			success: function(data) {
				$('#results').html(data);
				$('#searchProgress').hide();
			}
		});
	}
}

function aSyncNewSearch() {
	var params = '';
	$.each($('#fSearchNewDL').serializeArray(), function(i, field) {
		params+= '&'+field.name+'='+field.value;
	});
	if (lastParams!==params) {
		lastParams = params;
		$.ajax({
			url: '/_.php?f=searchNewDL'+params,
			success: function(data) {
				$('#results').html(data);
				$('#searchProgress').hide();
			}
		});
	}
}

function searchDL() {
	clearTimeout(searchTimer);
	searchTimer = setTimeout(function(){aSyncSearch();}, 500);
	$('#searchProgress').show();
}
function searchNewDL() {
	clearTimeout(searchTimer);
	searchTimer = setTimeout(function(){aSyncNewSearch();}, 500);
	$('#searchProgress').show();
}


function showDLLangs(id) {
	$('#dl_'+id).show();
}
function hideDLLangs(id) {
	$('#dl_'+id).hide();
}

function goSearch(e,obj,url) {
    var evt = e || window.event
    if ( evt.keyCode === 13 ) {
        location.href=url+'#stq='+$(obj).val();
        return false;
    }
}

// =============================================================================================================================================================

var kAnimationTime = 200;

$(document).ready(function(){
	$('form').attr('name','aspnetForm');
			
	$('a.adminPreview').lightBox();
    $('footer select').customSelect();	
	
    $('select.form').customSelect();	
    if ($('.customCheckbox input').length>0) $('.customCheckbox input').dnnCheckbox();		
	
    $('.product_buy select').change(function(){	
		$('.product_buy h4.price').addClass('dn');
		$('.product_buy a').addClass('dn');
		$('.product_buy h4.price_'+$(this).val()).removeClass('dn');
		$('.product_buy a.addtocart_'+$(this).val()).removeClass('dn');
	});	
		
	$("#searchInp").keyup(function(event){
		if(event.keyCode == 13){
			location.href="/Search-Results?Search="+$(this).val();
		}
	});

	$('.searchlink').click(function(){
		$('.ugol').css('top',$(this).offset().top+50);
		$('.divsearch').css('top',$(this).offset().top+60);
		if ($('.divsearch').hasClass('opn'))
		{
			$('.divsearch').removeClass('opn');
			$('.ugol').hide();
		}
		else
		{
			$('.divsearch').addClass('opn');
			$('.ugol').show();
		}
		return false;
	});

	if ($('.rslides').length) 
	{
	  $(".rslides").responsiveSlides({
        auto: true,
        manualControls: $(".rslides").next(".rslides-pager"),
        speed: 500,
        maxwidth: 1024
      });
	}
	if ($('#fSearchNewDL').length) { searchNewDL(); }
	if ($('#fSearchDL').length) { searchDL(); }
	try { $('nav#menu').sticky({topSpacing:0, center:true}); } catch (e){}
	if ($('nav#shortlinks').length>0) {
		try { $('nav#shortlinks').sticky({topSpacing:$('#menu').height(), center:true}); } catch (e){}
		$('nav#shortlinks>a').click(function(e){
			if ($($(this).attr('href')).length>0) {
				e.preventDefault();
				//e.stopPropagation();
				$('body,html').stop().animate({
					scrollTop: $($(this).attr('href')).offset().top
				}, 800);
			}
			else
			{
				return true;
			}
		});
	}

	if ($('#topLinks').length>0) {
		h=180;
		if ($('.submenuadmin').length>0) h=440;
		$('#topLinks>ul>li>a').click(function(e){
			var a = $(this);
			if(a.siblings("div").length>0){
				e.stopPropagation();
				e.preventDefault();
				if (a.next('div').height()>1) {
					a.next('div').animate({'height':0},kAnimationTime);
				}
				else {
					$('#topLinks>ul>li>div').animate({'height':0}, kAnimationTime);
					a.next('div').animate({'height':h}, kAnimationTime);
				}
			}

		});
	}


	$(".addtocart").click(function(){
		showcart($(this));
		return false;	
	});
	
	$("#goTop").hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#goTop').fadeIn();
		} else {
			$('#goTop').fadeOut();
		}
		
		if ($('.divsearch').hasClass('opn'))
		{
			$('.ugol').css('top',$('.searchlink').offset().top+50);
			$('.divsearch').css('top',$('.searchlink').offset().top+60);
		}		
	});	
	
	$("body header .menusmall").click(function(){															
		if ($(this).hasClass("opn"))
		{
			$("body header .menusmall").removeClass("opn");
			$("body header nav#menu").removeClass('opn');
		}
		else
		{
			$(this).addClass("opn");
			$("body header nav#menu").addClass('opn');
		}
		return false;
	});

	$("h2.mobiletab").click(function(){
		if ($(window).width()<=1000)	
		{															
			if ($(this).hasClass("opn"))
			{
				$(this).removeClass("opn");
				var obj = $(this).next(".open");
				while(obj.length>0){
					if (obj.is('h2')) break;
					obj.removeClass('opn');
	            	obj = obj.next(".open");
	        	}				
			}
			else
			{
				$(this).addClass("opn");
				var obj = $(this).next(".open");
				while(obj.length>0){
					if (obj.is('h2')) break;
					obj.addClass('opn');
	            	obj = obj.next(".open");
	        	}				
			}
			return false;
		}			
	});
	
	$("footer h2").click(function(){
		if ($(window).width()<=800)	
		{															
			if ($(this).hasClass("opn"))
			{
				$("footer h2").removeClass("opn");
				$(this).next(".open").removeClass('opn');
			}
			else
			{
				$("footer h2").removeClass("opn");
				$("footer div.multicol div div.open").removeClass('opn');
				$(this).addClass("opn");
				$(this).next(".open").addClass('opn');
			}
			return false;
		}			
	});
	
	$("body section .block.grid ul>li h4.price .more_small").click(function(){
		var htmltmp=$("article",$(this).parent().parent().parent()).html();
		window.location.hash=$(this).attr('href');
		$("article#tmp").html('<a href="#" class="close" onclick="$(this).parent().hide();return false;"><img src="/i/b_close.png" alt="close"></a>'+htmltmp);
		$("article#tmp").css('top',$(this).offset().top+40);
		$("article#tmp").show('slow');
		$("article#tmp").append('<style type="text/css">article#tmp:before { left: '+($(this).offset().left-$('article#tmp').offset().left+20)+'px; }</style>');
		$(".addtocart").click(function(){
				showcart($(this));
				return false;	
		});			
		$('body,html').animate({
					scrollTop: $(this).offset().top+40-120
		}, 800);		
		return false;
	});
	
	if (window.location.hash.indexOf("#p-")>=0 && $(window).width()>=1000) 
		$('a[href='+window.location.hash+']').click();
		
	setEmp();

	
	$(window).resize(function () {
		setEmp();	
			
	if ($('.product_buy select.form').length>0)
	{
		$(".customSelectInner").remove();
		$(".customSelect").remove();
		$(".hasCustomSelect").removeClass('hasCustomSelect');		
		$('.product_buy select.form').attr('style','');
		if ($(window).width()>maxwsc)
		{
			$('.product_buy select.form').css('width',maxwsc-55);
		}
		else
		{
			$('.product_buy select.form').css('width',$(window).width()-85);
		}
		$('.product_buy select.form').customSelect();					
	}
					
		$("article#tmp").hide();
		$('nav#menu').attr('style','');
		$('nav#shortlinks').attr('style','');
		if($('nav#menu').parent().hasClass('sticky-wrapper')) $('nav#menu').unwrap();
		$('nav#menu').sticky({topSpacing:0, center:true});
		if ($('nav#shortlinks').length>0) {
			if($('nav#shortlinks').parent().hasClass('sticky-wrapper')) $('nav#shortlinks').unwrap();
			$('nav#shortlinks').sticky({topSpacing:$('#menu').height(), center:true});
			$('nav#shortlinks>a').click(function(e){
				e.preventDefault();
				//e.stopPropagation();
				$('body,html').stop().animate({
					scrollTop: $($(this).attr('href')).offset().top
				}, 800);
			});
		}
		
		if (xget('Redirecting') && xget('MailingList')) 
		{		
			if ($(window).width()<=850) 
			{
				xget('MailingList').style.width='100%';			
				xget('MailingList').style.left='0';	
				$('#MailingList iframe').css('height',700);
			}
			else
			{
				xget('MailingList').style.width='850px';			
				xget('MailingList').style.left=(parseInt(getViewportWidth()/2)-425)+'px';	
				$('#MailingList iframe').css('height',600);
			}
		}
		
	});
	
	// scroll body to 0px on click
	$('#goTop').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});


	if ($('.fancy').length>0) {
		$('.fancy').fancybox(
		{
			maxWidth	: '95%',
			maxHeight	: '70%',
			fitToView	: false,
			width		: '95%',
			height		: '70%',
			autoSize	: false,
			closeClick	: true,
			closeBtn	: false,
			openEffect	: 'none',
			closeEffect	: 'none',
			topRatio : 0.1,
			'padding': 0,
			'margin': 0,
			afterShow : function(){ $(this.element).closest('.block.medias').find('.legend').fadeIn();},
			beforeClose: function(){ $(this.element).closest('.block.medias').find('.legend').fadeOut();},
			helpers : {
				overlay : {
					css : {
						'background' : 'rgba(255, 255, 255, 0.95)'
					}
				},
				title : {
					type : 'outside',
				}
			}
		}
		);
	};

	if ($('#fSearchDL').length>0) {
		$('#fSearchDL input').bind('click keyup', function(){ searchDL(); });
	}
	
	if ($('#fSearchNewDL').length>0) {
		$('#fSearchNewDL input').bind('click keyup', function(){ searchNewDL(); });
		$('#fSearchNewDL img').bind('click', function(){ searchNewDL(); });
		
	}


	$(document).on("click", ".dl>.ftype,.dl>.fname,.dl>.fsize,.dl>.fdownload.open", function(){
		if( ! $(this).closest(".dl").find('.fdetails').is(':visible')){
			$('.fdetails').hide();    
			$(this).closest(".dl").find('.fdetails').show();
		}else{	
			$('.fdetails').hide();    
		}
	});
	
	
	
	
	

});

function showImage(idFolder,idFile,obj)
{
	if (xget(idFolder) && xget(idFile) && obj)
	{
		var nfile=xget(idFile).value;
		for (i=0;i<xget(idFile).options.length;i++)
		{
			if (nfile==xget(idFile).options[i].value)
			{
				nfile=xget(idFile).options[i].text;
			}
		}
		obj.href="/Portals/0/"+xget(idFolder).value+nfile;
	}
	return false;
}

function showImageMediaId(c,obj)
{
	if ($("."+c).length>0 && obj)
	{
		obj.href="/getMedia.aspx?ID="+$("."+c).val();
	}
	return false;
}

function setEmp()
{
	if ($(window).width()<=1000)
	{
		$("p").each(function(){		
			if ($(this).html()=="&nbsp;")
			{
				$(this).addClass("emp");
			}
		});
		$("h1").each(function(){															
			if ($(this).html()=="&nbsp;")
			{
				$(this).addClass("emp");
			}
		});			
		$("h2").each(function(){															
			if ($(this).html()=="&nbsp;")
			{
				$(this).addClass("emp");
			}
		});		
		$("h3").each(function(){															
			if ($(this).html()=="&nbsp;")
			{
				$(this).addClass("emp");
			}
		});				
		$("span").each(function(){															
			if ($(this).html()=="&nbsp;")
			{
				$(this).addClass("emp");
			}
		});				
	}
}


function emailCheck (emailStr) {
	var emailPat=/^(.+)@(.+)$/;
	var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
	var validChars="\[^\\s" + specialChars + "\]";
	var quotedUser="(\"[^\"]*\")";
	var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
	var atom=validChars + '+';
	var word="(" + atom + "|" + quotedUser + ")";
	var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
	var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
	var matchArray=emailStr.match(emailPat);
	if (matchArray==null) {
		alert("Email address seems incorrect (check @ and .'s)");
		return false;
	}
	var user=matchArray[1];
	var domain=matchArray[2];
	if (user.match(userPat)==null) {
		alert("The username doesn't seem to be valid.");
		return false;
	}
	var IPArray=domain.match(ipDomainPat);
	if (IPArray!=null) {
		  for (var i=1;i<=4;i++) {
			if (IPArray[i]>255) {
				alert("Destination IP address is invalid!");
			return false;
			}
		}
		return true;
	}
	var domainArray=domain.match(domainPat);
	if (domainArray==null) {
		alert("The domain name doesn't seem to be valid.");
		return false;
	}
	var atomPat=new RegExp(atom,"g");
	var domArr=domain.match(atomPat);
	var len=domArr.length;
	if ((domArr[domArr.length-1] != "info") &&
		(domArr[domArr.length-1] != "name") &&
		(domArr[domArr.length-1] != "arpa") &&
		(domArr[domArr.length-1] != "coop") &&
		(domArr[domArr.length-1] != "aero")) {
			if (domArr[domArr.length-1].length<2 ||
				domArr[domArr.length-1].length>3) {
					alert("The address must end in a three-letter domain, or two letter country.");
					return false;
			}
	}
	if (len<2) {
	   var errStr="This address is missing a hostname!";
	   alert(errStr);
	   return false;
	}
	return true;
}
function UPTvalidateform(thisform)
{
	if (thisform.val_8.selectedIndex==0) { 
		alert("Please select a value for Country");
		return(false);
	}
	if (emailCheck(thisform.email.value)) 
	{	
        if ((document.getElementById('unsubscribe') 
            && document.getElementById('unsubscribe').checked) && (document.getElementById('showpopup') && document.getElementById('showpopup').value == "on")) {
	   	alert('Thank you, now you are unsubscribed!'); 
	}
	else if(( (document.getElementById('unsubscribe')
            && !document.getElementById('unsubscribe').checked) || (!document.getElementById('unsubscribe')) ) && (document.getElementById('showpopup') && document.getElementById('showpopup').value == "on")){
        	alert('Thank you for signing up!');
        }
		thisform.method='post'; thisform.action='http://www.elabs10.com/functions/mailing_list.html'; thisform.submit();		
		return false;
	}
	else
	{
		return false;
	}
}


/*!
 * jquery.customSelect() - v0.4.1
 * http://adam.co/lab/jquery/customselect/
 * 2013-05-13
 *
 * Copyright 2013 Adam Coulombe
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 * @license http://www.gnu.org/licenses/gpl.html GPL2 License 
 */
(function ($) {
    'use strict';

    $.fn.extend({
        customSelect: function (options) {
            // filter out <= IE6
            if (typeof document.body.style.maxHeight === 'undefined') {
                return this;
            }
            var defaults = {
                    customClass: 'customSelect',
                    mapClass:    true,
                    mapStyle:    true
            },
            options = $.extend(defaults, options),
            prefix = options.customClass,
            changed = function ($select,customSelectSpan) {
                var currentSelected = $select.find(':selected'),
                customSelectSpanInner = customSelectSpan.children(':first'),
                html = currentSelected.html() || '&nbsp;';

                customSelectSpanInner.html(html);
                
                if (currentSelected.attr('disabled')) {
                	customSelectSpan.addClass(getClass('DisabledOption'));
                } else {
                	customSelectSpan.removeClass(getClass('DisabledOption'));
                }
                
                setTimeout(function () {
                    customSelectSpan.removeClass(getClass('Open'));
                    $(document).off('mouseup.'+getClass('Open'));                  
                }, 60);
            },
            getClass = function(suffix){
                return prefix + suffix;
            };

            return this.each(function () {
                var $select = $(this),
                    customSelectInnerSpan = $('<span />').addClass(getClass('Inner')),
                    customSelectSpan = $('<span />');

                $select.after(customSelectSpan.append(customSelectInnerSpan));
                
                customSelectSpan.addClass(prefix);

                if (options.mapClass) {
                    customSelectSpan.addClass($select.attr('class'));
                }
                if (options.mapStyle) {
                    customSelectSpan.attr('style', $select.attr('style'));
                }

                $select
                    .addClass('hasCustomSelect')
                    .on('update', function () {
						changed($select,customSelectSpan);

					
                        var selectBoxWidth = parseInt($select.outerWidth(), 10) -
                                (parseInt(customSelectSpan.outerWidth(), 10) -
                                    parseInt(customSelectSpan.width(), 10));					

						if ($select.attr('id')=='dnn_ctr651_AddProducts_FormView2_ProductDropDownList' || $select.attr('id')=='dnn_ctr651_AddProducts_FormView2_modelDropDownList' || $select.attr('id')=='dnn_ctr651_AddProducts_FormView1_DealerStateDropDownList' || $select.attr('class').indexOf('w270300')>0)
						{
							selectBoxWidth=280;
						}

						// Set to inline-block before calculating outerHeight
						customSelectSpan.css({
                            display: 'inline-block'
                        });
						
                        var selectBoxHeight = customSelectSpan.outerHeight();

                        if ($select.attr('disabled')) {
                            customSelectSpan.addClass(getClass('Disabled'));
                        } else {
                            customSelectSpan.removeClass(getClass('Disabled'));
                        }

                        customSelectInnerSpan.css({
                            width:   selectBoxWidth,
                            display: 'inline-block'
                        });

                        $select.css({
                            '-webkit-appearance': 'menulist-button',
                            width:                customSelectSpan.outerWidth(),
                            position:             'absolute',
                            opacity:              0,
                            height:               selectBoxHeight,
                            fontSize:             customSelectSpan.css('font-size')
                        });
                    })
                    .on('change', function () {
                        customSelectSpan.addClass(getClass('Changed'));
                        changed($select,customSelectSpan);
                    })
                    .on('keyup', function (e) {
                        if(!customSelectSpan.hasClass(getClass('Open'))){
                            $select.blur();
                            $select.focus();
                        }else{
                            if(e.which==13||e.which==27){
                                changed($select,customSelectSpan);
                            }
                        }
                    })
                    .on('mousedown', function (e) {
                        customSelectSpan.removeClass(getClass('Changed'));
                    })
                    .on('mouseup', function (e) {
                        
                        if( !customSelectSpan.hasClass(getClass('Open'))){
                            // if FF and there are other selects open, just apply focus
                            if($('.'+getClass('Open')).not(customSelectSpan).length>0 && typeof InstallTrigger !== 'undefined'){
                                $select.focus();
                            }else{
                                customSelectSpan.addClass(getClass('Open'));
                                e.stopPropagation();
                                $(document).one('mouseup.'+getClass('Open'), function (e) {
                                    if( e.target != $select.get(0) && $.inArray(e.target,$select.find('*').get()) < 0 ){
                                        $select.blur();
                                    }else{
                                        changed($select,customSelectSpan);
                                    }
                                });
                            }
                        }
                    })
                    .focus(function () {
                        customSelectSpan.removeClass(getClass('Changed')).addClass(getClass('Focus'));
                    })
                    .blur(function () {
                        customSelectSpan.removeClass(getClass('Focus')+' '+getClass('Open'));
                    })
                    .hover(function () {
                        customSelectSpan.addClass(getClass('Hover'));
                    }, function () {
                        customSelectSpan.removeClass(getClass('Hover'));
                    })
                    .trigger('update');
            });
        }
    });
})(jQuery);

function showcart(obj)
{
	$('#popuptableBG').height(getDocumentHeight());
	$('#popuptableBG').show();
	
	$('#popuptableBG').click(function(){closecart();return false;});	
	$('.cartsmall').html('<div style="text-align:center;"><img src="/i/ajax-loader2.gif" alt="loading" /></div>');	
	$('.cartsmall').show();	
	$('.cartsmall').addClass('transparent');	
	$('.cartsmall').css('top',$(window).scrollTop()+$(window).height()/2);
	$.ajax({
		url: obj.attr('href'),
		success: function(data) {	
			$('.cartsmall').removeClass('transparent');			
			$('.cartsmall').html($('.cartsmall', $(data)).html());	
			$('.cartsmall').show();
			$('.cartsmall').css('top',$(window).scrollTop()+100);
			$('#popuptableBG').click(function(){closecart();return false;});
			$('.cartsmall .close').click(function(){closecart();return false;});
		}
	});	
}
function closecart()
{
	$('.cartsmall').hide();
	$('#popuptableBG').hide();
}