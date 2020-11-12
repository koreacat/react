export default class GalleryRepo {
    static localStorageKey = 'frames';

    static loadFrames() {
        const data = localStorage.getItem(GalleryRepo.localStorageKey);
        if(data === null) return null;
        const frames = this.parseFrames(data);
        return frames;
    }

    private static parseFrames(frames: string) {
        try {
            const result = JSON.parse(frames) as string[];
            return result;
        } catch(e) {
            return null
        }
    }

    static saveFrames(frames: string[]) {
        try {
            const stringified = JSON.stringify(frames);
            localStorage.setItem(GalleryRepo.localStorageKey, stringified);
            return true;
        } catch(e) {
            return false;
        }
    }
}