const DateFormat = ((d: Date, format: string) => {
    const KL = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const KS = ["일", "월", "화", "수", "목", "금", "토"];
    const EL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const ES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let zf = ((num: number, len: number) => {
        let s = '', i = 0;
        while (i++ < len - num.toString().length) s += '0';
        return s + num.toString();
    });

    return format.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, ((__: any) => {
        switch (__) {
            case "yyyy": return d.getFullYear();
            case "yy": return zf((d.getFullYear() % 1000), 2);
            case "MM": return zf((d.getMonth() + 1),2);
            case "dd": return zf(d.getDate(),2);
            case "HH": return zf(d.getHours(),2);
            case "hh": return zf((d.getHours() % 12 ? d.getHours() % 12 : 12), 2);
            case "mm": return zf(d.getMinutes(),2);
            case "ss": return zf(d.getSeconds(),2);
            case "KL": return KL[d.getDay()];
            case "KS": return KS[d.getDay()];
            case "EL": return EL[d.getDay()];
            case "ES": return ES[d.getDay()];
            case "a/p": return d.getHours() < 12 ? "AM" : "PM";
            default: return __;
        }
    }));
});
export default DateFormat;