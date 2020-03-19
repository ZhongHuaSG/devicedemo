package com.unilumin.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

public interface UserRoleMapper {

    @Insert("INSERT INTO tb_user_role(user_id,role_id) VALUES (#{userid},#{roleid})")
    int addNewUser(@Param("userid") String userid,@Param("roleid")String roleid);

    @Delete("DELETE FROM tb_user_role WHERE user_id = #{userid}")
    int deleteNewUserByUserId(@Param("userid")String userid);


}
