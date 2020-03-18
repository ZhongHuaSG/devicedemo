package com.unilumin.controller;

import com.alibaba.fastjson.JSONObject;
import com.unilumin.entity.DTO.UserDTO;
import com.unilumin.entity.User;
import com.unilumin.mapper.RoleMapper;
import com.unilumin.mapper.UserRoleMapper;
import com.unilumin.service.UserService;
import com.unilumin.utils.MD5Utils;
import org.apache.ibatis.annotations.Param;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @Resource
    RoleMapper roleMapper;

    @Resource
    UserRoleMapper userRoleMapper;

    @RequestMapping("/findAll")
    public List<User> findAll(){
        return userService.findAll();
    }

    @RequiresRoles("admin")
    @GetMapping("/findUserPage")
    public List<User> FindUserPage(){
        List<User> userList = userService.findAll();
        for(User user:userList){
            user.setRoles(new HashSet(roleMapper.findRoleByUser(user.getId())));
        }
        return userList;
    }

    @RequiresRoles("admin")
    @RequiresPermissions("add")
    @PostMapping("/addUser")
    @Transactional
    public JSONObject AddUser(@RequestBody UserDTO user){
        JSONObject resultObject = new JSONObject();
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(MD5Utils.MD5EncodeUtf8(user.getPassword()));
        newUser.setRoles(new HashSet<>(roleMapper.selectById(user.getRole())));
        userService.insert(newUser);
        userRoleMapper.addNewUser(newUser.getId(),user.getRole());
        return resultObject;
    }


}
