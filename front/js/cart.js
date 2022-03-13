let productLocalStorage = JSON.parse(localStorage.getItem("selectedProducts"));
console.log(productLocalStorage); // Initialisation du local storage
getCart();

async function getCart() {
  // Gestion du panier
  if (productLocalStorage === null || productLocalStorage == 0) {
    // Si le panier est vide (strictement égal à 0)
    let productCart = document.querySelector("#cart__items");
    productCart.innerHTML = "Est actuellement vide ";
    productCart.style.textAlign = "center";
    productCart.style.fontWeight = "bold";
    productCart.style.fontSize = "2em";
  } // Si le panier n'est pas vide
  else {
    let totalPrice = 0;
    let totalQuantity = 0;
    const productCart = document.getElementById("cart__items"); // Insertion de l'élément
    for (let product of productLocalStorage) {
      //Recuperer les donnees du produit de l'API en utilisant le id
      let productData = await fetch(
        "http://localhost:3000/api/products/" + product._id
      );
      productData = await productData.json();
      productCart.innerHTML += `
            <article id="cart__item_${product._id}_${product.color}" class="cart__item" data-id="${product._id}" data-color="${product.color}" >
                <div class="cart__item__img">
                  <img src="${productData.imageUrl}" alt="">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productData.name}</h2>
                    <p>${product.color}</p>
                    <p id="item_price_${product._id}_${product.color}">${productData.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" id="itemQuantity_${product._id}_${product.color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p id="deleteItem_${product._id}_${product.color}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> `;

      totalPrice += productData.price * product.quantity;
      totalQuantity += product.quantity;
    }

    for (let product of productLocalStorage) {
      // Event listener pour la modification de la quantite d'un produit
      document
        .getElementById(`itemQuantity_${product._id}_${product.color}`)
        .addEventListener("change", (event) => {
          modifQuantite(product._id, product.color, event.target.value);
        });

      // Event listener pour la suppression d'un produit
      document
        .getElementById(`deleteItem_${product._id}_${product.color}`)
        .addEventListener("click", () => {
          const quantity = document.getElementById(
            `itemQuantity_${product._id}_${product.color}`
          ).value;
          deleteProduct(product._id, product.color, quantity);
        });
    }

    document.getElementById("totalPrice").innerHTML = totalPrice;
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
  }
}

function modifQuantite(productId, color, selectedQuantity) {
  const totalPriceElem = document.getElementById("totalPrice");
  const totalQuantityElem = document.getElementById("totalQuantity");
  const totalPrice = parseInt(totalPriceElem.innerHTML, 10);
  const totalQuantity = parseInt(totalQuantityElem.innerHTML, 10);
  //console.log(
  // "🚀 ~ file: cart.js ~ line 78 ~ modifQuantite ~ totalQuantity",
  //  totalQuantity
  //);
  const itemIndex = productLocalStorage.findIndex(
    (elem) => elem._id === productId && elem.color === color
  );
  const itemPrice = parseInt(
    document.getElementById(`item_price_${productId}_${color}`).innerHTML,
    10
  );
  if (
    parseInt(selectedQuantity, 10) > productLocalStorage[itemIndex].quantity
  ) {
    totalPriceElem.innerHTML = totalPrice + itemPrice;
    totalQuantityElem.innerHTML = totalQuantity + 1;
    productLocalStorage[itemIndex].quantity++;
  } else {
    totalPriceElem.innerHTML = totalPrice - itemPrice;
    totalQuantityElem.innerHTML = totalQuantity - 1;
    productLocalStorage[itemIndex].quantity--;
  }
  window.localStorage.setItem(
    "selectedProducts",
    JSON.stringify(productLocalStorage)
  );
}

