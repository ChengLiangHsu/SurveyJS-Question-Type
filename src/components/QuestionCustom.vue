<script>
import {Question, Serializer} from "survey-core";

const CUSTOM_TYPE = "custom-question";

export class QuestionCustomModel extends Question {
  getType() {
    return CUSTOM_TYPE;
  }
}

Serializer.addClass(
    CUSTOM_TYPE,
    [],
    function () {
      return new QuestionCustomModel("");
    },
    "question"
);
</script>
<script setup>
const props = defineProps({
      question: {
        type: Object,
        required: true,
      }
    }
)

const customValue = ref(null);

function updateValue(val) {
  customValue.value = val;
  props.question.value = customValue.value;
}
</script>
<template>
  <div>
    <el-input v-model="customValue" @input="updateValue($event)"/>
  </div>
  {{ customValue }}
</template>