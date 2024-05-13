
const accessKey = "Mzv1Iyly0Q6PYnfTNgWdrQSCf8TkKSuTT752bGiG4Ko";
let keyword = "";
let searchOptions = ["orden", "decoración", "armonia"];

const crearHeader = () => {
  const header = document.querySelector("header");
  const divHeader = document.getElementById("app");
  const logoImg = document.createElement("img");
  
  const ul = document.createElement("ul");
  ul.id = "menu";
  const arrayLi = ["Inicio", "Explorar","Crear"];
  

  for (const texto of arrayLi) {
    const li = document.createElement("li");
    li.textContent = texto;
    li.className="liMenu"

    ul.appendChild(li);
    if(texto!=="Inicio"){
      li.classList.add("opciones")
    }
    if(texto==="Inicio"){
      li.classList.add("menuInicio")
    }
 
  }
  divHeader.appendChild(ul)
//opcion para cuando haga click cambie de color.
const listaItems = document.querySelectorAll('.liMenu');
 // Convertir NodeList a array
 const arrayLiElements = Array.from(document.querySelectorAll('.liMenu'));
 console.log(arrayLiElements);

// Agregar event listener a cada elemento del menú
listaItems.forEach(item => {
  item.addEventListener('click', () => {
    // Eliminar la clase 'active' de todos los elementos
    listaItems.forEach(item => item.classList.remove('active'));
    // Agregar la clase 'active' solo al elemento clicado
    item.classList.add('active');
  });
});
// Obtener todos los elementos del menú
  const buscador = crearBuscador();
  const opciones=createSearchOptions();
  //const buscarImg=buscarImagenes()

  header.appendChild(divHeader);
 divHeader.appendChild(logoImg);
  header.appendChild(ul);
  header.appendChild(buscador);
  buscador.appendChild(opciones)
  //opciones.appendChild(buscarImg) // he insertado el buscador de imagenes.
  const notificaciones = document.createElement("img");
  const mensajes = document.createElement("img");
  const perfil = document.createElement("img");
  const divElementos=document.createElement("div")
  divElementos.id="imgElementos"
  notificaciones.src = "./assets/campana.png";
  notificaciones.alt = "notificaciones";
  mensajes.src = "./assets/mensajero.png";
  mensajes.alt = "mensajes";
  perfil.src = "./assets/usuario.png";
  perfil.alt = "Perfil";
  notificaciones.className = "elementos";
  mensajes.className = "elementos";
  perfil.className = "elementos";

  logoImg.src = "./assets/pinterest.png";
  logoImg.alt = "Pinterest";
  logoImg.id="logo"
 
  divElementos.appendChild(notificaciones);
  divElementos.appendChild(mensajes);
  divElementos.appendChild(perfil);
  header.appendChild(divElementos)

  comprobarArrayli(arrayLiElements);
  return header;
};
//crear arrayLi para mandar unas imagenes cuando le de a inicio o explorar
// Definir la función para comprobar los clics en los elementos li
const comprobarArrayli = (arrayLiElements) => {
  arrayLiElements.forEach(li => {
    li.addEventListener("click", async () => {
      const keyword = li.textContent.toLowerCase(); // Obtener el texto del elemento del menú
      await buscarImagenes(keyword); // Llamar a buscarImagenes con la keyword obtenida
    });
  });
};
// Función para crear las opciones de búsqueda
const createSearchOptions = () => {
  const searchOptions = ["orden", "decoración", "armonia"];
  const searchContainer = document.createElement("div");
  searchContainer.id= "searchContainer"
  searchContainer.classList.add("hidden");
  searchOptions.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", async () => {
      keyword = option;
      await buscarImagenes(option,"option");
      });
      searchContainer.appendChild(button);
  });
  searchContainer.classList.add("hidden");
  return searchContainer;
};
document.addEventListener("DOMContentLoaded", () => {
  const cajaBusqueda = document.getElementById("cajaBusqueda");
  const searchContainer = document.getElementById("searchContainer");

  // Agregar evento de clic al campo de búsqueda para mostrar u ocultar las opciones
  cajaBusqueda.addEventListener("click", () => {
    searchContainer.classList.toggle("hidden");
  });

  // Agregar evento de clic al documento para ocultar las opciones al hacer clic en otro lugar
  document.addEventListener("click", event => {
    if (!searchContainer.contains(event.target) && event.target !== cajaBusqueda) {
      searchContainer.classList.add("hidden");
    }
  });
});
//crear el buscador
const crearBuscador = () => {
  const form = document.createElement("form");
  form.id = "busqueda";
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar el envío del formulario
     const keywordInput = document.getElementById("cajaBusqueda").value;
     
    await buscarImagenes(keywordInput,"input");
    document.getElementById("cajaBusqueda").value = "";
    
  });
