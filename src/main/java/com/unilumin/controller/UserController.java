package com.unilumin.controller;

import com.alibaba.fastjson.JSONObject;
import com.unilumin.entity.User;
import com.unilumin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("/findAll")
    public List<User> findAll(){
        return userService.findAll();
    }

    @PostMapping("/login")
    public JSONObject login(@RequestParam(value = "username", required = true) String username,@RequestParam(value = "password", required = true) String password){
        //返回结果
        JSONObject jsonObject = new JSONObject();
        System.out.println("accountName==="+username);
        System.out.println("password==="+password);
        User user = new User();
        user.setUsername(username);
//        user.setPassword(MD5Utils.MD5EncodeUtf8(password));
        user.setPassword(password);
        Integer i = userService.findUser(user);
        if(i>0){
            jsonObject.put("resultCode","200");
            jsonObject.put("url","/baseshow");
        }
        return jsonObject;
    }

}
