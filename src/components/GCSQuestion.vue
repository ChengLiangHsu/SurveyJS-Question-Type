<script>
import {Question, Serializer} from "survey-core";


const CUSTOM_TYPE = "gcs";

export class QuestionGCSModel extends Question {
  getType() {
    return CUSTOM_TYPE;
  }

  // isEmpty() {
  //   console.log("isEmpty", this.value)
  //   return !(Number.isInteger(this.value?.E) && Number.isInteger(this.value?.V) && Number.isInteger(this.value?.M));
  // }

}

Serializer.addClass(
    CUSTOM_TYPE,
    [],
    function () {
      return new QuestionGCSModel();
    },
    "question"
);

</script>
<script setup>
const props = defineProps({
      question: {
        type: Object,
        required: true
      }
    }
);

const evmItems = [
  {
    "label": "睜眼",
    "value": "GCS-E",
    "items": [
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
    "label": "說話",
    "value": "GCS-V",
    "items": [
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
    "label": "動作",
    "value": "GCS-M",
    "items": [
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

// if (!props.question.value) {
//   console.log("init value", props.question.value)
//   props.question.value = {E: null, V: null, M: null}
// }
//
// const gcsValues = reactive({...props.question.value})
const gcsValues = ref({...props.question.value});


function updateValue(type_, value) {
  gcsValues.value[type_] = value;
  props.question.value = gcsValues.value;
}

const gcsScore = computed(() => {
  if (
      Number.isInteger(gcsValues.value["GCS-E"]) &&
      Number.isInteger(gcsValues.value["GCS-V"]) &&
      Number.isInteger(gcsValues.value["GCS-M"])
  ) {
    return gcsValues.value["GCS-E"] + gcsValues.value["GCS-V"] + gcsValues.value["GCS-M"];
  }
  return ""
})
</script>
<template>
  <div v-for="evalTarget in evmItems"
       :key="evalTarget.value" class="gcs-item">
    {{ evalTarget.value }}:
    <ElRadioGroup
        v-model="gcsValues[evalTarget.value]"
        :disabled="props.question.surveyValue.mode === 'display'"
    >
      <ElRadioButton
          v-for="item in evalTarget.items"
          :key="`${evalTarget.value}-${item.value}`"
          :label="item.label"
          :value="item.value"
          @change="updateValue(evalTarget.value, item.value)"
      />
    </ElRadioGroup>
  </div>
  <div class="gcs-score">
    GCS 總分 : {{ gcsScore }}
  </div>
</template>
<style scoped>
.gcs-item + .gcs-item {
  margin-top: 10px;
}

.gcs-score {
  margin-top: 10px;
}
</style>
