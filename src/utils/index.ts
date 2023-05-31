// 计算时间段之差
// 结束时间，开始时间，显示秒
const timeToDur = (etime: number, stime = (new Date()).getTime(), sec = true) => {
    //总毫秒数
    const usedTime = etime - stime
    const days = Math.floor(usedTime / (24 * 3600 * 1000))
    //总毫秒数（时级）
    const leave1 = usedTime % (24 * 3600 * 1000)
    const hours = Math.floor(leave1 / (3600 * 1000))
    //总毫秒数
    const leave2 = leave1 % (3600 * 1000)
    const minutes = Math.floor(leave2 / (60 * 1000))
    const time = days + "天" + hours + "时" + minutes + "分"
    if (!sec)
        return time
    else {
        const leave3 = leave2 % (60 * 1000)
        const seconds = Math.floor(leave3 / (1000))
        return time + seconds + "秒"
    }
}


const random = (min: any, max: any) => Math.floor(Math.random() * (max - min + 1) + min)
export {timeToDur, random}