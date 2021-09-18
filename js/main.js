let url = 'http://vision/php/';

let stateItemName = {
    barbers: 'barbers.php',
    services: 'services.php',
    store: 'store.php',
    gallery: 'gallery.php',
}

let stateItem = {
    barbers: [],
    services: [],
    store: [],
    gallery: [],
}

let page = 1;

function sendRequest(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: url,
            contentType: false,
            cache: false,
            processData: false,
            success: function(result) {
                resolve(result);
            }
        });
    });
}

function setLoading(loadDiv, id, height) {
    loadDiv.insertAdjacentHTML('afterend', '<div class="loading" id="' + id + '" style="height: '+ height +'px;">\n' +
        '                <svg class="spinner" viewbox="0 0 50 50">\n' +
        '                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>\n' +
        '                </svg>\n' +
        '            </div>');
}

/* SET SLIDERS*/
function setMainSlider() {
    $('#slider').slick({
        dots: false,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        draggable: false,
        pauseOnHover: false,
        pauseOnFocus: false
    });
}

function setStoreSlider() {
    $('.store-slider').slick({
        slidesToShow: 3,
        dots: false,
        speed: 500,
        autoplay: false,
        draggable: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        waitForAnimate: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 1140,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });
}

function setBarbersSlider() {
    $('#barbers').slick({
        slidesToShow: 1,
        dots: false,
        speed: 1000,
        autoplay: false,
        draggable: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        waitForAnimate: false,
        infinite: false,
        fade: true,
    });
}

function setGallerySlider() {
    $('#gallery').slick({
        slidesToShow: 1,
        dots: false,
        arrows: false,
        speed: 1000,
        autoplay: false,
        draggable: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        waitForAnimate: false,
        infinite: false,
        fade: true,
        adaptiveHeight: true
    });
    connectBarbersGallerySliders();
}

function connectBarbersGallerySliders() {
    $('#barbers').slick('slickSetOption', 'asNavFor', '#gallery');
    $('#gallery').slick('slickSetOption', 'asNavFor', '#barbers');
}

/*SET LIGHTZOOM*/
function setLightzoom() {
    jQuery('.lightzoom').lightzoom({
        speed:                 400,   // скорость появления
        imgPadding:            0,    // значение отступа у изображения
        overlayOpacity:        '0.9', // прозрачность фона (от 0 до 1)
        viewTitle:             false, // true, если надо показывать подпись к изобажению
        isOverlayClickClosing: true, // true, если надо закрывать окно при клике по затемненной области
        isWindowClickClosing:  false, // true, если надо закрывать окно при клике по любой области
        isEscClosing:          true // true, если надо закрывать окно при нажатии на кнопку Esc
    });
    /*$('.lightzoom').click(function (event) {
        $('body').toggleClass('lock');
    });*/
}

/* SHOW MORE*/
function showMore(outputItems) {
    document.getElementById('showMore').style.display = 'none'
    page += 1;
    outputItems(50);
}

/* SERVICES*/
function outputService(service, outputDiv) {
    let serviceDiv = document.createElement('div');
    serviceDiv.className = 'service';

    let serviceImg = document.createElement('img');
    serviceImg.className = 'service__logo';
    serviceImg.src = 'data:image/jpg;base64,'+service.photo;
    serviceDiv.appendChild(serviceImg);

    let serviceTitle = document.createElement('h4');
    serviceTitle.className = 'service__heading';
    serviceTitle.innerHTML = service.title;
    serviceDiv.appendChild(serviceTitle);

    let serviceDescription = document.createElement('p');
    serviceDescription.className = 'service__description';
    serviceDescription.innerHTML = service.description;
    serviceDiv.appendChild(serviceDescription);


    let servicePrice = document.createElement('p');
    servicePrice.className = 'service__price';
    servicePrice.innerHTML = service.price + ' BYN';
    serviceDiv.appendChild(servicePrice);

    outputDiv.appendChild(serviceDiv);
}

function outputServices(heigth = 300) {
    let servicesDiv = document.getElementById('services');
    setLoading(servicesDiv, 'servicesLoading', heigth);
    sendRequest(url + stateItemName.services)
        .then((response) => {
            document.getElementById('servicesLoading').remove();
            response.map((val) => {
                stateItem.services.push(val);
                outputService(val, servicesDiv);
            });
        });
}

