package com.unilumin.mapper;

import com.unilumin.entity.Permissions;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Set;

@Mapper
public interface PermissionsMapper {

    //获取所有权限
    List<Permissions> findAll();

    //根据角色获取权限
    Set<Permissions> findPermissionsByRole(@Param("roleid")String roleid);

}
