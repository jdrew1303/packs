function createElement (tag, className, parent) {
  var element = document.createElement(tag)
  element.setAttribute('class', className)
  parent.appendChild(element)
  return element
}

function get (url, callback) {
  var request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.onload = function () {
    callback(request.responseText)
  }
  request.send()
}

function hideElement () {
  this.style.display = 'none'
}

function showElement () {
  this.style.display = 'initial'
}

var container = createElement('div', 'container', document.body)

get('job_ids.json', function (jobs) {
  var lightbox = createElement('div', 'lightbox', document.body)
  lightbox.addEventListener('click', hideElement, false)
  var fullscreen = createElement('img', 'fullscreen', lightbox)
  
  JSON.parse(jobs).map(function (job) {
    var ul = createElement('ul', 'screens', container)
    
    get(job, function (res) {
      var screenshots = JSON.parse(res).screenshots
      screenshots.map(function (shot) {
        var li = createElement('li', 'screen', ul)
        li.onclick = function () {
          fullscreen.setAttribute('src', shot.image_url)
          showElement.bind(lightbox)()
        }

        var img = createElement('img', 'screen', li)
          .setAttribute('src', shot.thumb_url)
      })
    })
  })
})