package com.unilumin.controller;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 主页控制器
 * @author zhongwei
 * */
@Controller
public class IndexController {

    @RequestMapping(value = "/index")
    public String Index(){
        return "forward:index.html";
    }

    @RequiresRoles("admin")
    @RequiresPermissions("add")
    @RequestMapping(value = "/baseshow")
    public String Baseshow(){
        return "forward:baseshow.html";
    }

//    @RequestMapping(value = "/error")
//    public String Error(){ return "forward:403.html";}


}
