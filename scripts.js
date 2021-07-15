let table = document.querySelector('#data');
let addNew = document.querySelector('#addNew');
// let saveData = document.querySelector('#saveData');
let number = 1;

// addNew.addEventListener('click', function () {    
function addRow() {
    let name = document.querySelector('#fullname').value
    let address= document.querySelector('#address').value

    var newRow = table.insertRow(table.rows.length);
    newRow.setAttribute("id","row1");
        
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
           
    cell2.innerHTML = `<input type="text" id="newName">`;
    cell3.innerHTML = `<input type="text" id="newAddress">`;       

};

// saveData.addEventListener('click', function() {

function saveData() {
    number++
    let name = document.querySelector('#newName').value
    let address= document.querySelector('#newAddress').value

    var newRow = table.insertRow(table.rows.length);        
        
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    cell1.innerHTML = number;
    cell2.innerHTML = name;
    cell3.innerHTML = address;    
    
    id = document.querySelector('#row1');
    id.remove();

};

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
