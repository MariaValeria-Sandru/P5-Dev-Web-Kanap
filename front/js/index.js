/* fetch("http://localhost:3000/api/products")
  .then((data) => data.json())
  .then((data) => console.log(data))
  .then()
  .then()
console.log("Hello world") */

async function recupData() {
  let data = await fetch("http://localhost:3000/api/products");
  let jsonData = await data.json();
  return jsonData;
}

function displayData(data) {
  const productList = document.getElementById("items");
  data.forEach((product) => {
    productList.innerHTML += `
      <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
        </a>
      `;

    console.log(product);
  });
}

recupData()
  .then((data) => displayData(data))
  .catch((error) => {
    alert(
      "Desolé mais la liste des produits est indisponible pour l'instant. \n Veuillez ressayer plus tard."
    );
  });

/* (async () => {
  const data = await recupData();
  displayData(data);
})(); */
