// navigation toggle for mobile + fixed nav
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const linksContainer = document.querySelector('.links-container');

navToggle.addEventListener('click', (e) => {
    linksContainer.classList.toggle('show-links')
})

window.addEventListener('scroll', () => {
    const scrollHeight = window.scrollY;
    const navHeight = nav.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        nav.classList.add('fixed');
    } else {
        nav.classList.remove('fixed');
    }
})

// highlight active nav link
const globalState = {
    currentPage: window.location.pathname,
};

function highlightActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
        if ('/' + link.getAttribute('href') === globalState.currentPage || '/spa-selene/' + link.getAttribute('href') === globalState.currentPage) {
            link.classList.add('current-link');
        }
    });
}

// carousel image slider
const buttons = document.querySelectorAll('[data-carousel-button]');

function carouselSlider() {
    buttons.forEach(button => {
    button.addEventListener('click', () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button
            .closest('[data-carousel]')
            .querySelector('[data-slides]')

        const activeSlide = slides.querySelector('[data-active]');
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) {
            newIndex = slides.children.length - 1;
        }
        if (newIndex >= slides.children.length) {
            newIndex = 0;
        }

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    })
})
}

// treatment menu cards, populate category on click
const content = document.querySelector('.content')
const btnContainer = document.querySelector('.treatments-btn-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const bgImgContainer = document.querySelector('.treatments-background-img');

function displayItems(array) {
    let menuDisplay = array.map((item) => {
        return `<div class="option">
                            <h4>${item.title}</h4>
                            <p>${item.desc}
                            </p>
                            <div class="price">
                                <p>${item.time}</p>
                                <p>${item.price}</p>
                            </div>
                    </div>`
    });
    menuDisplay = menuDisplay.join('');
    content.innerHTML = menuDisplay;

    // mouse hover on card trailing circle 
    const cards = document.querySelectorAll('.option');
    
    cards.forEach((card) => {
        card.className = 'option show';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();

            const left = e.clientX - rect.left;
            const top = e.clientY - rect.top;

            card.style.setProperty("--left", `${left}px`);
            card.style.setProperty("--top", `${top}px`);
        })
    })
}

function filterTreatments() {
    btnContainer.addEventListener('click', (e) => {
    fetch('treatments-data.json')
    .then(res => res.json())
    .then(data => {
        const treatmentMenu = data;
        const keyword = e.target.dataset.orange;

        if (keyword) {
            displayByCategories = treatmentMenu.filter((item) => {
                if (keyword === item.category) {
                    bgImgContainer.className = `treatments-background-img ${item.category}`;
                    return item;
                } else {
                    return;
                }
            })
            return displayItems(displayByCategories);
        }
    })
})
}

filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach((item) => {
            if (item === btn) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        })
    })
})

function fetchTreatments() {
    fetch('treatments-data.json')
    .then(res => res.json())
    .then(data => {
        const treatmentMenu = data;

        content.innerHTML = treatmentMenu.map((item) => {
            if (item.category === 'skincare') {
                bgImgContainer.className = `treatments-background-img ${item.category}`;
                return `<div class="option">
                                <h4>${item.title}</h4>
                                <p>${item.desc}
                                </p>
                                <p class="price">${item.price}</p>
                        </div>`
            }}).join('');
        
        // mouse hover on card trailing circle
        const cards = document.querySelectorAll('.option');

        cards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();

                const left = e.clientX - rect.left;
                const top = e.clientY - rect.top;

                card.style.setProperty("--left", `${left}px`);
                card.style.setProperty("--top", `${top}px`);
            })
        })
    })
};
// end of treatment card functionality


// FAQ functionality
const questions = document.querySelectorAll('.faq-question');

function faq() {
    questions.forEach((question) => {
    const btn = question.querySelector('.faq-question-btn');
    btn.addEventListener('click', (e) => {
        questions.forEach((item) => {
            if (item === question) {
                item.classList.toggle('show-answer');
            } else {
                item.classList.remove('show-answer');
            }
        })
    }); 
})
}
// end of FAQ functionality


