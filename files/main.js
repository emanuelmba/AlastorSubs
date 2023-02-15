//General Utilities
const mail = `info@editorial-alastor.com.ar`
const year = new Date().getFullYear()
const nav = `<div class="navbar-mobile">
    <h1 class="logo">
      <a href="index.html"><span class="text-highlight">
      <i class="fas fa-clapperboard"></i> Alastor</span>Subs</a></h1>
    <div id="bars" class="navbar-bars">
      <a href="#" onclick="return false"><i class="fas fa-bars"></i></a>
    </div>
  </div>
  <div id="drop-menu" class="navbar toggle-menu">
    <ul>
      <li><a href="index.html#home">Home</a></li>
      <li><a href="index.html#services">Servicios</a></li>
      <li><a href="portfolio.html">Portfolio</a></li><li><a href="movies.html">Películas</a></li>
      <li><a href="index.html#contact">Contacto</a></li>
    </ul>
  </div>`
const footer = `<h4>&copy; ${year} Editorial Alastor | 
  <a href="mailto:${mail}">${mail}</a></h4>`
document.getElementById('navbar').innerHTML = nav
document.getElementById('footer').innerHTML = footer

//Active Classes and Pages
const pageTitle = document.title.substring(15)
let noJson, movieList, personList, isDir, form = false
switch (pageTitle) {
  case '':
    document.getElementById('navbar').innerHTML = nav.replace(
      `href="portfolio.html">Portfolio</a></li><li><a href="movies.html"`,
      `href="index.html#portfolio">Portfolio</a></li><li><a href="index.html#movies"`
    )
    noJson = true
    form = true
    break
  case 'Portfolio':
    document.getElementById('navbar').innerHTML = nav.replace(
      'href="portfolio.html"', 'href="#" class="active"'
    )
    noJson = true
    break
  case 'Películas':
    document.getElementById('navbar').innerHTML = nav.replace(
      'href="movies.html"', 'href="#" class="active"'
    )
    movieList = true
    break
  case 'Actores':
    personList = true
    break
  case 'Directores':
    personList = true
    isDir = true
    break
  default: //do nothing!
}

//Mobile Dropdown Menu Toggle
document.getElementById('bars').addEventListener('click', function () {
  document.getElementById('drop-menu').classList.toggle('toggle-menu')
})
document.getElementById('drop-menu').addEventListener('click', function () {
  document.getElementById('drop-menu').classList.add('toggle-menu')
})

