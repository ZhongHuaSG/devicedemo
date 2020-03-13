package com.unilumin.mapper;
import com.unilumin.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    List<User> findAll();

    Integer findUser(User user);

    User findUserByName(@Param("username")String username);
}
