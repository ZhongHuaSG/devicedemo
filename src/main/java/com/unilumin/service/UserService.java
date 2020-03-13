package com.unilumin.service;

import com.unilumin.entity.User;

import java.util.List;

public interface  UserService {
    List<User> findAll();

    Integer findUser(User user);
}
