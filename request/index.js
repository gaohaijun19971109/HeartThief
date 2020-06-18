export const request=(params)=>{
    // 定义公共uir
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result)
            },
            error(err){
                reject(err)
            }
        })
    })
}