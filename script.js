//your code here
const main = document.querySelector("main");
const heading = document.getElementById("h");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");

const imageContainer = document.getElementById("image-container");

let selectedImages = [];

const imageClasses = ["img1", "img2", "img3", "img4", "img5"];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initialize() {
  selectedImages = [];
  imageContainer.innerHTML = "";
  para.textContent = "";

  resetBtn.hidden = true;
  verifyBtn.hidden = true;

  heading.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";

  // Choose one image to duplicate.
  const duplicateIndex = Math.floor(Math.random() * imageClasses.length);

  // Create six tiles: five unique images and one duplicate.
  const images = [...imageClasses, imageClasses[duplicateIndex]];

  shuffle(images);

  images.forEach((imageClass, index) => {
    const img = document.createElement("img");

    img.classList.add(imageClass);
    img.dataset.index = index;
    img.alt = `Image ${index + 1}`;

    img.addEventListener("click", () => {
      if (
        selectedImages.some(
          (selected) => selected.dataset.index === img.dataset.index
        )
      ) {
        return;
      }

      if (selectedImages.length >= 2) {
        return;
      }

      selectedImages.push(img);
      img.classList.add("selected");

      resetBtn.hidden = false;

      if (selectedImages.length === 2) {
        verifyBtn.hidden = false;
      }
    });

    imageContainer.appendChild(img);
  });
}

resetBtn.addEventListener("click", initialize);

verifyBtn.addEventListener("click", () => {
  if (selectedImages.length !== 2) return;

  const firstImage = selectedImages[0];
  const secondImage = selectedImages[1];

  if (
    firstImage.classList.contains(
      [...firstImage.classList].find((c) => imageClasses.includes(c))
    ) &&
    [...firstImage.classList].find((c) => imageClasses.includes(c)) ===
      [...secondImage.classList].find((c) => imageClasses.includes(c))
  ) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.hidden = true;
  imageContainer.querySelectorAll("img").forEach((img) => {
    img.style.pointerEvents = "none";
  });
});

initialize();