package com.unilumin.mapper;

import com.unilumin.entity.Role;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;


@Mapper
public interface RoleMapper {

    //获取所有角色
    List<Role> findAll();
    //根据用户ID获取所有角色
    List<Role> findRoleByUser(@Param("userid")String userid);

}
