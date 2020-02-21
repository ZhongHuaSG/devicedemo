package com.unilumin.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class CommonRecparas {

    @JSONField(name="BOX_NAME")
    private String box_Name;

    @JSONField(name="BOX_TYPE")
    private String box_Type;

    @JSONField(name="CMD")
    private String cmd;

    @JSONField(name="FAN_CTRL")
    private String fan_Ctrl;

    @JSONField(name="MODULE_CNT")
    private String module_Cnt;

    @JSONField(name="MOD_ORDER")
    private String mod_Order;

    @JSONField(name="REC_CNT")
    private String rec_Cnt;

    @JSONField(name="REC_TYPE")
    private String rec_Type;

    @JSONField(name="REC_UPG_PRO")
    private String rec_Upg_Pro;

    @JSONField(name="WORKSTATE")
    private String workState;

}