// start of booking form functionality
const serviceSelect = document.getElementById('service'); 
const serviceSpecifySelect = document.getElementById('service-specify');

// populate service options for select input
function populateSelect() {
    serviceSelect.addEventListener('change', (e) => {
    // console.log(e.target.value);
    let val = e.target.value;
    switch (val) {
        case "item1":
            serviceSpecifySelect.innerHTML = 
                `<option value="none">--specify a type--</option>
                <option value="massage1">fire and ice massage</option>
                <option value="massage2">therapeutic massage</option>
                <option value="massage3">aromatherapy massage</option>
                <option value="massage4">prenatal massage</option>
                <option value="massage5">deep tissue massage</option>`
            break;
        case "item2":
            serviceSpecifySelect.innerHTML = 
                `<option value="none">--specify a type--</option>
                <option value="skincare1">hydrating & brightening facial</option>
                <option value="skincare2">texture balance facial</option>
                <option value="skincare3">pore extraction and acne facial</option>
                <option value="skincare4">anti-aging red LED therapy</option>
                <option value="skincare5">celebrity facial</option>`
            break;
        case "item3":
            serviceSpecifySelect.innerHTML = 
                `<option value="none">--specify a type--</option>
                <option value="haircare1">special occasion style</option>
                <option value="haircare2">women's hair cut</option>
                <option value="haircare3">cut and color</option>
                <option value="haircare4">blowout</option>`
            break;
        case "item4":
            serviceSpecifySelect.innerHTML = 
                `<option value="none">--specify a type--</option>
                <option value="gentlemen1">groom's wedding day prep</option>
                <option value="gentlemen2">anti-aging facial</option>
                <option value="gentlemen3">the beard facial</option>
                <option value="gentlemen4">deep tissue sports massage</option>`
            break;
        case "item5":
            serviceSpecifySelect.innerHTML = 
                `<option value="none">--specify a type--</option>
                <option value="package1">mom-knows-best package</option>
                <option value="package2">bridal pamper package</option>
                <option value="package3">couples massage</option>
                <option value="package4">husband and wife to-be package</option>`
            break;
    }
})
}

const form = document.querySelector('.form')
const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password')
const password2Input = document.getElementById('password2')
const guestInput = document.getElementById('guests');
const dateInput = document.getElementById('date');

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    const small = formGroup.querySelector('small');
    small.innerText = message;
    return false; 
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
    input.style.backgroundColor = "white";
    return true;
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// date input validation - enable only current date and 2 yrs beyond to be selected
function checkDate(dateInput) {
    let today = new Date().toISOString().slice(0, 10);
    dateInput.setAttribute('min', today);
    let oneYearFromNow = new Date().getFullYear();
    dateInput.setAttribute('max', oneYearFromNow);

    if (dateInput.value > oneYearFromNow) {
        showError(dateInput, 'You cannot book this far in advance');
    } else {
        showSuccess(dateInput)
    }
}

function checkGuests(guests, min, max) {
    if (guests.value < min) {
        showError(guests, `Must book at least ${min} guest`);
    } else if (guests.value > max) {
        showError(guests, `Cannot book more than ${max} guests`);
    } else {
        showSuccess(guests);
    }
}

function checkNames(fname, lname) {
    if (fname.value !== "" && lname.value !== "") {
            showSuccess(fname);
            showSuccess(lname);
    }
}    

function checkEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email.value.trim())) {
            showSuccess(email);
    } else {
        showError(email, 'Email is not valid');
    }
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        console.log('pass check')
        showError(input2, 'Passwords do not match');
    } else {
        showSuccess(input2);
    }
}

// multistep form, select each individual phase(step)
const multiStepForm = document.querySelector('[data-multi-step]');
const formSteps = [...document.querySelectorAll('[data-step]')];

let currentStep = formSteps.findIndex((step) => {
    return step.classList.contains('active');
})
// set the current step to match the first phase(step) from our HTML markup
function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep)
    })
}
// the current step will return -1 if one of the form steps does not contain class active
if (currentStep < 0) {
    currentStep = 0;
    showCurrentStep();
}

