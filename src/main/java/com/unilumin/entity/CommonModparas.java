package com.unilumin.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class CommonModparas {

    @JSONField(name="DATAGROUP")
    private String dataGroup;

    @JSONField(name="DATAORDER")
    private String dataOrder;

    @JSONField(name="ICSYLE")
    private String icsyle;

    @JSONField(name="LAMP_PARA")
    private Map<String,Object> lamp_Para;

    @JSONField(name="MOD_RSLT")
    private String mod_Rslt;

    @JSONField(name="MOD_SIZE")
    private String mod_Size;

    @JSONField(name="MOD_SPACE")
    private String mod_Space;

    @JSONField(name="SCAN_NUM")
    private String scan_Num;

}
