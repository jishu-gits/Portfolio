type Listener = (section: string) => void;
type ScrollListener = (sectionId: string) => void;

class NavigationStateManager {
  private activeSection: string = "hero";
  private listeners: Set<Listener> = new Set();
  private scrollListeners: Set<ScrollListener> = new Set();

  public getActiveSection(): string {
    return this.activeSection;
  }

  public setActiveSection(section: string) {
    if (this.activeSection !== section) {
      console.log(`[Navigation] Transition: ${this.activeSection} -> ${section}`);
      this.activeSection = section;
      this.notifyListeners();
    }
  }

  public requestScrollTo(sectionId: string) {
    console.log(`[Navigation] Scroll requested to: ${sectionId}`);
    this.scrollListeners.forEach((listener) => listener(sectionId));
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Immediately call with current state
    listener(this.activeSection);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public subscribeToScroll(listener: ScrollListener): () => void {
    this.scrollListeners.add(listener);
    return () => {
      this.scrollListeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.activeSection));
  }
}

export const NavigationState = new NavigationStateManager();
