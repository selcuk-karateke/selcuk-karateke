/* global $ */
$(document).ready(function(){
	//
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.back-to-top').fadeIn();
		} else {
			$('.back-to-top').fadeOut();
		}
	});
	// scroll body to 0px on click
	$('.back-to-top').click(function () {
		$('.back-to-top').tooltip('hide');
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	//
	$('.navbar-nav .nav-link').click(function(){
		$('.navbar-nav .nav-link').removeClass('active');
		$(this).addClass('active');
	});
	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-hide').click(function() {
		$('.navbar-collapse').collapse('hide');
	});
	$(function() {
		$('#toc').append('<div>Nav ON</div>');
	});
	// Smooth scrolling using jQuery easing
	$('a.js-hide[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - 71)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});
	// Debug: Show Frame if clicked
	$(document).on('click', function(event) {
		$(event.target).closest('.fig').toggleClass('figframe');
	});
	// Hide / Show
	
	$(".frame_rm").click(function(){
		//$(".fig").hide();
		sessionStorage.setItem('frame', false);
		$("figure").removeClass("fig","figframe");		
		$("figcaption").removeClass("figcap");
	});
	$(".frame_add").click(function(){
		//$(".fig").show();
		sessionStorage.setItem('frame', true);
		$("figure").addClass("fig","figframe");
		$("figcaption").addClass("figcap");
	});
	$(".ajaxx").click(function(){
		$.post("/maintence/test.php", {
			change: $(this).val()
		},
		function (data){
		   document.querySelector('#inp_screen').placeholder = data;
		});
	});
	// AJAX
	$("#ajaxx").click(function() {
		
	});
	
	$("#toolb").click(function(){
		document.querySelector('#inp_screen').placeholder = this;
	});
	$("#helps").click(function(){
		document.querySelector('#inp_screen').placeholder = 'helps';
	});
	$("#datab").click(function(){
		document.querySelector('#inp_screen').placeholder = 'datab';
	});
	$("#datax").click(function(){
		document.querySelector('#inp_screen').placeholder = 'datax';
	});
	$("#ruler").click(function(){
		document.querySelector('#inp_screen').placeholder = 'Shows the coordination data/cursor position and contains helpers for "responsive design".';
	});
});