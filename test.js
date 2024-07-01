let fruits = [];

async function fetchDataJson() {
    let response = await fetch("https://www.fruityvice.com/api/fruit/all");
    let responseAsJson = await response.json();
    console.log(responseAsJson);
    let keys = Object.keys(responseAsJson);
    console.log(keys);
    let content = document.getElementById('content');

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const elements = responseAsJson[key];
        console.log(elements);
        content.innerHTML += /*html*/`
        <div class="container">
                <div class="card">
                    <h2>${elements['name']}:</h2>
                        <ul>
                            <li>${elements['family']}</li>
                            <li>${elements['order']}</li>
                            <li>${elements['genus']}</li>
                        </ul>
                        
                    <h4>Nutritions:</h4>
                        <ul>
                            <li>Calories: ${elements['nutritions']['calories']}</li>
                            <li>Fat: ${elements['nutritions']['fat']}</li>  
                            <li>Sugar: ${elements['nutritions']['sugar']}</li> 
                            <li>Carbohydrates: ${elements['nutritions']['carbohydrates']}</li>    
                        </ul>
                </div >
            </div >
        `;

    }
}

async function init() {
    await fetchDataJson();
}

function renderFruits() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < fruits.length; i++) {
        const fruit = fruits[i];
        content.innerHTML += templateHTML(fruit);
    }
}
function templateHTML(fruit) {
    return `<div class="container">
                <div class="card">
                    <h2>${fruit['name']}:</h2>
                        <ul>
                            <li>${fruit['family']}</li>
                            <li>${fruit['order']}</li>
                            <li>${fruit['genus']}</li>
                        </ul>
                        
                    <h4>Nutritions:</h4>
                        <ul>
                            <li>Calories: ${fruit['nutritions']['calories']}</li>
                            <li>Fat: ${fruit['nutritions']['fat']}</li>  
                            <li>Sugar: ${fruit['nutritions']['sugar']}</li> 
                            <li>Carbohydrates: ${fruit['nutritions']['carbohydrates']}</li>    
                        </ul>
                </div >
            </div >
        `;
}