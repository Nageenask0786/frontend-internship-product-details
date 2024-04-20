const productDetailsContainer = document.getElementById(
  "productDetailsContainer"
);

const validImages = [
  {
    src: "https://res.cloudinary.com/dchxbofyt/image/upload/v1713591947/Rectangle_4_z9kzcq.png",
  },
  {
    src: "https://res.cloudinary.com/dchxbofyt/image/upload/v1713591588/Image-4_c3daer.png",
  },
  {
    src: "https://res.cloudinary.com/dchxbofyt/image/upload/v1713591535/Image-1_h12cmq.png",
  },
  {
    src: "https://res.cloudinary.com/dchxbofyt/image/upload/v1713591568/Image-3_h8qwaz.png",
  },
];

const apiUrl =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(`Error while fetching ${e}`);
  }
};
const setActiveImage = (src) => {
  const enlargedActiveImage = document.getElementById("activeImage");
  enlargedActiveImage.src = src;
};

const onIncrement = () => {
  const quantity = document.getElementById("quantity");
  quantity.textContent = parseInt(quantity.textContent) + 1;
};

const onDecrement = () => {
  const quantity = document.getElementById("quantity");
  const currentQuantity = quantity.textContent;
  if (currentQuantity > 1) {
    quantity.textContent = parseInt(quantity.textContent) - 1;
  }
};

const onClickOfAddToCart = () => {
    const textEle = document.getElementById("displayText");
    textEle.classList.remove("hide")
    textEle.classList.add("text")
    textEle.textContent = "Embrace Sideboard with Color Yellow and Size Small added to cart"
}

const fetchDataAndDisplayUI = async (url) => {
  try {
    const productData = await fetchData(url);
    const { product } = productData;
    product.images = validImages;
    const {
      images,
      vendor,
      title,
      price,
      compare_at_price,
      options,
      description,
    } = product;
    const difference =
      parseInt(compare_at_price.slice(1)) - parseInt(price.slice(1));
    const discount = (difference / parseInt(compare_at_price.slice(1))) * 100;
    console.log(discount);
    console.log(product);
    const ImagesContainer = document.createElement("div");
    ImagesContainer.classList.add("images-container");
    productDetailsContainer.appendChild(ImagesContainer);
    const enlargedImage = document.createElement("img");
    enlargedImage.src = images[0].src;
    enlargedImage.id = "activeImage";
    enlargedImage.classList.add("enlarged-image");
    ImagesContainer.appendChild(enlargedImage);
    const Images = document.createElement("div");
    Images.classList.add("images");
    ImagesContainer.appendChild(Images);
    for (let each of images) {
      const img = document.createElement("img");
      img.classList.add("img");
      img.src = each.src;
      Images.appendChild(img);
    }
    const productDetails = document.createElement("div");
    productDetails.classList.add("product-details");
    productDetailsContainer.appendChild(productDetails);
    const productVendor = document.createElement("p");
    productVendor.classList.add("vendor");
    productVendor.textContent = vendor;
    productDetails.appendChild(productVendor);
    const productTitle = document.createElement("h1");
    productTitle.classList.add("title");
    productTitle.textContent = title;
    productDetails.appendChild(productTitle);
    const hr = document.createElement("hr");
    productDetails.appendChild(hr);
    const Div = document.createElement("div");
    Div.classList.add("div");
    productDetails.appendChild(Div);
    const discountPrice = document.createElement("p");
    discountPrice.textContent = price;
    discountPrice.classList.add("price");
    Div.appendChild(discountPrice);
    const discountEle = document.createElement("p");
    discountEle.classList.add("discount");
    discountEle.textContent = `${Math.floor(discount)}% off`;
    Div.appendChild(discountEle);
    const originalPrice = document.createElement("p");
    originalPrice.textContent = compare_at_price;
    originalPrice.classList.add("compare-price");
    productDetails.appendChild(originalPrice);
    const hr2 = document.createElement("hr");
    productDetails.appendChild(hr2);
    const h3 = document.createElement("h3");
    h3.textContent = "Choose a Color";
    productDetails.appendChild(h3);
    const colorsContainer = document.createElement("div");
    colorsContainer.classList.add("div");
    colorsContainer.style.height = "60px";
    colorsContainer.style.display = "flex";
    productDetails.appendChild(colorsContainer);
    const div1 = document.createElement("div");
    div1.style.backgroundColor = "#ECDECC";
    div1.textContent = "✓";
    colorsContainer.appendChild(div1);
    const div2 = document.createElement("div");
    div2.style.backgroundColor = "#BBD278";
    colorsContainer.appendChild(div2);
    const div3 = document.createElement("div");
    div3.style.backgroundColor = "#BBC1F8";
    colorsContainer.appendChild(div3);
    const div4 = document.createElement("div");
    div4.style.backgroundColor = "#FFD3F8";
    colorsContainer.appendChild(div4);
    const hr3 = document.createElement("hr");
    productDetails.appendChild(hr3);
    const heading = document.createElement("h3");
    heading.textContent = "Choose a Size";
    productDetails.appendChild(heading);
    const sizesContainer = document.createElement("div");
    sizesContainer.classList.add("input-container");
    productDetails.appendChild(sizesContainer);
    
    let index = 0;
    for (let each of options[1].values) {
        const Container = document.createElement("div")
        Container.style.display = "flex"
        Container.style.alignItems = "center"
        sizesContainer.appendChild(Container)
      const sizeItem = document.createElement("input");
      sizeItem.type = "radio";
      sizeItem.name = "size";
      sizeItem.value = each;
      sizeItem.id = index;
      if (index === 0) {
        sizeItem.checked = true;
      }

      Container.appendChild(sizeItem);
      const label = document.createElement("label");
      label.htmlFor = index;
      label.textContent = each;
      Container.appendChild(label);
      index++;
    }
    const hr4 = document.createElement("hr");
    productDetails.appendChild(hr4);
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    productDetails.appendChild(buttonContainer);
    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-container");
    buttonContainer.appendChild(quantityContainer);
    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.addEventListener("click", onDecrement);
    quantityContainer.appendChild(decrementButton);
    const quantity = document.createElement("p");
    quantity.textContent = "1";
    quantity.id = "quantity";
    quantityContainer.appendChild(quantity);
    const incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    incrementButton.addEventListener("click", onIncrement);
    quantityContainer.appendChild(incrementButton);
    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.classList.add("add-to-cart-btn");
    addToCartBtn.addEventListener("click",onClickOfAddToCart)
    buttonContainer.appendChild(addToCartBtn);
    const addToCartText = document.createElement("p")
    addToCartText.textContent = ""
    addToCartText.classList.add("hide")
    addToCartText.id = "displayText"
    productDetails.appendChild(addToCartText)
    const descriptionEle = document.createElement("p");
    descriptionEle.textContent = description.slice(25, description.length - 4);
    descriptionEle.classList.add("description");
    productDetails.appendChild(descriptionEle);
    const imagesContainer = document.querySelectorAll(".img");
    imagesContainer.forEach((each) => {
      each.addEventListener("click", () => {
        setActiveImage(each.src);
      });
    });
  } catch (e) {
    console.log(e);
  }
};

fetchDataAndDisplayUI();
