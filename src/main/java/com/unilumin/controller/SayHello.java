package com.unilumin.controller;

import com.unilumin.entity.Body;
import com.unilumin.entity.Destinaition;
import org.springframework.web.bind.annotation.*;

@RestController
/**
 * @author ZhongWei
 * */
public class SayHello {

    @GetMapping("/sayHello")
    @ResponseBody
    public Body hello(){
        Body body =new Body();
        Destinaition destinaition = new Destinaition();
        destinaition.setDEVICE("ORG");
        destinaition.setID("9527");
        destinaition.setINTERFACES("oligaduo");
        body.setDestination(destinaition);
        return body;
    }

}
