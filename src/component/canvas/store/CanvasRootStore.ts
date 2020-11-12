import GalleryStore from "./GalleryStore";
import CanvasStore from "./CanvasStore";

export default class CanvasRootStore {
    canvasStore: CanvasStore;
    galleryStore: GalleryStore

    constructor() {
        this.canvasStore = new CanvasStore(this);
        this.galleryStore = new GalleryStore();
    }
}