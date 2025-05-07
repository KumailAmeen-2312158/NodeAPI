

const Link = "https://effective-rotary-phone-v6w9p6w5gv55hpj9r-5005.app.github.dev/country";
fetch(Link).then(response=>{
    if(!response.ok){
        throw new Error("failed to fetch");
    }
    return response.json();
}).then(data=>{
const tbody=document.querySelector("#countryTable tbody");
data.forEach(c=>{
    const row=document.createElement("tr");
    row.innerHTML=`
    <td>${c.country_id}</td>
    <td>${c.country_name}</td>
    <td>${c.region_id}</td>
    
    `;
    tbody.appendChild(row);
});
}
).catch(error=>{
    console.log(error.message);
});