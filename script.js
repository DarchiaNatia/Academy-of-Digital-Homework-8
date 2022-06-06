// fetch method

let postsWrapper = document.getElementById('postsWrapper');
let overlay = document.getElementById('overlay');
let closeBtn = document.getElementById('closeBtn');
let postContent = document.getElementById('postContent');

fetch ('https://jsonplaceholder.typicode.com/posts', {
    method: 'GET'
})

.then(function(response){
    if (response.status != 200) {
        throw response.status
    }
    return response.json();

})

.then(function(responseData){
    responseData.forEach(user => {
        createPost(user);
    });
})

.catch(function(response) {
    if (response == 404) {
        let errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Server Error';
        postsWrapper.appendChild(errorMessage);
    } else {
        let errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Ooops, Page Not Found';
        postsWrapper.appendChild(errorMessage);
    }
    console.log(x);
})

function createPost(post) {
    let postDiv = document.createElement('div');
    postDiv.classList.add('post-div');
    postDiv.setAttribute('data-id', post.id);

    let h3Tag = document.createElement('h3');
    h3Tag.classList.add('post-h3Tag')
    h3Tag.textContent = post.id;

    let h2Tag = document.createElement('h2');
    h2Tag.classList.add('post-title')
    h2Tag.textContent = post.title;

    let postContent = document.createElement('p');
    postContent.classList.add('post-body')
    postContent.textContent = post.body;

    postDiv.appendChild(h3Tag);
    postDiv.appendChild(h2Tag);
    postDiv.appendChild(postContent);

    postDiv.addEventListener('click', function(event){
        let id = this.getAttribute('data-id');
        openOverlay(id);
    })

    postsWrapper.appendChild(postDiv);
}

function ajax(url,callback) {
    fetch (url, {
        method: 'GET'
    })
    .then(function(response){
        if (response.status != 200) {
            throw response.status
        }
        return response.json();
    })
    .then(function(responseData){
        callback(responseData);
    })
}

function openOverlay(id) {
    overlay.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url, function(data) {
        overlayFunction(data);
        console.log(data);
    });
}
closeBtn.addEventListener('click', function(){
    overlay.classList.remove('active');
    postContent.innerHTML = '';
})

function overlayFunction(item) {
    let overlayH3 = document.createElement('h3');
    overlayH3.classList.add('overlay-h3');
    overlayH3.textContent = item.id;

    let overlayH2 = document.createElement('h2');
    overlayH2.classList.add('overlay-h2');
    overlayH2.textContent = item.title

    let descriptionPost = document.createElement('p');
    descriptionPost.classList.add('overlay-description');
    descriptionPost.innerText = item.body;

    postContent.appendChild(overlayH3);
    postContent.appendChild(overlayH2);
    postContent.appendChild(descriptionPost);

}