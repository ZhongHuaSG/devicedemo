package com.unilumin.service.impl;

import com.unilumin.entity.Permissions;
import com.unilumin.entity.Role;
import com.unilumin.entity.User;
import com.unilumin.mapper.UserMapper;
import com.unilumin.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User getUserByName(String userName) {
        //模拟数据库查询，正常情况此处是从数据库或者缓存查询。
        return userMapper.findUserByName(userName);
    }

    /**
     * 模拟数据库查询
     * @param userName
     * @return
     */
//    private User getMapByName(String userName){
//        //共添加两个用户，两个用户都是admin一个角色，
//        //wsl有query和add权限，zhangsan只有一个query权限
//        Permissions permissions1 = new Permissions();
//        permissions1.setId("1");
//        permissions1.setPermissionsName("query");
//        Permissions permissions2 = new Permissions();
//        permissions2.setId("2");
//        permissions1.setPermissionsName("add");
//        Set<Permissions> permissionsSet = new HashSet<>();
//        permissionsSet.add(permissions1);
//        permissionsSet.add(permissions2);
//        Role role = new Role();
//        role.setId("1");
//        role.setRoleName("admin");
//        role.setPermissions(permissionsSet);
//        Set<Role> roleSet = new HashSet<>();
//        roleSet.add(role);
//        User user = new User();
//        user.setId("1");
//        user.setUsername("wsl");
//        user.setPassword("123456");
//        user.setRoles(roleSet);
//        Map<String ,User> map = new HashMap<>();
//        map.put(user.getUsername(), user);
//
//        Permissions permissions3 = new Permissions();
//        permissions3.setId("3");
//        permissions3.setPermissionsName("query");
//        Set<Permissions> permissionsSet1 = new HashSet<>();
//        permissionsSet1.add(permissions3);
//        Role role1 = new Role();
//        role1.setId("2");
//        role1.setRoleName("user");
//        role1.setPermissions(permissionsSet1);
//        Set<Role> roleSet1 = new HashSet<>();
//        roleSet1.add(role1);
//        User user1 = new User();
//        user1.setId("2");
//        user1.setUsername("zhangsan");
//        user1.setPassword("123456");
//        user1.setRoles(roleSet1);
//        map.put(user1.getUsername(), user1);
//        return map.get(userName);
//    }

}