//Fetch JSON for Movies
if (!noJson) {
fetch('files/movies.json')
  .then((response) => response.json())
  .then((movies) => {

    //General Utilities
    const fullTitle = function(title, year) {
      return title + ' (' + year + ')'
    }
    const fullName = function(first, last) {
      return first + ' ' + last
    }
    const poster = function(link, title, year) {
      let img = document.createElement('img')
      img.src = `imgs/${link}.jpg`
      img.alt = fullTitle(title, year)
      img.title = fullTitle(title, year)
      return img
    }
    const figure = function(first, last) {
      let img = document.createElement('img')
      img.src = `imgs/ad-${last.toLowerCase()}.jpg`
      img.alt = fullName(first, last)
      img.title = fullName(first, last)
      return img
    }
    const cat = document.getElementById('catalogue')
    const sortNn = function() {
      let div1 = document.createElement('div')
      div1.className = "m-column filler"
      let div2 = document.createElement('div')
      div2.className = "m-column-img"
      div1.appendChild(div2)
      for (let i = 1; i <= 5; i++) {
        cat.appendChild(div1.cloneNode(true))
      }
    }

    //Create Movie List
    if (movieList) {
      const sel = document.getElementById('sort')
      sel.addEventListener('change', function() {
        switch (sel.value) {
          case 'date':
            sortDate()
            break
          case 'title':
            sortTitle()
            break
          case 'yearA':
            sortYearA()
            break
          case 'yearD':
            sortYearD()
            break
          default:
            break
        }
      })
      const sortDate = function() {
        movies.catalogue.sort((a, b) => (a.id > b.id ? -1 : 1))
        createCat()
      }
      const sortTitle = function() {
        movies.catalogue.sort((a, b) => (a.title > b.title ? 1 : -1))
        createCat()
      }
      const sortYearA = function() {
        movies.catalogue.sort((a, b) => (a.year > b.year ? 1 : -1))
        createCat()
      }
      const sortYearD = function() {
        movies.catalogue.sort((a, b) => (a.year > b.year ? -1 : 1))
        createCat()
      }
      sortDate()
      function createCat() {
        cat.innerHTML = ''
        for (mov of movies.catalogue) {
          const item = function() {
            let div1 = document.createElement('div')
            div1.className = "m-column"
            let div2 = document.createElement('div')
            div2.className = "m-column-img"
            let a = document.createElement('a')
            a.href = mov.link + `.html`
            a.appendChild(poster(mov.link, mov.title, mov.year))
            div2.appendChild(a)
            div1.appendChild(div2)
            return div1
          }
          cat.appendChild(item())
        }
        sortNn()
      }
    }

    //Create Movie Pages
    const moviePage = document.getElementById('movie')
    if (moviePage != null) {
      for (mov of movies.catalogue) {
        let title = fullTitle(mov.title, mov.year)
        if (title == pageTitle) {
          const header = document.getElementById('header-img')
          header.style.background = `url('screens/${mov.link}${mov.header}.jpg')`
          const calif = function() {
            let stars = ``
            for (let i = 0; i < 5; i++) {
              if (mov.stars >= 2) {
                mov.stars -= 2
                stars += `<i class=\"fas fa-star\"></i>`
              } else if (mov.stars >= 1) {
                mov.stars -= 1
                stars += `<i class=\"fas fa-star-half-alt\"></i>`
              } else {
                stars += `<i class=\"far fa-star\"></i>`
              }
            }
            return stars
          }
          const info = function() {
            let inf =
              `<div class="info">
                <h2>${title}</h2>
                <div class="specs">
                  <p><span class="text-shade">Categorías: &nbsp;</span>${mov.tags}</p>
                  <p><span class="text-shade">Director: &nbsp;</span>${mov.director}</p>
                  <p><span class="text-shade">Actores: &nbsp;</span>${mov.actors}</p>
                  <p><span class="text-shade">Sinopsis: &nbsp;</span>${mov.sinopsis}</p>
                  <p><span class="text-shade">Calificación: &nbsp;</span>
                    <span class="text-highlight">${calif()}</span></p>
                  <p><span class="text-shade">Comentario: &nbsp;</span>${mov.version}</p>
                </div>
                <a class="btn btn-dark section-btn mb" href="subs/${mov.link}.srt" target="_blank">
                <i class="fas fa-file-arrow-down"></i> &nbsp;Descargar subs</a>
              </div>`
            return inf
          }
          const media = function() {
            let med =
              `<iframe src="https://www.youtube.com/embed/${mov.trailer}" allowfullscreen></iframe>`
            for (let i = 1; i < 8; i++) {
              med +=
                `<a href="#" onclick="return false" class="darkbox">
                <img src="./screens/${mov.link}${i}.jpg" alt="Screenshot" /></a>`
            }
            return med
          }
          const related = function() {
            let rels = []
            let relsFiltered = []
            for (movie of movies.catalogue) {
              if (mov.actors.substring(0,10) == movie.actors.substring(0,10) && mov.id != movie.id) {
                  rels.push(movie.link)
              }
            }
            if (rels.length < 3) {
              for (movie of movies.catalogue) {
                if (mov.director == movie.director && mov.id != movie.id) {
                    rels.push(movie.link)
                    relsFiltered = [...new Set(rels)]
                }
              }
            }
            if (relsFiltered.length < 3) {
              for (movie of movies.catalogue) {
                if (mov.tags == movie.tags && mov.id != movie.id) {
                    rels.push(movie.link)
                    relsFiltered = [...new Set(rels)]
                }
              }
            }
            if (relsFiltered.length < 3) {
              for (movie of movies.catalogue) {
                if (relsFiltered.length < 3 && mov.id != movie.id) {
                  rels.push(movie.link)
                  relsFiltered = [...new Set(rels)]
                }
              }
            }
            let rel = `<div class="related darken">
                <h4>Títulos relacionados</h4>
                <div class="rels">
                  <a href="${relsFiltered[0]}.html">
                    <img src="./imgs/${relsFiltered[0]}.jpg" alt="Poster" /></a>
                  <a href="${relsFiltered[1]}.html">
                    <img src="./imgs/${relsFiltered[1]}.jpg" alt="Poster" /></a>
                  <a href="${relsFiltered[2]}.html">
                    <img src="./imgs/${relsFiltered[2]}.jpg" alt="Poster" /></a>
                </div>
              </div>`
            return rel
          }
          const btn = function() {
            let btn = `<a href="movies.html" class="btn page-btn btn-light">
              <i class="fas fa-video"></i> &nbsp;Películas</a>`
            return btn
          }
          document.getElementById('poster').appendChild(poster(mov.link, mov.title, mov.year))
          document.getElementById('info').innerHTML = info()
          document.getElementById('media').innerHTML = media()
          document.getElementById('related').innerHTML = related()
          document.getElementById('related2').innerHTML = related()
          document.getElementById('btn').innerHTML = btn()
          runDbox()
          break
        }
      }
    }

    //Create People List
    if(personList) {
      const sortName = function() {
        movies.people.sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
        createCat()
      }
      sortName()
      function createCat() {
        for (mov of movies.people) {
          const item = function () {
            let div1 = document.createElement('div')
            div1.className = "m-column"
            let div2 = document.createElement('div')
            div2.className = "m-column-img"
            let a = document.createElement('a')
            a.href = `ad-${(mov.lastName).toLowerCase()}.html`
            let h4 = document.createElement('h4')
            h4.textContent = fullName(mov.firstName, mov.lastName)
            a.appendChild(figure(mov.firstName, mov.lastName))
            a.appendChild(h4)
            div2.appendChild(a)
            div1.appendChild(div2)
            return div1
          }
          if (!isDir && !mov.dir) {
            cat.appendChild(item())
          } else if (isDir && mov.dir) {
            cat.appendChild(item())
          }
        }
        sortNn()
      }
    }

    //Create People Pages
    const peoplePage = document.getElementById('people')
    if (peoplePage != null) {
      for (mov of movies.people) {
        let name = fullName(mov.firstName, mov.lastName)
        if (name == pageTitle) {
          const header = document.getElementById('header-img')
          header.style.background = `url('screens/${(mov.lastName).toLowerCase()}${mov.header}.jpg')`
          const info = function() {
            let inf = `<div class="info">
                <h2>${name}</h2>
                <h4>${mov.bio}</h4>
                <div class="specs">
                  <p>FILMOGRAFÍA RECOMENDADA</p>`
                for (let i in mov.filmo) {
                  if (mov.filmo[i].substr(0, 2) != '<a') {
                    inf += '<p>• ' +
                      mov.filmo[i].substr(0, 4) + ' - ' +
                      mov.filmo[i].substr(5) + '</p>'
                  } else {
                    inf += `<p>• ${mov.filmo[i]}</p>`
                  }
                }
                inf += `</div></div>`
            return inf
          }
          const media = function() {
            let med = ``
            for (let i = 1; i < 5; i++) {
              med +=
                `<a href="#" onclick="return false" class="darkbox">
                <img src="./screens/${(mov.lastName).toLowerCase()}${i}.jpg" alt="Screenshot" /></a>`
            }
            return med
          }
          const related = function() {
            let rels = []
            let relsFiltered = []
            for (movie of movies.catalogue) {
              if (movie.actors.includes(name)) {
                  rels.push(movie.link)
              }
            }
            if (rels.length < 3) {
              for (movie of movies.catalogue) {
                if (name == movie.director) {
                    rels.push(movie.link)
                    relsFiltered = [...new Set(rels)]
                }
              }
            }
            if (relsFiltered.length < 3) {
              for (movie of movies.catalogue) {
                if (relsFiltered.length < 3) {
                  rels.push(movie.link)
                  relsFiltered = [...new Set(rels)]
                }
              }
            }
            let rel = `<div class="related darken">
                <h4>Títulos relacionados</h4>
                <div class="rels">
                  <a href="${relsFiltered[0]}.html">
                    <img src="./imgs/${relsFiltered[0]}.jpg" alt="Poster" /></a>
                  <a href="${relsFiltered[1]}.html">
                    <img src="./imgs/${relsFiltered[1]}.jpg" alt="Poster" /></a>
                  <a href="${relsFiltered[2]}.html">
                    <img src="./imgs/${relsFiltered[2]}.jpg" alt="Poster" /></a>
                </div>
              </div>`
            return rel
          }
          const btn = function() {
            let btn = ''
            if (mov.dir) {
              btn = `<a href="p-directors.html" class="btn page-btn btn-light">
                <i class="fas fa-clapperboard"></i> &nbsp;Directores</a>`
              } else {
                btn = `<a href="p-actors.html" class="btn page-btn btn-light">
                  <i class="fas fa-masks-theater"></i> &nbsp;Actores</a>`
                }
            return btn
          }
          document.getElementById('poster').appendChild(figure(mov.firstName, mov.lastName))
          document.getElementById('info').innerHTML = info()
          document.getElementById('media').innerHTML = media()
          document.getElementById('related').innerHTML = related()
          document.getElementById('related2').innerHTML = related()
          document.getElementById('btn').innerHTML = btn()
          runDbox()
          break
        }
      }
    }
  })
}

