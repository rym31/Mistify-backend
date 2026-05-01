const parfum = {
  name: "Polo Blue",
  brand: "Ralph Lauren",
  description: "Un parfum frais et élégant avec des notes marines, de melon et de bois clair.",
  imageUrl: "https://fimgs.net/mdimg/perfume/375x500.1439.jpg",
  price: 110,
  country: "USA",
  gender: "Homme",
  year: 2003,
  topNotes: "Melon",
  middleNotes: "Basilic",
  baseNotes: "Bois"
};

async function ajouterParfum() {
  const res = await fetch("http://localhost:3000/parfums", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(parfum)
  });

  const data = await res.json();

  console.log("STATUS :", res.status);
  console.log("Ajouté :", data.name || parfum.name);
}

ajouterParfum();