class LocalStorageMock {
    storage: Record<string, string>

    constructor() {
        this.storage = {};
    }

    clear() {
        this.storage = {};
    }

    getItem(key: string) {
        return this.storage[key] || null;
    }

    setItem(key: string, value: any) {
        this.storage[key] = value.toString();
    }

    removeItem(key: string) {
        delete this.storage[key];
    }
};

export default LocalStorageMock;