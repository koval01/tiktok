var notify_hidden, timer_notify, swiper;

const notify = (text) => {
    let error_box = document.querySelector(".error_box_cst");
    let error_text = document.querySelector(".error_text_cst");
    let scroll_top = document.querySelector(".btn-scroll-top");

    let notify_hide = function () {
        error_box.style.marginBottom = "-150px";
        scroll_top.setAttribute("style", "");
        notify_hidden = true;
    };

    let notify_display = function () {
        notify_hidden = false;
        error_text.innerHTML = text;
        scroll_top.style.marginBottom = `calc(${document.getElementById("error_box_cst_id").offsetHeight}px)`;
        error_box.style.marginBottom = "0";
    };

    if (notify_hidden) {
        notify_display();
    } else {
        notify_hide();
        setTimeout(notify_display, 200);
    }

    clearTimeout(timer_notify);
    timer_notify = setTimeout(notify_hide, 2500);
}

const is_attention_splash = () => {
    document.querySelector(".is-attention-splash").style.display = "";
}

const close_attention_splash = () => {
    let splash = document.querySelector(".is-attention-splash");
    splash.style.marginTop = "-100vh"
    setTimeout(function () {
        splash.style.display = "none"
    }, 600)
}

const play_control = (slide, collector) => {
    document.querySelectorAll("video").forEach(video => {
        video.pause();
        if (collector !== "VIDEO") {
            video.currentTime = 0;
        }
    });
    for (let child of slide.children) {
        console.log(child);
        if (child.tagName === "VIDEO") {
            if (collector !== "VIDEO") {
                child.play();
            }
        } else if (child.classList.contains("play-button")) {
            if (collector === "VIDEO") {
                child.style.display = "block";
            } else {
                child.style.display = "none";
            }
        }
    }
}

const play_video = (el) => {
    play_control(el.parentElement, el.tagName);
}

const init_content_swiper = () => {
    swiper = new Swiper("#content-swiper", {
        direction: "vertical",
        slidesPerView: 1,
        autoplay: false,
        grabCursor: false,
        loop: false,
        observer: true,
        observeParents: true,
        preventClicks: false,
        on: {
            slideChange: function () {
                let index_currentSlide = swiper.realIndex;
                play_control(swiper.slides[index_currentSlide]);
            }
        }
    });
}

const append_video = (file_url, swiper=null) => {
    let array = document.getElementById("content-swiper-array");

    array.innerHTML = array.innerHTML + `
        <div class="swiper-slide">
            <div class="swiper-collector">
                <video autoplay loop onclick="play_video(this)">
                    <source src="${file_url}" type="video/mp4">
                </video>
                <div class="play-button" onclick="play_video(this)"></div>
            </div>
        </div>
    `;

    if (swiper) {
        swiper.update();
    }

}

const loading_finish = () => {
    let preloader = document.querySelector(".page-loading");
    let wait = 500;
    let move_wait = 100;
    setTimeout(function () {
        preloader.classList.remove("active");
    }, wait);
    setTimeout(function () {
        preloader.remove();
    }, wait + move_wait);
}

window.onload = function () {
    loading_finish();
    is_attention_splash();

    append_video("./test_video/video_1.mp4");
    append_video("./test_video/video_2.mp4");
    append_video("./test_video/video_3.mp4");

    init_content_swiper();
}