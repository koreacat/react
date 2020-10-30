export const pictureUrlList = (imageCount: number) => {
    const pictureUrlList = [];
    for (let i = 1; i <= imageCount; i++) {
        let url: any = '';
        if (i < 10) {
            url = '00' + i;
        } else if (i >= 10 && i < 100) {
            url = '0' + i;
        } else {
            url = i;
        }
        pictureUrlList.push(`url( ${require('./img/' + url + '.jpg')} )`);
    }

    return pictureUrlList;
};