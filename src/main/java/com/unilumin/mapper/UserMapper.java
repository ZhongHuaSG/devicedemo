package com.unilumin.mapper;
import com.unilumin.entity.User;
import com.zengtengpeng.common.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper extends BaseDao<User> {
    List<User> findAll();

    User findUserByName(@Param("username")String username);
}
