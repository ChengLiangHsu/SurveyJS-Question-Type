<script setup>
import {Model, ComponentCollection, Question} from "survey-core";
import surveyTheme from "@/assets/surveyTheme/survey_theme.json";
import gcsFormJson from "@/assets/json/gcsForm.json"


ComponentCollection.Instance.add({
  // A unique name; must use lowercase
  name: "gcs_specialized_question",
  // A JSON schema for the base question type (Dropdown in this case)
  questionJSON: {
    type: "radiogroup",
    isRequired: true,
    colCount: 4,
    choices: [
      {
        "text": "自動睜眼看外界",
        "value": 4,
      },
      {
        "text": "聽到聲音睜眼",
        "value": 3,
      },
      {
        "text": "痛時睜眼",
        "value": 2,
      },
      {
        "text": "完全沒有張眼",
        "value": 1,
      }
    ]
  },
  // Inherit all or individual properties from the base question type
  inheritBaseProps: ["isRequired"] // or true
});

ComponentCollection.Instance.add({
  // A unique name; must use lowercase
  name: "gcs_composite_question",
  // A JSON schema for the base question type (Dropdown in this case)
  elementsJSON: [
    {
      type: "panel",
      elements: [
        {
          type: "radiogroup",
          name: "gcs_E",
          title: "睜眼",
          isRequired: true,
          colCount: 4,
          choices: [
            {
              "text": "自動睜眼看外界",
              "value": 4,
            },
            {
              "text": "聽到聲音睜眼",
              "value": 3,
            },
            {
              "text": "痛時睜眼",
              "value": 2,
            },
            {
              "text": "完全沒有張眼",
              "value": 1,
            }
          ]
        },
        {
          type: "radiogroup",
          name: "gcs_V",
          title: "說話",
          isRequired: true,
          colCount: 5,
          choices: [
            {
              "text": "講話有條理",
              "value": 5,
            },
            {
              "text": "答非所問",
              "value": 4,
            },
            {
              "text": "僅呢喃單字",
              "value": 3,
            },
            {
              "text": "僅發出聲音",
              "value": 2,
            },
            {
              "text": "無言語反應",
              "value": 1,
            }
          ]
        },
        {
          type: "radiogroup",
          name: "gcs_M",
          title: "動作",
          isRequired: true,
          colCount: 2,
          choices: [
            {
              "text": "可按指令動作",
              "value": 6,
            },
            {
              "text": "定位痛覺位置並去除刺激",
              "value": 5,
            },
            {
              "text": "受痛覺時肢體自然彎曲",
              "value": 4,
            },
            {
              "text": "肢體呈現不自然彎曲",
              "value": 3,
            },
            {
              "text": "肢體伸直",
              "value": 2,
            },
            {
              "text": "完全沒有動作反應",
              "value": 1,
            }
          ]
        }
      ]
    }
  ],
  // Inherit all or individual properties from the base question type
  inheritBaseProps: true // or [ "allowClear" ]
});


const survey = new Model();
survey.locale = "zh-tw";
survey.completeText = "儲存表單";
survey.applyTheme(surveyTheme);


survey.onValueChanged.add(() => {
  console.log("onValueChanged", survey.data);
});

const onInit = async () => {
  survey.fromJSON(gcsFormJson);
}


onMounted(() => {
  onInit();
});
</script>

<template>
  <div class="survey-container">
    <SurveyComponent :survey="survey"/>
  </div>
</template>

<style lang="scss" scoped>
.survey-container {
  height: 100%;
  background-color: #ffffff;
  overflow-y: auto;

  :deep(.el-loading-parent--relative) {
    height: 100%;
  }

  .saving-loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 999;

    :deep(.el-loading-text) {
      margin-top: 20px;
      font-size: 20px;
    }
  }
}

.navigation-button {
  position: absolute;
  top: 8%;
  right: 5%;
  z-index: 100;
  min-width: 85px;
}
</style>
