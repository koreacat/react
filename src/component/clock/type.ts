export interface clockProps {
    date: Date;
}

export const clockList = (() => {
    let arr = Array.from(Array(12), () => Array(36).fill(null));
    let a = ['a', 'b', 'c', 'd', 'e', 'f'];
    let x = 0;
    let y = 0;
    let z = 1;
    let hms = 'h';
    for(let i=0; i<12; i++){
        for(let j=0; j<36; j++){
            if(j==0){
                hms = 'h';
            }else if(j==12) {
                hms = 'm';
            }else if(j==24){
                hms = 's';
            }

            if(i<3 || i>8 || j===0 || j===35 || (i===3 && (j===11 || j===12)) || (i===3 && (j===23 || j===24)) || (i===8 && (j===11 || j===12)) || (i===8 && (j===23 || j===24))){
                arr[i][j] = '--';
            }
            else if((i===4 && j===11) || (i===6 && j===11) || (i===4 && j===23) || (i===6 && j===23)){
                arr[i][j] = 'aa'
            }
            else if((i===4 && j===12) || (i===6 && j===12) || (i===4 && j===24) || (i===6 && j===24)){
                arr[i][j] = 'ab'
            }
            else if((i===5 && j===11) || (i===7 && j===11) || (i===5 && j===23) || (i===7 && j===23)){
                arr[i][j] = 'ba'
            }
            else if((i===5 && j===12) || (i===7 && j===12) || (i===5 && j===24) || (i===7 && j===24)){
                arr[i][j] = 'bb'
            }
            else {
                arr[i][j] = hms + z + ' ' + a[x] + a[y++]
                if(y>4){
                    z++;
                    y=0;
                    if(z>2){
                        z = 1;
                    }
                }
            }
        }
        if(i>2){
            x++;
            x>5 && (x=0);
        }
    }
    console.log(arr);
    return arr;
});