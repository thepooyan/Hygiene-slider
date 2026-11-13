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

  let slider_control = new class {
    index = 0
    timer = null
    next_index = () => this.index = (this.index + 1) % slides.length 
    prev_index = () => this.index = (this.index - 1) % slides.length 
    show_active_slide = () => {
      slides.forEach(s => s.classList.remove("active"))
      slides.at(this.index).classList.add("active")
    }
    next = () => { this.next_index(); this.show_active_slide(); this.set_slide_timer() }
    prev = () => { this.prev_index(); this.show_active_slide(); this.set_slide_timer() }
    set_slide_timer = () => {
      if (this.timer) clearTimeout(this.timer)
      const duration = slides.at(this.index).getAttribute("data-duration")
      if (duration) {
        this.timer = setTimeout(() => {
          this.next()
        }, parseInt(duration) * 1000)
      }
    }
  }

  next?.addEventListener("click", () => slider_control.next() )
  prev?.addEventListener("click", () => slider_control.prev() )

  const asperox = slider.querySelector("#asperox-animation");
  if (asperox) {
    const video = asperox.querySelector("video")
    const texts = asperox.querySelectorAll(".text")
    const bottles = asperox.querySelectorAll(".bottle img")
    const timing = [0,2.5,3,2,2.5];

    video?.play();
    video?.addEventListener("ended", () => slider_control.next());

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
