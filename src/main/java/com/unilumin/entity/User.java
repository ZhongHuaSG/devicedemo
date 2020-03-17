package com.unilumin.entity;

import com.zengtengpeng.common.bean.Page;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class User extends Page implements Serializable {

        private String id;//编号
        private String username;//用户名
        private String password;//密码

        /**
         * 用户对应的角色集合
         * */
        private Set<Role> roles;

}
