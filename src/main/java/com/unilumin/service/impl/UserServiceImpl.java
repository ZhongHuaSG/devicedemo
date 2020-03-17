package com.unilumin.service.impl;

import com.unilumin.entity.User;
import com.unilumin.mapper.UserMapper;
import com.unilumin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;

    @Override
    public List<User> findAll() {
        return userMapper.findAll();
    }

    @Override
    public UserMapper initDao() {
        return userMapper;
    }

}
