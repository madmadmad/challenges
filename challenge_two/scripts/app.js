// Check if user's browser is Internet Explorer 11
function detectIE() {
  if (navigator.userAgent.match(/Trident.*rv:11\./)) {
    document.querySelector("body").classList.add("ie11");
  }
}

// call Internet Explorer 11 check
detectIE();

const gridContainer = document.querySelector(".grid-container");

const gridItems = document.querySelectorAll(".grid-item");
// make array from nodelist for Internet Explorer
const gridItemsArr = Array.prototype.slice.call(gridItems);

axios
  .get("https://image-transforms.madmadmad.net/images.json")
  .then(function(res) {
    // fade in grid
    gridContainer.classList.add("fadeIn");
    // grab image urls from response
    const data = res.data.data[0].images;

    gridItemsArr.forEach(function(item, index) {
      // Use image and title from response for grid-item image and image alt text
      const image = item.querySelector(".grid-item__image img");

      image.src = data[index].url;
      image.alt = data[index].title;

      // insert url to grid-item anchor tag from response
      const btn = item.querySelector(".btn");
      btn.href = data[index].url;
    });
  })
  .catch(function(err) {
    // handle errors
    console.log(err);
    document.querySelector(".error-text").classList.add("display-error");
  });
