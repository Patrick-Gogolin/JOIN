async function postContacts(path = "", data={}) {

    data = {
        name: "Marie",
        lastName: "Hoffmann",
        email: "marie.hoffmann@t-online.de",
    };

    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    console.log(response);
    return responseToJson = await response.json();

}
