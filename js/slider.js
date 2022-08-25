function AirBnbSlider(elem) {
  this.element = elem;
  this.owl = null;
  this.currentIndex = 0;
}

AirBnbSlider.prototype.updateAllInfo = function (index) {
  let images = $(this.element).find(".single-image img");
  var imageData = images[index];
  $(".airbnb-slider-full .thumbnail-list ul.image-list li button").removeClass(
    "active"
  );
  var buttons = $(
    ".airbnb-slider-full .thumbnail-list ul.image-list li button"
  );
  for (var i = 0; i < buttons.length; i++) {
    if ($(buttons[i]).attr("data-photo-index") == index) {
      $(buttons[i]).addClass("active");
    }
  }
  this.owl.trigger("to.owl.carousel", parseInt(index), [100]);

  $(".airbnb-slider-full .thumbnail-info #current-image").html(
    parseInt(index) + 1 + " / " + images.length
  );
  $(".airbnb-slider-full .thumbnail-info #current-image-info").html(
    $(images[index]).attr("alt")
  );
  $(".airbnb-slider-full .big-image div > img").remove();
  $(".airbnb-slider-full .big-image > div").append(
    `<img src='` + $(images[index]).attr("src") + `'>`
  );
  $(".airbnb-slider-full .big-image div > img").fadeIn(100);

  // console.log(imageData);
};

AirBnbSlider.prototype.initialize = function () {
  $(this.element)
    .find(".single-image")
    .hover(function () {
      $(this).siblings(".single-image").css({ opacity: 0.5 });
      $(this).css({ opacity: 1 });
    });
  $(this.element)
    .find(".single-image")
    .click(function () {
      var index = $(this).attr("data-photo-index");
      $(".airbnb-slider-full").fadeIn(50);
      updateInfo(index);
    });

  $(this.element).mouseleave(function () {
    $(this).find(".single-image").css({ opacity: 1 });
  });

  $(this.element).append(`
  <button class="show-img-btn">
    View Photos
  </button>`);

  let images = $(this.element).find(".single-image img");
  var thumbnail_list = "";
  for (var i = 0; i < images.length; i++) {
    $(images[i]).parent().addClass("item");
    thumbnail_list +=
      `
    <li class="item">
      <button data-photo-index="` +
      i +
      `" class="">
        <img src="` +
      $(images[i]).attr("src") +
      `" alt="" />
      </button>
    </li>
    `;
  }

  $("body").prepend(
    `
    <div class="airbnb-slider-full">
      <div class="airbnb-slider-full-container">
        <div class="big-image">
          <div style="width:100%;height:100%;position:relative;">
            <div class="buttons-group">
              <button id="left-arrow">
                <svg
                  viewBox="0 0 18 18"
                  role="presentation"
                  aria-hidden="true"
                  focusable="false"
                  style="height: 24px; width: 24px; fill: rgb(72, 72, 72);"
                >
                  <path
                    d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <button id="right-arrow">
                <svg
                  viewBox="0 0 18 18"
                  role="presentation"
                  aria-hidden="true"
                  focusable="false"
                  style="height: 24px; width: 24px; fill: rgb(72, 72, 72);"
                >
                  <path
                    d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <img src="./img/1.webp" alt="" />
          </div>
        </div>
        <div class="thumbnail-list">
          <div class="thumbnail-list-container">
            <div class="left-side"></div>
            <ul class="image-list owl-carousel">
              ` +
      thumbnail_list +
      `
            </ul>
            <div class="right-side"></div>
          </div>
          <div class="thumbnail-info">
            <div id="current-image">10 / 11</div>
            <div id="current-image-info">Demo Text</div>
          </div>
        </div>
        <button class="close-btn-slider" name="button">
          <svg
            viewBox="0 0 24 24"
            role="img"
            aria-label="Close"
            focusable="false"
            style="height: 24px; width: 24px; display: block; fill: rgb(72, 72, 72);"
          >
            <path
              d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    `
  );

  $(".airbnb-slider-full .close-btn-slider").click(function () {
    $(".airbnb-slider-full").fadeOut(50);
  });
  $(".airbnb-slider .show-img-btn").click(function () {
    $(".airbnb-slider-full").fadeIn(50);
  });
  this.owl = $(".airbnb-slider-full .thumbnail-list ul.image-list").owlCarousel(
    {
      loop: false,
      autoWidth: true,
      center: true,
      items: images.length,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
    }
  );
  $(".airbnb-slider-full .thumbnail-list ul.image-list li button").click(
    function () {
      var index = $(this).attr("data-photo-index");
      updateInfo(index);
    }
  );

  updateInfo = (index) => {
    this.updateAllInfo(index);
  };

  updateInfo(0);

  $(".airbnb-slider-full .big-image .buttons-group button#right-arrow").click(
    () => {
      if (this.currentIndex == images.length - 1) {
        updateInfo(0);
      } else {
        updateInfo(this.currentIndex + 1);
      }
    }
  );

  $(".airbnb-slider-full .big-image .buttons-group button#left-arrow").click(
    () => {
      if (this.currentIndex == 0) {
        updateInfo(images.length - 1);
      } else {
        updateInfo(this.currentIndex - 1);
      }
    }
  );

  this.owl.on("changed.owl.carousel", (event) => {
    this.currentIndex = event.item.index;
  });
  // console.log($(images[0]).attr("src"));

  $(this.element)
    .find(".single-image")
    .append(
      `
        <div class='bg-blur-image' style='background-image: url("` +
        $(images[0]).attr("src") +
        `")'></div>
      `
    );
};

var owl2;
function mobileCarousel() {
  $(".airbnb-slider").addClass("owl-carousel");
  owl2 = $(".airbnb-slider").owlCarousel({
    loop: false,
    autoWidth: true,
    center: false,
    dots: true,
  });
}
function destroyMobileCarousel() {
  owl2.trigger("destroy.owl.carousel");
  $(".airbnb-slider").removeClass("owl-carousel");
}
function showSubMenu(x, menu) {
  if (x.matches) {
    mobileCarousel();
  } else {
    // resetMenu();
    destroyMobileCarousel();
  }
}

$(document).ready(function () {
  // console.log($(window).width());
  if ($(window).width() <= 740) {
    mobileCarousel();
  }
  var x = window.matchMedia("(max-width: 740px)");
  x.addListener(showSubMenu);
});
