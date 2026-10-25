const heading = document.getElementById("h");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");
const imageContainer = document.getElementById("image-container");

const images = [
  {
    id: "img1",
    src: "https://picsum.photos/id/237/200/300"
  },
  {
    id: "img2",
    src: "https://picsum.photos/seed/picsum/200/300"
  },
  {
    id: "img3",
    src: "https://picsum.photos/200/300?grayscale"
  },
  {
    id: "img4",
    src: "https://picsum.photos/200/300/"
  },
  {
    id: "img5",
    src: "https://picsum.photos/200/300.jpg"
  }
];

let selectedImages = [];

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

  const duplicateIndex = Math.floor(Math.random() * images.length);

  const tiles = [
    ...images.map((image) => ({ ...image })),
    { ...images[duplicateIndex] }
  ];

  shuffle(tiles);

  tiles.forEach((tile, index) => {
    const img = document.createElement("img");

    img.src = tile.src;
    img.alt = `Image ${index + 1}`;
    img.dataset.index = index;
    img.dataset.image = tile.id;
    img.classList.add(tile.id);

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

  const [firstImage, secondImage] = selectedImages;

  if (firstImage.dataset.image === secondImage.dataset.image) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.hidden = true;
});

initialize();