function deleteProduct(productId, color, selectedQuantity) {
  const totalPriceElem = document.getElementById("totalPrice");
  const totalQuantityElem = document.getElementById("totalQuantity");
  const totalPrice = parseInt(totalPriceElem.innerHTML, 10);
  const totalQuantity = parseInt(totalQuantityElem.innerHTML, 10);
  const itemIndex = productLocalStorage.findIndex(
    (elem) => elem._id === productId && elem.color === color
  );
  const itemPrice = parseInt(
    document.getElementById(`item_price_${productId}_${color}`).innerHTML,
    10
  );

  totalPriceElem.innerHTML =
    totalPrice - parseInt(selectedQuantity, 10) * itemPrice;
  totalQuantityElem.innerHTML = totalQuantity - parseInt(selectedQuantity, 10);
  productLocalStorage.splice(itemIndex, 1);
  window.localStorage.setItem(
    "selectedProducts",
    JSON.stringify(productLocalStorage)
  );
  document.getElementById(`cart__item_${productId}_${color}`).remove();
}
const controlPrenomNomVille = (value) => {
  return /^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
};

const controlAdresse = (value) => {
  return /^[A-Za-z0-9\s]{3,100}$/.test(value);
};

const controlEmail = (value) => {
  return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value);
};
// Insertion du texte de bonne ou mauvaise saisie des informations
document.querySelector("#email").addEventListener("change", (event) => {
  if (!controlEmail(event.target.value)) {
    document.querySelector("#emailErrorMsg").innerHTML =
      "Addresse email incorrecte";
  } else {
    document.querySelector("#emailErrorMsg").innerHTML = "";
  }
});
document.querySelector("#city").addEventListener("change", (event) => {
  if (!controlPrenomNomVille(event.target.value)) {
    document.querySelector("#cityErrorMsg").innerHTML = "City non valide";
  } else {
    document.querySelector("#cityErrorMsg").innerHTML = "";
  }
});
document.querySelector("#address").addEventListener("change", (event) => {
  if (!controlAdresse(event.target.value)) {
    document.querySelector("#addressErrorMsg").innerHTML = "Address non valide";
  } else {
    document.querySelector("#addressErrorMsg").innerHTML = "";
  }
});

document.querySelector("#firstName").addEventListener("change", (event) => {
  if (!controlPrenomNomVille(event.target.value)) {
    document.querySelector("#firstNameErrorMsg").innerHTML = "Nom non valide";
  } else {
    document.querySelector("#firstNameErrorMsg").innerHTML = "";
  }
});
document.querySelector("#lastName").addEventListener("change", (event) => {
  if (!controlPrenomNomVille(event.target.value)) {
    document.querySelector("#lastNameErrorMsg").innerHTML = "Prenom non valide";
  } else {
    document.querySelector("#lastNameErrorMsg").innerHTML = "";
  }
});

// Bouton "commander" pour soumettre le formulaire avec evenement au clic
const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (event) => {
  event.preventDefault();
  form();
});
function form() {
  if (productLocalStorage === null || productLocalStorage == 0) {
    alert("votre panier est vide nous ne pouvons pas finaliser la commande ");
    return;
  } else {
    const contact = {
     firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
     email: document.querySelector("#email").value,
    };

    let products = [];
    for (let product of productLocalStorage) {
      products.push(product._id)
    }

    console.log(products)
    const envoiFormulaire = {
      contact,
      products,
    };
    //Envoi du formulaire dans le localStorage uniquement si les données sont correctes
    if (
      controlPrenomNomVille(contact.firstName) &&
      controlPrenomNomVille(contact.lastName) &&
      controlPrenomNomVille(contact.city) &&
      controlAdresse(contact.address) &&
      controlEmail(contact.email)
    ) {
      return fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(envoiFormulaire),
      })
      .then((response) => response.json())
        .then((order) => {
          console.log(order)
          localStorage.removeItem("selectedProducts")
          window.location.href = `./confirmation.html?orderId=${order.orderId}`;  
        })
        .catch((err) => console.log("Il y a un problème: ", err));
    } else {
      alert("Merci de vérifier vos données dans le formulaire");
    }
  }

}
  
