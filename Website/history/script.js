//Standard initialization function
function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action);
    } else {
        // `DOMContentLoaded` already fired
        action();
    }
}

//Launch-time runner
//whenDocumentLoaded(() => {
//});


//Tab change function
const change_tab= function(name) {
    //Changing the backgrounds and titles depending on the tab
    if (name === 'VISUALIZATION from history') {
        window.open("visualizations/index_visu.html",'_self');
    }
    if (name === 'HISTORY from image sources') {
        window.open("../index.html",'_self');
    }
    if (name === 'IMAGE SOURCES from history') {
        window.open("history/image_sources.html",'_self');
    }
    if (name === 'IMAGE SOURCES from team') {
        window.open("image_sources.html",'_self');
    }
    if (name === 'TEAM from image sources') {
        window.open("team.html",'_self');
    }
    if (name === 'TEAM from history') {
        window.open("history/team.html",'_self');
    }
}

$(function() {
    var scrollMagicController = new ScrollMagic;
    $(window).load(function() {

        // build scene
        var main = new ScrollScene({
            triggerElement: '#main_title',
        })
            .setTween(new TimelineMax().add([
                TweenLite.from(".main_title .line1", 1, { y: -70, opacity: 0 }),
                TweenLite.from(".main_title .line2", 1, { y: 80, opacity: 0 }).delay(1.3),
                TweenLite.from(".main_title .line3", 1, { y: 90, opacity: 0 }).delay(1.6),
                TweenMax.from(".main_title .line4", 1, { y: 100, opacity: 0 }).delay(3),
                TweenMax.from(".main_title .line5", 1, { y: 100, opacity: 0 }).delay(3.8),
            ]))
        main.addTo(scrollMagicController)
        //main.addIndicators();
    });

    var animated_text = new ScrollScene({
        triggerElement: '#at1',
        triggerHook: "0",
        duration: "2000",
        offset:100
    })
        .setTween(new TimelineMax().add([
            TweenMax.from("#heading", 8, { y: 100, }),
            TweenMax.from("#caption01", 8, { y: 1000, }).delay(1),
            TweenMax.from("#caption02", 8, { y: 1200, }).delay(2),
            TweenMax.from("#caption03", 8, { y: 1400, }).delay(3),
        ]))
        .setPin('#at1');
    animated_text.addTo(scrollMagicController);

    var animated_images = new ScrollScene({
        triggerElement: '#ai1',
        triggerHook: "0.9",
    })
        .setTween(new TimelineMax().add([
            TweenLite.from(".box01", 1, { y: 150, opacity: 0 }).delay(0.7),
            TweenLite.from(".box02", 1, { opacity: 0 }).delay(1.2),
            TweenLite.from(".box02 p", 1, { x: 250, opacity: 0 }).delay(1.7),
        ]));
    animated_images.addTo(scrollMagicController)

    var animated_text2 = new ScrollScene({
        triggerElement: '#at2',
        triggerHook: "0",
        duration:'2000',
        offset:100
    })
        .setTween(new TimelineMax().add([
            TweenMax.from("#heading2", 1, { y: 100, }),
            TweenMax.from("#caption04", 1, { y: 1000, }).delay(1),
            TweenMax.from("#caption05", 1, { y: 1200, }).delay(2),
            TweenMax.from("#caption06", 1, { y: 1400, }).delay(3),
        ]))
        .setPin('#at2');
    animated_text2.addTo(scrollMagicController);

    var slideParallaxScene = new ScrollScene({
        triggerElement: '#ap1',
        triggerHook: 0.5,
        duration: '500'
    })
        .setTween(new TimelineMax()
            .from('#cap1', 0.4, {autoAlpha: 0, ease:Power0.easeNone}, 0.4)
            .from('#apb1', 2, {y: '-50%', ease:Power0.easeNone}, 0));
    slideParallaxScene.addTo(scrollMagicController);

    var animated_text3 = new ScrollScene({
        triggerElement: '#at3',
        triggerHook: "0",
        duration:'2000',
        offset:100
    })
        .setTween(new TimelineMax().add([
            TweenMax.from("#caption07", 1, { y: 100, }),
            TweenMax.from("#caption08", 1, { y: 100, }),
        ]))
        .setPin('#at3');
    animated_text3.addTo(scrollMagicController);

    var slideParallaxScene2 = new ScrollScene({
        triggerElement: '#ap2',
        triggerHook: 0.5,
        duration: '500'
    })
        .setTween(new TimelineMax()
            .from('#cap2', 0.4, {autoAlpha: 0, ease:Power0.easeNone}, 0.4)
            .from('#apb2', 2, {y: '-50%', ease:Power0.easeNone}, 0));
    slideParallaxScene2.addTo(scrollMagicController);

    var animated_text4 = new ScrollScene({
        triggerElement: '#at4',
        triggerHook: "0",
        duration:'1500',
        offset:100
    })
        .setTween(new TimelineMax().add([
            TweenMax.from("#heading3", 1, { y: 100, }),
            TweenMax.from("#pele", 1, { y: 1200, }).delay(0.5),
            TweenMax.from("#caption09", 1, { y: 1000, }).delay(1),
            TweenMax.from("#caption10", 1, { y: 1200, }).delay(2),
        ]))
        .setPin('#at4');
    animated_text4.addTo(scrollMagicController);

    var animated_text5 = new ScrollScene({
        triggerElement: '#at5',
        triggerHook: "0",
        duration:'700',
        offset:100
    })
        .setTween(new TimelineMax().add([
            TweenMax.from("#heading4", 1, { y: 0, }),
        ]))
        .setPin('#at5');
    animated_text5.addTo(scrollMagicController);

    var animated_images2 = new ScrollScene({
        triggerElement: '#ai2',
        triggerHook: "1",
    })
        .setTween(new TimelineMax().add([
            TweenLite.from(".box03", 1, { y: 150, opacity: 0 }),
            TweenLite.from(".box03 h2", 1, { x: -150, opacity: 0 }).delay(1),
            TweenLite.from(".box03 p", 1, { x: -250, opacity: 0 }).delay(1),
            TweenLite.from(".box03 .inner-box", 1, { y: 150, opacity: 0 }).delay(1),

            TweenLite.from(".box04", 1, { opacity: 0 }),
            TweenLite.from(".box04 h2", 1, { x: 150, opacity: 0 }).delay(1),
            TweenLite.from(".box04 p", 1, { x: 250, opacity: 0 }).delay(1),
            TweenLite.from(".box04 .inner-box", 1, { y: 150, opacity: 0 }).delay(1),

            TweenLite.from(".box05", 1, { y: 150, opacity: 0 }).delay(2),
            TweenLite.from(".box05 h2", 1, { x: -150, opacity: 0 }).delay(2.5),
            TweenLite.from(".box05 p", 1, { x: -250, opacity: 0 }).delay(2.5),
            TweenLite.from(".box05 .inner-box", 1, { y: 150, opacity: 0 }).delay(2.5),

            TweenLite.from(".box06", 1, { opacity: 0 }).delay(2.5),
            TweenLite.from(".box06 h2", 1, { x: 150, opacity: 0 }).delay(3),
            TweenLite.from(".box06 p", 1, { x: 250, opacity: 0 }).delay(3),
            TweenLite.from(".box06 .inner-box", 1, { y: 150, opacity: 0 }).delay(3),
        ]))
    animated_images2.addTo(scrollMagicController)

    var animated_text6 = new ScrollScene({
        triggerElement: '#at6',
        triggerHook: "0",
        duration:'2000',
        offset:100
    })
        .setTween(new TimelineMax().add([
            TweenMax.from("#heading5", 1, { y: 100, }),
            TweenMax.from("#caption11", 1, { y: 1000, }).delay(1),
            TweenMax.from("#caption12", 1, { y: 1200, }).delay(2),
            TweenMax.from("#caption13", 1, { y: 1400, }).delay(3),
        ]))
        .setPin('#at6');
    animated_text6.addTo(scrollMagicController);

    var slideParallaxScene3 = new ScrollScene({
        triggerElement: '#ap3',
        triggerHook: 0.5,
        duration: '500'
    })
        .setTween(new TimelineMax()
            .from('#cap3', 0.4, {autoAlpha: 0, ease:Power0.easeNone}, 0.4)
            .from('#apb3', 2, {y: '-50%', ease:Power0.easeNone}, 0));
    slideParallaxScene3.addTo(scrollMagicController);

    var animated_text7 = new ScrollScene({
        triggerElement: '#at7',
        triggerHook: "0",
        duration:'700',
        offset:100
    })
        .setTween(new TimelineMax().add([
            TweenMax.from("#heading6", 1, { y: 0, }),
        ]))
        .setPin('#at7');
    animated_text7.addTo(scrollMagicController);

    var animated_images3 = new ScrollScene({
        triggerElement: '#ai3',
        triggerHook: "1",
    })
        .setTween(new TimelineMax().add([
            TweenLite.from(".box07", 1, { y: 150, opacity: 0 }),
            TweenLite.from(".box07 h2", 1, { x: -150, opacity: 0 }).delay(1),
            TweenLite.from(".box07 p", 1, { x: -250, opacity: 0 }).delay(1),
            TweenLite.from(".box07 .inner-box", 1, { y: 150, opacity: 0 }).delay(1),

            TweenLite.from(".box08", 1, { opacity: 0 }),
            TweenLite.from(".box08 h2", 1, { x: 150, opacity: 0 }).delay(1),
            TweenLite.from(".box08 p", 1, { x: 250, opacity: 0 }).delay(1),
            TweenLite.from(".box08 .inner-box", 1, { y: 150, opacity: 0 }).delay(1),

            TweenLite.from(".box09", 1, { y: 150, opacity: 0 }).delay(2),
            TweenLite.from(".box09 h2", 1, { x: -150, opacity: 0 }).delay(2.5),
            TweenLite.from(".box09 p", 1, { x: -250, opacity: 0 }).delay(2.5),
            TweenLite.from(".box09 .inner-box", 1, { y: 150, opacity: 0 }).delay(2.5),

            TweenLite.from(".box10", 1, { opacity: 0 }).delay(2.5),
            TweenLite.from(".box10 h2", 1, { x: 150, opacity: 0 }).delay(3),
            TweenLite.from(".box10 p", 1, { x: 250, opacity: 0 }).delay(3),
            TweenLite.from(".box10 .inner-box", 1, { y: 150, opacity: 0 }).delay(3),
        ]))
    animated_images3.addTo(scrollMagicController)
});