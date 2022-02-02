/* Slider para Banner de Medios de Pago */

$('.sliderPaymentBanner').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    rows: 2,
    arrows: false,
    mobileFirst:true,
    autoplay:true,
    autoplaySpeed: 1500,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 8,
                slidesToScroll: 8,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        }
    ]
});


/* Slider para marcas */

$(document).ready(function(){
	$('.sliderBrands').slick({
	slidesToShow: 2,
	centerMode: true,
	autoplay:true,
	nextArrow: document.getElementById('button_Right_Slider'),
    prevArrow: document.getElementById('button_Left_Slider'),
	mobileFirst:true,
	responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
	});
});

/* Slider para productos */

$(document).ready(function(){
	$('.sliderProducts').slick({
	slidesToShow: 1,
	centerMode: true,
	autoplay:true,
	nextArrow: document.getElementById('button_Right_Slider1'),
    prevArrow: document.getElementById('button_Left_Slider1'),
	mobileFirst:true,
	responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 380,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
	});
});

/* Slider para el Historial de Productos */

$(document).ready(function(){
    $('.historyProductsSlider').attr('dir', 'rtl');
	$('.historyProductsSlider').slick({
	slidesToShow: 1,
	centerMode: true,
	autoplay:true,
	nextArrow: document.getElementById('button_Right_Slider3'),
    prevArrow: document.getElementById('button_Left_Slider3'),
	mobileFirst:true,
    infinite: true,
    rtl: true,
	responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 380,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
	});
});
