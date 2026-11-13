const InitUniqueTimeout = () => {
  let databse = new Map<number,number>();
  return (fn: () => void, timeout: number, id: number) => {
    const already = databse.get(id)
    if (already) clearTimeout(already)
    let obj = setTimeout(fn, timeout)
    databse.set(id, obj)
  }
}

const uniqe_timeout = InitUniqueTimeout()

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

  const asperox = slider.querySelector("#asperox-animation");
  if (!asperox) throw new Error("asperox not found")
  const video = asperox.querySelector("video")
  if (!video) throw new Error("asperox has no video")
  const texts = asperox.querySelectorAll(".text")
  const bottles = asperox.querySelectorAll(".bottle img")
  const timing = [0,2.5,3,2,2.5];

  video?.addEventListener("ended", () => slider_control.next());

  const start_asperox_animation = () => {
    video.currentTime = 0
    video?.play();

    timing.reduce((prev, current, index) => {
      uniqe_timeout(() => {
        const text = Array.from(texts).at(index-1);
        const bottle = Array.from(bottles).at(index-1);
        texts.forEach(t => t.classList.remove("active"))
        bottles.forEach(t => t.classList.remove("active"))
        text?.classList.add("active")
        bottle?.classList.add("active")
      }, prev * 1000, index)
      return prev + current
    })
  }
  start_asperox_animation()

  let slider_control = new class {
    index = 0
    timer:number|null = null
    next_index = () => this.index = (this.index + 1) % slides.length 
    prev_index = () => this.index = (this.index - 1) % slides.length 
    show_active_slide = () => {
      slides.forEach(s => s.classList.remove("active"))
      slides.at(this.index)?.classList.add("active")
    }
    next = () => { this.next_index(); this.show_active_slide(); this.slide_cleanup() }
    prev = () => { this.prev_index(); this.show_active_slide(); this.slide_cleanup() }
    slide_cleanup = () => {
      if (this.timer) clearTimeout(this.timer)
      const current_slide = slides.at(this.index);
      // handle duration
      const duration = current_slide?.getAttribute("data-duration");
      if (duration) {
        this.timer = setTimeout(() => {
          this.next()
        }, parseInt(duration) * 1000)
      }
      // handle asperox video play
      if (current_slide?.id === "asperox-animation") {
        start_asperox_animation()
      }
    }
  }

  next?.addEventListener("click", () => slider_control.next() )
  prev?.addEventListener("click", () => slider_control.prev() )

}
