package com.unilumin.controller;

import com.alibaba.fastjson.JSON;
import com.unilumin.entity.Body;
import com.unilumin.utils.ReadUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
/**
 * @author ZhongWei
 * */
public class MainController {

    @Value("${jsonfile.dir}")
    private  String name;

    @GetMapping("/getJsonMessage")
    @ResponseBody
    public Body getJsonMessage(){
        String s = ReadUtils.readJsonFile(name);
        Map<String,Object> lbody = JSON.parseObject(s);
        Body bodyBean = JSON.toJavaObject(JSON.parseObject(s),Body.class);
        return bodyBean;
    }

}