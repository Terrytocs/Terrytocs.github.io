("use strict");

class Nav {
  constructor(id) {
    this.setup(id);
    this.setupHambar();
  }
  setup(id) {
    const nav = document.getElementById(id);
    if (id === "_home_nav") {
      nav.innerHTML = `
      <button id="_hambar" class="hambar">
      <div ></div>
      <div ></div>
      <div ></div>
      </button>
        <ul>
            <li><a href="./" data-active="">Home</a></li>
            <li><a href="./projects">Projects</a></li>
            <li><a href="./games">Games</a></li>
            <li><a href="./blog">Blog</a></li>
            <li><a href="./saq">SAQ</a></li>
        </ul>
    `;
      return null;
    }
    const ids = ["_home_link", "_projects_link", "_games_link", "_blog_link", "_saq_link"];

    nav.innerHTML = `
    <button id="_hambar" class="hambar">
    <div ></div>
      <div ></div>
      <div ></div>
    </button>
        <ul>
            <li><a id="${ids[0]}" href="../">Home</a></li>
            <li><a id="${ids[1]}" href="../projects">Projects</a></li>
            <li><a id="${ids[2]}" href="../games">Games</a></li>
            <li><a id="${ids[3]}" href="../blog">Blog</a></li>
            <li><a id="${ids[4]}" href="../saq">SAQ</a></li>
        </ul>
    `;

    for (let i = 0; i < ids.length; ++i) {
      if (ids[i].split("_")[1] === id.split("_")[1]) {
        const activePage = document.getElementById(ids[i]);
        activePage.setAttribute("data-active", "");
      }
    }
    return null;
  }
  setupHambar() {
    var hambar = document.getElementById("_hambar");
    hambar.addEventListener("click", function (e) {
      this.classList.toggle("active");
    });
  }
}
