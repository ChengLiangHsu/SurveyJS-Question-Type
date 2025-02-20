<!--Custom question-->
<script>
import {ElementFactory, Question, Serializer} from "survey-core";


const CUSTOM_TYPE = "gcs_custom_question";

export class QuestionGCSModel extends Question {
  getType() {
    return CUSTOM_TYPE;
  }
}

ElementFactory.Instance.registerElement(
    CUSTOM_TYPE,
    (name) => {
      return new QuestionGCSModel(name);
    }
);

Serializer.addClass(
    CUSTOM_TYPE,
    [],
    function () {
      const model = new QuestionGCSModel("")
      model.isRequired = true;
      return model;
    },
    "question"
);
</script>
<script setup>
import {ElRadioGroup, ElRadioButton} from "element-plus";

const props = defineProps({
      question: {
        type: Object,
        required: true,
      }
    }
)

const gcsRadioGroups = [
  {
    key_: "GCS_E",
    label: "睜眼",
    buttons: [
      {
        "label": "自動睜眼看外界",
        "value": 4,
      },
      {
        "label": "聽到聲音睜眼",
        "value": 3,
      },
      {
        "label": "痛時睜眼",
        "value": 2,
      },
      {
        "label": "完全沒有張眼",
        "value": 1,
      }
    ]
  },
  {
    key_: "GCS_V",
    label: "說話",
    buttons: [
      {
        "label": "講話有條理",
        "value": 5,
      },
      {
        "label": "答非所問",
        "value": 4,
      },
      {
        "label": "僅呢喃單字",
        "value": 3,
      },
      {
        "label": "僅發出聲音",
        "value": 2,
      },
      {
        "label": "無言語反應",
        "value": 1,
      }
    ]
  },
  {
    key_: "GCS_M",
    label: "動作",
    buttons: [
      {
        "label": "可按指令動作",
        "value": 6,
      },
      {
        "label": "定位痛覺位置並去除刺激",
        "value": 5,
      },
      {
        "label": "受痛覺時肢體自然彎曲",
        "value": 4,
      },
      {
        "label": "肢體呈現不自然彎曲",
        "value": 3,
      },
      {
        "label": "肢體伸直",
        "value": 2,
      },
      {
        "label": "完全沒有動作反應",
        "value": 1,
      }
    ]
  }
]

const gcsValues = ref({...props.question.value} ||
    {
      "GCS_E": null,
      "GCS_V": null,
      "GCS_M": null
    }
)

function updateValue(key_, value) {
  gcsValues.value[key_] = value;
  props.question.value = gcsValues.value;
}
</script>
<template>
  <div style="margin-right: 5px; width: 100%; overflow: auto">
    <el-radio-group
        v-for="(radioGroup) in gcsRadioGroups"
        v-model="gcsValues[radioGroup.key_]"
        :key="radioGroup.label"
        style="overflow: auto"
    >
      {{ radioGroup.label }}
      <el-radio
          v-for="button in radioGroup.buttons"
          :key="button.label"
          :label="button.label"
          :value="button.value"
          @change="updateValue(radioGroup.key_, button.value)"
          border
          style="margin-right: 2px"
      >
      </el-radio>
    </el-radio-group>
    {{ gcsValues }}
  </div>
</template>
