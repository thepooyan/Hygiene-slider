window.addEventListener("load", () => {
  initSlider()
})

const initSlider = () => {
  const slider = document.getElementById("slider")
  if (!slider) throw new Error("slider not found")

  const asperox = slider.querySelector("#asperox-animation");
  if (asperox) {
    const video = asperox.querySelector("video")
    const texts = asperox.querySelectorAll(".text")
    const bottles = asperox.querySelectorAll(".bottle img")
    const timing = [0,2.5,3,2,2.5];

    video?.play()
    video?.addEventListener("ended", initSlider)

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
