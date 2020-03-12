package com.unilumin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 主页控制器
 * @author zhongwei
 * */
@Controller
public class IndexController {

    @RequestMapping(value = "/")
    public String Index(){
        return "forward:index.html";
    }

    @RequestMapping(value = "/login")
    public String login(){
        return "forward:login.html";
    }


}
