type Listener = () => void;

export type SectionData = {
  id: string;
  element: HTMLElement | null;
  topOffset: number;
  height: number;
  centerOffset: number;
  sceneAssociation: string;
};

class SectionRegistryManager {
  private sections: Map<string, SectionData> = new Map();
  public totalHeight: number = 0;
  private listeners: Set<Listener> = new Set();

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  public register(id: string, element: HTMLElement | null, sceneAssociation: string) {
    if (!element) return;
    
    this.sections.set(id, {
      id,
      element,
      topOffset: element.offsetTop,
      height: element.offsetHeight,
      centerOffset: element.offsetTop + element.offsetHeight / 2,
      sceneAssociation,
    });
  }

  public getSection(id: string): SectionData | undefined {
    return this.sections.get(id);
  }

  public getAll(): SectionData[] {
    return Array.from(this.sections.values());
  }

  public updateDimensions(containerHeight: number) {
    this.totalHeight = containerHeight;
    this.sections.forEach((section) => {
      if (section.element) {
        section.topOffset = section.element.offsetTop;
        section.height = section.element.offsetHeight;
        section.centerOffset = section.topOffset + section.height / 2;
      }
    });
    this.notifyListeners();
  }
}

export const SectionRegistry = new SectionRegistryManager();