//Lightbox
const runDbox = function() {
  const dbox = document.getElementById('dbox')
  if (dbox != null) {
    const db = `<a id="darkbox" href="#" onclick="return false">
      <div id="screen" class="screen hide"></div></a>
      <div id="dbox-gallery" class="dbox-gallery hide">
        <div id="dbox-image"></div>
        <div id="close" class="close">
          <a href="#" onclick="return false"><i class="fas fa-circle-xmark"></i></a></div>
      </div>
      <div id="arrows" class="arrows hide">
        <div>
          <a href="#" onclick="return false" class="cursor">
          <i class="fas fa-chevron-left fa-3x"></i></a></div>
        <div>
          <a href="#" onclick="return false" class="cursor">
          <i class="fas fa-chevron-right fa-3x"></i></a></div>
      </div>`
    dbox.innerHTML = db
    const darkbox = document.getElementById('darkbox')
    const thumbs = document.getElementsByClassName('darkbox')
    const screen = document.getElementById('screen')
    const dboxGallery = document.getElementById('dbox-gallery')
    const dboxImage = document.getElementById('dbox-image')
    const arrows = document.getElementById('arrows')
    const close = document.getElementById('close')
    const cursors = document.getElementsByClassName('cursor')
    const thumbsId = []

    const toggleHide = function() {
      screen.classList.toggle('hide')
      arrows.classList.toggle('hide')
      dboxGallery.classList.toggle('hide')
    }

    for (let i of thumbs) {
      let j = i.innerHTML
      thumbsId.push(j)
      i.addEventListener('click', function() {
        toggleHide()
        let clicked = this.innerHTML
        dboxImage.innerHTML = clicked
      })
    }

    cursors[0].addEventListener('click', function() {
      let active = dboxImage.innerHTML
      let j = thumbsId.indexOf(active)
      if (active == thumbsId[0]) {
        let i = thumbsId.length - 1
        dboxImage.innerHTML = thumbsId[i]
      } else {
        let i = j - 1
        dboxImage.innerHTML = thumbsId[i]
      }
    })

    cursors[1].addEventListener('click', function() {
      let active = dboxImage.innerHTML
      let j = thumbsId.indexOf(active)
      let i = thumbsId.length - 1
      if (active == thumbsId[i]) {
        i = 0
        dboxImage.innerHTML = thumbsId[i]
      } else {
        let i = j + 1
        dboxImage.innerHTML = thumbsId[i]
      }
    })

    darkbox.addEventListener('click', function() {
      toggleHide()
    })

    close.addEventListener('click', function() {
      toggleHide()
    })
  }
}
runDbox()
