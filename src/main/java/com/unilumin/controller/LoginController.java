package com.unilumin.controller;

import com.alibaba.fastjson.JSONObject;
import com.unilumin.entity.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private final static Logger logger = LoggerFactory.getLogger(LoginController.class);

    @RequestMapping("/login")
    public JSONObject login(@RequestParam(value = "username", required = true) String username, @RequestParam(value = "password", required = true) String password) {
        JSONObject jsonObject = new JSONObject();
        //添加用户认证信息
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(
                username,
                password
        );
        try {
            //进行验证，这里可以捕获异常，然后返回对应信息
            subject.login(usernamePasswordToken);
//            subject.checkRole("admin");
//            subject.checkPermissions("query", "add");
        } catch (AuthenticationException e) {
            e.printStackTrace();
            jsonObject.put("result","账号或密码错误！");
            return jsonObject;
        } catch (AuthorizationException e) {
            e.printStackTrace();
            jsonObject.put("result","没有权限");
            return jsonObject;
        }
        jsonObject.put("resultCode","200");
        jsonObject.put("url","/baseshow");
        return jsonObject;
    }

}
