package com.unilumin.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
/**
 * @author ZhongWei
 * */
public class SayHello {

    @RequestMapping("/sayHello")
    public String hello(){
        return "Hello,SpringBoot!";
    }

}
