package com.unilumin.service.impl;

import com.unilumin.entity.Permissions;
import com.unilumin.entity.Role;
import com.unilumin.entity.User;
import com.unilumin.mapper.PermissionsMapper;
import com.unilumin.mapper.RoleMapper;
import com.unilumin.mapper.UserMapper;
import com.unilumin.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private PermissionsMapper permissionsMapper;

    @Override
    public User getUserByName(String userName) {
        User user = userMapper.findUserByName(userName);
        if(user != null){
            Set<Role> roleSet = new HashSet<>();
            List<Role> roleList = roleMapper.findRoleByUser(user.getId());
            for(Role role:roleList){
                role.setPermissions(permissionsMapper.findPermissionsByRole(role.getId().toString()));
                roleSet.add(role);
            }
            user.setRoles(roleSet);
        }
        return user;
    }


}