/* BARBERS*/
function outputBarber(barber, outputDiv) {
    let barberDiv = document.createElement('div');
    barberDiv.className = 'barber';

    let barberImg = document.createElement('img');
    barberImg.className = 'barber__photo';
    barberImg.src = 'data:image/jpg;base64,'+barber.photo;
    barberDiv.appendChild(barberImg);

    let barberName = document.createElement('div');
    barberName.className = 'barber__name';
    barberName.innerHTML = barber.name + ' ' + barber.surname;
    barberDiv.appendChild(barberName);

    outputDiv.appendChild(barberDiv);
}

function outputBarbers(heigth = 300) {
    let barbersDiv = document.getElementById('barbers');
    setLoading(barbersDiv, 'barbersLoading', heigth);
    sendRequest(url + stateItemName.barbers)
        .then((response) => {
            document.getElementById('barbersLoading').remove();
            response.map((val) => {
                stateItem.barbers.push(val);
                outputBarber(val, barbersDiv);
            });
        });
}

function outputBarberDeployed(barber, barbersDiv) {
    let barberDiv = document.createElement('div');
    barberDiv.className = 'barber';

    let barberImg = document.createElement('img');
    barberImg.className = 'barber__photo';
    barberImg.src = 'data:image/jpg;base64,' + barber.photo;
    barberDiv.appendChild(barberImg);

    let barberName = document.createElement('h3');
    barberName.className = 'barber__name';
    barberName.innerHTML = barber.name + ' ' + barber.surname;
    barberDiv.appendChild(barberName);

    let barberDescription = document.createElement('p');
    barberDescription.className = 'barber__description';
    barberDescription.innerHTML = barber.description;
    barberDiv.appendChild(barberDescription);
    let barberContactsDiv = document.createElement('div');
    barberContactsDiv.className = 'barber__contacts';

    let barberTelephone = document.createElement('a');
    barberTelephone.className = 'btn';
    barberTelephone.href = 'tel: ' + barber.telephone;
    barberTelephone.innerHTML = 'Позвонить';
    barberContactsDiv.appendChild(barberTelephone);

    let barberInstagram = document.createElement('a');
    barberInstagram.className = 'btn social';
    barberInstagram.href = barber.instagram;
    let instagramIcon = document.createElement('i');
    instagramIcon.className = 'fab fa-instagram fa-2x';
    barberInstagram.appendChild(instagramIcon);
    barberContactsDiv.appendChild(barberInstagram);

    let barberTelegram = document.createElement('a');
    barberTelegram.className = 'btn social';
    barberTelegram.href = barber.telegram;
    let telegramIcon = document.createElement('i');
    telegramIcon.className = 'fab fa-telegram-plane fa-2x';
    barberTelegram.appendChild(telegramIcon);
    barberContactsDiv.appendChild(barberTelegram);

    barberDiv.appendChild(barberContactsDiv);
    barbersDiv.appendChild(barberDiv);
}

function outputBarberGallery(barberGallery, barbersGalleryDiv) {
    let barberGalleryDiv = document.createElement('div');
    barberGalleryDiv.className = 'barber-gallery';

    barberGallery.forEach((val) => {
        let imgA = document.createElement('a');
        imgA.className = 'lightzoom';
        imgA.href = 'data:image/jpg;base64,' + val.photo;

        let barberPhoto = document.createElement('img');
        barberPhoto.src = 'data:image/jpg;base64,' + val.photo;
        barberPhoto.className = 'barber-gallery__photo';
        imgA.appendChild(barberPhoto);

        barberGalleryDiv.appendChild(imgA);
    })
    barbersGalleryDiv.appendChild(barberGalleryDiv);
}

function outputBarbersDeployed(heigth = 300) {
    let barbersDiv = document.getElementById('barbers');
    setLoading(barbersDiv, 'barbersLoading', heigth);
    let barbersGalleryDiv = document.getElementById('gallery');
    sendRequest(url + stateItemName.barbers)
        .then((response) => {
            document.getElementById('barbersLoading').remove();
            response.forEach((val) => {
                stateItem.barbers.push(val);
                outputBarberDeployed(val, barbersDiv);
            });
            setBarbersSlider();

            setLoading(barbersGalleryDiv, 'galleryLoading', 300);
            sendRequest(url + stateItemName.gallery + "?all=true")
                .then((gallery) => {
                    document.getElementById('galleryLoading').remove();
                    stateItem.barbers.forEach((barber) => {
                        let barberId = barber.barberId;
                        let barberGallery = gallery.filter((val) => {
                            if(val.barberId === barberId) return val;
                        })
                        outputBarberGallery(barberGallery, barbersGalleryDiv);
                    });
                    setGallerySlider();
                    setLightzoom();
                    barbersGalleryDiv.style.minHeight = '0';
                })
        });
}

