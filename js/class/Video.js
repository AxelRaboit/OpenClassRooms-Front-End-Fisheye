import Media from './Media.js';
import LightBox from './LightBox.js';

export default class Video extends Media {
  constructor (data, target) {
    super(data, target);
    /* ENG: Media video */
    /* FRA: Video du media */
    this.video = data.video;
    /* ENG: Store the specific view into the element */
    /* FRA: Sotck la vue specifique dans l'element */
    this.element = this.getView();
  };

  /**
   * ENG: This function will return the media card
   * FRA: Cette fonction va retourner la vue d'une carte media
   * @returns {HTMLElement}
   */
  getView = () => {
    const container = document.createElement('article');
    container.setAttribute('class', 'media');

    const media = document.createElement('a');
    media.setAttribute('href', '#');
    media.setAttribute('role', 'button');
    media.setAttribute('class', 'media__link');
    media.classList.add('video-overlay');

    media.innerHTML = this.getThumbnail();

    /* ENG: On click to the media, display the lightbox */
    /* FRA: Sur le clique du media, on affiche la lightbox */
    media.addEventListener('click', () => {
      new LightBox(Media.instances, Media.instances.indexOf(this))
    });

    /* ENG: On press enter on the media, display the lightbox */
    /* FRA: En pressant la touche enter sur le media, on affiche la lightbox */
    media.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        new LightBox(Media.instances, Media.instances.indexOf(this))
      }
    });

    const footer = document.createElement('footer');
    footer.setAttribute('class', 'media__infos');
    footer.innerHTML = `<p class="media__infos__title">${this.title}</p>`;

    /* ENG: We create a div about the like */
    /* FRA: On créer une div concernant le like */
    const like = document.createElement('div');
    like.setAttribute('class', 'media__infos__likes');

    /* ENG: This span will be inside the div like */
    /* FRA: Cette span sera à l'intérieur de la div like */
    const likeNb = document.createElement('span');
    likeNb.setAttribute('tabindex', '0');
    likeNb.setAttribute('class', 'media__infos__likes-nb');
    likeNb.innerHTML = this.likes;
    likeNb.setAttribute('aria-label', likeNb.innerHTML);

    /* ENG: We store the span iin a variable likeCount preceded by a this */
    /* FRA: On stock la span dans une variable likeCount précédé d'un this */
    this.likeCount = likeNb;

    /* ENG: we append the child about the div like */
    /* FRA: on fait apparaitre l'enfant à propos de la div like */
    like.appendChild(likeNb);
    like.appendChild(this.getLikeBtn());
    footer.appendChild(like);
    container.appendChild(media);
    container.appendChild(footer);

    return container;
  };

  /**
   * ENG: Image / video element of the media card
   * FRA: Element image / video de la carte media
   * @returns {HTMLElement}
   */
  getThumbnail = () => {
    return `<video class="media__link__video" aria-label="${this.title}">
      <source src="assets/images/${this.photographerId}/${this.video}" type="video/mp4">
    </video>`;
  };
}