// validation loop & signal to go to next step 
let incrementor;
let validation = true;

function nextStep() {
const inputs = [...formSteps[currentStep].querySelectorAll('input')];
const selects = [...formSteps[currentStep].querySelectorAll('select')];

    selects.forEach((select) => {
        const checksPass = (currentValue) => currentValue.value !== "none";
        // console.log(selects.every(checksPass))

        if (select.classList.contains('required')) { 
                if (select.value === "none") {
                    showError(select, `Selecting a service is required`);
                    select.style.backgroundColor = "rgba(216, 56, 123, .5)";
                    select.style.outline = "1px solid black"
                    validation = false;
                } else if (selects.every(checksPass) === true) {
                    showSuccess(select);
                    select.style.backgroundColor = "white";
                    select.style.outline = "none"
                    validation = true;
                }
        } else {
            validation = true;
            const formGroup = select.parentElement;
            formGroup.className = 'form-group success';
        }
    })

    inputs.forEach((input) => {
        if (input.classList.contains('required')) { 
            if (input.value.trim() === "") {
                input.style.backgroundColor = "rgba(216, 56, 123, .5)";
                showError(input, `${getFieldName(input)} is required`);
                validation = false;
            } else if (currentStep === 0) {
                checkDate(dateInput);
                checkGuests(guestInput, 1, 10);
                const checksPass = (currentValue) => currentValue.parentElement.classList.contains('success');
                inputs.every(checksPass) === true && selects.every(checksPass) === true ? validation = true : validation = false;
            }
            else if(currentStep === 1) {
                checkLength(passwordInput, 6, 25);
                checkEmail(emailInput);
                checkPasswordsMatch(passwordInput, password2Input);
                checkNames(fnameInput, lnameInput);
                const checksPass = (currentValue) => currentValue.parentElement.classList.contains('success');
                inputs.every(checksPass) === true ? validation = true : validation = false;
            } else {
                validation = true;
            }
        } else {
            validation = true;
            const formGroup = input.parentElement;
            formGroup.className = 'form-group success';
            }
    })
}

const nextBtn = document.querySelector('[data-next]');
const prevBtn = document.querySelector('[data-previous]');
const submitBtn = document.querySelector('[data-submit]');
const update = document.querySelector('.update');

function formButtons() {
    nextBtn.addEventListener('click', (e) => {
        nextStep();
        
        if (validation === true) {
            incrementor = 1;
            currentStep += incrementor;
            showCurrentStep();
        }
    })

    prevBtn.addEventListener('click', (e) => {
        incrementor = -1;
        currentStep += incrementor;
        showCurrentStep();
    })

    submitBtn.addEventListener('click', (e) => {
        validation = false;
        nextStep();
        update.innerText = emailInput.value;
        
        if (validation === true) {
            incrementor = 1;
            currentStep += incrementor;
            showCurrentStep();
        }
    })
}
// end of booking functionality


// start of reviews functionality
const reviews = [
    {
        "id": 1,
        "name": 'Mateo Urdiales',
        "title": 'Great Service, Awesome Amenitites',
        "img": 'images/man-red-shirt.jpg',
        "text": 'My wife and I jump to come here whenever we can find a babysitter. Their deep tissue massages make me feel like a new man. Don\'t disregard their haircut services either. Sophia always provides me a great cut with great conversation.',
    },
    {
        "id": 2,
        "name": 'Sarah Forbes',
        "title": 'Frequent Visitor',
        "img": 'images/woman-towel.jpg',
        "text":'The best spa in Dallas x10! I am a frequent local who comes just to get pampered! I always come for an 80-minute aromatherapy massage and the staff is fantastic at making me feel so relaxed and at ease. For your special occasions, be sure to book a celebrity facial with Chloe!' ,
    },
    {
        "id": 3,
        "name": 'Anna Koto',
        "title": 'Wonderful Experience',
        "img": 'images/woman-yellow-jacket.jpg',
        "text": 'Had a fabulous facial with Amanda! She was caring, gentle, and knowledgeable. Spa Selene is amazing! Friendly staff, great service selections, and the spa smell is soo good! Already scheduled my next appointment!',
    },
    {
        "id": 4,
        "name": 'Will Anderson',
        "title": 'Nice Relaxing Spa',
        "img": 'images/man-white-shirt.jpg',
        "text": 'Will be back as a regular customer for sure! I had the 50-minute therapeutic massage with Kim. She gave an amazing massage. The pressure was on point, and she checked in with me a couple of times to make sure I was taken care of. ',
    }
];

