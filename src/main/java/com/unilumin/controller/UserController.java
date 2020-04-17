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

    //查询所有用户接口--无分页
    @RequestMapping("/findAll")
    public List<User> findAll(){
        return userService.findAll();
    }

    //查询所有用户以及角色信息接口--无分页
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
    /**
     * 添加用户接口
     * @Param UserDto 详细参数看UserDto类
     * */
    public JSONObject AddUser(@RequestBody UserDTO user){
        JSONObject resultObject = new JSONObject();
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        if(user.getPassword() == null){
            newUser.setPassword("1F470ABDA924E8A0AAA30D48BEC226FB");
        }else{
            newUser.setPassword(MD5Utils.MD5EncodeUtf8(user.getPassword()));
        }

        newUser.setRoles(new HashSet<>(roleMapper.selectById(user.getRole())));
        userService.insert(newUser);
        userRoleMapper.addNewUser(newUser.getId(),user.getRole());
        return resultObject;
    }

    @RequiresRoles("admin")
    @RequiresPermissions("delete")
    @PostMapping("/deleteuser")
    @Transactional
    /**
     * 删除用户接口
     * @Param id  ---必须封装成JSON格式提交
     * */
    public JSONObject DeleteUser(@RequestBody UserDTO user){
        JSONObject jsonObject = new JSONObject();
        User newuser = new User();
        newuser.setId(user.getId());
        Integer i = userService.deleteByPrimaryKey(newuser);
        if(i>0){
            userRoleMapper.deleteNewUserByUserId(user.getId());
        }
        return jsonObject;
    }


}
