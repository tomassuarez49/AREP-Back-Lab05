const API_URL = "http://ec2-3-83-110-103.compute-1.amazonaws.com:8080/properties"; // Reemplazar con la URL backend

// Capturar formulario y manejar envío
document.getElementById("propertyForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  // Obtener valores del formulario
  const property = {
    address: document.getElementById("address").value,
    price: parseFloat(document.getElementById("price").value),
    size: parseInt(document.getElementById("size").value),
    description: document.getElementById("description").value
  };

  // Validar que los campos no estén vacíos
  if (!property.address || !property.price || !property.size || !property.description) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  // Enviar datos al backend (POST)
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(property)
  });

  if (response.ok) {
    alert("Propiedad agregada con éxito");
    document.getElementById("propertyForm").reset();
    loadProperties(); // Recargar lista
  } else {
    alert("Error al agregar propiedad");
  }
});

// Cargar propiedades desde la API
async function loadProperties() {
  const response = await fetch(API_URL);
  const properties = await response.json();

  const propertyList = document.getElementById("propertyList");
  propertyList.innerHTML = ""; // Limpiar lista antes de cargar

  properties.forEach(property => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${property.id}</td>
            <td>${property.address}</td>
            <td>$${property.price.toFixed(2)}</td>
            <td>${property.size} m²</td>
            <td>${property.description}</td>
            <td>
                <button onclick="editProperty(${property.id})">Editar</button>
                <button onclick="deleteProperty(${property.id})">Eliminar</button>
            </td>
        `;

    propertyList.appendChild(row);
  });
}

// Eliminar propiedad
async function deleteProperty(id) {
  if (!confirm("¿Estás seguro de eliminar esta propiedad?")) return;

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    alert("Propiedad eliminada");
    loadProperties();
  } else {
    alert("Error al eliminar propiedad");
  }
}

// Editar propiedad
async function editProperty(id) {
  const newAddress = prompt("Nueva dirección:");
  const newPrice = parseFloat(prompt("Nuevo precio:"));
  const newSize = parseInt(prompt("Nuevo tamaño en m²:"));
  const newDescription = prompt("Nueva descripción:");

  if (!newAddress || isNaN(newPrice) || isNaN(newSize) || !newDescription) {
    alert("Datos inválidos");
    return;
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      address: newAddress,
      price: newPrice,
      size: newSize,
      description: newDescription
    })
  });

  if (response.ok) {
    alert("Propiedad actualizada");
    loadProperties();
  } else {
    alert("Error al actualizar propiedad");
  }
}

// Cargar propiedades al inicio
loadProperties();
