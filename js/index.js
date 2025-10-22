
var productNameInput = document.getElementById("productName")
var productPriceInput = document.getElementById("productPrice")
var productCategoryInput = document.getElementById("productCategory")
var productDescriptionInput = document.getElementById("productDescription")
var productImageInput = document.getElementById("productImage")
var productSearchInput = document.getElementById("productSearch")
var viewLayout = document.getElementById("layout-box")

// console.log(productNameInput , productPriceInput , productCategoryInput , productDescriptionInput);
// console.log(typeof productNameInput); // object



var products = []
var addButton = document.getElementById("addBtn");
var updateButton = document.getElementById("updateBtn")
var temp ;

var regex = {
        productName :{
            value :  /^[A-Z][a-z]{2,10}$/ ,
            isValid : false
        },
        productPrice : {
            value : /^(1000|[0-9]\d{3,4}|50000)$/,
            isValid : false
        } ,
        productCategory : {
            value : /^(tv|mobile|screen|labtop)$/i ,
            isValid : false
        } ,
        productDescription : {
            value : /^[\s\S]*$/ ,
            isValid : false
        },
        productImage:{
            value : /^.*\.(jpg|png|webp)$/,
            isValid : false
        }
    }

if (localStorage.getItem("ProductList") !== null){
    products = JSON.parse(localStorage.getItem("ProductList"));
    displayProducts(products)
}

function addProduct() {
    var product = {
        id: products.length,
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        image : productImageInput.files[0]?.name
    }

    products.push(product)

    // console.log(product);
    // console.log(products);

    displayProducts(products)

    // JSON => Javascript object notation => convert object to string
    localStorage.setItem("ProductList" , JSON.stringify(products))

    clearForm();
    addButton.disabled = true
}


function displayProducts(list) {
    var cartona = ""

    for (let i = 0; i < list.length; i++) {
        if (list[i] == null) {
            continue;
        }

        if(productSearchInput.value == ""){
            list[i].newName = null ; // or any value of flasy values .. 0 , null , false , undefined , nan , ""
        }
        cartona += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td><img src="images/${list[i].image? list[i].image : "not_found.jpg"}" style=" width:50px"></td>
                <td>${list[i].newName? list[i].newName : list[i].name}</td>
                <td>${list[i].price}</td>
                <td>${list[i].category}</td>
                <td>${list[i].description}</td>
                <td>
                    <button onclick="viewProduct(${list[i].id})" class="btn btn-warning text-white"><i class="fa-solid fa-eye"></i>View</button>
                    <button onclick="deleteProduct(${list[i].id})" class="btn btn-danger"><i class="fa-solid fa-trash"></i>Delete</button>
                    <button onclick="fillUpdateInputs(${list[i].id})" class="btn btn-success"><i class="fa-solid fa-pen-to-square"></i>Update</button>
                    
                </td>

            </tr>
        
        `
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function viewProduct(id){
    console.log(products[id]);
    var cartona = `
        <div class="layout-item pt-2">
                <div class="container">
                    <div class="row">
                        <div class="layout-item-header d-flex justify-content-between align-items-center px-4 py-2 ">
                            <h2 class="text-center">Product Details...</h2>
                            <i onclick="closeLayout()" class="fa-solid fa-xmark fs-2"></i>
                        </div>
                        <div class="layout-item-img d-flex justify-content-center">
                            <img src="images/${products[id].image? products[id].image : "not_found.jpg"}" class="w-25 " alt="">
                        </div>
                        <div class="layout-item-text d-flex flex-column align-items-start px-4 py-3">
                            <h4>Product Name :  <span>${products[id].name}</span></h4>
                            <h4>Product Price : <span>${products[id].price}</span> </h4>
                            <h4>Product Category : <span>${products[id].category}</span></h4>
                            <h4>Product Description : <span>${products[id].description}</span> </h4>
                        </div>

                    </div>
                </div>

            </div

    `
    viewLayout.classList.remove("d-none");
    document.getElementById("layout-box").innerHTML = cartona;

}

function closeLayout(){
    viewLayout.classList.add("d-none");
}
function deleteProduct(id){


    // products.splice(index , 1);

    // displayProducts(products);
    // localStorage.setItem("ProductList" , JSON.stringify(products))
    
    // console.log(index);
/////////////////////////////////////////////
    // for (let i = 0; i < products.length; i++) {
    //     if(products[i].id == id){
    //         products.splice(products[i],1);
    //         displayProducts(products)
    //         localStorage.setItem("ProductList" , JSON.stringify(products))
    //         break
    //     }
        
    // }
//////////////////////////////////////////////
    products[id] = null   
    displayProducts(products)
    localStorage.setItem("ProductList" , JSON.stringify(products))


    
}


function fillUpdateInputs(index){
    // console.log(index);
    temp = index
    console.log(temp);
    
    productNameInput.value = products[index]?.name;
    productPriceInput.value = products[index]?.price;
    productCategoryInput.value = products[index]?.category;
    productDescriptionInput.value = products[index]?.description;
    
    addButton.classList.add("d-none")
    updateButton.classList.replace("d-none" , "d-block")

}


function updateProduct(){
    // console.log(temp);
    
    products[temp].name = productNameInput.value;
    products[temp].price = productPriceInput.value;
    products[temp].category = productCategoryInput.value;
    products[temp].description = productDescriptionInput.value;
    products[temp].image = productImageInput.files[0]?.name;

    displayProducts(products);
    localStorage.setItem("ProductList" , JSON.stringify(products))

    addButton.classList.replace("d-none" , "d-block");
    updateButton.classList.replace("d-block" , "d-none")

    clearForm();
}



function clearForm(){
    productNameInput.value = "" ;
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
    productImageInput.value = "";

    productNameInput.classList.remove("is-valid")
    productPriceInput.classList.remove("is-valid")
    productCategoryInput.classList.remove("is-valid")
    productDescriptionInput.classList.remove("is-valid")

}

// this => term => refrence to element refer to
function searchProduct(term){
    // console.log(term);

    if(term == ""){
        displayProducts(products);
        return
    }
    var searchItems = []
    for (let i = 0; i < products.length; i++) {
        if(products[i]?.name.toLowerCase().includes(term.toLowerCase())){
            products[i].newName = products[i]?.name.toLowerCase().replace(term.toLowerCase() , `<span class="text-danger">${term}</span>`)
            
            searchItems.push(products[i]);
        }
        
    }
    displayProducts(searchItems)
    
}

function validateProductInputs(element){
    
    // console.log(element);
    // console.log(element.id);
    // console.log(regex[element.id]);
    
    if (regex[element.id].value.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        regex[element.id].isValid = true
    }else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }

    if(element.value == ""){
        element.classList.remove("is-invalid")
    }

    toggleAddButton();
    

}



function toggleAddButton(){
    if( regex.productName.isValid == true && regex.productPrice.isValid == true && regex.productCategory.isValid == true && regex.productDescription.isValid == true ){
        addButton.disabled = false
    }else{
        addButton.disabled = true
    }
}

