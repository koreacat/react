import GalleryStore from '../GalleryStore';

describe('canvas store', () => {
    let store: GalleryStore;

    beforeEach(() => {
        localStorage.clear();
        store = new GalleryStore();
    })

    afterEach(() => {
        localStorage.clear();
    })

    describe('loadFrames', () => {
        test('load data well after save', () => {
            expect(store.frames.length).toBe(0);
            store.saveFrame(0, "frame0");
            store.loadFrames();
            expect(store.frames.length).toBe(1);
        })
    })

    describe('saveFrame', () => {
        test('saved frame should be same with frames', () => {
            const frame = 'frame';

            store.saveFrame(0, frame);
            expect(store.frames[0]).toBe(frame);
        })
    })
})