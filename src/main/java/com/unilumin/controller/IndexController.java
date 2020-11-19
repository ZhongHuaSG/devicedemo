package com.unilumin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 主页控制器
 * @author zhongwei
 * */
@Controller
public class IndexController {

    /**
     * 跳转索引页面接口---登陆页面
     * */
    @RequestMapping(value = "/index")
    public String Index(){
        return "forward:bigshow.html";
    }

    /**
     * 跳转错误页面接口
     * */
    @RequestMapping(value = "/errorpage")
    public String ErrorPage(){ return "forward:403.html"; }

//    @RequiresRoles("admin")
//    @RequiresPermissions("add")
    /**
     * 跳转信息展示页面接口
     * */
    @RequestMapping(value = "/baseshow")
    public String Baseshow(){
        return "forward:baseshow.html";
    }

    /**
     * 跳转测试页面接口
     * */
    @RequestMapping(value = "/demotest")
    public String Demotest(){ return "forward:demo.html"; }

//    @RequestMapping(value = "/error")
//    public String Error(){ return "forward:403.html";}

    /**
     * 跳转新页面接口
     * */
    @RequestMapping(value = "/bigshow")
    public String BigShow(){ return "forward:bigshow.html"; }

    /**
     * 跳转图标页面接口
     * */
    @RequestMapping(value = "/fangzhu")
    public String FangZhu(){ return "forward:fangzhu.html"; }

    /**
     * 跳转袁工的页面接口
     * */
    @RequestMapping(value = "/indexjk")
    public String JK(){ return "forward:indexjk.html"; }

    /**
     * 跳转屏体设置页面接口
     * */
    @RequestMapping(value = "/deviceoption")
    public String DO(){ return "forward:deviceoption.html"; }

    /**
     * MP系统页面接口
     * */
    @RequestMapping(value = "/mppage")
    public String Mppage(){
        return "forward:mppage.html";
    }


}
