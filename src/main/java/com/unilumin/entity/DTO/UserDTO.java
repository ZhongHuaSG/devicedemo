package com.unilumin.entity.DTO;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class UserDTO {

    private String id;
    private String username;//用户名
    private String password;//明文密码
    private String role;//角色ID


}
