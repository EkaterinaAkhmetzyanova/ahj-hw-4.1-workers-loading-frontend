/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
export default class Widget {
  constructor() {
    this.articles = document.querySelector('.news-list');
    this.server = 'https://ahj-hw-workers-loading-back.herokuapp.com/articles';
    this.reloadBtn = document.querySelector('.news-reload');
  }

  init() {
    this.request();
    this.reloadBtn.addEventListener('click', () => {
      this.articles.innerHTML = '';
      this.request();
    });
  }

  request() {
    (async () => {
      try {
        this.reload();
        const response = await fetch(this.server);
        if (response.ok) {
          const data = await response.json();
          this.articles.innerHTML = '';
          data.forEach((item) => {
            this.articles.prepend(this.getNews(item));
          });
        }
      } catch (e) {
        this.getErrModal();
        const newsBox = document.querySelector('.news-box');
        newsBox.style.opacity = 0.3;
      }
    })();
  }

  getNews(data) {
    const article = document.createElement('div');
    article.className = 'article';
    article.innerHTML = `
      <div class="article-posted">${data.received}</div>
      <div class="article-content">
        <div class="article-img">
          <img src="${data.image}">
        </div>
        <div class="article-body">
          <div class="article-title">${data.title}</div>
          <div class="article-desc">${data.description}</div>
        </div>
      </div>
    `;
    return article;
  }

  getErrModal() {
    const errModal = document.createElement('div');
    errModal.className = 'err-modal';
    errModal.textContent = 'Не удалось загрузить данные. Проверьте подключение и обновите страницу.';
    document.body.append(errModal);
  }

  loader() {
    const articleLoader = document.createElement('div');
    articleLoader.className = 'article-loader';
    articleLoader.innerHTML = `
      <div class="article-posted-loader"></div>
      <div class="article-content-loader">
        <div class="article-img-loader">
      </div>
      <div class="article-body-loader">
        <div class="article-title-loader"></div>
        <div class="article-desc-loader">
          <p class="text-loader"></p>
          <p class="text-loader"></p>
          <p class="text-loader"></p>
        </div>
      </div>
    `;
    return articleLoader;
  }

  reload() {
    for (let i = 0; i < 4; i++) {
      this.articles.append(this.loader());
    }
  }
}
