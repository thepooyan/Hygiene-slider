const initSlider = () => {
  const slider = document.getElementById("slider")
  if (!slider) throw new Error("slider not found")

  const asperox = slider.querySelector("#asperox-animation");
  if (asperox) {
    const video = asperox.querySelector("video")
    const texts = asperox.querySelectorAll(".text")
    const timing = [0,2.5,3,2,2.5];

    video.play()

    timing.reduce((prev, current, index) => {
      setTimeout(() => {
        const text = Array.from(texts).at(index-1);
        texts.forEach(t => t.classList.remove("active"))
        text.classList.add("active")
      }, prev * 1000)
      return prev + current
    })
  }

}
// setTimeout(() => initSlider(), 2000)
