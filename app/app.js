
import './style.scss';

import { Header } from './components/header/index';

import { Main } from './components/section-main/index';

import { About } from './components/section-about/index';

import { Speakers } from './components/section-speakers/index';

import { Photos } from './components/section-photos/index';

import { Faq } from './components/section-FAQ/index';

import { Partners } from './components/section-partners/index';

import { Destination } from './components/section-destination/index';



const doc = document;
const mainWrapper = doc.getElementById('main');
const sectionsWrapper = doc.getElementById('sections');


let main = [Header, Main];
let sections = [About, Destination, Speakers, Photos, Faq, Partners];

$(document).ready(function () {

    sections.forEach(item => {
        sectionsWrapper.innerHTML += item.html;
    });

    main.forEach(item => {
        mainWrapper.innerHTML += item.html;
    });





    $("#menuToggle").click(function () {

        let lines = doc.getElementsByClassName("nav-toggle__burgerLine");

        $(lines[2]).toggleClass("nav-toggle__burgerLine--hide");
        $(lines[0]).toggleClass("nav-toggle__burgerLine--rotate45d");
        $(lines[1]).toggleClass("nav-toggle__burgerLine--rotate-45d");

        $('#menu').toggleClass("header__nav--show");

    })

})


if (module.hot) {
    module.hot.accept()
}

