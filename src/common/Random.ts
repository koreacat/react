class Random {
    static getInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

}
export default Random;
