package com.unilumin.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Destinaition {

    @JSONField(name="DEVICE")
    private String DEVICE;

    @JSONField(name="ID")
    private String ID;

    @JSONField(name="INTERFACES")
    private String INTERFACES;

}
