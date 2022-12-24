function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const slidedImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  slidedImages.forEach((slidedImage) => {
    //half way thtough the image
    const slideIn =
      window.scrollY + window.innerHeight - slidedImage.height / 2;
    //bottom of the image
    const imageBottom = slidedImage.offsetTop + slidedImage.height;
    const isHalfShown = slideIn > slidedImage.offsetTop;
    const isNotScrolled = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolled) {
      slidedImage.classList.add("active");
    } else {
      slidedImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
