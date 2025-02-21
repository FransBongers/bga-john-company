class Region {
  private tower: HTMLElement;

  constructor(private id: string, private game: GameAlias, data: JocoRegionBase) {
    console.log('setup region', id);
    this.setup(data);
  }

  private setup(data: JocoRegionBase) {
    const elt = (this.tower = document.createElement('div'));
    elt.classList.add('joco_tower');
    elt.style.bottom = `calc(var(--boardScale) * ${towerConfig[data.id].bottom}px)`;
    elt.style.left = `calc(var(--boardScale) * ${towerConfig[data.id].left}px)`;
    const towerTop = document.createElement('div');
    towerTop.classList.add('joco_tower_top');
    elt.appendChild(towerTop);
    for(let i = 0; i < 6; i++) {
      const towerLevel = document.createElement('div');
      towerLevel.classList.add('joco_tower_level');
      elt.appendChild(towerLevel);
    }
    
    document.getElementById('joco_towers').appendChild(elt);
    this.updateStrength(data.strength);
  }

  public updateStrength(value: number) {
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
}