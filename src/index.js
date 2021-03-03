let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let form = document.querySelector("form")
form.addEventListener('submit', e => createNewToy(e))
const toyURL = "http://localhost:3000/toys"

function createNewToy(e){
  e.preventDefault();
  let form = document.querySelector("form")
  const name = form.querySelector("input")
  const imgs = form.querySelectorAll("input")
  
  let newToy = {name: name.value, image: imgs[1].value}
  fetch(toyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json" 
    },
    body: JSON.stringify(newToy)
  })
  .then(r => r.json())
  .then(toy => {
    const newToy = addToyToContainer(toy, createOneToy())
    document.getElementById("toy-collection").append(newToy)
  })
}

function getToys(){
  fetch(toyURL)
  .then(r => r.json())
  .then(toys => {
    toys.forEach(toy => {
      const newToy = addToyToContainer(toy, createOneToy())
      document.getElementById("toy-collection").append(newToy)
    })}
    )
  }

function addToyToContainer (t, c){
  // c.id = t.id
  c.querySelector("h2").textContent = t.name
  c.querySelector("img").src = t.image
  c.querySelector("p").textContent = t.likes
  return c
}

function createOneToy(){
  const div = document.createElement("div")
  div.className = "card"
  const name = document.createElement("h2")
  const img = document.createElement("img")
  img.className = "toy-avatar"
  const p = document.createElement("p")
  const btn = document.createElement("button")
  btn.className = "like-btn"
  btn.textContent = "Like <3"
  div.append(name, img, p ,btn)
  console.log(div)
  return div
}


getToys();