const image = document.getElementById('person-img');
const author = document.getElementById('author');
const job = document.getElementById('job');
const mainInfo = document.getElementById('main-info')
const info = document.getElementById('info');

const prevBtnRev = document.querySelector('.review-btn.prev');
const nextBtnRev = document.querySelector('.review-btn.next');

let count = 0;

function showReviews() {
    function showPerson(array) {
        const update = reviews[count];
        image.src = update.img;
        author.textContent = update.name;
        mainInfo.textContent = update.title;
        info.textContent = update.text;
    }

    nextBtnRev.addEventListener('click', () => {
        count++;
        if (count >= reviews.length) {
            count = 0;
        }
        showPerson();
    })

    prevBtnRev.addEventListener('click', () => {
        count--;
        if (count < 0) {
            count = reviews.length - 1;
        }
        showPerson();
    })

showPerson();
}
// end of reviews functionality

// scroll to form when on home page
const reserveLinks = document.querySelectorAll('.reserve');

function scrollBooking() {
    // select nodelist of links
    reserveLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // associate each link to its corresponding section via an id
            const keyword = e.currentTarget.getAttribute('href').slice(1);
            const corresponding = document.getElementById(keyword);

            // calculate the heights of involved elements
            const navHeight = nav.getBoundingClientRect().height;
            const containerHeight = linksContainer.getBoundingClientRect().height;
            const fixedNav = nav.classList.contains('fixed');
            let position = corresponding.offsetTop - navHeight;

            if (linksContainer.classList.contains('show-links')) {
                position = position + (containerHeight + containerHeight);
            } 
            if (!fixedNav) {
                position = position - (navHeight - 50);
            }
            if (fixedNav) {
                position = position - navHeight;
            }

            window.scrollTo ({
                left: 0,
                top: position,
        })
    })
})
}
// start of scroll functionality

// start of booking modal functionality
const modalCloseBtn = document.querySelector('.modal-close-btn');
const modal = document.querySelector('.modal-overlay');
const activateModalBtn = document.querySelector('.activate-modal-btn');
const navReserveBtn = document.querySelector('.nav-reserve-btn')

if (globalState !== '/index.html' || globalState !== '/spa-selene/' || globalState !== '/#reserve') {
    navReserveBtn.addEventListener('click', () => {
    modal.classList.add('show-modal')
    })
}

function bookingModal() {
    activateModalBtn.addEventListener('click', () => {
    modal.classList.add('show-modal')
    })
    modalCloseBtn.addEventListener('click', ()=>{
        modal.classList.remove('show-modal')
    })
}
// end of booking modal functionality


// Below is a router, if a function should be run in response to a certain page, it goes inside the corresponding switch case
function init() {
    switch(globalState.currentPage) {
        case '/spa-selene/':
        case '/spa-selene/index.html':
        case '/index.html':
            scrollBooking();
            carouselSlider()
            fetchTreatments();
            filterTreatments();
            faq();
            formButtons();
            populateSelect();
            showReviews();
            break;
        case '/services.html':
        case '/spa-selene/services.html':
            fetchTreatments();
            filterTreatments();
            formButtons();
            populateSelect();
            showReviews();
            break;
        case '/amenities.html':
        case '/spa-selene/amenities.html':
            bookingModal();
            formButtons();
            populateSelect();
            break;
        case '/about.html':
        case '/spa-selene/about.html':
            carouselSlider()
            faq();
            bookingModal();
            formButtons();
            populateSelect();
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
