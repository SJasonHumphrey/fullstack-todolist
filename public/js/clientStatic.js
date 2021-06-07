// grab the ul dom element from html
let ul = document.querySelector('ul');

ul.addEventListener('click', async (event) => {

    try {
        event.preventDefault();

        if (event.target.className === "fas fa-trash") {
            let primaryKey = event.target.id;


            let url = `/todos/delete/${primaryKey}`;

            let results = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });

            let records = await results.json();
            listTodos(records);
            let html = "";

        }

    }
    catch (error) {
        console.log(error);
    }
})

ul.addEventListener('click', async (event) => {
    event.preventDefault();
        html = '';
    try {
        event.preventDefault();

        if (event.target.className === "fas fa-pencil-alt") {
            let primaryKey = event.target.id;


            let url = `/todos${primaryKey}`;

            let results = await fetch(url, {
                method: 'GET',
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });

            let records = await results.json();
            listTodos(records);
            let text = JSON.stringify(records)


    html +=  `   <div id="editContainer" class="input-group">
                <div class="input-group-prepend ">
                    <span class="input-group-text h-100">Todo</span>
                </div>
                <textarea name="task"
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Edit a todo item... ${text}"></textarea>
                <div class="input-group-append">
                    <button class="btn btn-outline-info h-100" type="submit" id="button-addon2">Edit</button>
                </div>
                <div class="input-group-append">
                    <button class="btn btn-outline-danger h-100" type="button" id="button-addon2">Cancel</button>
                </div>
            </div>
`
        }
        ul.innerHTML = html;

    }
    catch (error) {
        console.log(error);
    }
})

const listTodos = (records) => {
    //retrieve ul dom element from html 

    let html = "";



    //loop through each of db records
    records.data.forEach(todoItem => {

        // create li tags with db todo items
        html += `
        <li>
            <div class="row pr-3">
                <div class="col-10">
                    ${todoItem.description}
                    
                </div>
                <div class="col-2 text-right pr-2">
                    <button class="button btn">
                        <span>
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                    </button>
                    <button class="button btn">
                        <span>
                            <i class="fas fa-trash" id="${todoItem.id}"></i>
                        </span>
                    </button>
                </div>
            </div>
        </li>
        
        `

    })

    //append chunk of code to ul.innerHTML

    ul.innerHTML = html;
}
//find our submit button
let submitButton = document.querySelector('#button-addon2');

//attach event listenter to it and listen for  a click
submitButton.addEventListener('click', async (e) => {

    //find the text input html element out of dom and grab the value
    let inputDescription = document.querySelector('#descriptionInput');

    // make a fetch call to /todos/new with description in header 

    let results = await fetch('/todos/new', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
            description: inputDescription.value
        })
    });

    //receive all of the posts in db, including the new post
    let records = await results.json(); // {data: [{}, {}]}

    listTodos(records);

})



// make a fetch call to server side route handler

const setup = async () => {

    let results = await fetch('/todos');
    let records = await results.json();

    console.log(records);

    listTodos(records)

}


setup();


