("use strict");

class BibleVerse {
  constructor(bookID, chapterID, verseID, textID) {
    const book_container = document.getElementById(bookID);
    const chapter_container = document.getElementById(chapterID);
    const verse_container = document.getElementById(verseID);
    const text_container = document.getElementById(textID);
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://proxy.corsfix.com/?https://bible-api.com/data/kjv/random",
      true
    );
    xhr.responseType = "text";
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText).random_verse;
        book_container.innerText = response.book;
        chapter_container.innerText = response.chapter;
        verse_container.innerText = response.verse;
        text_container.innerHTML = `${response.text}<sub class="courtesy-sub">Courtesy of <a class="link" href="bible-api.com">bible-api.com</a></sub>`;
      } else {
        xhr.send();
      }
    });

    xhr.send();
  }
}

class AnimeNews {
  constructor(imgId, titleId, altTitleId, ratingId, synopsisId) {
    const anime_image = document.getElementById(imgId);
    const anime_title = document.getElementById(titleId);
    const anime_alt_title = document.getElementById(altTitleId);
    const anime_rating = document.getElementById(ratingId);
    const anime_synopsis = document.getElementById(synopsisId);
    const anime_list_xhr = new XMLHttpRequest();
    anime_list_xhr.open(
      "GET",
      "https://proxy.corsfix.com/?https://cdn.animenewsnetwork.com/encyclopedia/reports.xml?type=anime&id=155&nskip=0&nlist=all"
    );
    anime_list_xhr.responseType = "text";
    anime_list_xhr.addEventListener("load", () => {
      if (anime_list_xhr.status === 200) {
        const anime_id_list = [
          ...anime_list_xhr.responseText
            .matchAll(/(?<=<id>).*<\/id>/g)
            .reduce((a, b) => a.concat(b)),
        ].map((id) => id.split("<").shift());

        const anime_xhr = new XMLHttpRequest();
        const anime_id =
          anime_id_list[Math.floor(anime_id_list.length * Math.random())];
        anime_xhr.open(
          "GET",
          `https://proxy.corsfix.com/?https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=${anime_id}`
        );
        anime_xhr.responseType = "text";
        anime_xhr.addEventListener("load", () => {
          if (anime_xhr.status === 200) {
            console.log(anime_xhr.responseText);
            const img_src = anime_xhr.responseText.match(
              /(?<=img src=").*?\.jpg/
            );
            const title = anime_xhr.responseText.match(
              /(?<=type="Main title" lang=".*?">).*?(?=<)/
            );
            const altTitle = anime_xhr.responseText.match(
              /(?<=type="Alternative title" lang=".*?">).*?(?=<)/
            );
            const rating = anime_xhr.responseText.match(
              /(?<=<ratings .*? weighted_score=").*?(?=")/
            );
            const synopsis = anime_xhr.responseText.match(
              /(?<=type="Plot Summary">).*?(?=<)/
            );
            anime_image.src = img_src[0];
            anime_title.innerText = title[0];
            anime_alt_title.innerText = altTitle
              ? altTitle[0]
              : "Alternate title unavailable";
            anime_rating.innerText = rating
              ? parseFloat(rating[0]).toPrecision(2)
              : "Rating unavailable";
            anime_synopsis.innerHTML = `${
              synopsis ? synopsis[0] : "Summary unavailable"
            }<sub class="courtesy-sub">Courtesy of <a class="link" href="animenewsnetwork.com">animenewsnetwork.com</a></sub>`;
            console.log(title, altTitle, rating, synopsis);
          } else {
            anime_xhr.send();
          }
        });
        anime_xhr.send();
      } else {
        anime_list_xhr.send();
      }
    });
    anime_list_xhr.send();
  }
}

window.addEventListener("load", () => {
  new BibleVerse(
    "_bible_book",
    "_bible_chapter",
    "_bible_verse",
    "_bible_text"
  );
  new AnimeNews(
    "_anime_img",
    "_anime_title",
    "_anime_title_alt",
    "_anime_rating",
    "_anime_synopsis"
  );
});
