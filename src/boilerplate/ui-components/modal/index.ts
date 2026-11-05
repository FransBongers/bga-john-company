// import { tplCloseIcon } from '../../player-aid/templates';

export class Modal {
  private state: 'open' | 'closed' = 'closed';
  private onClose?: () => void;

  public ui: {
    container: HTMLElement;
    modal: HTMLElement;
    underlay: HTMLElement;
    content: HTMLElement;
    closeIcon: HTMLElement;
    titleContent: HTMLElement;
  };

  constructor({
    id,
    parent,
    title,
    iconHtml = '',
    closeIconHtml = '<i id="cancel-new-offer" class="fa fa-close"></i>',
    onClose,
  }: {
    id: string;
    parent: HTMLElement;
    title: string;
    iconHtml?: string;
    closeIconHtml?: string;
    onClose?: () => void;
  }) {
    this.onClose = onClose;

    parent.insertAdjacentHTML(
      'beforeend',
      this.tpl({
        id,
        title,
        iconHtml,
        closeIconHtml,
      }),
    );

    this.ui = {
      container: document.getElementById(`${id}-wrapper`)!,
      modal: document.getElementById(id)!,
      underlay: document.getElementById(`${id}-underlay`)!,
      content: document.getElementById(`${id}-content`)!,
      closeIcon: document.getElementById(`${id}-close-icon`)!,
      titleContent: document.getElementById(`${id}-title`)!,
    };

    this.ui.underlay.onclick = () => this.close();
    this.ui.closeIcon.onclick = () => this.close();
  }

  private tpl({
    id,
    title,
    iconHtml,
    closeIconHtml,
  }: {
    id: string;
    title: string;
    iconHtml: string;
    closeIconHtml: string;
  }) {
    return `
			<div id="${id}-wrapper" class="fb-modal-wrapper" data-state="closed">
				<div id="${id}-underlay" class="fb-modal-underlay"></div>
				<div id="${id}" class="fb-modal">
					<div class="fb-modal-title-container">
						${iconHtml}
            <div id="${id}-title" class="fb-modal-title">
              <span class="fb-font-28 fb-font-bold">${title}</span>
            </div>
						<div id="${id}-close-icon" class="fb-modal-close-icon">${closeIconHtml}</div>
					</div>
					<div id="${id}-content" class="fb-modal-content-container">
					</div>
				</div>
			</div>
		`;
  }

  public open() {
    this.state = 'open';
    this.ui.container.setAttribute('data-state', 'open');
  }

  public close() {
    this.state = 'closed';
    this.ui.container.setAttribute('data-state', 'closed');
    this.onClose?.();
  }

  public setTitleContentHtml(content: string | HTMLElement) {
    this.ui.titleContent.replaceChildren();
    if (typeof content === 'string') {
      this.ui.titleContent.insertAdjacentHTML('beforeend', content);
    } else {
      this.ui.titleContent.appendChild(content);
    }
  }

  public setContentHtml(content: string | HTMLElement) {
    this.ui.content.replaceChildren();
    if (typeof content === 'string') {
      this.ui.content.insertAdjacentHTML('beforeend', content);
    } else {
      this.ui.content.appendChild(content);
    }
  }
}
