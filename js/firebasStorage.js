function onloadFunc(){
    console.log("test");
    loadData("", {"email":"test123@outlook.de"});
}

const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"

async function loadData(path = "") { //Zum Laden von Daten
  let response = await fetch(BASE_URL + path + ".json"); // Wenn nicht anderes definiert ist der Fetch ein GET
  let responseToJson = await response.json();
  console.log(responseToJson);
}

async function postData(path = "", data= {}) { //Hinzufügen von Daten
    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
  return responseToJson = await response.json();

}

async function deleteData(path = ""){
    let response = await fetch(BASE_URL + path + ".json",{
        method: "DELETE",
    });
  return responseToJson = await response.json();

}

async function updateData(path = "", data={}) {
    let response = await fetch(BASE_URL + path + ".json",{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
  return responseToJson = await response.json();

}
