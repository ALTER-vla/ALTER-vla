(() => {
  const grid = document.querySelector("#video-grid");
  const dialog = document.querySelector("#video-dialog");
  const dialogVideo = document.querySelector("#dialog-video");
  const dialogTitle = document.querySelector("#dialog-title");

  function createCard(video, index) {
    const article = document.createElement("article");
    article.className = "video-card";
    if (video.src) {
      const player = document.createElement("video");
      player.src = video.src;
      player.preload = "metadata";
      player.muted = true;
      player.playsInline = true;
      if (video.poster) player.poster = video.poster;
      article.append(player);
      const play = document.createElement("button");
      play.type = "button";
      play.className = "play-button";
      play.setAttribute("aria-label", `Play ${video.title}`);
      play.innerHTML = "<span aria-hidden=\"true\">&#9654;</span>";
      play.addEventListener("click", () => openVideo(video));
      article.append(play);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "placeholder";
      placeholder.setAttribute("aria-label", `Video placeholder ${index + 1}`);
      placeholder.innerHTML = "<span>Video</span>";
      article.append(placeholder);
    }
    const caption = document.createElement("h3");
    caption.textContent = video.title;
    article.append(caption);
    return article;
  }

  function openVideo(video) {
    dialogVideo.src = video.src;
    dialogVideo.poster = video.poster || "";
    dialogTitle.textContent = video.title;
    dialog.showModal();
    dialogVideo.play().catch(() => {});
  }

  document.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    dialogVideo.pause();
    dialogVideo.removeAttribute("src");
    dialogVideo.load();
  });
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  grid.replaceChildren(...window.projectData.videos.slice(0, 6).map(createCard));
})();
