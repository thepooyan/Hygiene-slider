window.addEventListener("load", () => {
  setTimeout(initSlider, 0)
})

const initSlider = () => {
  const slider = document.getElementById("slider")
  if (!slider) throw new Error("slider not found")
  slider.classList.add("active")

  const next = slider.querySelector(".js-next")
  const prev = slider.querySelector(".js-prev")
  const slides = Array.from(slider.querySelectorAll(".slide"))

  let activeSlide = new class {
    index = 0
    next = () => this.index = (this.index + 1) % slides.length 
    prev = () => this.index = (this.index - 1) % slides.length 
  }

  const show_active_slide = () => {
    slides.forEach(s => s.classList.remove("active"))
    slides.at(activeSlide.index).classList.add("active")
  }
  next.addEventListener("click", () => {activeSlide.next(); show_active_slide()})
  prev.addEventListener("click", () => {activeSlide.prev(); show_active_slide()})

  const asperox = slider.querySelector("#asperox-animation");
  if (asperox) {
    const video = asperox.querySelector("video")
    const texts = asperox.querySelectorAll(".text")
    const bottles = asperox.querySelectorAll(".bottle img")
    const timing = [0,2.5,3,2,2.5];

    video?.play()

    timing.reduce((prev, current, index) => {
      setTimeout(() => {
        const text = Array.from(texts).at(index-1);
        const bottle = Array.from(bottles).at(index-1);
        texts.forEach(t => t.classList.remove("active"))
        bottles.forEach(t => t.classList.remove("active"))
        text?.classList.add("active")
        bottle?.classList.add("active")
      }, prev * 1000)
      return prev + current
    })
  }
}
