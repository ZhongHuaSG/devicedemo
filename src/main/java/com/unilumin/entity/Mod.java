package com.unilumin.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Mod {

    @JSONField(name="DEAD_LED")
    private String dead_Led;

    @JSONField(name="ID")
    private String id;

    @JSONField(name="MOD_BRI")
    private String mod_Bri;

    @JSONField(name="POS")
    private String pos;

    @JSONField(name="SENSOR_CURRENT")
    private String sensor_Current;

    @JSONField(name="SENSOR_HUMI")
    private String sensor_Humi;

    @JSONField(name="SENSOR_TMP")
    private String sensor_Tmp;

    @JSONField(name="SENSOR_VOL")
    private String sensor_Vol;

    @JSONField(name="TOTAL_WORKTIME")
    private String total_WorkTime;

}
