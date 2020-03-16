package com.unilumin.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Role {

    private String id;
    private String roleName;
    //角色说明
    private String roleExplain;
    /**
     * 角色对应权限集合
     */
    private Set<Permissions> permissions;

}
