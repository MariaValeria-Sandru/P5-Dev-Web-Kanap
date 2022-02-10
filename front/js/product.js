let product;
const init = async function () {
  const recupId = window.location.search; // Recuperer la partie search de l'url
  const urlSearchParam = new URLSearchParams(recupId); //Faire ressortir le id du produit a partir de l'url
  const leId = urlSearchParam.get("id"); //Faire ressortir le id du produit a partir de l'url

  const productPromise = fetch("http://localhost:3000/api/products/" + leId) //Recuperer les donnees du produit de l'API en utilisant le id
    .then((res) => {
      return res.json();
    });

  await productPromise;
  productPromise.then((data) => {
    console.log(data);
    product = data;
    document.getElementById("title").innerHTML = data.name; //Afficher ou injecté les donnees
    document.getElementById("price").innerHTML = data.price;
    document.getElementById("description").innerHTML = data.description;
    document.querySelector(".item__img img").setAttribute("src", data.imageUrl);

    data.colors.forEach((color) => {
      const colorElement = document.createElement("option");
      colorElement.setAttribute("value", color);
      colorElement.innerHTML = color;
      document.getElementById("colors").appendChild(colorElement); //Afficher ou injecté les donnees
    });
  });
};

document.getElementById("addToCart").addEventListener("click", () => {
  const quantity = document.getElementById("quantity").value; // -2
  const color = document.querySelector("#colors").value;

  if (parseInt(quantity) <= 0 || !color) {
    alert("Choisir une couleur ou bien aumoins 1 article");
    return;
  }
  let products = window.localStorage.getItem("selectedProducts");
  if (products) {
    products = JSON.parse(products);
  } else {
    products = [];
  }
  const choice = {
    _id: product._id,
    color: color,
    quantity: parseInt(quantity),
  };

  // 1. Si un produit avec "product._id" et "color" existent deja dans "products"
  const storageProductIndex = products.findIndex(
    (item) => item._id === choice._id && item.color === color
  );
  if (storageProductIndex !== -1) {
    const storageProduct = products[storageProductIndex];
    choice.quantity = storageProduct.quantity + parseInt(quantity);
    products.splice(storageProductIndex, 1, choice);
  } else {
    // 2. Sinon on fait un push normallement
    products.push(choice);
  }
  window.localStorage.setItem("selectedProducts", JSON.stringify(products));
  alert(
    `Canapé ajouté avec succes dans. Vous avez desormais ${choice.quantity} pieces de ce canapé dans votre panier`
  );
});

init();
