package com.unilumin.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Permissions {

    private String id;
    private String permissionsName;
    //权限控制说明
    private String permissionsExplain;

}
