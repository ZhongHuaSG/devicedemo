package com.unilumin.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Rec {

    @JSONField(name="AVE_POWERDIS")
    private String ave_Powerdis;

    @JSONField(name="CURRENT_WORKTIME")
    private String current_WorkTime;

    @JSONField(name="MAX_POWER")
    private String max_Power;

    @JSONField(name="MOD_STATE")
    private String max_State;

    @JSONField(name="REC_BRIGHT")
    private String rec_Bright;

    @JSONField(name="REC_CHROMA")
    private String rec_Chroma;

    @JSONField(name="REC_ID")
    private String rec_Id;

    @JSONField(name="REC_POS")
    private String rec_Pos;

    @JSONField(name="REC_VER")
    private String rec_Ver;

    @JSONField(name="REFRESH")
    private String refresh;

    @JSONField(name="RT_POWERDIS")
    private String re_Powerdis;

    @JSONField(name="SENSOR_BRI")
    private String sensor_Bri;

    @JSONField(name="SENSOR_CURRENT")
    private String sensor_Current;

    @JSONField(name="SENSOR_HUMI")
    private String sensor_Humi;

    @JSONField(name="SENSOR_SMOG")
    private String sensor_Smog;

    @JSONField(name="SENSOR_TMP")
    private String sensor_Tmp;

    @JSONField(name="SENSOR_VOL")
    private String sensor_Vol;

    @JSONField(name="TOTAL_WORKTIME")
    private String total_WorkTime;

    @JSONField(name="VOLTAGE")
    private String voltage;

    @JSONField(name="MOD")
    private List<Map<String,Object>> mod;

}
