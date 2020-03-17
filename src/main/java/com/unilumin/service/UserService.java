package com.unilumin.service;

import com.unilumin.entity.User;
import com.unilumin.mapper.UserMapper;
import com.zengtengpeng.common.service.BaseService;

import java.util.List;

public interface  UserService extends BaseService<User, UserMapper> {
    List<User> findAll();
}
