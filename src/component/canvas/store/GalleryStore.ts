import { observable, toJS } from 'mobx';
import GalleryRepo from '../repository/localStorage/GalleryRepo';

export default class GalleryStore {
    @observable frames: string[] = [];

    constructor() {
        this.loadFrames();
    }

    loadFrames() {
        const frames = GalleryRepo.loadFrames();
        if(frames) this.frames = frames;
    }

    saveFrame(i: number, frame: string) {
        this.frames.splice(i, 1, frame);
        GalleryRepo.saveFrames(toJS(this.frames));
    }
}