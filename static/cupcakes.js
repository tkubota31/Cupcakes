const url = "http://localhost:5000/api";


// Make a new cupcake

function generateCupcake(cupcake){
    return `
    <div data-cupcake-id= ${cupcake.id}>
        <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button class="delete-button">Delete</button>
        </li>
        <img src = "${cupcake.image.startsWith("http") ? cupcake.image : "https://tinyurl.com/demo-cupcake"}" alt="no image">
    </div>
    `;
}
// https://localhost:5000/api/cupcakeImage/10
async function showCupcakes(){
    const response = await axios.get(`${url}/cupcakes`);

    for(let cupcakeData of response.data.cupcakes){
        let newCupcake = generateCupcake(cupcakeData);
        console.log(newCupcake)
        $("#cupcake-list").append(newCupcake);
    }
}

$("#new-cupcake-form").on("submit", async function(evt){
    evt.preventDefault()
    alert("unch")
    let flavor = $("#cupcake-flavor").val();
    let size = $("#cupcake-size").val();
    let rating=$("#cupcake-rating").val();
    let image = $("#cupcake-image").val();

    const newCupcakeRes = await axios.post(`${url}/cupcakes`,{
        flavor:flavor,
        size:size,
        rating:rating,
        image:image
    });

    let newCupcake = $(generateCupcake(newCupcakeRes.data.cupcake));
    console.log(newCupcakeRes)
    $("#cupcake-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");
});


$("#cupcake-list").on("click",".delete-button", async function(evt){
    evt.preventDefault();
    let $cupcake = $(evt.target).closest("div");
    let cupcakeId= $cupcake.attr("data-cupcake-id");

    await axios.delete(`${url}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

$(showCupcakes);
