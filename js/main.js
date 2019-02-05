console.log('Starting up');
function init() {
    var projects = gProjs;
    renderProjCards(projects)
    // renderProj(projects)
}
function renderProjCards(projects) {
    console.log(projects);
    var strHTML = ``;
    projects.map(function (proj) {
        strHTML += `<div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-id="${proj.id}" data-toggle="modal" href="#portfolioModal" onclick="renderProj(this)">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fa fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="img/portfolio/${proj.id}-thumbnail.jpg" alt="">
            </a>
            <div class="portfolio-caption">
              <h4>${proj.name}</h4>
              <p class="text-muted">${proj.title}</p>
            </div>
          </div>`;
    })
    var projCard = document.querySelector('.proj-card');
    projCard.innerHTML = strHTML;
}

function renderProj(clickedProj) {
    var currProject = gProjs.find(function (proj) {
        return proj.id === clickedProj.dataset.id
    })
    console.log('currPorject:', currProject);
    $('.modal-project-name').html(currProject.title);
    $('.modal-item-intro').html(currProject.intro);
    $('.modal-img').attr("src", `img/portfolio/${currProject.id}.jpg`);
    $('.modal-project-desc').html(currProject.desc);
    $('.modal-proj-link').attr("href", `projs/${currProject.id}/index.html`);
    $('.modal-proj-date').html(currProject.date);
    $('.modal-proj-client').html(currProject.client);
    $('.modal-proj-cat').html(currProject.category);
}

function onContactButtonSubmit(ev) {
    ev.preventDefault();
    var email = $('#email').val()
    var subject = $('#subject').val()
    var message = $('#message').val()
    console.log(email);
    var strHTML = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${message}&bcc=dvirkap@gmail.com`;
   
    if (email && subject && message) {
        window.location.href = strHTML;
    } else {
        $('.alert-danger').show()
        $('.alert-danger').html('You must fill out all fields before sending the form')
    }
    // })
    // setTimeout(function () {
        
    // }, 500)

    // $('.submit-button').attr("onclick", strHTML);
}

var gProjs = [
    {
        id: "first",
        name: "The bomb Squad",
        title: "Mine sweeper with a twist",
        intro: "this is a fun, women centered designed game",
        desc: "lorem ",
        date: "Feb 2022",
        client: "Farm house",
        category: "Free love",
        url: "projs/first",
        publishedAt: 1448693940000,
        labels: ["cows", "sheeps"]
    },
    {
        id: "second",
        name: "Guess who",
        title: "A fortune teller guessing game",
        intro: "Just try me, and i will find out whom your`e thinking about",
        desc: "lorem ipsum",
        date: "Feb 2022",
        client: "Farm house",
        category: "Free love",
        url: "projs/second",
        publishedAt: 1448693940567,
        labels: ["birds", "camels"]
    },
    {
        id: "third",
        name: "The amazing bookstore",
        title: "A bookstore manager interface",
        intro: "A bookstore manager interface with inner input editing options",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        date: "Feb 2022",
        client: "Farm house",
        category: "Free love",
        url: "projs/third",
        publishedAt: 1448693940345,
        labels: ["bunnies", "rabitts"]
    },
]