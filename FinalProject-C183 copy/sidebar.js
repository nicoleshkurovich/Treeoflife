function openSidebarFromFile(filePath) {
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("sidebar-content");

  if (!filePath) {
    content.innerHTML = "<em>No archive file assigned.</em>";
    sidebar.classList.add("open");
    return;
  }

  fetch(filePath)
    .then(res => res.text())
    .then(html => {
      content.innerHTML = html;
      sidebar.classList.add("open");
    })
    .catch(err => {
      content.innerHTML = "<em>Could not load file.</em>";
      sidebar.classList.add("open");
    });
}

document.getElementById("closeSidebar").onclick = () => {
  document.getElementById("sidebar").classList.remove("open");
};
