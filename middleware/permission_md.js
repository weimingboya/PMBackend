

let role_permissions= [
    {
        role:0,
        permission:[
            /.*\/product/,
            /.*\/order/,
            /.*\/category/
        ]
    },
    {
        role:100,
        permission:[
            /.*/
        ]
    }
];

module.exports = (req,res,next)=>{
    let user = req.user;
    if(user){
        let isLetGo = false;
        let role = user.role;
        role_permissions.forEach(obj=>{
            if(role === obj.role){
                obj.permission.forEach(p=>{
                    if(p.test(req.url)){
                        isLetGo = true;
                    }
                })
            }
        })
        if(!isLetGo){
            throw Error(`当前用户访问${req.url}的权限不足`)
        }
    }
    next();
};