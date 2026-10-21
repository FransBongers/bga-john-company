export interface Tab {
  id: string;
  title: string;
  content: string;
}

export interface TabContainerProps {
  id: string;
  parentElement: HTMLElement | string;
  position?: InsertPosition;
  gameName: string;
  tabs: Tab[];
  initialActiveTabId: string;
}

const tplTabContainer = (props: TabContainerProps) => `
  <div id="${props.id}" class="tab-container">
    <div class="tabs">${props.tabs.map(({ id, title }) => `<div id="${id}-tab" class="tab-title heg-font-24 heg-font-semi-bold"><span>${title}</span></div>`).join('')}</div>
    <div class="tabs-content">
      ${props.tabs.map(({ content }) => content).join('')}
    </div>
  </div>
`;

export class TabContainer {
  private ui: {
    parent: HTMLElement;
    tabs: Record<string, HTMLElement>;
    content: Record<string, HTMLElement>;
  };
  // private open = true;
  private gameName: string;
  private id: string;
  private activeTabId: string;

  constructor(config: TabContainerProps) {
    this.gameName = config.gameName;
    this.id = config.id;
    this.setupTabContainer(config);
    this.setActiveTab(config.initialActiveTabId);
  }

  private setupTabContainer(config: TabContainerProps) {
    const parentElement =
      typeof config.parentElement === 'string'
        ? document.getElementById(config.parentElement)
        : config.parentElement;

    if (!parentElement) {
      throw new Error('FE_ERROR_TAB_CONTAINER_01');
    }

    const tabContainer = tplTabContainer(config);
    parentElement.insertAdjacentHTML(
      config.position || 'beforeend',
      tabContainer,
    );

    this.ui = {
      parent: parentElement,
      tabs: {},
      content: {},
    };

    config.tabs.forEach(({ id }) => {
      this.ui.tabs[id] = document.getElementById(`${id}-tab`);
      this.ui.content[id] = document.getElementById(`${id}`);
      this.ui.content[id].classList.add('tab-content');

      this.ui.tabs[id].addEventListener('click', () => this.setActiveTab(id));
    });
  }

  public setActiveTab(tabId: string) {
    this.activeTabId = tabId;

    Object.entries(this.ui.tabs).forEach(([id, tab]) => {
      if (id === tabId) {
        tab.setAttribute('data-active', 'true');
      } else {
        tab.setAttribute('data-active', 'false');
      }
    });
    Object.entries(this.ui.content).forEach(([id, tab]) => {
      if (id === tabId) {
        tab.setAttribute('data-active', 'true');
      } else {
        tab.setAttribute('data-active', 'false');
      }
    });
  }
}
