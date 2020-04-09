export class MathFuncs {
    StandardDeviation = (numbersArr: number[]) => {
        //--CALCULATE AVAREGE--
        let total = 0;
        for (let key in numbersArr)
            total += (numbersArr[key] as unknown as number);
        let meanVal = total / numbersArr.length;
        //--CALCULATE AVAREGE--

        //--CALCULATE STANDARD DEVIATION--
        let SDprep = 0;
        for (let key in numbersArr)
            SDprep += Math.pow((numbersArr[key] as unknown as number) - meanVal, 2);
        let SDresult = Math.sqrt(SDprep / numbersArr.length);
        //--CALCULATE STANDARD DEVIATION--
        return Math.round(SDresult * 100) / 100;
    }

    Avg = (nums: number[]) => {
        const total = nums.reduce((acc, c) => acc + c);
        return Math.round(total / nums.length)
    }

    ZScore = (x: number, avg: number, stdv: number) => {
        return Math.round(((x - avg) / stdv) * 100) / 100
    }
}
