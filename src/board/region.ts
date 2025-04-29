class Region {
  private tower: HTMLElement;
  private data: JocoRegionBase;

  constructor(
    private id: string,
    private game: GameAlias,
    data: JocoRegionBase
  ) {
    this.data = data;
    this.setup(data);
  }

  private setup(data: JocoRegionBase) {
    const elt = (this.tower = document.createElement('div'));
    elt.classList.add('joco_tower');
    elt.style.bottom = `calc(var(--boardScale) * ${
      towerConfig[data.id].bottom
    }px)`;
    elt.style.left = `calc(var(--boardScale) * ${towerConfig[data.id].left}px)`;
    const towerTop = document.createElement('div');
    towerTop.classList.add('joco-tower-top');
    elt.appendChild(towerTop);
    const flagElt = document.createElement('div');
    flagElt.classList.add('joco-tower-flag');
    towerTop.appendChild(flagElt);
    const spanWithStar = document.createElement('span');
    flagElt.appendChild(spanWithStar);
    spanWithStar.innerText = '*';
    for (let i = 0; i < 6; i++) {
      const towerLevel = document.createElement('div');
      towerLevel.classList.add('joco_tower_level');
      elt.appendChild(towerLevel);
    }

    document.getElementById('joco_towers').appendChild(elt);
    this.updateStrength(data.strength);
    this.updateCapital(data.isCapital);
    this.updateEmpire(data.isCapital, data.control);
  }

  public update(region: JocoRegionBase) {
    if (this.data.strength !== region.strength) {
      this.updateStrength(region.strength);
    }
    if (this.data.isCapital !== region.isCapital) {
      this.updateCapital(region.isCapital);
    }
    if (this.data.control !== region.control) {
      this.updateEmpire(region.isCapital, region.control);
    }
  }

  public updateCapital(isCapital: boolean) {
    this.data.isCapital = isCapital;
    
    this.tower.children[0].setAttribute(
      'data-capital',
      isCapital ? 'true' : 'false'
    );

    if (isCapital) {
      this.updateEmpire(isCapital, null);
    }
  }

  public updateEmpire(isCapital: boolean, control: string | null) {
    this.data.control = control;

    const isPartOfEmpire =
      isCapital || (control !== null && !PRESIDENCIES.includes(control));

    this.tower.children[0].setAttribute(
      'data-empire',
      isPartOfEmpire ? 'true' : 'false'
    );
    if (isPartOfEmpire) {
      this.tower.children[0].setAttribute(
        'data-empire-id',
        isCapital ? this.id : control
      );
    }
  }

  public updateStrength(value: number) {
    this.data.strength = value;

    const children = this.tower.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (i > value) {
        child.classList.add('hidden');
      } else {
        child.classList.remove('hidden');
      }
    }
  }

  public updateUnrest(value: number) {
    this.data.unrest = value;
    // TODO: implementation
  }
}