const divInput=document.createElement("div")
divInput.className="divInput"
  const input = document.createElement("input");
  input.id = "cajaBusqueda";
  input.type = "text";
  input.placeholder = "Buscar la imagen";

  const btn = document.createElement("button");
  btn.textContent = "Buscar";
  btn.type = "submit";
  btn.id="botonBuscar"

    // Crear imagen de la lupa
/*const lupa = document.createElement("img");
//lupa.src = "./assets/buscar.png";
lupa.alt = "Lupa";
lupa.id = "lupa";
lupa.src="./assets/buscar.png"

  // Agregar evento de clic a la lupa para mostrar el input
  lupa.addEventListener("click", () => {
    // Mostrar el input solo si el ancho de la pantalla es menor o igual a 700px
    if (window.innerWidth <= 700) {
      input.style.display = "block";
      btn.style.display = "block";
      lupa.style.display = "none";
    }
  });*/
  divInput.appendChild(input)
  divInput.appendChild(btn)
  //divInput.appendChild(lupa)
  

  form.appendChild(divInput);



  return form;

};


const buscarImagenes = async (keyword) => {
  //const url = `https://api.unsplash.com/search/photos?query=${keyword}&client_id=${accessKey}`;
 
  if (!keyword) {
    console.error('Keyword no válida:', keyword);
    return;
  }
  const url = `https://api.unsplash.com/search/photos?query=${keyword}&client_id=${accessKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.results.length === 0) {
      renderNoResultsMessage();
    } else {
      renderList(data.results);
    }
    return data;
  } catch (error) {
    console.log('Error fetching data:', error);
    renderErrorMessage();
    return [];
  }
};



const renderList = (imageResults) => {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = ""; // Limpiar la galería
  imageResults.forEach(image => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = image.urls.regular;
    img.alt = image.alt_description;
    li.appendChild(img);
    gallery.appendChild(li);
  });
};

const renderNoResultsMessage = () => {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "<p>No se encontraron imágenes.</p>";
};

const renderErrorMessage = () => {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "<p>Ocurrió un error al cargar las imágenes.</p>";
};

const piePagina = () => {
  const footer = document.querySelector("footer");
  const divFooter = document.createElement("div");
  const ulFooter = document.createElement("ul");
  ulFooter.id = "piePag";
  const arrayLi2 = ["Blog", "Empresas", "Desarrolladores", "Política de privacidad", "Anuncios personalizados", "Condiciones", "Info"];

  for (const texto of arrayLi2) {
    const li = document.createElement("li");
    li.textContent = texto;
    ulFooter.appendChild(li);
  }

  footer.appendChild(divFooter);
  divFooter.appendChild(ulFooter);
  document.body.appendChild(footer);
  return footer;
};
//crear menu desplegable de Inicio
document.addEventListener("DOMContentLoaded", function(){
  const menuDesplegable = document.querySelectorAll(".menuInicio");

  menuDesplegable.forEach(menuInicio => {
    menuInicio.addEventListener("click", function(){
      // Ocultar todos las opciones excepto el actual
      const opciones2 = document.querySelectorAll(".liMenu.opciones");
      opciones2.forEach(opcion => {
        if (opcion !== menuInicio.nextElementSibling) {
          opcion.classList.remove("visible");
        }
      });
      // Mostrar u ocultar las opciones del menú actual
      const crear = document.querySelector(".liMenu.opciones:nth-child(3)");
      const explorar = document.querySelector(".liMenu.opciones:nth-child(2)");
      crear.classList.add("visible");
      explorar.classList.add("visible")
    });
  });

  document.addEventListener("click", function(event) {
    const opciones = document.querySelectorAll(".visible");
    opciones.forEach(opcion => {
      if (!event.target.classList.contains("menuInicio") && !opcion.contains(event.target)) {
        opcion.classList.remove("visible");
      }
    });
  });
});


  
crearHeader();
buscarImagenes("general")
piePagina()
