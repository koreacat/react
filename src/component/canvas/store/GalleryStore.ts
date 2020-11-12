import { action, observable, toJS } from 'mobx';
import GalleryRepo from '../repository/localStorage/GalleryRepo';

export default class GalleryStore {
    @observable frameIdx: number | null = null;
    @observable frames: string[] = [];

    constructor() {
        this.loadFrames();
    }

    loadFrames() {
        const frames = GalleryRepo.loadFrames();
        if (frames) this.frames = frames;
    }

    saveFrame(i: number, frame: string) {
        this.frames.splice(i, 1, frame);
        GalleryRepo.saveFrames(toJS(this.frames));
    }

    @action
    changeFrameIdx = (frameIdx: number | null) => {
        this.frameIdx = frameIdx;
    }

    @action
    createFrame = () => {
        this.changeFrameIdx(this.frames.length)
    }
}