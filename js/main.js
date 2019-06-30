(function () {
    const scrollElems = document.querySelectorAll('.nav__item, a.cta, .scroll-arrow');

    for (let i = 0; i < scrollElems.length; i++) {
        const elem = scrollElems[i];
        elem.addEventListener('click', function (e) {
            e.preventDefault();

            console.log('e: ', e);
            console.log('e.target: ', e.target);
            console.log('e.target.href: ', e.target.href);
            if (e.target.href) {

                // 1. Get the element id to which you want to scroll
                const scrollElemId = e.target.href.split('#')[1];

                // 2. find that node from the document
                const scrollEndElem = document.getElementById(scrollElemId);

                // 3. and well animate to that node.. 
                const anim = requestAnimationFrame((timestamp) => {
                    const stamp = timestamp || new Date().getTime();
                    const duration = 1200;
                    const start = stamp;

                    const startScrollOffset = window.pageYOffset;
                    const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;

                    scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
                })
            }
        })
    }

    const easeInCubic = function (t) { return t * t * t }

    const scrollToElem = (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) => {
        const runtime = currentTime - startTime;
        let progress = runtime / duration;

        progress = Math.min(progress, 1);

        const ease = easeInCubic(progress);

        window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));
        if (runtime < duration) {
            requestAnimationFrame((timestamp) => {
                const currentTime = timestamp || new Date().getTime();
                scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
            })
        }
    }

})();