/* GALLERY */
function outputGalleryImg(galleryItem, outputDiv) {
    let imgDiv = document.createElement('div');
    imgDiv.className = 'gallery__photo';

    let img = document.createElement('img');
    img.src = 'data:image/jpg;base64,' + galleryItem.photo;

    let imgA = document.createElement('a');
    imgA.className = 'lightzoom';
    imgA.href = 'data:image/jpg;base64,' + galleryItem.photo;
    imgA.appendChild(img);
    imgDiv.appendChild(imgA)

    outputDiv.appendChild(imgDiv);
}

function outputGallery(heigth = 300) {
    galleryDiv = document.getElementById('gallery');
    setLoading(galleryDiv, 'galleryLoading', heigth);
    sendRequest(url + stateItemName.gallery + '?page=' + page)
        .then((response) => {
            document.getElementById('galleryLoading').remove();
            if(response.length < 9) document.getElementById('showMore').style.display = 'none';
            else document.getElementById('showMore').style.display = 'flex'
            response.forEach((val) => {
                stateItem.gallery.push(val);
                outputGalleryImg(val, galleryDiv);
            })
            setLightzoom();
        });
}

/* STORE */
let category = 'none';
let sort = '';

function outputStoreProduct(product, outputDiv) {
    let productDiv = document.createElement('div');
    productDiv.className = 'store__product';

    let productImg = document.createElement('img');
    productImg.className = 'product__photo';
    productImg.src = 'data:image/jpg;base64,' + product.photo;
    productDiv.appendChild(productImg);

    let productTitle = document.createElement('p');
    productTitle.className = 'product__name';
    productTitle.innerHTML = product.title;
    productDiv.appendChild(productTitle);

    let productPrice = document.createElement('p');
    productPrice.className = 'product__price';
    productPrice.innerHTML = product.price + ' р.';
    productDiv.appendChild(productPrice);

    let productDescription = document.createElement('p');
    productDescription.className = 'product__description';
    productDescription.innerHTML = product.description;
    productDiv.appendChild(productDescription);

    outputDiv.appendChild(productDiv);
}

function outputStore(heigth = 300) {
    let storeDiv = document.getElementById('store');
    setLoading(storeDiv, 'storeLoading', heigth);
    sendRequest(url + stateItemName.store + '?page=' + page + '&category=' + category + '&sort=' + sort)
        .then((response) => {
            document.getElementById('storeLoading').remove();
            if(response.length < 6) document.getElementById('showMore').style.display = 'none';
            else document.getElementById('showMore').style.display = 'flex'
            response.forEach((val) => {
                stateItem.store.push(val);
                outputStoreProduct(val, storeDiv);
            })
            setStoreSlider();
        });
}

function categoryChange() {
    page = 1;
    document.getElementById('showMore').style.display = 'flex'
    stateItem.store = [];

    let select = document.getElementById("category");
    category = select.value;
    document.getElementById('store').innerHTML = "";
    outputStore();
}

function sortChange() {
    page = 1;
    document.getElementById('showMore').style.display = 'flex'
    stateItem.store = [];

    let select = document.getElementById("sort");
    sort = select.value;
    document.getElementById('store').innerHTML = "";
    outputStore();
}

/* ON LOAD DOCUMENT*/
$(document).ready(function () {
    setMainSlider();

    /* Burger menu */
    $('.burger').click(function (event) {
        $('.header__menu').toggleClass('active');
        $('.burger').toggleClass('active');
        $('body').toggleClass('lock');
    });

    /* Video-player button */
    $('.play-video-button').click(function (event) {
        $('.play-video-button').css('display', 'none');
        $('#video-player').trigger('play');
    });

    $('#video-player').click(function (event) {
        $('.play-video-button').css('display', 'inline-block');
        $('#video-player').trigger('pause');
    });

    $(function() {
        $(window).scroll(function() {
            if($(this).scrollTop() > 1) {
                let header = $('.header');
                let headerHeight = header.height(); // вычисляем высоту шапки
                header.addClass('header_fixed');
            } else {
                let header = $('.header');
                let headerHeight = header.height(); // вычисляем высоту шапки
                header.removeClass('header_fixed');
            }
        });
    });
});

