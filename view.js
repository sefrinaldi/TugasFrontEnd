let pageConfig = {
  showData: 4,
  currentPage: 1
}

let filteredUsers = []

let users = []
let photoUsers = []
let albumUsers = []
let newDatas = []

const getUsers = () => {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then(response => response.json())
    .then(json => {
      photoUsers = json.map(photoUser => {
        return {
          photoId: photoUser.id,
          albumId: photoUser.albumId,
          title: photoUser.title,
          url: photoUser.url,
          thumbnailUrl: photoUser.thumbnailUrl
        }
      })
    })
    .catch(err => {
      console.log(err);
    })
    .then(
      setTimeout(() => {
        console.log(photoUsers);
      }, 2000)
    )

  fetch("https://jsonplaceholder.typicode.com/albums")
    .then(response => response.json())
    .then(json => {
      albumUsers = json.map(albumUser => {
        return {
          albumId: albumUser.id,
          userId: albumUser.userId,
          title: albumUser.title
        }
      })
    })
    .catch(err => {
      console.log(err);
    })
    .then(
      setTimeout(() => {
        console.log(photoUsers);
      }, 2000)
    )

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(json => {
      users = json.map(user => {
        return {
          userId: user.id,
          username: user.name
        }
      })
    })
    .catch(err => {
      console.log(err);
    })
    .then(
      setTimeout(() => {
        console.log(photoUsers);
      }, 2000)
    )
    .then(
      setTimeout(() => {
        joinData()
        generateTable()
      }, 2000)
    )

}

const joinData = () => {
  for (let i = 0; i < photoUsers.length - 4980; i++) {
    const photosUsers = photoUsers[i];

    const albumById = albumUsers.filter(albumUser => {
      return albumUser.albumId === photosUsers.albumId
    })

    const userById = users.filter(user => {
      return user.userId === albumById[0].userId
    })

    newDatas.push({
      id: photosUsers.photoId,
      photoName: photosUsers.title,
      albumName: albumById[0].title,
      username: userById[0].username,
      url: photosUsers.url,
      thumbnail: photosUsers.thumbnailUrl
    })

    console.log(newDatas);
  }
}

const generateTable = (data = newDatas) => {
  let tbody = document.querySelector("table > tbody")
  let rows = ""

  let startIndex = (pageConfig.currentPage - 1) * pageConfig.showData
  let endIndex = startIndex + pageConfig.showData

  // console.log(`${startIndex} dan ${endIndex}`);

  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const user = data[i];

    rows += `
      <tr>
        <td align = "center">${user.id}</td>
        <td>${user.photoName}</td>
        <td>${user.albumName}</td>
        <td>${user.username}</td>
        <td>        
          <img src="${user.thumbnail}" onclick="imgView('${user.url}')" alt="Forest"/>
        </td>
      </tr>
    `
  }

  tbody.innerHTML = rows
  generatePagination(newDatas)
}

const generatePagination = (data) => {
  const pagination = document.querySelector("div.pagination")

  let buttonPage = ""
  let totalPage = Math.ceil(data.length / pageConfig.showData)

  if (pageConfig.currentPage != 1)
    buttonPage += `<span class="page prev">Prev</span>`

  for (let page = 1; page <= totalPage; page++) {
    let className = "page"

    if (pageConfig.currentPage == page) className = "page active"

    buttonPage += `<span class="${className}">${page}</span>`
    // console.log(page);
  }

  if (pageConfig.currentPage != totalPage)
    buttonPage += `<span class="page next">Next</span>`

  pagination.innerHTML = buttonPage
  mapEvent()

}

const goToPage = e => {

  if (e.classList.contains("prev"))
        pageConfig.currentPage--
    else if (e.classList.contains("next"))
        pageConfig.currentPage++
    else
        pageConfig.currentPage = e.innerText

  generateTable()
}

const mapEvent = () => {
  document.querySelectorAll("span.page").forEach(el => {
    el.addEventListener('click', () => goToPage(el))    
  })
}

// Get the modal
let modal = document.querySelector(".modal")

let modalImg = document.querySelector(".modalImg")

// open the modal
let imgView = (url) => {
  modalImg.src = url;
  modal.style.display = "block";
  console.log(url);
}

// When the user clicks on <span> (x), close the modal
let modalClose = () => {
  modal.style.display = "none";  
}

const __init = () => {
  getUsers()
  // generateTable()
  // mapEventAddNew()
  // resetSearch()
}
__init()


