(() => {
  const data = window.projectData;
  const grid = document.querySelector("#video-grid");
  const filters = document.querySelector("#filters");
  const dialog = document.querySelector("#video-dialog");
  const dialogVideo = document.querySelector("#dialog-video");
  let selectedCategory = "All";

  document.title = `${data.title} | Supplementary Videos`;
  document.querySelector("#project-title").textContent = data.title;
  document.querySelector("#project-summary").textContent = data.summary;
  document.querySelector("#project-authors").textContent = data.authors;
  document.querySelector("#footer-project").textContent = data.title;
  document.querySelector(".project-mark").textContent = data.shortName;
  document.querySelector("#citation-text").textContent = data.citation;

  setLink("#paper-link", data.paperUrl);
  setLink("#intro-paper-link", data.paperUrl);
  setLink("#code-link", data.codeUrl);

  function setLink(selector, url) {
    if (!url) return;
    const link = document.querySelector(selector);
    link.href = url;
    link.hidden = false;
  }

  function renderFilters() {
    const categories = ["All", ...new Set(data.videos.map((video) => video.category))];
    filters.replaceChildren(...categories.map((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = category;
      button.className = category === selectedCategory ? "active" : "";
      button.addEventListener("click", () => {
        selectedCategory = category;
        renderFilters();
        renderVideos();
      });
      return button;
    }));
  }

  function renderVideos() {
    const visibleVideos = data.videos.filter((video) => selectedCategory === "All" || video.category === selectedCategory);
    if (!visibleVideos.length) {
      grid.innerHTML = '<p class="empty-state">No videos are listed yet. Add result files to <code>videos/</code> and their entries to <code>assets/js/videos.js</code>.</p>';
      return;
    }
    grid.replaceChildren(...visibleVideos.map(createCard));
  }

  function createCard(video) {
    const article = document.createElement("article");
    article.className = "video-card";
    const player = document.createElement("video");
    player.src = video.src;
    player.preload = "metadata";
    player.muted = true;
    player.playsInline = true;
    if (video.poster) player.poster = video.poster;
    player.setAttribute("aria-label", `Play ${video.title}`);
    const play = document.createElement("button");
    play.type = "button";
    play.className = "play-button";
    play.setAttribute("aria-label", `Open ${video.title}`);
    play.innerHTML = "<span aria-hidden=\"true\">&#9654;</span>";
    play.addEventListener("click", () => openVideo(video));
    const meta = document.createElement("div");
    meta.className = "video-meta";
    const category = document.createElement("p");
    category.className = "video-category";
    category.textContent = video.category;
    const title = document.createElement("h3");
    title.textContent = video.title;
    const description = document.createElement("p");
    description.textContent = video.description;
    meta.append(category, title, description);
    article.append(player, play, meta);
    return article;
  }

  function openVideo(video) {
    dialogVideo.src = video.src;
    dialogVideo.poster = video.poster || "";
    document.querySelector("#dialog-title").textContent = video.title;
    document.querySelector("#dialog-description").textContent = video.description;
    dialog.showModal();
    dialogVideo.play().catch(() => {});
  }

  document.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    dialogVideo.pause();
    dialogVideo.removeAttribute("src");
    dialogVideo.load();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  renderFilters();
  renderVideos();
})();
